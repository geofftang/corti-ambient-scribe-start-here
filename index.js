#!/usr/bin/env node
// The golden path Corti's console doesn't hand you automatically: signup credentials in,
// one real ambient-scribe API call out, in under a minute. No SDK, no build agent, just
// the four calls a working integration actually makes.
//
// Preflight -> auth -> create interaction -> upload audio -> transcribe -> generate note.

import { readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));

// --- tiny zero-dependency .env loader ---
function loadEnv(path) {
  if (!existsSync(path)) return;
  const lines = readFileSync(path, "utf8").split("\n");
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (!(key in process.env)) process.env[key] = value;
  }
}
loadEnv(join(__dirname, ".env"));

// --- preflight: fail loud and helpful, not silent ---
const { CORTI_TENANT_NAME, CORTI_CLIENT_ID, CORTI_CLIENT_SECRET, CORTI_ENVIRONMENT } =
  process.env;

if (!CORTI_TENANT_NAME || !CORTI_CLIENT_ID || !CORTI_CLIENT_SECRET || !CORTI_ENVIRONMENT) {
  console.error(
    [
      "",
      "Missing Corti credentials. This script needs a .env file (see .env.example) with:",
      "  CORTI_TENANT_NAME, CORTI_CLIENT_ID, CORTI_CLIENT_SECRET, CORTI_ENVIRONMENT",
      "",
      "Don't have these yet? Get them free:",
      "  1. Sign up: https://console.corti.app",
      "  2. Console -> API Clients -> \"Copy all as .env variables\"",
      "  3. Paste that into a .env file in this folder",
      "",
    ].join("\n")
  );
  process.exit(1);
}

const AUTH_BASE = `https://auth.${CORTI_ENVIRONMENT}.corti.app`;
const API_BASE = `https://api.${CORTI_ENVIRONMENT}.corti.app/v2`;

function headers(token) {
  return {
    Authorization: `Bearer ${token}`,
    "Tenant-Name": CORTI_TENANT_NAME,
  };
}

async function ok(res, step) {
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`${step} failed: ${res.status} ${res.statusText}\n${body}`);
  }
  return res;
}

async function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function main() {
  const startedAt = Date.now();
  console.log("-> auth");
  const tokenRes = await fetch(
    `${AUTH_BASE}/realms/${CORTI_TENANT_NAME}/protocol/openid-connect/token`,
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "client_credentials",
        client_id: CORTI_CLIENT_ID,
        client_secret: CORTI_CLIENT_SECRET,
        scope: "openid",
      }),
    }
  );
  await ok(tokenRes, "auth");
  const { access_token } = await tokenRes.json();
  if (!access_token) {
    throw new Error("auth succeeded but response had no access_token — Corti's response shape may have changed");
  }
  console.log("   ok, token acquired");
  // Token TTL is 300s (per Corti's docs). The transcript poll below caps at 60s,
  // well inside that window, so this script doesn't refresh mid-run. If you raise
  // the poll timeout past a few minutes, add a refresh before re-using access_token.

  console.log("-> create interaction");
  const interactionRes = await fetch(`${API_BASE}/interactions/`, {
    method: "POST",
    headers: { ...headers(access_token), "Content-Type": "application/json" },
    body: JSON.stringify({
      encounter: {
        identifier: `start-here-${Date.now()}`,
        status: "in-progress",
        type: "consultation",
      },
    }),
  });
  await ok(interactionRes, "create interaction");
  const { interactionId } = await interactionRes.json();
  if (!interactionId) {
    throw new Error("interaction created but response had no interactionId — Corti's response shape may have changed");
  }
  console.log(`   ok, interaction ${interactionId}`);

  console.log("-> upload audio (fixtures/sample-audio.wav)");
  const audio = readFileSync(join(__dirname, "fixtures", "sample-audio.wav"));
  const uploadRes = await fetch(`${API_BASE}/interactions/${interactionId}/recordings/`, {
    method: "POST",
    headers: { ...headers(access_token), "Content-Type": "application/octet-stream" },
    body: audio,
  });
  await ok(uploadRes, "upload recording");
  const { recordingId } = await uploadRes.json();
  if (!recordingId) {
    throw new Error("audio uploaded but response had no recordingId — Corti's response shape may have changed");
  }
  console.log(`   ok, recording ${recordingId}`);

  console.log("-> transcribe");
  // Note: `diarize: true` is requested, but this script joins all transcript lines
  // into one block below rather than keeping per-speaker structure. In this run,
  // Corti's async transcript endpoint returned every line on channel 0 regardless
  // (unlike the real-time streaming path, which does separate by channel/participant),
  // so speaker separation isn't actually exercised here even though the flag is set.
  // A real multichannel ambient-scribe build should verify this before relying on it.
  const transcriptRes = await fetch(
    `${API_BASE}/interactions/${interactionId}/transcripts/`,
    {
      method: "POST",
      headers: { ...headers(access_token), "Content-Type": "application/json" },
      body: JSON.stringify({
        recordingId,
        primaryLanguage: "en",
        diarize: true,
        automaticPunctuation: true,
      }),
    }
  );
  await ok(transcriptRes, "create transcript");
  let transcript = await transcriptRes.json();

  // transcription can take longer than the create-call; poll if not completed yet
  let waited = 0;
  let lastPollFailed = false;
  while (transcript?.status !== "completed" && waited < 60_000) {
    await sleep(3000);
    waited += 3000;
    const poll = await fetch(
      `${API_BASE}/interactions/${interactionId}/transcripts/${transcript.id ?? ""}`,
      { headers: headers(access_token) }
    );
    lastPollFailed = !poll.ok;
    if (poll.ok) transcript = await poll.json();
  }
  if (transcript?.status !== "completed") {
    throw new Error(
      `transcript never reached "completed" after ${waited / 1000}s of polling` +
        (lastPollFailed ? " (last poll request also failed)" : "") +
        ` — refusing to generate a note from incomplete data. Last known status: ${transcript?.status ?? "unknown"}`
    );
  }
  const transcriptText = (transcript.transcripts ?? []).map((s) => s.text).join(" ");
  console.log(`   ok, ${transcriptText.length} characters transcribed`);

  console.log("-> generate note (corti-soap)");
  const documentRes = await fetch(`${API_BASE}/interactions/${interactionId}/documents/`, {
    method: "POST",
    headers: { ...headers(access_token), "Content-Type": "application/json" },
    body: JSON.stringify({
      context: [{ type: "transcript", data: { text: transcriptText } }],
      templateKey: "corti-soap",
      outputLanguage: "en",
    }),
  });
  await ok(documentRes, "generate document");
  const document = await documentRes.json();

  const elapsedSeconds = ((Date.now() - startedAt) / 1000).toFixed(1);
  console.log(`\n--- Real Corti output, this run (${elapsedSeconds}s total) ---\n`);
  console.log(JSON.stringify(document, null, 2));

  console.log(
    [
      "",
      `It works, in ${elapsedSeconds}s. Now pick your build style:`,
      "  (A) Agent-assisted: hand corti-ambient-scribe/SKILL.md to your coding agent",
      "      https://docs.corti.ai/.well-known/agent-skills/corti-ambient-scribe/SKILL.md",
      "  (B) Hands-on: clone the full example and extend it",
      "      https://github.com/corticph/corti-examples (ambient/typescript)",
      "  No credentials yet? -> https://console.corti.app -> Developer Quickstart",
      "",
    ].join("\n")
  );
}

main().catch((err) => {
  console.error("\nSomething broke. Real error, not swallowed:\n");
  console.error(err.message);
  if (err.cause) console.error("\nCause:", err.cause);
  process.exit(1);
});
