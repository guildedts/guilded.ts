# guilded.ts

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
