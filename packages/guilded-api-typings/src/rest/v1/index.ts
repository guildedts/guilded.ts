export * from '../common';
export * from './calendarEvents';
export * from './channels';
export * from './chat';
export * from './docs';
export * from './forums';
export * from './groups';
export * from './listItems';
export * from './servers';
export * from './webhooks';

/**
 * The version of the API
 */
export const APIVersion = 1;

/**
 * https://www.guilded.gg/docs
 */
export const Routes = {
	/**
	 * Allowed Methods:
	 * - {@link https://www.guilded.gg/docs/api/channels/ChannelCreate POST}
	 */
	channels: '/channels' as const,

	/**
	 * Allowed Methods:
	 * - {@link https://www.guilded.gg/docs/api/channels/ChannelRead GET}
	 * - {@link https://www.guilded.gg/docs/api/channels/ChannelUpdate PATCH}
	 * - {@link https://www.guilded.gg/docs/api/channels/ChannelDelete DELETE}
	 *
	 * @param channelId The ID of the channel
	 */
	channel<CID extends string>(channelId: CID) {
		return `/channels/${channelId}` as const;
	},

	/**
	 * Allowed Methods:
	 * - {@link https://www.guilded.gg/docs/api/servers/ServerRead GET}
	 *
	 * @param serverId The ID of the server
	 */
	server<SID extends string>(serverId: SID) {
		return `/servers/${serverId}` as const;
	},

	/**
	 * Allowed Methods:
	 * - {@link https://www.guilded.gg/docs/api/members/MemberNicknameUpdate PUT}
	 * - {@link https://www.guilded.gg/docs/api/members/MemberNicknameDelete DELETE}
	 *
	 * @param serverId The ID of the server
	 * @param userId The ID of the user
	 */
	serverMemberNickname<SID extends string, UID extends string>(serverId: SID, userId: UID) {
		return `/servers/${serverId}/members/${userId}/nickname` as const;
	},

	/**
	 * Allowed Methods:
	 * - {@link https://www.guilded.gg/docs/api/members/ServerMemberRead GET}
	 * - {@link https://www.guilded.gg/docs/api/members/ServerMemberDelete DELETE}
	 *
	 * @param serverId The ID of the server
	 * @param userId The ID of the user
	 */
	serverMember<SID extends string, UID extends string>(serverId: SID, userId: UID) {
		return `/servers/${serverId}/members/${userId}` as const;
	},

	/**
	 * Allowed Methods:
	 * - {@link https://www.guilded.gg/docs/api/members/ServerMemberReadMany GET}
	 *
	 * @param serverId The ID of the server
	 */
	serverMembers<SID extends string>(serverId: SID) {
		return `/servers/${serverId}/members` as const;
	},

	/**
	 * Allowed Methods:
	 * - {@link https://www.guilded.gg/docs/api/member-bans/ServerMemberBanCreate POST}
	 * - {@link https://www.guilded.gg/docs/api/member-bans/ServerMemberBanRead GET}
	 * - {@link https://www.guilded.gg/docs/api/member-bans/ServerMemberBanDelete DELETE}
	 *
	 * @param serverId The ID of the server
	 * @param userId The ID of the user
	 */
	serverBan<SID extends string, UID extends string>(serverId: SID, userId: UID) {
		return `/servers/${serverId}/bans/${userId}` as const;
	},

	/**
	 * Allowed Methods:
	 * - {@link https://www.guilded.gg/docs/api/member-bans/ServerMemberBanReadMany GET}
	 *
	 * @param serverId The ID of the server
	 */
	serverBans<SID extends string>(serverId: SID) {
		return `/servers/${serverId}/bans` as const;
	},

	/**
	 * Allowed Methods:
	 * - {@link https://www.guilded.gg/docs/api/server-xp/ServerXpForUserCreate POST}
	 * - {@link https://www.guilded.gg/docs/api/server-xp/ServerXpForUserUpdate PUT}
	 *
	 * @param serverId The ID of the server
	 * @param userId The ID of the user
	 */
	serverMemberXp<SID extends string, UID extends string>(serverId: SID, userId: UID) {
		return `/servers/${serverId}/members/${userId}/xp` as const;
	},

	/**
	 * Allowed Methods:
	 * - {@link https://www.guilded.gg/docs/api/socialLinks/MemberSocialLinkRead GET}
	 *
	 * @param serverId The ID of the server
	 * @param userId The ID of the user
	 * @param type The type of social link
	 */
	serverMemberSocialLink<SID extends string, UID extends string, T extends string>(
		serverId: SID,
		userId: UID,
		type: T,
	) {
		return `/servers/${serverId}/members/${userId}/social-links/${type}` as const;
	},

	/**
	 * Allowed Methods:
	 * - {@link https://www.guilded.gg/docs/api/server-xp/ServerXpForRoleCreate POST}
	 *
	 * @param serverId The ID of the server
	 * @param roleId The ID of the role
	 */
	serverRoleXp<SID extends string, RID extends number>(serverId: SID, roleId: RID) {
		return `/servers/${serverId}/roles/${roleId}/xp` as const;
	},

	/**
	 * Allowed Methods:
	 * - {@link https://www.guilded.gg/docs/api/roleMembership/RoleMembershipCreate PUT}
	 * - {@link https://www.guilded.gg/docs/api/roleMembership/RoleMembershipDelete DELETE}
	 *
	 * @param serverId The ID of the server
	 * @param userId The ID of the user
	 * @param roleId The ID of the role
	 */
	serverMemberRole<SID extends string, UID extends string, RID extends number>(
		serverId: SID,
		userId: UID,
		roleId: RID,
	) {
		return `/servers/${serverId}/members/${userId}/roles/${roleId}` as const;
	},

	/**
	 * Allowed Methods:
	 * - {@link https://www.guilded.gg/docs/api/roleMembership/RoleMembershipReadMany GET}
	 *
	 * @param serverId The ID of the server
	 * @param userId The ID of the user
	 */
	serverMemberRoles<SID extends string, UID extends string>(serverId: SID, userId: UID) {
		return `/servers/${serverId}/members/${userId}/roles` as const;
	},

	/**
	 * Allowed Methods:
	 * - {@link https://www.guilded.gg/docs/api/chat/ChannelMessageCreate POST}
	 * - {@link https://www.guilded.gg/docs/api/chat/ChannelMessageReadMany GET}
	 *
	 * @param channelId The ID of the channel
	 */
	messages<CID extends string>(channelId: CID) {
		return `/channels/${channelId}/messages` as const;
	},

	/**
	 * Allowed Methods:
	 * - {@link https://www.guilded.gg/docs/api/chat/ChannelMessageRead GET}
	 * - {@link https://www.guilded.gg/docs/api/chat/ChannelMessageUpdate PUT}
	 * - {@link https://www.guilded.gg/docs/api/chat/ChannelMessageDelete DELETE}
	 *
	 * @param channelId The ID of the channel
	 * @param messageId The ID of the message
	 */
	message<CID extends string, MID extends string>(channelId: CID, messageId: MID) {
		return `/channels/${channelId}/messages/${messageId}` as const;
	},

	/**
	 * Allowed Methods:
	 * - {@link https://www.guilded.gg/docs/api/reactions/ContentReactionCreate PUT}
	 * - {@link https://www.guilded.gg/docs/api/reactions/ContentReactionDelete DELETE}
	 *
	 * @param channelId The ID of the channel
	 * @param messageId The ID of the message
	 * @param emoteId The ID of the emote
	 */
	messageReaction<CID extends string, MID extends string, EID extends number>(
		channelId: CID,
		messageId: MID,
		emoteId: EID,
	) {
		return `/channels/${channelId}/content/${messageId}/emotes/${emoteId}`;
	},

	/**
	 * Allowed Methods:
	 * - {@link https://www.guilded.gg/docs/api/forums/ForumTopicCreate POST}
	 * - {@link https://www.guilded.gg/docs/api/forums/ForumTopicReadMany GET}
	 *
	 * @param channelId The ID of the channel
	 */
	forumTopics<CID extends string>(channelId: CID) {
		return `/channels/${channelId}/topics` as const;
	},

	/**
	 * Allowed Methods:
	 * - {@link https://www.guilded.gg/docs/api/forums/ForumTopicRead GET}
	 * - {@link https://www.guilded.gg/docs/api/forums/ForumTopicUpdate PATCH}
	 * - {@link https://www.guilded.gg/docs/api/forums/ForumTopicDelete DELETE}
	 *
	 * @param channelId The ID of the channel
	 * @param forumTopicId The ID of the forum topic
	 */
	forumTopic<CID extends string, FTID extends number>(channelId: CID, forumTopicId: FTID) {
		return `/channels/${channelId}/topics/${forumTopicId}` as const;
	},

	/**
	 * Allowed Methods:
	 * - {@link https://www.guilded.gg/docs/api/forums/ForumTopicPin PUT}
	 * - {@link https://www.guilded.gg/docs/api/forums/ForumTopicUnpin DELETE}
	 *
	 * @param channelId The ID of the channel
	 * @param forumTopicId The ID of the forum topic
	 */
	forumTopicPin<CID extends string, FTID extends number>(channelId: CID, forumTopicId: FTID) {
		return `/channels/${channelId}/topics/${forumTopicId}/pin` as const;
	},

	/**
	 * Allowed Methods:
	 * - {@link https://www.guilded.gg/docs/api/forums/ForumTopicReactionCreate PUT}
	 * - {@link https://www.guilded.gg/docs/api/forums/ForumTopicReactionDelete DELETE}
	 *
	 * @param channelId The ID of the channel
	 * @param forumTopicId The ID of the forum topic
	 * @param emoteId The ID of the emote
	 */
	forumTopicReaction<CID extends string, FTID extends number, EID extends number>(
		channelId: CID,
		forumTopicId: FTID,
		emoteId: EID,
	) {
		return `/channels/${channelId}/topics/${forumTopicId}/emotes/${emoteId}` as const;
	},

	/**
	 * Allowed Methods:
	 * - {@link https://www.guilded.gg/docs/api/forums/ForumTopicLock PUT}
	 * - {@link https://www.guilded.gg/docs/api/forums/ForumTopicUnlock DELETE}
	 *
	 * @param channelId The ID of the channel
	 * @param forumTopicId The ID of the forum topic
	 */
	forumTopicLock<CID extends string, FTID extends number>(channelId: CID, forumTopicId: FTID) {
		return `/channels/${channelId}/topics/${forumTopicId}/lock` as const;
	},

	/**
	 * Allowed Methods:
	 * - {@link https://www.guilded.gg/docs/api/forumComments/ForumTopicCommentCreate POST}
	 * - {@link https://www.guilded.gg/docs/api/forumComments/ForumTopicCommentReadMany GET}
	 *
	 * @param channelId The ID of the channel
	 * @param forumTopicId The ID of the forum topic
	 */
	forumTopicComments<CID extends string, FTID extends number>(
		channelId: CID,
		forumTopicId: FTID,
	) {
		return `/channels/${channelId}/topics/${forumTopicId}/comments` as const;
	},

	/**
	 * Allowed Methods:
	 * - {@link https://www.guilded.gg/docs/api/forumComments/ForumTopicCommentRead GET}
	 * - {@link https://www.guilded.gg/docs/api/forumComments/ForumTopicCommentUpdate PATCH}
	 * - {@link https://www.guilded.gg/docs/api/forumComments/ForumTopicCommentDelete DELETE}
	 *
	 * @param channelId The ID of the channel
	 * @param forumTopicId The ID of the forum topic
	 * @param forumTopicCommentId The ID of the forum topic comment
	 */
	forumTopicComment<CID extends string, FTID extends number, FTCID extends number>(
		channelId: CID,
		forumTopicId: FTID,
		forumTopicCommentId: FTCID,
	) {
		return `/channels/${channelId}/topics/${forumTopicId}/comments/${forumTopicCommentId}` as const;
	},

	/**
	 * Allowed Methods:
	 * - {@link https://www.guilded.gg/docs/api/reactions/ForumTopicCommentReactionCreate PUT}
	 * - {@link https://www.guilded.gg/docs/api/reactions/ForumTopicCommentReactionDelete DELETE}
	 *
	 * @param channelId The ID of the channel
	 * @param forumTopicId The ID of the forum topic
	 * @param forumTopicCommentId The ID of the forum topic comment
	 * @param emoteId The ID of the emote
	 */
	forumTopicCommentReaction<
		CID extends string,
		FTID extends number,
		FTCID extends number,
		EID extends number,
	>(channelId: CID, forumTopicId: FTID, forumTopicCommentId: FTCID, emoteId: EID) {
		return `/channels/${channelId}/topics/${forumTopicId}/comments/${forumTopicCommentId}/emotes/${emoteId}`;
	},

	/**
	 * Allowed Methods:
	 * - {@link https://www.guilded.gg/docs/api/listItems/ListItemCreate POST}
	 * - {@link https://www.guilded.gg/docs/api/listItems/ListItemReadMany GET}
	 *
	 * @param channelId The ID of the channel
	 */
	listItems<CID extends string>(channelId: CID) {
		return `/channels/${channelId}/items` as const;
	},

	/**
	 * Allowed Methods:
	 * - {@link https://www.guilded.gg/docs/api/listItems/ListItemRead GET}
	 * - {@link https://www.guilded.gg/docs/api/listItems/ListItemUpdate PUT}
	 * - {@link https://www.guilded.gg/docs/api/listItems/ListItemDelete DELETE}
	 *
	 * @param channelId The ID of the channel
	 * @param listItemId The ID of the list item
	 */
	listItem<CID extends string, LIID extends string>(channelId: CID, listItemId: LIID) {
		return `/channels/${channelId}/items/${listItemId}` as const;
	},

	/**
	 * Allowed Methods:
	 * - {@link https://www.guilded.gg/docs/api/listItems/ListItemCompleteCreate POST}
	 * - {@link https://www.guilded.gg/docs/api/listItems/ListItemCompleteDelete DELETE}
	 *
	 * @param channelId The ID of the channel
	 * @param listItemId The ID of the list item
	 */
	listItemComplete<CID extends string, LIID extends string>(channelId: CID, listItemId: LIID) {
		return `/channels/${channelId}/items/${listItemId}/complete` as const;
	},

	/**
	 * Allowed Methods:
	 * - {@link https://www.guilded.gg/docs/api/docs/DocCreate POST}
	 * - {@link https://www.guilded.gg/docs/api/docs/DocReadMany GET}
	 *
	 * @param channelId The ID of the channel
	 */
	docs<CID extends string>(channelId: CID) {
		return `/channels/${channelId}/docs` as const;
	},

	/**
	 * Allowed Methods:
	 * - {@link https://www.guilded.gg/docs/api/docs/DocRead GET}
	 * - {@link https://www.guilded.gg/docs/api/docs/DocUpdate PUT}
	 * - {@link https://www.guilded.gg/docs/api/docs/DocDelete DELETE}
	 *
	 * @param channelId The ID of the channel
	 * @param docId The ID of the doc
	 */
	doc<CID extends string, DID extends number>(channelId: CID, docId: DID) {
		return `/channels/${channelId}/docs/${docId}` as const;
	},

	/**
	 * Allowed Methods:
	 * - {@link https://www.guilded.gg/docs/api/calendarEvents/CalendarEventCreate POST}
	 * - {@link https://www.guilded.gg/docs/api/calendarEvents/CalendarEventReadMany GET}
	 *
	 * @param channelId The ID of the channel
	 */
	calendarEvents<CID extends string>(channelId: CID) {
		return `/channels/${channelId}/events` as const;
	},

	/**
	 * Allowed Methods:
	 * - {@link https://www.guilded.gg/docs/api/calendarEvents/CalendarEventRead GET}
	 * - {@link https://www.guilded.gg/docs/api/calendarEvents/CalendarEventUpdate PATCH}
	 * - {@link https://www.guilded.gg/docs/api/calendarEvents/CalendarEventDelete DELETE}
	 *
	 * @param channelId The ID of the channel
	 * @param calendarEventId The ID of the calendar event
	 */
	calendarEvent<CID extends string, CEID extends number>(channelId: CID, calendarEventId: CEID) {
		return `/channels/${channelId}/events/${calendarEventId}` as const;
	},

	/**
	 * Allowed Methods:
	 * - {@link https://www.guilded.gg/docs/api/calendarEvents/CalendarEventRsvpRead GET}
	 * - {@link https://www.guilded.gg/docs/api/calendarEvents/CalendarEventRsvpUpdate PUT}
	 * - {@link https://www.guilded.gg/docs/api/calendarEvents/CalendarEventRsvpDelete DELETE}
	 *
	 * @param channelId The ID of the channel
	 * @param calendarEventId The ID of the calendar event
	 * @param userId The ID of the user
	 */
	calendarEventRsvp<CID extends string, CEID extends number, UID extends string>(
		channelId: CID,
		calendarEventId: CEID,
		userId: UID,
	) {
		return `/channels/${channelId}/events/${calendarEventId}/rsvps/${userId}` as const;
	},

	/**
	 * Allowed Methods:
	 * - {@link https://www.guilded.gg/docs/api/calendarEvents/CalendarEventRsvpReadMany GET}
	 *
	 * @param channelId The ID of the channel
	 * @param calendarEventId The ID of the calendar event
	 */
	calendarEventRsvps<CID extends string, CEID extends number>(
		channelId: CID,
		calendarEventId: CEID,
	) {
		return `/channels/${channelId}/events/${calendarEventId}/rsvps` as const;
	},

	/**
	 * Allowed Methods:
	 * - {@link https://www.guilded.gg/docs/api/groupMembership/GroupMembershipCreate PUT}
	 * - {@link https://www.guilded.gg/docs/api/groupMembership/GroupMembershipDelete DELETE}
	 *
	 * @param groupId The ID of the group
	 * @param userId The ID of the user
	 */
	groupMember<GID extends string, UID extends string>(groupId: GID, userId: UID) {
		return `/groups/${groupId}/members/${userId}` as const;
	},

	/**
	 * Allowed Methods:
	 * - {@link https://www.guilded.gg/docs/api/webhook/WebhookCreate POST}
	 * - {@link https://www.guilded.gg/docs/api/webhook/WebhookReadMany GET}
	 *
	 * @param serverId The ID of the server
	 */
	webhooks<SID extends string>(serverId: SID) {
		return `/servers/${serverId}/webhooks` as const;
	},

	/**
	 * Allowed Methods:
	 * - {@link https://www.guilded.gg/docs/api/webhook/WebhookRead GET}
	 * - {@link https://www.guilded.gg/docs/api/webhook/WebhookUpdate PUT}
	 * - {@link https://www.guilded.gg/docs/api/webhook/WebhookDelete DELETE}
	 *
	 * @param serverId The ID of the server
	 * @param webhookId The ID of the webhook
	 */
	webhook<SID extends string, WID extends string>(serverId: SID, webhookId: WID) {
		return `/servers/${serverId}/webhooks/${webhookId}` as const;
	},
};
