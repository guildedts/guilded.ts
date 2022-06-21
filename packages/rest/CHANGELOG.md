# @guildedts/rest

## 0.6.1

### Patch Changes

-   # Features

    -   Add `meta` to `GuildedAPIError`

-   Updated dependencies
    -   guilded-api-typings@0.3.1

## 0.6.0

### Minor Changes

-   1ead695: # Features

    -   Change type of `payload` in `<MessageRouter>.create` to `APIMessagePayloadResolvable`
    -   Change type of `payload` in `<MessageRouter>.edit` to `APIMessageEditPayloadResolvable`
    -   Add `ServerRouter`
    -   Change `forumThreads` to `topics` in `Router`
    -   Add `servers` to `Router`
    -   Change `ForumThreadRouter` to `TopicRouter`
    -   Change `awardXP` to `awardXp` in `ServerMemberRouter`
    -   Change `awardXP` to `awardXp` in `ServerRoleRouter`

    # Fixes

    -   Fix consistency in docs

### Patch Changes

-   Updated dependencies [727d276]
    -   guilded-api-typings@0.3.0

## 0.5.0

### Minor Changes

-   # Features

    -   Add `router` to `RESTManager`
    -   Add routers
        -   `BaseRouter`
        -   `ChannelRouter`
        -   `DocRouter`
        -   `ForumThreadRouter`
        -   `GroupRouter`
        -   `ListItemRouter`
        -   `MessageRouter`
        -   `ReactionRouter`
        -   `Router`
        -   `WebhookRouter`
        -   `ServerBanRouter`
        -   `ServerMemberRouter`
        -   `ServerRoleRouter`

### Patch Changes

-   Updated dependencies
    -   guilded-api-typings@0.2.1

## 0.4.0

### Minor Changes

-   # Features

    -   Change `GuildedAPIError` `name` layout
    -   Change `RestManager` to `RESTManager`
    -   Change `baseUrl` to `baseURL` in `RESTManager`
    -   Add `patch` method to `RESTManager`
    -   Change `RestManagerOptions` to `RESTOptions`
    -   Add `token` to `RESTOptions`

## 0.3.0

### Minor Changes

-   # Features

    -   Added support for the `Retry-After` header.

## 0.2.0

### Minor Changes

-   Added retrying in REST API requests.

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
