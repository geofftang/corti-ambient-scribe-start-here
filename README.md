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

Every new Corti signup gets the same generic experience regardless of what they're building: an onboarding tour that pitches the no-code AI Studio to everyone, a homepage whose one bold button is a generic recording demo, and a docs site with four equal "Get started" cards and no ambient-scribe card among them. That's not for lack of infrastructure. Corti already built separate build guides for dictation, ambient scribe, medical coding, and a clinical chat assistant, plus a use-case picker inside Developer Quickstart that hands you the matching one, it just doesn't show up first. Even once you find the ambient-scribe prompt below, it doesn't get you a result, it gets you a build task:

> Build an ambient scribe with the Corti SDK.
>
> 1. Read your build skill end-to-end: `corti-ambient-scribe/SKILL.md`
> 2. Credentials are in the Corti Console: console.corti.app → Developer Quickstart

Paste that into your agent, and it goes off to build a whole app (real-time streaming, a three-pane UI) from a full spec, with nothing to show you until it's done. This repo skips the build task. It's already built: clone it, add your Corti credentials, run one command, and in under a minute you have a real transcribed note back from Corti's live API, proof the thing works before you or an agent invest any time building around it. From there you decide which of Corti's two real paths to build on, their full example by hand, or their build guide through a coding agent.

## Where I'd take this next

Two follow-ons worth naming. Corti could fold this same "did it actually work" check directly into the SKILL.md-guided build for all four use cases, not only ambient scribe, so the checkpoint lives in their own product rather than an external repo. And this connects to acquisition: a developer arriving via ambient-scribe-specific ad messaging should land on this exact quickstart through the campaign's own UTM, rather than the generic homepage.

## Sample audio

`fixtures/sample-audio.wav` is a real, licensed clip, not synthetic. Full sourcing and attribution in `fixtures/SOURCING.md`.

## Don't want to clone it?

`fixtures/sample-output.md` is the real, unedited output from an actual run against Corti's live API, so you can see it work without running anything yourself.
