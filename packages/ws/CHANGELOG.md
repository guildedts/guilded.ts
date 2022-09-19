# @guildedts/ws

## 0.5.0

### Minor Changes

-   837ebfc: feat(WebsocketOptions): add `proxyUrl`

## 0.4.4

### Patch Changes

-   a6cd7a6: feat: switch to new WebSocket URL

## 0.4.7

### Patch Changes

-   a8aeeca: fix: fix doc generation

## 0.4.6

### Patch Changes

-   8575cf6: feat: new publish method

## 0.4.5

### Patch Changes

-   f88c395: attempt 2 of using changeset publish

## 0.4.4

### Patch Changes

-   79e4290: attempt to use changeset publish

## 0.4.3

### Patch Changes

-   49dc7d8: fix: fix publish

## 0.4.2

### Patch Changes

-   a402608: refactor: switch from Yarn to PNPM

## 0.4.1

### Patch Changes

-   677c5a2: docs: add examples

## 0.4.0

### Minor Changes

-   # Features

    -   Add `User-Agent` to headers when connnecting to WebSocket
    -   Add `raw` to `WSManagerEvents`

    # Fixes

    -   Use `s` in message payloads for `lastMessageId`

## 0.3.3

### Patch Changes

-   # Features

    -   Change README banner to have a png instead of a jpg

## 0.3.2

### Patch Changes

-   # Fixes

    -   Change README banner to have a background

## 0.3.1

### Patch Changes

-   # Branding

    -   Rebrand logo and banner

## 0.3.0

### Minor Changes

-   # Features

    -   Add `reconnects` to `WebsocketManager`
    -   Add `lastMessageId` to `WebsocketManager`
    -   Add reconnects on disconnect to `WebsocketManager`
    -   Add `maxReconnects` to `WebsocketOptions`
    -   Add `reconnect` to `WebsocketOptions`
    -   Add `reconnect` to `WSManagerEvents`
    -   Change `connect` to `ready` in `WSManagerEvents`
    -   Add `ws` parameter to `disconnect` in `WSManagerEvents`
    -   Change `data` to `event` in `WSManagerEvents`
    -   Change `connectedAt` to `readyAt` in `WebsocketManager`
    -   Change `isConnected` to `isReady` in `WebsocketManager`
    -   Change `connectedTimestamp` to `readyTimestamp` in `WebsocketManager`

## 0.2.1

### Patch Changes

-   727d276: # Fixes

    -   Fix consistency in docs

## 0.2.0

### Minor Changes

-   # Features

    -   Add `ping`, `pingedAt` and `pingedTimestamp` to `WebsocketManager`
    -   Change `connected` to `isConnected` in `WebsocketManager`
    -   Add `WebsocketOptions`
    -   Remove `WSData`

## 0.1.0

### Minor Changes

-   Added support for message embeds and a few events.

    ## New events

    -   `memberAdd`
    -   `memberRemove`
    -   `memberBan`
    -   `memberUnban`
    -   `memberEdit`
    -   `serverRolesEdit`

    ## Features

    -   Message embeds

    ## Fixes

    -   Completed `fetch` function that have been left uncomnplete.

    > **Note:** There have been a few other changes regarding managing imports and more.

## 0.0.2

### Patch Changes

-   All issues with dependencies should now be fixed.

## 0.0.1

### Patch Changes

-   # Guilded.TS preview release

    Guilded.TS is now finally in its preview build!

    I am excited to announce that Guilded.TS is now avalible for testing!

    I hope for your feedback and suggestions!

    # Current features

    -   Events - `messageCreate` - `messageEdit` - `messageDelete`
    -   Channels (not fetchable by API)
    -   Servers (not fetchable by API)
    -   Users
    -   Messages
        -   Message creation
        -   Message deletion
        -   Message editing
    -   Server members
        -   Fetching (Addes the members user to the users cache)
        -   Banning
        -   Kicking
        -   Nickname changing
        -   Awarding XP

    > **Note:** Some features may have not been mentioned.

    # TODO

    -   Cover 100% of the API.
        -   Add all structures.
        -   Add new managers for new structures.
        -   Add events for all of the websocket events.
