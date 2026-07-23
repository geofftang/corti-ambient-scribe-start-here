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

Corti already built the right scaffolding: separate build guides for dictation, ambient scribe, medical coding, and a clinical chat assistant, plus a use-case picker inside Developer Quickstart that hands you the matching one. None of that shows up first. Every new signup gets the same generic experience regardless of what they're building, an onboarding tour that pitches the no-code AI Studio to everyone, and a homepage whose one bold button is a generic recording demo. The docs site repeats the same shape: four equal "Get started" cards, no ambient-scribe card among them. The ambient-scribe build guide, once you reach it, is a spec meant for a coding agent to turn into a full app, a real commitment before you even know the API works for you. This repo is the smaller step in front of that: clone it, add your Corti credentials, run one command, and you get back a real transcribed note from an actual consultation in under a minute, on your own setup, before you commit an agent to anything. From there you pick which of Corti's two real paths to build on, their full example by hand, or their build guide through a coding agent.

## Where I'd take this next

Two follow-ons worth naming. Corti could fold this same "did it actually work" check directly into the SKILL.md-guided build for all four use cases, not only ambient scribe, so the checkpoint lives in their own product rather than an external repo. And this connects to acquisition: a developer arriving via ambient-scribe-specific ad messaging should land on this exact quickstart through the campaign's own UTM, rather than the generic homepage.

## Sample audio

`fixtures/sample-audio.wav` is a real, licensed clip, not synthetic. Full sourcing and attribution in `fixtures/SOURCING.md`.

## Don't want to clone it?

`fixtures/sample-output.md` is the real, unedited output from an actual run against Corti's live API, so you can see it work without running anything yourself.
