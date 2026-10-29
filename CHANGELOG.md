# Changelog

## 0.10.1 — 2026-10-29

- Restore the published 0.9.1 `parseGenbankString` and `parseSequenceFile` exports and TypeScript declarations omitted from the GitHub source.
- Preserve prior FASTA, GenBank, filename detection and gzip parsing behaviour. The 0.10.0 theme and assets are unchanged.
- Add compatibility tests against the original published parser functions and public export list.

## 0.10.0 — 2026-10-29

- Replace teal defaults with neutral light/dark surfaces, a charcoal header and blue actions.
- Bundle IBM Plex Sans and IBM Plex Mono with their font licence notices; remove the old font defaults.
- Use smaller consistent corners, opaque navigation and a solid file-upload outline.
- Improve keyboard focus and keep inactive button labels readable at full opacity.
- Increase console text to 14px, use neutral output and improve long-line wrapping.
- Refresh setup, token and console documentation. Component APIs and analysis helpers are unchanged.

Existing applications must update their dependency to adopt this theme and check any local CSS overrides.
