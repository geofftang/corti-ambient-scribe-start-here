# Real run, 2026-07-23

Actual output from `npm start` against Corti's live US API, using `fixtures/sample-audio.wav`. Not a mockup. **15.0 seconds, measured by the script itself, not assumed.** Total cost: 0.049 credits.

```
-> auth
   ok, token acquired
-> create interaction
   ok, interaction 8392e1cf-d405-46ec-bf14-096e4309687d
-> upload audio (fixtures/sample-audio.wav)
   ok, recording bfafa2f8-731d-497a-b5cd-c6b8bad788b2
-> transcribe
   ok, 1202 characters transcribed
-> generate note (corti-soap)
```

## Generated SOAP note

**Subjective:** The patient presents with gastrointestinal symptoms, and the clinician says this may be due to gastroenteritis, described as a tummy bug or infection of the stomach. The clinician explains that this is mainly caused by viruses, although bacteria can also be a possible cause of the symptoms. The patient is described as keen to continue working. The patient may be having vomiting and diarrhea, and may also be feeling feverish and weak. The clinician advises taking time off work for the next 2 to 3 days as the infection clears and advises returning if symptoms have not improved within 3 to 4 days.

**Objective:** *(empty — this clip is the diagnosis-and-plan segment only, no exam findings were spoken in it)*

**Assessment:** Vomiting and diarrhea, with possible feverishness and weakness. Assessment favors gastroenteritis, with conservative management and no antibiotics currently indicated. Gastroenteritis.

**Plan:**
- Conservative management
- Encourage oral hydration
- Dioralyte from pharmacy during the first couple of days if vomiting and diarrhea
- Paracetamol 2 tablets up to four times daily for the first few days if feverish and weak
- Return for review if symptoms have not improved in 3 to 4 days

Note the Plan section correctly extracted the exact medication and dose spoken in the audio ("paracetamol... two tablets up to four times a day"), not just a paraphrase.

## Known limitation

`diarize: true` is requested on the transcript call, but Corti's async transcript endpoint returned every line on channel 0 in this run (unlike the real-time streaming path, which separates by channel). This script joins transcript text into one block regardless, so per-speaker structure isn't actually exercised here even though the flag is set. Worth verifying before relying on multichannel diarization in a real build.
