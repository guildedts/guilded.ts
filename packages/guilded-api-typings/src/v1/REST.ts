/** Represents a error that occurred while interacting with the Guilded REST API. */
export interface APIError {
	/** The code of the error. */
	code: string;
	/** The message of the error. */
	message: string;
	/** The meta data of the error. */
	meta?: any;
}

/** The REST API endpoints for Guilded. */
export class Routes {
	/**
	 * The enpoint for channels on Guilded.
	 * @see https://www.guilded.gg/docs/api/channels/ChannelCreate
	 */
	static channels = '/channels' as const;

	/**
	 * The endpoint for a channel on Guilded.
	 * @param channelId The ID of the channel.
	 * @see https://www.guilded.gg/docs/api/channels/ChannelRead
	 * @see https://www.guilded.gg/docs/api/channels/ChannelUpdate
	 * @see https://www.guilded.gg/docs/api/channels/ChannelDelete
	 * @example Routes.channel('abc'); // '/channels/abc'
	 */
	static channel<C extends string>(channelId: C) {
		return `/channels/${channelId}` as const;
	}

	/**
	 * The endpoint for a server on Guilded.
	 * @param serverId The ID of the server.
	 * @see https://www.guilded.gg/docs/api/servers/ServerRead
	 * @example Routes.server('abc'); // '/servers/abc'
	 */
	static server<S extends string>(serverId: S) {
		return `/servers/${serverId}` as const;
	}

	/**
	 * The endpoint for messages on Guilded.
	 * @param channelId The ID of the channel the messages belongs to.
	 * @see https://www.guilded.gg/docs/api/chat/ChannelMessageCreate
	 * @see https://www.guilded.gg/docs/api/chat/ChannelMessageReadMany
	 * @example Routes.messages('abc'); // '/channels/abc/messages'
	 */
	static messages<C extends string>(channelId: C) {
		return `/channels/${channelId}/messages` as const;
	}

	/**
	 * The endpoint for a message on Guilded.
	 * @param channelId The ID of the channel the message belongs to.
	 * @param messageId The ID of the message.
	 * @see https://www.guilded.gg/docs/api/chat/ChannelMessageRead
	 * @see https://www.guilded.gg/docs/api/chat/ChannelMessageUpdate
	 * @see https://www.guilded.gg/docs/api/chat/ChannelMessageDelete
	 * @example Routes.message('abc', 'abc'); // '/channels/abc/messages/abc'
	 */
	static message<C extends string, M extends string>(channelId: C, messageId: M) {
		return `/channels/${channelId}/messages/${messageId}` as const;
	}

	/**
	 * The endpoint for a server nickname on Guilded.
	 * @param serverId The ID of the server the member belongs to.
	 * @param memberId The ID of the member.
	 * @see https://www.guilded.gg/docs/api/members/MemberNicknameUpdate
	 * @see https://www.guilded.gg/docs/api/members/MemberNicknameDelete
	 * @example Routes.serverNickname('abc', 'abc'); // '/servers/abc/members/abc/nickname'
	 */
	static serverNickname<S extends string, M extends string>(serverId: S, memberId: M) {
		return `/servers/${serverId}/members/${memberId}/nickname` as const;
	}

	/**
	 * The endpoint for a server member on Guilded.
	 * @param serverId The ID of the server the member belongs to.
	 * @param memberId The ID of the member.
	 * @see https://www.guilded.gg/docs/api/members/ServerMemberRead
	 * @see https://www.guilded.gg/docs/api/members/ServerMemberDelete
	 * @example Routes.serverMember('abc', 'abc'); // '/servers/abc/members/abc'
	 */
	static serverMember<S extends string, M extends string>(serverId: S, memberId: M) {
		return `/servers/${serverId}/members/${memberId}` as const;
	}

	/**
	 * The endpoint for server members on Guilded.
	 * @param serverId The ID of the server the members belong to.
	 * @see https://www.guilded.gg/docs/api/members/ServerMemberReadMany
	 * @example Routes.serverMembers('abc'); // '/servers/abc/members'
	 */
	static serverMembers<S extends string>(serverId: S) {
		return `/servers/${serverId}/members` as const;
	}

	/**
	 * The endpoint for a server ban on Guilded.
	 * @param serverId The ID of the server the ban belongs to.
	 * @param banId The ID of the ban.
	 * @see https://www.guilded.gg/docs/api/member-bans/ServerMemberBanCreate
	 * @see https://www.guilded.gg/docs/api/member-bans/ServerMemberBanRead
	 * @see https://www.guilded.gg/docs/api/member-bans/ServerMemberBanDelete
	 * @example Routes.serverBan('abc', 'abc'); // '/servers/abc/bans/abc'
	 */
	static serverBan<S extends string, B extends string>(serverId: S, banId: B) {
		return `/servers/${serverId}/bans/${banId}` as const;
	}

