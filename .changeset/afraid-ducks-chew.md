---
'guilded-api-typings': patch
'guilded.ts': patch
---

fix: switch to `Server` WebSocket events

BREAKING CHANGES: This removes `team`/`Team` WebSocket events in favour of `Server` events
