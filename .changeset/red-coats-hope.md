---
'guilded-api-typings': minor
'guilded.ts': minor
'@guildedts/rest': patch
---

feat(types): use enums instead of unions types

This removes all `*String` types and just uses the enum itself

This also removes the `API` prefix for enums. `APIChannelType` becomes `ChannelType`
