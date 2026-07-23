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

Every new Corti signup lands on one page pointing several directions at once: a bold black "Start recording" button for the no-code AI Studio, a same-row plain-text "Developer quickstart" link for the SDK path at much lower visual weight, and a small link cluster at the very bottom of the page (API Reference, Postman, "AI coding tools") for raw docs. The separate 5-step onboarding tour adds a fourth pointer, closing by pushing back to AI Studio rather than toward any developer path. None of these is prioritized for what a specific developer is actually building, worth a broader look at the user journey on Corti's end. The repo below is another way I examined that same journey: once a developer does reach the ambient-scribe build path, the problem changes shape rather than disappearing. Corti hands them this prompt to paste into a coding agent:

> Build an ambient scribe with the Corti SDK.
>
> 1. Read your build skill end-to-end: `corti-ambient-scribe/SKILL.md`
> 2. Credentials are in the Corti Console: console.corti.app → Developer Quickstart

The agent then asks a few configuration questions (framework, real-time vs. async, audio source) and, once the app is built, asks for credentials before running it. None of those questions confirm the one thing that actually matters first: whether the underlying API call works. That confirmation, if it happens at all, comes only after the whole app, real-time streaming, a three-pane UI, is already built. The build guide even has a documented path where it never happens: skip the credentials step, and the agent's own scripted hand-off says "I scaffolded `.env.example` but did not verify the demo end-to-end."

This repo moves that confirmation to the front: clone it, add your Corti credentials, run one command, and in under a minute you have a real transcribed note back from Corti's live API, proof the core thing works before any of that larger build starts. From there you decide which of Corti's two real paths to build on, their full example by hand, or their build guide through a coding agent.

## Where I'd take this next

Two follow-ons worth naming. Corti could fold this same "did it actually work" check directly into the SKILL.md-guided build for all four use cases, not only ambient scribe, so the checkpoint lives in their own product rather than an external repo. And this connects to acquisition: a developer arriving via ambient-scribe-specific ad messaging should land on this exact quickstart through the campaign's own UTM, rather than the generic homepage.

## Sample audio

`fixtures/sample-audio.wav` is a real, licensed clip, not synthetic. Full sourcing and attribution in `fixtures/SOURCING.md`.

## Don't want to clone it?

`fixtures/sample-output.md` is the real, unedited output from an actual run against Corti's live API, so you can see it work without running anything yourself.
