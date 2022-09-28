# guilded-api-typings

## 0.12.1

### Patch Changes

-   34c82fd: feat: generic typings
-   0423e02: feat: forum topic lock and unlock

## 0.12.0

### Minor Changes

-   88420fe: feat: webhook `username` and `avatar_url` support

## 0.11.0

### Minor Changes

-   2d36b59: feat: forum topic pinning

## 0.10.0

### Minor Changes

-   bb54674: feat: set server member XP

### Patch Changes

-   13a6533: types: change `WSOpCodes` to `WSOpCode`

## 0.9.0

### Minor Changes

-   4d06b33: feat(types): use enums instead of unions types

    This removes all `*String` types and just uses the enum itself

    This also removes the `API` prefix for enums. `APIChannelType` becomes `ChannelType`

### Patch Changes

-   9cac330: feat: add `mentions` to forum topics

## 0.8.5

### Patch Changes

-   a8aeeca: fix: fix doc generation

## 0.8.4

### Patch Changes

-   8575cf6: feat: new publish method

## 0.8.3

### Patch Changes

-   f88c395: attempt 2 of using changeset publish

## 0.8.2

### Patch Changes

-   79e4290: attempt to use changeset publish

## 0.8.1

### Patch Changes

-   49dc7d8: fix: fix publish

## 0.8.0

### Minor Changes

-   4fd7f3f: feat: full forum topic support
-   4fd7f3f: feat: improve consistancy in naming

    **example:** `FetchDocsOptions` is now `DocFetchManyOptions`

### Patch Changes

-   a402608: refactor: switch from Yarn to PNPM

## 0.7.0

### Minor Changes

-   6b230b2: feat: calendar event RSVPs

## 0.6.0

### Minor Changes

-   677c5a2: feat: change `Routes` into a class

### Patch Changes

-   677c5a2: docs: add examples

## 0.5.4

### Patch Changes

-   # Features

    -   Add `WSMessagePayload`
    -   Add `Resume` to `WSOpCodes`

## 0.5.3

### Patch Changes

-   # Features

    -   Change README banner to have a png instead of a jpg

## 0.5.2

### Patch Changes

-   # Fixes

    -   Change README banner to have a background

## 0.5.1

### Patch Changes

-   # Branding

    -   Rebrand logo and banner

## 0.5.0

### Minor Changes

-   # Features

    -   Add `APIMessageReaction`
    -   Add `APIEmote`
    -   Add `APIClientUser`
    -   Add `WSReadyPayload`
    -   Add `ChannelMessageReactionCreated` to `WSEvents`
    -   Add `ChannelMessageReactionDeleted` to `WSEvents`

    # Fixes

    -   Fix incorrect typings in `WSOpCodes`

## 0.4.0

### Minor Changes

-   # Features

    -   Add `APICalendarEvent`
    -   Add `APICalendarEventCancellation`
    -   Add `APICalendarEventPayload`
    -   Add `APICalendarEventEditPayload`
    -   Add `APIFetchCalendarEventsQuery`
    -   Add `calendarEvents` to `Routes`
    -   Add `calendarEvent` to `Routes`
    -   Add `CalendarEventCreated` to `WSEvents`
    -   Add `CalendarEventUpdated` to `WSEvents`
    -   Add `CalendarEventDeleted` to `WSEvents`

## 0.3.1

### Patch Changes

-   # Features

    -   Add `APIError`

## 0.3.0

### Minor Changes