	/**
	 * The endpoint for server bans on Guilded.
	 * @param serverId The ID of the server the bans belong to.
	 * @see https://www.guilded.gg/docs/api/member-bans/ServerMemberBanReadMany
	 * @example Routes.serverBans('abc'); // '/servers/abc/bans'
	 */
	static serverBans<S extends string>(serverId: S) {
		return `/servers/${serverId}/bans` as const;
	}

	/**
	 * The endpoint for forum topics.
	 * @param channelId The ID of the channel the forum topics belongs to.
	 * @see https://www.guilded.gg/docs/api/forums/ForumTopicReadMany
	 * @see https://www.guilded.gg/docs/api/forums/ForumTopicCreate
	 * @example Routes.forumTopics('abc'); // '/channels/abc/topics'
	 */
	static forumTopics<C extends string>(channelId: C) {
		return `/channels/${channelId}/topics` as const;
	}

	/**
	 * The endpoint for a forum topic.
	 * @param channelId The ID of the channel the forum topic belongs to.
	 * @param forumTopicId The ID of the forum topic.
	 * @see https://www.guilded.gg/docs/api/forums/ForumTopicRead
	 * @see https://www.guilded.gg/docs/api/forums/ForumTopicUpdate
	 * @see https://www.guilded.gg/docs/api/forums/ForumTopicDelete
	 * @example Routes.forumTopic('abc', 123); // '/channels/abc/topics/123'
	 */
	static forumTopic<C extends string, F extends number>(channelId: C, forumTopicId: F) {
		return `/channels/${channelId}/topics/${forumTopicId}` as const;
	}

	/**
	 * The endpoint for a forum topic pin.
	 * @param channelId The ID of the channel the forum topic belongs to.
	 * @param forumTopicId The ID of the forum topic.
	 * @see https://www.guilded.gg/docs/api/forums/ForumTopicPin
	 * @see https://www.guilded.gg/docs/api/forums/ForumTopicUnpin
	 * @example Routes.forumTopicPin('abc', 123); // '/channels/abc/topics/123/pin'
	 */
	static forumTopicPin<C extends string, F extends number>(channelId: C, forumTopicId: F) {
		return `/channels/${channelId}/topics/${forumTopicId}/pin` as const;
	}

	/**
	 * The endpoint for list items on Guilded.
	 * @param channelId The ID of the channel the list items belongs to.
	 * @see https://www.guilded.gg/docs/api/listItems/ListItemCreate
	 * @see https://www.guilded.gg/docs/api/listItems/ListItemReadMany
	 * @example Routes.listItems('abc'); // '/channels/abc/items'
	 */
	static listItems<C extends string>(channelId: C) {
		return `/channels/${channelId}/items` as const;
	}

	/**
	 * The endpoint for a list item on Guilded.
	 * @param channelId The ID of the channel the list item belongs to.
	 * @param listItemId The ID of the list item.
	 * @see https://www.guilded.gg/docs/api/listItems/ListItemRead
	 * @see https://www.guilded.gg/docs/api/listItems/ListItemUpdate
	 * @see https://www.guilded.gg/docs/api/listItems/ListItemDelete
	 * @example Routes.listItem('abc', 'abc'); // '/channels/abc/items/abc'
	 */
	static listItem<C extends string, L extends string>(channelId: C, listItemId: L) {
		return `/channels/${channelId}/items/${listItemId}` as const;
	}

	/**
	 * The endpoint for list item completions on Guilded.
	 * @param channelId The ID of the channel the list item belongs to.
	 * @param listItemId The ID of the list item.
	 * @see https://www.guilded.gg/docs/api/listItems/ListItemCompleteCreate
	 * @see https://www.guilded.gg/docs/api/listItems/ListItemCompleteDelete
	 * @example Routes.listItemComplete('abc', 'abc'); // '/channels/abc/items/abc/complete'
	 */
	static listItemComplete<C extends string, L extends string>(channelId: C, listItemId: L) {
		return `/channels/${channelId}/items/${listItemId}/complete` as const;
	}

	/**
	 * The endpoint for docs on Guilded.
	 * @param channelId The ID of the channel the docs belongs to.
	 * @see https://www.guilded.gg/docs/api/docs/DocCreate
	 * @see https://www.guilded.gg/docs/api/docs/DocReadMany
	 * @example Routes.docs('abc'); // '/channels/abc/docs'
	 */
	static docs<C extends string>(channelId: C) {
		return `/channels/${channelId}/docs` as const;
	}

