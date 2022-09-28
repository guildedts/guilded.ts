# guilded.ts

## 0.18.0

### Minor Changes

-   cdd033e: feat: add `idle` to collector options
-   d188c45: feat: add `<ChatChannel>.awaitMessages` and `<Message>.awaitReactions`
-   0423e02: feat: forum topic lock and unlock

### Patch Changes

-   Updated dependencies [34c82fd]
-   Updated dependencies [0423e02]
    -   @guildedts/builders@0.2.9
    -   guilded-api-typings@0.12.1
    -   @guildedts/rest@0.14.0
    -   @guildedts/ws@0.5.0

## 0.17.0

### Minor Changes

-   88420fe: feat: webhook `username` and `avatar_url` support

### Patch Changes

-   Updated dependencies [88420fe]
-   Updated dependencies [cbcedfb]
-   Updated dependencies [837ebfc]
    -   guilded-api-typings@0.12.0
    -   @guildedts/rest@0.13.0
    -   @guildedts/ws@0.5.0
    -   @guildedts/builders@0.2.8

## 0.16.0

### Minor Changes

-   2d36b59: feat: forum topic pinning

### Patch Changes

-   08fcb08: fix: unrecognised events throw error
-   Updated dependencies [2d36b59]
    -   guilded-api-typings@0.11.0
    -   @guildedts/rest@0.12.0
    -   @guildedts/builders@0.2.8
    -   @guildedts/ws@0.4.4

## 0.15.0

### Minor Changes

-   bb54674: feat: set server member XP

### Patch Changes

-   Updated dependencies [bb54674]
-   Updated dependencies [a6cd7a6]
-   Updated dependencies [13a6533]
    -   guilded-api-typings@0.10.0
    -   @guildedts/rest@0.11.0
    -   @guildedts/ws@0.4.4
    -   @guildedts/builders@0.2.8

## 0.14.2

### Patch Changes

-   a8f8155: test: test tag creation

## 0.14.1

### Patch Changes

-   926b0d4: feat: return client **when** client is ready in `client.login`
-   6fc8c60: fix: give full data for the memberRemove event

## 0.14.0

### Minor Changes

-   4d06b33: feat(types): use enums instead of unions types

    This removes all `*String` types and just uses the enum itself

    This also removes the `API` prefix for enums. `APIChannelType` becomes `ChannelType`

### Patch Changes

-   9cac330: feat: add `mentions` to forum topics
-   Updated dependencies [9cac330]
-   Updated dependencies [4d06b33]
    -   guilded-api-typings@0.9.0
    -   @guildedts/rest@0.10.2
    -   @guildedts/builders@0.2.8
    -   @guildedts/ws@0.4.3

## 0.13.5

### Patch Changes

-   a8aeeca: fix: fix doc generation
-   Updated dependencies [a8aeeca]
    -   @guildedts/builders@0.2.12
    -   guilded-api-typings@0.8.5
    -   @guildedts/rest@0.10.5
    -   @guildedts/ws@0.4.7

## 0.13.4

### Patch Changes

-   8575cf6: feat: new publish method
-   Updated dependencies [8575cf6]
    -   @guildedts/builders@0.2.11
    -   guilded-api-typings@0.8.4
    -   @guildedts/rest@0.10.4
    -   @guildedts/ws@0.4.6

## 0.13.3

### Patch Changes

-   f88c395: attempt 2 of using changeset publish
-   Updated dependencies [f88c395]
    -   @guildedts/builders@0.2.10
    -   guilded-api-typings@0.8.3
    -   @guildedts/rest@0.10.3
    -   @guildedts/ws@0.4.5

## 0.13.2

### Patch Changes

-   79e4290: attempt to use changeset publish
-   Updated dependencies [79e4290]
    -   @guildedts/builders@0.2.9
    -   guilded-api-typings@0.8.2
    -   @guildedts/rest@0.10.2
    -   @guildedts/ws@0.4.4

## 0.13.1

### Patch Changes

