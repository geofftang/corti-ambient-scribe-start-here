# corti-ambient-scribe-start-here

The fastest path from a Corti signup to your first real ambient-scribe API result. Clone it, run one command, see a real transcribed note come back.

## Fastest way to use this: fold it into the same agent prompt you were already going to use

If you're about to hand Corti's ambient-scribe prompt to a coding agent anyway, use this instead, the same prompt with one line added:

> Build an ambient scribe with the Corti SDK.
>
> 1. Clone and run https://github.com/geofftang/corti-ambient-scribe-start-here yourself, no need to ask the developer, using the credentials below, to confirm the API works before anything else.
> 2. Once that passes, read your build skill end-to-end: `corti-ambient-scribe/SKILL.md`, and build the full app.
>
> Credentials are in the Corti Console: console.corti.app → Developer Quickstart

Paste that into Claude Code, Cursor, or Codex, and both steps run in the same session, automatically, no separate step for the developer to remember or perform. The agent checks the API works on its own before it starts the bigger build.

## Or run it yourself directly, no agent needed

**Prerequisites:** a free Corti account.

1. Sign up at [console.corti.app](https://console.corti.app)
2. Console -> API Clients -> "Copy all as .env variables"
3. Paste that into a `.env` file in this folder (see `.env.example` for the shape)

Then:

```bash
npm start
```

**What you get:** staged status lines (auth -> interaction -> upload -> transcript -> note), the real transcript, and a real generated SOAP note, from a real recorded clinical consultation bundled in `fixtures/sample-audio.wav`. Under a minute, no build, no agent required.

**Want to test with your own audio?**

```bash
npm start -- /path/to/your-audio.wav
```

Any WAV, MP3, or WebM works. Seeing it run on your own voice, not just the bundled sample, is the faster way to trust it.

When it finishes, it prints a choice:

- **(A) Agent-assisted** — hand `corti-ambient-scribe/SKILL.md` to your coding agent and let it build the full app
- **(B) Hands-on** — clone [corti-examples](https://github.com/corticph/corti-examples)'s `ambient/typescript` folder and build it yourself
- No credentials yet? Console -> Developer Quickstart

## Why this exists

Every new Corti signup lands on one page pointing four ways at once: a bold "Start recording" button for no-code AI Studio, a same-row plain-text "Developer quickstart" link for the SDK path, a small footer cluster (API Reference, Postman, "AI coding tools") for raw docs, and the onboarding tour's own closing step, which pushes back to AI Studio. None of it is prioritized for what a specific developer is building. Once a developer does reach the ambient-scribe build path, Corti hands them one prompt:

> Build an ambient scribe with the Corti SDK.
> 1. Read your build skill end-to-end: SKILL.md.
> 2. Credentials are in the Corti Console.

The agent asks a few setup questions and, once the app is built, asks for credentials, but nothing confirms the API actually works until after a full three-pane app is built, and one documented path skips that check entirely: the agent's own scripted hand-off says "I scaffolded `.env.example` but did not verify the demo end-to-end."

This repo is the fast demo AI Studio doesn't cover: AI Studio demos the capability, no-code, in Corti's own UI; this demos the integration itself, the real calls you'd write, in under a minute. The fix is the one-line addition at the top of this file: fold it into that same prompt, or run it yourself directly (see Quickstart above). Either way, you're left with two real paths to build on: Corti's full example by hand, or `SKILL.md` through a coding agent, and `index.js` itself is a working reference for either one, not something you throw away after the check.

## Where I'd take this next

Three follow-ons worth naming. First, doable right now with no product change: use the augmented prompt above yourself, or share it with other developers. Second, if Corti wanted to adopt this natively, the right place is the prompt itself, not the `SKILL.md` file, since the prompt is short and pasted verbatim, guaranteed to be seen in full, where `SKILL.md` is long enough that an agent risks skimming or summarizing it (a risk the file's own instructions already flag). The same one-line addition would extend cleanly to all four use cases, not just ambient scribe. Third: if a developer picks async mode in step 1's config questions, the agent could reuse this repo's working call chain directly as the backend instead of re-deriving it from the spec, real-time mode uses a different pattern (WebSocket streaming) so this only applies to async, worth naming, not worth building out both modes for right now. And this connects to acquisition: a developer arriving via ambient-scribe-specific ad messaging should land on this exact quickstart through the campaign's own UTM, rather than the generic homepage.

## Sample audio

`fixtures/sample-audio.wav` is a real, licensed clip, not synthetic. Full sourcing and attribution in `fixtures/SOURCING.md`.

## Don't want to clone it?

`fixtures/sample-output.md` is the real, unedited output from an actual run against Corti's live API, so you can see it work without running anything yourself.