	/**
	 * The endpoint for a doc on Guilded.
	 * @param channelId The ID of the channel the doc belongs to.
	 * @param docId The ID of the doc.
	 * @see https://www.guilded.gg/docs/api/docs/DocRead
	 * @see https://www.guilded.gg/docs/api/docs/DocUpdate
	 * @see https://www.guilded.gg/docs/api/docs/DocDelete
	 * @example Routes.doc('abc', 123); // '/channels/abc/docs/123'
	 */
	static doc<C extends string, D extends number>(channelId: C, docId: D) {
		return `/channels/${channelId}/docs/${docId}` as const;
	}

	/**
	 * The endpoint for calendar events on Guilded.
	 * @param channelId The ID of the channel the calendar events belongs to.
	 * @see https://www.guilded.gg/docs/api/calendarEvents/CalendarEventCreate
	 * @see https://www.guilded.gg/docs/api/calendarEvents/CalendarEventReadMany
	 * @example Routes.calendarEvents('abc'); // '/channels/abc/events'
	 */
	static calendarEvents<C extends string>(channelId: C) {
		return `/channels/${channelId}/events` as const;
	}

	/**
	 * The endpoint for a calendar event on Guilded.
	 * @param channelId The ID of the channel the calendar event belongs to.
	 * @param calendarEventId The ID of the calendar event.
	 * @see https://www.guilded.gg/docs/api/calendarEvents/CalendarEventRead
	 * @see https://www.guilded.gg/docs/api/calendarEvents/CalendarEventUpdate
	 * @see https://www.guilded.gg/docs/api/calendarEvents/CalendarEventDelete
	 * @example Routes.calendarEvent('abc', 123); // '/channels/abc/events/123'
	 */
	static calendarEvent<C extends string, CE extends number>(channelId: C, calendarEventId: CE) {
		return `/channels/${channelId}/events/${calendarEventId}` as const;
	}

	/**
	 * The endpoint for a calendar event RSVP on Guilded.
	 * @param channelId The ID of the channel the calendar event belongs to.
	 * @param calendarEventId The ID of the calendar event the RSVP belongs to.
	 * @param userId The ID of the user the RSVP belongs to.
	 * @see https://www.guilded.gg/docs/api/calendarEvents/CalendarEventRsvpRead
	 * @see https://www.guilded.gg/docs/api/calendarEvents/CalendarEventRsvpUpdate
	 * @see https://www.guilded.gg/docs/api/calendarEvents/CalendarEventRsvpDelete
	 */
	static calendarEventRsvp<C extends string, CE extends number, U extends string>(
		channelId: C,
		calendarEventId: CE,
		userId: U,
	) {
		return `/channels/${channelId}/events/${calendarEventId}/rsvps/${userId}` as const;
	}

	/**
	 * The endpoint for calendar event RSVPs on Guilded.
	 * @param channelId The ID of the channel the calendar event belongs to.
	 * @param calendarEventId The ID of the calendar event the RSVPs belong to.
	 * @see https://www.guilded.gg/docs/api/calendarEvents/CalendarEventRsvpReadMany
	 */
	static calendarEventRsvps<C extends string, CE extends number>(
		channelId: C,
		calendarEventId: CE,
	) {
		return `/channels/${channelId}/events/${calendarEventId}/rsvps`;
	}

	/**
	 * The endpoint for a content reaction on Guilded.
	 * @param channelId The ID of the channel the content belongs to.
	 * @param contentId The ID of the content.
	 * @param emoteId The ID of the emote.
	 * @see https://www.guilded.gg/docs/api/reactions/ContentReactionCreate
	 * @example Routes.reaction('abc', 'abc', 123); // '/channels/abc/content/abc/emotes/123'
	 */
	static reaction<C extends string, Co extends string, E extends number>(
		channelId: C,
		contentId: Co,
		emoteId: E,
	) {
		return `/channels/${channelId}/content/${contentId}/emotes/${emoteId}` as const;
	}

	/**
	 * The endpoint for server member XP on Guilded.
	 * @param serverId The ID of the server the member belongs to.
	 * @param memberId The ID of the member.
	 * @see https://www.guilded.gg/docs/api/server-xp/ServerXpForUserCreate
	 * @example Routes.serverMemberXp('abc', 'abc'); // '/servers/abc/members/abc/xp'
	 */
	static serverMemberXp<S extends string, M extends string>(serverId: S, memberId: M) {
		return `/servers/${serverId}/members/${memberId}/xp` as const;
	}