-   49dc7d8: fix: fix publish
-   Updated dependencies [49dc7d8]
    -   @guildedts/builders@0.2.8
    -   guilded-api-typings@0.8.1
    -   @guildedts/rest@0.10.1
    -   @guildedts/ws@0.4.3

## 0.13.0

### Minor Changes

-   4fd7f3f: feat: full forum topic support
-   4fd7f3f: feat: improve consistancy in naming

    **example:** `FetchDocsOptions` is now `DocFetchManyOptions`

### Patch Changes

-   a402608: refactor: switch from Yarn to PNPM
-   Updated dependencies [a402608]
-   Updated dependencies [4fd7f3f]
-   Updated dependencies [4fd7f3f]
    -   @guildedts/builders@0.2.7
    -   guilded-api-typings@0.8.0
    -   @guildedts/rest@0.10.0
    -   @guildedts/ws@0.4.2

## 0.12.0

### Minor Changes

-   6b230b2: feat: calendar event RSVPs

### Patch Changes

-   Updated dependencies [6b230b2]
    -   guilded-api-typings@0.7.0
    -   @guildedts/rest@0.9.0
    -   @guildedts/builders@0.2.6
    -   @guildedts/ws@0.4.1

## 0.11.0

### Minor Changes

-   677c5a2: feat: return `Collection`s of members in `rolesEdit`
-   677c5a2: feat: add old data to edit events
-   677c5a2: feat: change params for `send` in `Webhook`

### Patch Changes

-   677c5a2: docs: add examples
-   677c5a2: types: change type of `replies` to `Collection` in `Message`
-   677c5a2: types: change return type of `fetchReplies` to `Collection` in `Message`
-   Updated dependencies [677c5a2]
-   Updated dependencies [677c5a2]
    -   guilded-api-typings@0.6.0
    -   @guildedts/builders@0.2.6
    -   @guildedts/rest@0.8.1
    -   @guildedts/ws@0.4.1

## 0.10.4

### Patch Changes

-   2cc1735: # Fixes

    -   rolesEdit event updates cache and emits updated data
    -   memberEdit event updates cache and emits updated data

-   Updated dependencies
-   Updated dependencies
-   Updated dependencies
    -   guilded-api-typings@0.5.4
    -   @guildedts/rest@0.8.0
    -   @guildedts/ws@0.4.0
    -   @guildedts/builders@0.2.5

## 0.10.3

### Patch Changes

-   # Features

    -   Change README banner to have a png instead of a jpg

-   Updated dependencies
    -   @guildedts/builders@0.2.5
    -   guilded-api-typings@0.5.3
    -   @guildedts/rest@0.7.4
    -   @guildedts/ws@0.3.3

## 0.10.2

### Patch Changes

-   # Fixes

    -   Change README banner to have a background

-   Updated dependencies
    -   @guildedts/builders@0.2.4
    -   guilded-api-typings@0.5.2
    -   @guildedts/rest@0.7.3
    -   @guildedts/ws@0.3.2

## 0.10.1

### Patch Changes

-   # Branding

    -   Rebrand logo and banner

    # Fixes

    -   Fix `TypeError` when `payload` isnt the correct type in `Message.reply`

-   Updated dependencies
    -   @guildedts/builders@0.2.3
    -   guilded-api-typings@0.5.1
    -   @guildedts/rest@0.7.2
    -   @guildedts/ws@0.3.1

## 0.10.0

### Minor Changes

