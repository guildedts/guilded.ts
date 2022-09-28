# @guildedts/builders

## 0.2.9

### Patch Changes

-   34c82fd: feat: generic typings

## 0.2.12

### Patch Changes

-   a8aeeca: fix: fix doc generation

## 0.2.11

### Patch Changes

-   8575cf6: feat: new publish method

## 0.2.10

### Patch Changes

-   f88c395: attempt 2 of using changeset publish

## 0.2.9

### Patch Changes

-   79e4290: attempt to use changeset publish

## 0.2.8

### Patch Changes

-   49dc7d8: fix: fix publish

## 0.2.7

### Patch Changes

-   a402608: refactor: switch from Yarn to PNPM

## 0.2.6

### Patch Changes

-   677c5a2: docs: add examples

## 0.2.5

### Patch Changes

-   # Features

    -   Change README banner to have a png instead of a jpg

## 0.2.4

### Patch Changes

-   # Fixes

    -   Change README banner to have a background

## 0.2.3

### Patch Changes

-   # Branding

    -   Rebrand logo and banner

## 0.2.2

### Patch Changes

-   # Features

    -   Change `COLORS` to `Colors`
    -   Add `DEFAULT` to `Colors`
    -   Add `GILDED` to `Colors`

## 0.2.1

### Patch Changes

-   727d276: # Features

    -   Add `newLine` param to `divider`

    # Fixes

    -   Fix consistency in docs

## 0.2.0

### Minor Changes

-   # Features

    -   Update `Embed` builder
        -   Change `timestamp` from type `string` to `Date`
        -   Change parameters for `setFooter` method
        -   Add `number` to parameter of `setTimestamp` method
        -   Change parameters for `addField` method
    -   Add `userMention` function
    -   Add `RANDOM` option to the color resolver

## 0.1.1

### Patch Changes

-   # Fixes

    -   Fixed typo in `util.ts` ([#4](https://github.com/guildedts/guilded.ts/pull/4))

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
