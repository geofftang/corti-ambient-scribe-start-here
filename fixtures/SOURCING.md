# Sample audio fixture — sourcing & attribution

`primock57-consultation01-diagnosis-plan.wav` — 78.5s, 16kHz, 2-channel (channel 0 = doctor, channel 1 = patient) WAV, ~5MB.

**Source:** [PriMock57](https://github.com/babylonhealth/primock57) (Babylon Health) — a real mock primary-care consultation between a clinician and an employee role-playing a patient (not a real patient encounter; no PHI). Licensed **CC-BY 4.0** (verified directly from the repo's `LICENSE.md`) — reuse permitted with attribution.

**Clip selection:** trimmed from `day1_consultation01` (full recording is 7.6 minutes) to a single continuous 78.5-second segment (347.5s–426.0s), chosen using the dataset's own manual utterance-level transcripts (`transcripts/day1_consultation01_{doctor,patient}.TextGrid`) so the cut lands on clean sentence boundaries, not a blind guess. The segment is the clinician's diagnosis and treatment plan: a gastroenteritis diagnosis, conservative-management advice, hydration guidance, and a real medication + dose ("paracetamol, two tablets up to four times a day") — enough clinical substance to exercise Corti's Assessment/Plan generation meaningfully, similar in spirit to the drug-dose extraction test in the earlier firsthand API research, but on real licensed human audio rather than synthetic TTS.

**Attribution (required by CC-BY 4.0):**
> Audio clip derived from PriMock57 (Babylon Health), CC-BY 4.0. Papadopoulos Korfiatis, A., Moramarco, F., Sarac, R., & Savkov, A. (2022). *PriMock57: A Dataset Of Primary Care Mock Consultations*. Proceedings of the 60th Annual Meeting of the Association for Computational Linguistics.

For the README's sourcing line: "Sample audio is a licensed clip (CC-BY 4.0) from PriMock57 — a real recorded mock consultation, not a real patient, not synthetic — trimmed to a clean diagnosis+plan segment using the dataset's own transcripts. Full attribution in SOURCING.md."