-   # Features

    -   Change type of `collected` to `Collection` in `Collector`
    -   Change return type to `Collection` in all fetch methods
    -   Add return on `collect` method in `Collector`
    -   Add return on `dispose` method in `Collector`
    -   Change type of `collected` parameter to `Collection` on `end` in `CollectorEvents`
    -   Change type of `item` parameter to `Model` on `dispose` in `CollectorEvents`
    -   Add `MessageReactionCollector`
    -   Refactor options when fetching
    -   Add resolving support in manager methods
    -   Remove `ChannelResolvable`
    -   Remove `ChatBasedChannel`
    -   Add `FetchMessagesOptions`
    -   Change `ReactionManager` to `MessageReactionManager`
    -   Add `fetchSocialLink` to `ServerMemberManager`
    -   Add `FetchServerMemberRolesOptions`
    -   Add `FetchServerRolesOptions`
    -   Add `FetchOptions`
    -   Add `FetchManyOptions`
    -   Add `FetchCalendarEventsOptions`
    -   Add `FetchDocsOptions`
    -   Remove `StreamChannel`
    -   Remove `VoiceChannel`
    -   Add `createReactionCollector` to `Message`
    -   Add `MessageReaction`
    -   Add `remove` method to `ServerBan`
    -   Change type of `socialLinks` to `Collection` in `ServerMember`
    -   Change type of `user` to `ClientUser` in `Client`
    -   Add `reconnect` to `ClientEvents`
    -   Add `messageReactionAdd` to `ClientEvents`
    -   Add `messageReactionRemove` to `ClientEvents`
    -   Add `reconnect` to `ClientOptions`
    -   Add `maxReconnects` to `ClientOptions`
    -   Add `disposeCachedMessages` to `ClientOptions`
    -   Add `disposeCollectedMessages` to `ClientOptions`
    -   Add `disposeCachedServerMembers` to `ClientOptions`
    -   Add `disposeCachedServerBans` to `ClientOptions`
    -   Add `disposeCachedChannels` to `ClientOptions`
    -   Add `disposeCachedListItems` to `ClientOptions`
    -   Add `disposeCachedDocs` to `ClientOptions`
    -   Add `disposeCachedCalendarEvents` to `ClientOptions`
    -   Add `cacheMessageReactions` to `ClientOptions`
    -   Add `maxMessageReactionCache` to `ClientOptions`
    -   Add `disposeCachedMessageReactions` to `ClientOptions`
    -   Add `disposeCollectedMessageReactions` to `ClientOptions`
    -   Add `createChannel` method to `Group`
    -   Add `ClientUser`

    # Fixes

    -   Fix fetching a single webhook never checking the cache for a previously cached webhook.

### Patch Changes

-   Updated dependencies
-   Updated dependencies
-   Updated dependencies
    -   @guildedts/rest@0.7.1
    -   guilded-api-typings@0.5.0
    -   @guildedts/ws@0.3.0
    -   @guildedts/builders@0.2.2

## 0.9.0

### Minor Changes

-   # Features

    -   Add `CalendarEventManager`
    -   Add `CalendarChannel`
    -   Add `CalendarEvent`
    -   Add `calendarEventCreate` to `ClientEvents`
    -   Add `calendarEventEdit` to `ClientEvents`
    -   Add `calendarEventDelete` to `ClientEvents`
    -   Add `cacheCalendarEvents` to `ClientOptions`
    -   Add `maxCalendarEventCache` to `ClientOptions`
    -   Add export for `createChannel`
    -   Add export for `handleWSEvent`

### Patch Changes

-   Updated dependencies
-   Updated dependencies
-   Updated dependencies
    -   guilded-api-typings@0.4.0
    -   @guildedts/builders@0.2.2
    -   @guildedts/rest@0.7.0
    -   @guildedts/ws@0.2.1

## 0.8.0

### Minor Changes

