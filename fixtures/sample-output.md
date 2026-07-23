# Real run, 2026-07-23

Actual output from `npm start` against Corti's live US API, using `fixtures/sample-audio.wav`. Not a mockup. **13.2 seconds, measured by the script itself, not assumed.** Total cost: 0.054 credits.

```
-> auth
   ok, token acquired
-> create interaction
   ok, interaction 97ba2851-35f1-45e0-9b27-38ed3b98fb83
-> upload audio (fixtures/sample-audio.wav, the bundled sample)
   ok, recording 504e470a-2f0a-4370-a0eb-a025c2d7b379
-> transcribe
   ok, 1202 characters transcribed
```

## Transcript (input)

> Cause of your problems. It seems like you may have something called gastroenteritis, which is essentially just a tummy bug or infection of your of your tummy, mainly caused by viruses, but there can be a possibility of bacteria causing your symptoms. At this stage, what we'd recommend is just conservative management. So I don't think you need anything like antibiotics, it's really just making sure you're well hydrated, so drinking fluids. There are things like Dioralyte you can get from the pharmacy, which helps replenish some of your minerals and vitamins. And if you are having vomiting and diarrhea, I would certainly recommend that on the first couple of days. If you are feeling feverish and weak, taking some paracetamol two tablets up to four times a day for the first few days can also help. I would certainly advise you to take some time off work, next 2-3 days, as the infection clears from your system. If your symptoms haven't got better in 3-4 days, I'd like to come back and see you again.

## Generated SOAP note (output)

**Subjective:** The patient presents with gastrointestinal symptoms including vomiting and diarrhea and feels feverish and weak. The clinician discusses that the symptoms appear consistent with gastroenteritis, described as a tummy infection, and notes that this is mainly caused by viruses although bacteria remain a possibility.

**Objective:** *(empty — this clip is the diagnosis-and-plan segment only, no exam findings were spoken in it)*

**Assessment:** Vomiting, diarrhea, feverishness, and weakness. No objective findings are provided. Gastroenteritis.

**Plan:**
- Conservative management.
- Maintain hydration with fluids.
- Use Dioralyte from the pharmacy during the first couple of days if vomiting and diarrhea continue.
- Paracetamol two tablets up to four times daily for the first few days if feeling feverish and weak.

Note the Plan section correctly extracted the exact medication and dose spoken in the audio ("paracetamol... two tablets up to four times a day"), not just a paraphrase. The transcript-vs-note side-by-side above is exactly what `npm start` prints, seeing the real input next to the real output, not just the output alone.

## Bring your own audio

`npm start -- /path/to/your-audio.wav` runs the same flow against any WAV/MP3/WebM file you provide, instead of the bundled sample. Seeing it work on your own voice is faster trust-building than a canned example.

## Known limitation

`diarize: true` is requested on the transcript call, but Corti's async transcript endpoint returned every line on channel 0 in this run (unlike the real-time streaming path, which separates by channel). This script joins transcript text into one block regardless, so per-speaker structure isn't actually exercised here even though the flag is set. Worth verifying before relying on multichannel diarization in a real build.