-   727d276: # Features

    -   Add `server` to `Routes`
    -   Change `APIChannelType` into enum
    -   Add `APIChannelTypeString`
    -   Replace `APIEmbedThumbnail` and `APIEmbedImage` with `APIEmbedMedia`
    -   Change `APIListItemNote` to `APINote`
    -   Change `APIListItemNoteSummary` to `APINoteSummary`
    -   Change `APIListItemNotePayload` to `APINotePayload`
    -   Change `APIMessageType` into enum
    -   Add `APIMessageTypeString`
    -   Change `APIContentReaction` to `APIReaction`
    -   Add `APIServer`
    -   Add `APIServerType`
    -   Add `APIServerTypeString`
    -   Change `APIServerMemberNicknamePayload` to `APIServerNicknamePayload`
    -   Change `APIServerXPPayload` to `APIServerXpPayload`
    -   Chnage `APIForumThread` to `APITopic`
    -   Change `APIForumThreadPayload` to `APITopicPayload`
    -   Change `APIUserType` into enum
    -   Add `APIUserTypeString`
    -   Change `serverMemberNickname` to `serverNickname` in `Routes`
    -   Change `forums` to `topics` in `Routes`
    -   Change `serverMemberXP` to `serverMemberXp` in `Routes`
    -   Change `serverRoleXP` to `serverRoleXp` in `Routes`
    -   Add `APIMessagePayloadResolvable`
    -   Add `APIMessageEditPayloadResolvable`

    # Fixes

    -   Fix consistency in docs
    -   Update to new route for topics

## 0.2.1

### Patch Changes

-   # Features

    -   Add `APIMentions`
    -   Add `mentions` to `APIDoc`, `APIListItemSummary` and `APIMessage`
    -   Add `APIWebhookEditPayload`

## 0.2.0

### Minor Changes

-   # Features

    -   Update `Routes`
        -   Change `channelMessage` and `channelMessages` to `message` and `messages`
        -   Change `userNickname` to `serverMemberNickname`
        -   Change `channelForum` to `forums`
        -   Chnage `channelListItems` and `channelListItem` to `listItems` and `listItem`
        -   Change `channelListItemComplete` to `listItemComplete`
        -   Chnage `channelDocs` and `channelDoc` to `docs` and `doc`
        -   Chnage `messageReaction` to `reaction`
        -   Chnage `memberXP` to `serverMemberXP`
        -   Chnage `roleXP` to `serverRoleXP`
        -   Chnage `memberSocialLink` to `socialLink`
        -   Chnage `memberRoles` and `memberRole` to `serverMemberRoles` and `serverMemberRole`
        -   Change `serverWebhooks` and `serverWebhook` to `webhooks` and `webhook`
    -   Improve WS event's typings
    -   Add `APIChannelEditPayload`
    -   Chnage `APIGetDocsQuery` to `APIFetchDocsQuery`
    -   Chnage `APIChatMessage` to `APIMessage`
    -   Change `APIDeletedChatMessage` to `APIMessageSummary`
    -   Change `APIChatMessageType` to `APIMessageType`
    -   Change `APIChatMessagePayload` to `APIMessagePayload`
    -   Add `APIMessageEditPayload`
    -   Change `APIGetChatMessagesQuery` to `APIFetchMessagesQuery`
    -   Change `APIMessageReaction` to `APIContentReaction`
    -   Change `APIServerMemberBan` to `APIServerBan`
    -   Add `APIServerMemberNicknamePayload`
    -   Change `APIServerMemberBanPayload` to `APIServerBanPayload`
    -   Change `APIServerXpPayload` to `APIServerXPPayload`
    -   Remove `APISocialLinkType`
    -   Change `APIGetWebhooksQuery` to `APIFetchWebhooksQuery`

    # Fixes

    -   Fix incorrect endpoint for `serverMemberNickname`

## 0.1.2

### Patch Changes

-   # Features

    -   Add `avatar` property to the `UserSummary` interface
    -   Add `banner` property to the `User` interface

## 0.1.1

### Patch Changes

-   Added typings for channels.

    # Features

    -   Add channel typings
    -   Add `APIListItemSummary`
    -   Add new routes
        -   `channels`
        -   `channel`
        -   `channelListItemComplete`
    -   Add new WS events
        -   `TeamChannelCreated`
        -   `TeamChannelUpdated`
        -   `TeamChannelDeleted`
        -   `DocCreated`
        -   `DocUpdated`
        -   `DocDeleted`
        -   `ListItemCreated`
        -   `ListItemUpdated`
        -   `ListItemDeleted`
        -   `ListItemCompleted`
        -   `ListItemUncompleted`

    # Fixes

    -   **APIDoc**: fix incorrect `id` type
    -   Fix typo in `ListItem.ts`

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