-   # Features

    -   Add `cache` param to all structures that represent a data model
    -   Add `fetchCreator` method to `Channel`
    -   Add `fetchServer` method to `Channel`
    -   Add `fetchParent` method to `Channel`
    -   Add `fetchGroup` method to `Channel`
    -   Add `fetchArchiver` method to `Channel`
    -   Add `fetchServer` method to `ListItem`
    -   Add `fetchAuthor` method to `ListItem`
    -   Add `fetchWebhook` method to `ListItem`
    -   Add `fetchEditor` method to `ListItem`
    -   Add `fetchParent` method to `ListItem`
    -   Add `fetchCompleter` method to `ListItem`
    -   Add `fetchAuthor` method to `Note`
    -   Add `fetchEditor` method to `Note`
    -   Add `fetchOwner` method to `Server`
    -   Add `fetchDefaultChannel` to `Server`
    -   Remove `member` from `ServerBan`
    -   Add `fetchAuthor` method to `ServerBan`
    -   Change `cacheForumThreads` to `cacheTopics` in `ClientOptions`
    -   Change `maxForumThreadCache` to `maxTopicCache` in `ClientOptions`
    -   Add `fetchServer` method to `Doc`
    -   Add `fetchAuthor` method to `Doc`
    -   Add `fetchEditor` method to `Doc`
    -   Add `fetch` method to `Group`
    -   Add `fetchServer` method to `Message`
    -   Add `fetchGroup` method to `Message`
    -   Add `fetchAuthor` method to `Message`
    -   Add `fetchWebhook` method to `Message`
    -   Add `fetchReplies` method to `Message`
    -   Add `fetchServer` method to `Topic`
    -   Add `fetchAuthor` method to `Topic`
    -   Add `fetchWebhook` method to `Topic`
    -   Add `fetch` method to `Webhook`
    -   Add `fetchServer` method to `Webhook`
    -   Add `fetchAuthor` method to `Webhook`
    -   Add `cache` param to `createChannel`

### Patch Changes

-   Updated dependencies
-   Updated dependencies
    -   guilded-api-typings@0.3.1
    -   @guildedts/rest@0.6.1
    -   @guildedts/builders@0.2.1
    -   @guildedts/ws@0.2.1

## 0.7.0

### Minor Changes

-   1ead695: # Features

    -   Add `MessagePayloadResolvable`
    -   Add `MessageEditPayloadResolvable`
    -   Add `(Embed | APIEmbed)[]` to message payloads
    -   Change type of `payload` in `<ChatChannel>.send` to `MessagePayloadResolvable`
    -   Change type of `payload` in `<Message>.edit` to `MessageEditPayloadResolvable`
    -   Change type of `payload` in `<Message>.reply` to `MessagePayloadResolvable`
    -   Change `awardXP` to `awardXp` in `ServerMemberManager`
    -   Add `awardXp` to `ServerRoleManager`
    -   Add `remove` to `ReactionManager`
    -   Change `ForumThreadManager` to `TopicManager`
    -   Add `creator` to `Channel`
    -   Add `group` to `Channel`
    -   Add `archiver` to `Channel`
    -   Change `threads` to `topics` in `ForumChannel`
    -   Change `parentListItemId` to `parentId` in `ListItem`
    -   Change type of `author` from `User | undefined` to `ServerMember | undefined` in `ListItem`
    -   Change type of `editor` from `User | undefined` to `ServerMember | undefined` in `ListItem`
    -   Change `parentListItem` to `parent` in `ListItem`
    -   Change type of `completer` from `User | undefined` to `ServerMember | undefined` in `ListItem`
    -   Add `mentions` to `Note`
    -   Change type of `author` from `User | undefined` to `ServerMember | undefined` in `Note`
    -   Change type of `editor` from `User | undefined` to `ServerMember | undefined` in `Note`
    -   Add `ownerId` to `Server`
    -   Add `type` to `Server`
    -   Add `name` to `Server`
    -   Add `url` to `Server`
    -   Add `about` to `Server`
    -   Add `avatar` to `Server`
    -   Add `banner` to `Server`
    -   Add `timezone` to `Server`
    -   Add `isVerified` to `Server`
    -   Add `defaultChannelId` to `Server`
    -   Add `createdAt` to `Server`
    -   Add `owner` to `Server`
    -   Add `isTeam` to `Server`
    -   Add `isOrganization` to `Server`
    -   Add `isCommunity` to `Server`
    -   Add `isClan` to `Server`
    -   Add `isGuild` to `Server`
    -   Add `isFriends` to `Server`
    -   Add `isStreaming` to `Server`
    -   Add `isOther` to `Server`
    -   Add `defaultChannel` to `Server`
    -   Add `member` to `ServerBan`
    -   Add `isOwner` to `ServerMember`
    -   Change `awardXP` to `awardXp` in `ServerMember`
    -   Change `awardXP` to `awardXp` to `ServerRole`
    -   Change type of `author` from `User | undefined` to `ServerMember | undefined` in `Message`
    -   Change `ForumThread` to `Topic`
    -   Add `channelId` param to `edit` in `Webhook`

    # Fixes

    -   Fix consistency in docs

