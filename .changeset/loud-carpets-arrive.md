---
'guilded.ts': minor
---

# Features

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
