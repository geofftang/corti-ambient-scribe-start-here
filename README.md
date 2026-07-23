# corti-ambient-scribe-start-here

The fastest path from a Corti signup to your first real ambient-scribe API result. Clone it, run one command, see a real transcribed note come back.

## Quickstart

**Prerequisites:** a free Corti account.

1. Sign up at [console.corti.app](https://console.corti.app)
2. Console -> API Clients -> "Copy all as .env variables"
3. Paste that into a `.env` file in this folder (see `.env.example` for the shape)

Then:

```bash
npm start
```

**What you get:** staged status lines (auth -> interaction -> upload -> transcript -> note) followed by a real generated SOAP note, from a real recorded clinical consultation bundled in `fixtures/sample-audio.wav`. Under a minute, no build, no agent required.

When it finishes, it prints a choice:

- **(A) Agent-assisted** — hand `corti-ambient-scribe/SKILL.md` to your coding agent and let it build the full app
- **(B) Hands-on** — clone [corti-examples](https://github.com/corticph/corti-examples)'s `ambient/typescript` folder and build it yourself
- No credentials yet? Console -> Developer Quickstart

## Why this exists

Once a developer reaches the ambient-scribe build path, here's the entire interaction Corti gives them before committing to a real build:

> Build an ambient scribe with the Corti SDK.
>
> 1. Read your build skill end-to-end: `corti-ambient-scribe/SKILL.md`
> 2. Credentials are in the Corti Console: console.corti.app → Developer Quickstart

That's it. Paste that into a coding agent, and it goes off to build a whole app (real-time streaming, a three-pane UI) from a full spec, with nothing to click, run, or check until it's done. The build guide even has a documented path where that check never happens at all: skip the credentials step, and the agent's own scripted hand-off says "I scaffolded `.env.example` but did not verify the demo end-to-end." A developer has no tangible way to confirm the thing actually works for them, just a wait.

This repo is that missing checkpoint: clone it, add your Corti credentials, run one command, and in under a minute you have a real transcribed note back from Corti's live API, something to click and see work, not a black box. From there you decide which of Corti's two real paths to build on, their full example by hand, or their build guide through a coding agent.

*(Side note, a different part of the journey than this asset targets: getting to this build path at all is its own problem. Every new signup gets the same generic experience regardless of what they're building, no signposted path per use case, so a more personalized flow per JTBD is worth its own fix, just not this one.)*

## Where I'd take this next

Two follow-ons worth naming. Corti could fold this same "did it actually work" check directly into the SKILL.md-guided build for all four use cases, not only ambient scribe, so the checkpoint lives in their own product rather than an external repo. And this connects to acquisition: a developer arriving via ambient-scribe-specific ad messaging should land on this exact quickstart through the campaign's own UTM, rather than the generic homepage.

## Sample audio

`fixtures/sample-audio.wav` is a real, licensed clip, not synthetic. Full sourcing and attribution in `fixtures/SOURCING.md`.

## Don't want to clone it?

`fixtures/sample-output.md` is the real, unedited output from an actual run against Corti's live API, so you can see it work without running anything yourself.
