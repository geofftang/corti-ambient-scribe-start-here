# corti-ambient-scribe-start-here

The fastest path from a Corti signup to your first real ambient-scribe API result. Clone it, run one command, see a real transcribed note come back.

## Fastest way to use this: fold it into the same agent prompt you were already going to use

If you're about to hand Corti's ambient-scribe prompt to a coding agent anyway, use this instead, the same prompt with one line added:

> Build an ambient scribe with the Corti SDK.
>
> 1. First, clone and run https://github.com/geofftang/corti-ambient-scribe-start-here to confirm your credentials and the core API work (one command, under a minute).
> 2. Once that passes, read your build skill end-to-end: `corti-ambient-scribe/SKILL.md`, and build the full app.
>
> Credentials are in the Corti Console: console.corti.app → Developer Quickstart

Paste that into Claude Code, Cursor, or Codex, and both steps run in the same session, automatically, no separate step for you to remember. The agent checks the API works on its own before it starts the bigger build.

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

Every new Corti signup lands on one page pointing several directions at once: a bold black "Start recording" button for the no-code AI Studio, a same-row plain-text "Developer quickstart" link for the SDK path at much lower visual weight, and a small link cluster at the very bottom of the page (API Reference, Postman, "AI coding tools") for raw docs. The separate 5-step onboarding tour adds a fourth pointer, closing by pushing back to AI Studio rather than toward any developer path. None of these is prioritized for what a specific developer is actually building, worth a broader look at the user journey on Corti's end. The repo below is another way I examined that same journey: once a developer does reach the ambient-scribe build path, the problem changes shape rather than disappearing. Corti hands them this prompt to paste into a coding agent:

> Build an ambient scribe with the Corti SDK.
>
> 1. Read your build skill end-to-end: `corti-ambient-scribe/SKILL.md`
> 2. Credentials are in the Corti Console: console.corti.app → Developer Quickstart

The agent then asks a few configuration questions (framework, real-time vs. async, audio source) and, once the app is built, asks for credentials before running it. None of those questions confirm the one thing that actually matters first: whether the underlying API call works. That confirmation, if it happens at all, comes only after the whole app, real-time streaming, a three-pane UI, is already built. The build guide even has a documented path where it never happens: skip the credentials step, and the agent's own scripted hand-off says "I scaffolded `.env.example` but did not verify the demo end-to-end."

This repo moves that confirmation to the front: clone it, add your Corti credentials, run one command, and in under a minute you have a real transcribed note back from Corti's live API, proof the core thing works before any of that larger build starts. It runs on its own, no agent required, before you commit to either path below, and it's not throwaway: `index.js`'s working call chain (auth, upload, transcript, note, with the real gotchas already handled) is a legitimate reference to copy directly if you go the hands-on route. From there you decide which of Corti's two real paths to build on, their full example by hand, or their build guide through a coding agent.

## Where I'd take this next

Two follow-ons worth naming. First, doable right now with no product change: use the augmented prompt above yourself, or share it with other developers. Second, if Corti wanted to adopt this natively, the right place is the prompt itself, not the `SKILL.md` file, since the prompt is short and pasted verbatim, guaranteed to be seen in full, where `SKILL.md` is long enough that an agent risks skimming or summarizing it (a risk the file's own instructions already flag). The same one-line addition would extend cleanly to all four use cases, not just ambient scribe. And this connects to acquisition: a developer arriving via ambient-scribe-specific ad messaging should land on this exact quickstart through the campaign's own UTM, rather than the generic homepage.

## Sample audio

`fixtures/sample-audio.wav` is a real, licensed clip, not synthetic. Full sourcing and attribution in `fixtures/SOURCING.md`.

## Don't want to clone it?

`fixtures/sample-output.md` is the real, unedited output from an actual run against Corti's live API, so you can see it work without running anything yourself.