	/**
	 * The endpoint for server role XP on Guilded.
	 * @param serverId The ID of the server the role belongs to.
	 * @param roleId The ID of the role.
	 * @see https://www.guilded.gg/docs/api/server-xp/ServerXpForRoleCreate
	 * @example Routes.serverRoleXp('abc', 123); // '/servers/abc/roles/123/xp'
	 */
	static serverRoleXp<S extends string, R extends number>(serverId: S, roleId: R) {
		return `/servers/${serverId}/roles/${roleId}/xp` as const;
	}

	/**
	 * The endpoint for a server member social link on Guilded.
	 * @param serverId The ID of the server the member belongs to.
	 * @param memberId The ID of the member.
	 * @param type The type of social link.
	 * @see https://www.guilded.gg/docs/api/socialLinks/MemberSocialLinkRead
	 * @example Routes.socialLink('abc', 'abc', 'youtube'); // '/servers/abc/members/abc/social-links/youtube'
	 */
	static socialLink<S extends string, M extends string, T extends string>(
		serverId: S,
		memberId: M,
		type: T,
	) {
		return `/servers/${serverId}/members/${memberId}/social-links/${type}` as const;
	}

	/**
	 * The endpoint for a group member on Guilded.
	 * @param groupId The ID of the group the member belongs to.
	 * @param memberId The ID of the member.
	 * @see https://www.guilded.gg/docs/api/groupMembership/GroupMembershipCreate
	 * @see https://www.guilded.gg/docs/api/groupMembership/GroupMembershipDelete
	 * @example Routes.groupMember('abc', 'abc'); // '/groups/abc/members/abc'
	 */
	static groupMember<G extends string, M extends string>(groupId: G, memberId: M) {
		return `/groups/${groupId}/members/${memberId}` as const;
	}

	/**
	 * The endpoint for a server member role on Guilded.
	 * @param serverId The ID of the server the member belongs to.
	 * @param memberId The ID of the member.
	 * @param roleId The ID of the role.
	 * @see https://www.guilded.gg/docs/api/roleMembership/RoleMembershipCreate
	 * @see https://www.guilded.gg/docs/api/roleMembership/RoleMembershipDelete
	 * @example Routes.serverMemberRole('abc', 'abc', 123); // '/servers/abc/members/abc/roles/123'
	 */
	static serverMemberRole<S extends string, M extends string, R extends number>(
		serverId: S,
		memberId: M,
		roleId: R,
	) {
		return `/servers/${serverId}/members/${memberId}/roles/${roleId}` as const;
	}

	/**
	 * The endpoint for server member roles on Guilded.
	 * @param serverId The ID of the server the member belongs to.
	 * @param memberId The ID of the member.
	 * @see https://www.guilded.gg/docs/api/roleMembership/RoleMembershipReadMany
	 * @example Routes.serverMemberRoles('abc', 'abc'); // '/servers/abc/members/abc/roles'
	 */
	static serverMemberRoles<S extends string, M extends string>(serverId: S, memberId: M) {
		return `/servers/${serverId}/members/${memberId}/roles` as const;
	}

	/**
	 * The endpoint for webhooks on Guilded.
	 * @param serverId The ID of the server the webhooks belongs to.
	 * @see https://www.guilded.gg/docs/api/webhook/WebhookCreate
	 * @see https://www.guilded.gg/docs/api/webhook/WebhookReadMany
	 * @example Routes.webhooks('abc'); // '/servers/abc/webhooks'
	 */
	static webhooks<S extends string>(serverId: S) {
		return `/servers/${serverId}/webhooks` as const;
	}

	/**
	 * The endpoint for a webhook on Guilded.
	 * @param serverId The ID of the server the webhook belongs to.
	 * @param webhookId The ID of the webhook.
	 * @see https://www.guilded.gg/docs/api/webhook/WebhookRead
	 * @see https://www.guilded.gg/docs/api/webhook/WebhookUpdate
	 * @see https://www.guilded.gg/docs/api/webhook/WebhookDelete
	 * @example Routes.webhook('abc', 'abc'); // '/servers/abc/webhooks/abc'
	 */
	static webhook<S extends string, W extends string>(serverId: S, webhookId: W) {
		return `/servers/${serverId}/webhooks/${webhookId}` as const;
	}

	/**
	 * The endpoint for a webhook execution on Guilded.
	 * @param webhookId The ID of the webhook.
	 * @param webhookToken The ID of the webhook.
	 * @example Routes.webhookExecute('abc', 'abc'); // '/webhooks/abc/abc'
	 */
	static webhookExecute<W extends string, WT extends string>(webhookId: W, webhookToken: WT) {
		return `/webhooks/${webhookId}/${webhookToken}` as const;
	}
}