### Patch Changes

-   Updated dependencies [727d276]
-   Updated dependencies [727d276]
-   Updated dependencies [1ead695]
-   Updated dependencies [727d276]
    -   @guildedts/builders@0.2.1
    -   guilded-api-typings@0.3.0
    -   @guildedts/rest@0.6.0
    -   @guildedts/ws@0.2.1

## 0.6.1

### Patch Changes

-   # Features

    -   Add exports for `Collector` and `MessageCollector`

    # Fixes

    -   Update outdated declaration files

## 0.6.0

### Minor Changes

-   # Features

    -   Add `Collector` and `MessageCollector`
    -   Add `api` to `Client`
    -   Cache the client user when client is ready
    -   Add `mentions` to `Doc` and `ListItem`
    -   Add `mentions` and `isSilent` to `Message`
    -   Add `createMessageCollector` method to `ChatChannel`
    -   Change `content` to `message` in `ListItem`

### Patch Changes

-   Updated dependencies
-   Updated dependencies
    -   guilded-api-typings@0.2.1
    -   @guildedts/rest@0.5.0
    -   @guildedts/builders@0.2.0
    -   @guildedts/ws@0.2.0

## 0.5.0

### Minor Changes

-   # Features

    -   Remove `caching` from `BaseManager`
    -   Remove `toggleCache` method from `BaseManager`
    -   Remove `ManagerOptions`
    -   Remove `cache` parameter of methods named `create`, `send`, `edit` and more
    -   Remove return of a deleted item when deleting it in its manager
    -   Change `MessageReactionManager` to `ReactionManager`
    -   Remove `cache` parameters in `fetch` method in `UserManager`
    -   Remove methods from `ChannelManager`
        -   `createAnnouncement`
        -   `createChat`
        -   `createCalendar`
        -   `createForum`
        -   `createMedia`
        -   `createDoc`
        -   `createVoice`
        -   `createList`
        -   `createSchedule`
        -   `createStream`
    -   Add `edit` method to `ChannelManager`
    -   Change `ready` to `isReady` in `Client`
    -   Change `logout` method to `disconnect` in `Client`
    -   Change type of `message` in the `messageDelete` event from `Message` to `Message | APIMessageSummary`
    -   Change `serverRolesEdit` to `rolesEdit` in `ClientEvents`
    -   Add `raw` property to all data model structures
    -   Change `cached` to `isCached` in all data model structures
    -   Change `private` to `isPrivate` in `Message`
    -   Change `default` to `isDefault` in `Message`
    -   Change `system` to `isSystem` in `Message`
    -   Change `deleted` to `isDeleted` in `Message`
    -   Add return for a deleted item when deleting it in its structure
    -   Change `private` and `silent` to `isPrivate` and `isSilent` in `MessagePayload` and `MessageEditPayload`
    -   Change `bot` and `human` to `isBot` and `isHuman` in `User`
    -   Remove `cache` method in `User`
    -   Change properties in `Channel`
        -   `archived` to `isArchived`
        -   `announcement` to `isAnnouncement`
        -   `chat` to `isChat`
        -   `chatBased` to `isChatBased`
        -   `calendar` to `isCalendar`
        -   `forum` to `isForum`
        -   `media` to `isMedia`
        -   `doc` to `isDoc`
        -   `voice` to `isVoice`
        -   `list` to `isList`
        -   `schedule` to `isSchedule`
        -   `stream` to `isStream`
    -   Add `edit`, `setName`, `setTopic` and `setPublic` methods to `Channel`
    -   Remove methods from `Server`
        -   `createAnnouncementChannel`
        -   `createChatChannel`
        -   `createCalanderChannel`
        -   `createForumChannel`
        -   `createMediaChannel`
        -   `createDocChannel`
        -   `createVoiceChannel`
        -   `createListChannel`
        -   `createScheduleChannel`
        -   `createStreamChannel`
    -   Create new WS event handler

### Patch Changes

