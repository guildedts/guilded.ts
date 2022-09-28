# @guildedts/rest

## 0.14.0

### Minor Changes

-   0423e02: feat: forum topic lock and unlock

### Patch Changes

-   Updated dependencies [34c82fd]
-   Updated dependencies [0423e02]
    -   guilded-api-typings@0.12.1

## 0.13.0

### Minor Changes

-   88420fe: feat: webhook `username` and `avatar_url` support
-   cbcedfb: feat(RESTOptions): add `proxyUrl`

### Patch Changes

-   Updated dependencies [88420fe]
    -   guilded-api-typings@0.12.0

## 0.12.0

### Minor Changes

-   2d36b59: feat: forum topic pinning

### Patch Changes

-   Updated dependencies [2d36b59]
    -   guilded-api-typings@0.11.0

## 0.11.0

### Minor Changes

-   bb54674: feat: set server member XP

### Patch Changes

-   Updated dependencies [bb54674]
-   Updated dependencies [13a6533]
    -   guilded-api-typings@0.10.0

## 0.10.2

### Patch Changes

-   4d06b33: feat(types): use enums instead of unions types

    This removes all `*String` types and just uses the enum itself

    This also removes the `API` prefix for enums. `APIChannelType` becomes `ChannelType`

-   Updated dependencies [9cac330]
-   Updated dependencies [4d06b33]
    -   guilded-api-typings@0.9.0

## 0.10.5

### Patch Changes

-   a8aeeca: fix: fix doc generation
-   Updated dependencies [a8aeeca]
    -   guilded-api-typings@0.8.5

## 0.10.4

### Patch Changes

-   8575cf6: feat: new publish method
-   Updated dependencies [8575cf6]
    -   guilded-api-typings@0.8.4

## 0.10.3

### Patch Changes

-   f88c395: attempt 2 of using changeset publish
-   Updated dependencies [f88c395]
    -   guilded-api-typings@0.8.3

## 0.10.2

### Patch Changes

-   79e4290: attempt to use changeset publish
-   Updated dependencies [79e4290]
    -   guilded-api-typings@0.8.2

## 0.10.1

### Patch Changes

-   49dc7d8: fix: fix publish
-   Updated dependencies [49dc7d8]
    -   guilded-api-typings@0.8.1

## 0.10.0

### Minor Changes

-   4fd7f3f: feat: full forum topic support

### Patch Changes

-   a402608: refactor: switch from Yarn to PNPM
-   4fd7f3f: feat: improve consistancy in naming

    **example:** `FetchDocsOptions` is now `DocFetchManyOptions`

-   Updated dependencies [a402608]
-   Updated dependencies [4fd7f3f]
-   Updated dependencies [4fd7f3f]
    -   guilded-api-typings@0.8.0

## 0.9.0

### Minor Changes

-   6b230b2: feat: calendar event RSVPs

### Patch Changes

-   Updated dependencies [6b230b2]
    -   guilded-api-typings@0.7.0

## 0.8.1

### Patch Changes

-   677c5a2: docs: add examples
-   Updated dependencies [677c5a2]
-   Updated dependencies [677c5a2]
    -   guilded-api-typings@0.6.0

## 0.8.0

### Minor Changes

-   # Features

    -   Add `User-Agent` to headers when making requests
    -   Add `RESTManagerEvents`

    # Fixes

    -   Handle the `Retry-After` header as seconds, not millieseconds

### Patch Changes

-   Updated dependencies
    -   guilded-api-typings@0.5.4

## 0.7.4

### Patch Changes

-   # Features

    -   Change README banner to have a png instead of a jpg

-   Updated dependencies
    -   guilded-api-typings@0.5.3

## 0.7.3

### Patch Changes

-   # Fixes

    -   Change README banner to have a background

-   Updated dependencies
    -   guilded-api-typings@0.5.2

## 0.7.2

### Patch Changes

-   # Branding

    -   Rebrand logo and banner

-   Updated dependencies
    -   guilded-api-typings@0.5.1

## 0.7.1

### Patch Changes

-   # Fixes

    -   Fix error when receiving no data in `RESTManager.fetch`

-   Updated dependencies
    -   guilded-api-typings@0.5.0

## 0.7.0

### Minor Changes

-   # Features

    -   Add `CalendarEventRouter`
    -   Add `calendarEvents` to `Router`

### Patch Changes

-   Updated dependencies
    -   guilded-api-typings@0.4.0

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