-   Updated dependencies
-   Updated dependencies
-   Updated dependencies
-   Updated dependencies
    -   guilded-api-typings@0.2.0
    -   @guildedts/rest@0.4.0
    -   @guildedts/builders@0.2.0
    -   @guildedts/ws@0.2.0

## 0.4.0

### Minor Changes

-   # Features

    -   Add `avatar` and `banner` properties to the `User` structure

### Patch Changes

-   Updated dependencies
    -   guilded-api-typings@0.1.2
    -   @guildedts/builders@0.1.1
    -   @guildedts/ws@0.1.0

## 0.3.0

### Minor Changes

-   # Features

    -   Add new managers
        -   `ChannelWebhookManager`
        -   `GroupManager`
        -   `GroupMemberManager`
        -   `MessageReactionManager`
        -   `ServerMemberRoleManager`
        -   `ServerRoleManager`
        -   `DocManager`
        -   `ForumThreadManager`
        -   `ListItemManager`
    -   Add new structures
        -   `ChatChannel`
        -   `DocChannel`
        -   `ForumChannel`
        -   `ListChannel`
        -   `StreamChannel`
        -   `VoiceChannel`
        -   `ListItem`
        -   `Note`
        -   `ServerMemberRole`
        -   `ServerRole`
        -   `Doc`
        -   `ForumThread`
        -   `Group`
        -   `Webhook`
    -   Update `Channel` to support official channel fetching
    -   Update `ChannelManager` to support official channel fetching
    -   Add `embeds` property to `Message`
    -   Remove `is` prefix to properies like `isPrivate`
    -   Add `cached` getter to all structures with a manager
    -   Add `default` and `system` getters to `Message`
    -   Add `group` getter to all structures that include `grooupId`
    -   Add `deleted` getter to all structures that include `deletedAt`
    -   Add `webhook` getter to all structures that include `createdByWebhookId`
    -   Add `editable` getter to all structures that can be edited
    -   Moved WS event handling to its own dedicated file
    -   Change `memberRemove` event to return a `Server` instead of a `User`
    -   Change `serverRolesEdit` event to return a `Server` instead of `CacheCollection<string, ServerMember>`
    -   Add new `Client` events
        -   `channelCreate`
        -   `channelEdit`
        -   `channelDelete`
        -   `webhookCreate`
        -   `webhookEdit`
        -   `docCreate`
        -   `docEdit`
        -   `docDelete`
        -   `listItemCreate`
        -   `listItemEdit`
        -   `listItemDelete`
        -   `listItemComplete`
        -   `listItemUncomplete`
    -   Add new `Client` options
        -   `cacheForumThreads`
        -   `maxForumThreadCache`
        -   `cacheListItems`
        -   `maxListItemCache`
        -   `cacheDocs`
        -   `maxDocCache`
        -   `cacheGroups`
        -   `maxGroupCache`
        -   `cacheServerRoles`
        -   `maxServerRoleCache`
        -   `cacheServerMemberRoles`
        -   `maxServerMemberRoleCache`
        -   `cacheWebhooks`
        -   `maxWebhookCache`

### Patch Changes

-   Updated dependencies
-   Updated dependencies
-   Updated dependencies
    -   @guildedts/rest@0.3.0
    -   @guildedts/builders@0.1.1
    -   guilded-api-typings@0.1.1
    -   @guildedts/ws@0.1.0

## 0.2.0

### Minor Changes

-   Added retrying in REST API requests.

### Patch Changes

-   Updated dependencies
    -   @guildedts/rest@0.2.0

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

### Patch Changes

-   Updated dependencies
    -   @guildedts/builders@0.1.0
    -   guilded-api-typings@0.1.0
    -   @guildedts/rest@0.1.0
    -   @guildedts/ws@0.1.0

## 0.0.2

### Patch Changes

-   All issues with dependencies should now be fixed.
-   Updated dependencies
    -   @guildedts/rest@0.0.2
    -   @guildedts/ws@0.0.2

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

-   Updated dependencies
    -   @guildedts/rest@0.0.1
    -   @guildedts/ws@0.0.1
