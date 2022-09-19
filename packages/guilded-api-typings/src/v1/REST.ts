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
	static channels: '/channels' = '/channels';

	/**
	 * The endpoint for a channel on Guilded.
	 * @param channelId The ID of the channel.
	 * @see https://www.guilded.gg/docs/api/channels/ChannelRead
	 * @see https://www.guilded.gg/docs/api/channels/ChannelUpdate
	 * @see https://www.guilded.gg/docs/api/channels/ChannelDelete
	 * @example Routes.channel('abc'); // '/channels/abc'
	 */
	static channel(channelId: string): `/channels/${string}` {
		return `/channels/${channelId}`;
	}

	/**
	 * The endpoint for a server on Guilded.
	 * @param serverId The ID of the server.
	 * @see https://www.guilded.gg/docs/api/servers/ServerRead
	 * @example Routes.server('abc'); // '/servers/abc'
	 */
	static server(serverId: string): `/servers/${string}` {
		return `/servers/${serverId}`;
	}

	/**
	 * The endpoint for messages on Guilded.
	 * @param channelId The ID of the channel the messages belongs to.
	 * @see https://www.guilded.gg/docs/api/chat/ChannelMessageCreate
	 * @see https://www.guilded.gg/docs/api/chat/ChannelMessageReadMany
	 * @example Routes.messages('abc'); // '/channels/abc/messages'
	 */
	static messages(channelId: string): `/channels/${string}/messages` {
		return `/channels/${channelId}/messages`;
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
	static message(channelId: string, messageId: string): `/channels/${string}/messages/${string}` {
		return `/channels/${channelId}/messages/${messageId}`;
	}

	/**
	 * The endpoint for a server nickname on Guilded.
	 * @param serverId The ID of the server the member belongs to.
	 * @param memberId The ID of the member.
	 * @see https://www.guilded.gg/docs/api/members/MemberNicknameUpdate
	 * @see https://www.guilded.gg/docs/api/members/MemberNicknameDelete
	 * @example Routes.serverNickname('abc', 'abc'); // '/servers/abc/members/abc/nickname'
	 */
	static serverNickname(
		serverId: string,
		memberId: string,
	): `/servers/${string}/members/${string}/nickname` {
		return `/servers/${serverId}/members/${memberId}/nickname`;
	}

	/**
	 * The endpoint for a server member on Guilded.
	 * @param serverId The ID of the server the member belongs to.
	 * @param memberId The ID of the member.
	 * @see https://www.guilded.gg/docs/api/members/ServerMemberRead
	 * @see https://www.guilded.gg/docs/api/members/ServerMemberDelete
	 * @example Routes.serverMember('abc', 'abc'); // '/servers/abc/members/abc'
	 */
	static serverMember(
		serverId: string,
		memberId: string,
	): `/servers/${string}/members/${string}` {
		return `/servers/${serverId}/members/${memberId}`;
	}

	/**
	 * The endpoint for server members on Guilded.
	 * @param serverId The ID of the server the members belong to.
	 * @see https://www.guilded.gg/docs/api/members/ServerMemberReadMany
	 * @example Routes.serverMembers('abc'); // '/servers/abc/members'
	 */
	static serverMembers(serverId: string): `/servers/${string}/members` {
		return `/servers/${serverId}/members`;
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
	static serverBan(serverId: string, banId: string): `/servers/${string}/bans/${string}` {
		return `/servers/${serverId}/bans/${banId}`;
	}

	/**
	 * The endpoint for server bans on Guilded.
	 * @param serverId The ID of the server the bans belong to.
	 * @see https://www.guilded.gg/docs/api/member-bans/ServerMemberBanReadMany
	 * @example Routes.serverBans('abc'); // '/servers/abc/bans'
	 */
	static serverBans(serverId: string): `/servers/${string}/bans` {
		return `/servers/${serverId}/bans`;
	}

	/**
	 * The endpoint for forum topics.
	 * @param channelId The ID of the channel the forum topics belongs to.
	 * @see https://www.guilded.gg/docs/api/forums/ForumTopicReadMany
	 * @see https://www.guilded.gg/docs/api/forums/ForumTopicCreate
	 * @example Routes.forumTopics('abc'); // '/channels/abc/topics'
	 */
	static forumTopics(channelId: string): `/channels/${string}/topics` {
		return `/channels/${channelId}/topics`;
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
	static forumTopic(
		channelId: string,
		forumTopicId: number,
	): `/channels/${string}/topics/${number}` {
		return `/channels/${channelId}/topics/${forumTopicId}`;
	}

	/**
	 * The endpoint for a forum topic pin.
	 * @param channelId The ID of the channel the forum topic belongs to.
	 * @param forumTopicId The ID of the forum topic.
	 * @see https://www.guilded.gg/docs/api/forums/ForumTopicPin
	 * @see https://www.guilded.gg/docs/api/forums/ForumTopicUnpin
	 * @example Routes.forumTopicPin('abc', 123); // '/channels/abc/topics/123/pin'
	 */
	static forumTopicPin(
		channelId: string,
		forumTopicId: number,
	): `/channels/${string}/topics/${number}/pin` {
		return `/channels/${channelId}/topics/${forumTopicId}/pin`;
	}

	/**
	 * The endpoint for list items on Guilded.
	 * @param channelId The ID of the channel the list items belongs to.
	 * @see https://www.guilded.gg/docs/api/listItems/ListItemCreate
	 * @see https://www.guilded.gg/docs/api/listItems/ListItemReadMany
	 * @example Routes.listItems('abc'); // '/channels/abc/items'
	 */
	static listItems(channelId: string): `/channels/${string}/items` {
		return `/channels/${channelId}/items`;
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
	static listItem(channelId: string, listItemId: string): `/channels/${string}/items/${string}` {
		return `/channels/${channelId}/items/${listItemId}`;
	}

	/**
	 * The endpoint for list item completions on Guilded.
	 * @param channelId The ID of the channel the list item belongs to.
	 * @param listItemId The ID of the list item.
	 * @see https://www.guilded.gg/docs/api/listItems/ListItemCompleteCreate
	 * @see https://www.guilded.gg/docs/api/listItems/ListItemCompleteDelete
	 * @example Routes.listItemComplete('abc', 'abc'); // '/channels/abc/items/abc/complete'
	 */
	static listItemComplete(
		channelId: string,
		listItemId: string,
	): `/channels/${string}/items/${string}/complete` {
		return `/channels/${channelId}/items/${listItemId}/complete`;
	}

	/**
	 * The endpoint for docs on Guilded.
	 * @param channelId The ID of the channel the docs belongs to.
	 * @see https://www.guilded.gg/docs/api/docs/DocCreate
	 * @see https://www.guilded.gg/docs/api/docs/DocReadMany
	 * @example Routes.docs('abc'); // '/channels/abc/docs'
	 */
	static docs(channelId: string): `/channels/${string}/docs` {
		return `/channels/${channelId}/docs`;
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
	static doc(channelId: string, docId: number): `/channels/${string}/docs/${number}` {
		return `/channels/${channelId}/docs/${docId}`;
	}

	/**
	 * The endpoint for calendar events on Guilded.
	 * @param channelId The ID of the channel the calendar events belongs to.
	 * @see https://www.guilded.gg/docs/api/calendarEvents/CalendarEventCreate
	 * @see https://www.guilded.gg/docs/api/calendarEvents/CalendarEventReadMany
	 * @example Routes.calendarEvents('abc'); // '/channels/abc/events'
	 */
	static calendarEvents(channelId: string): `/channels/${string}/events` {
		return `/channels/${channelId}/events`;
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
	static calendarEvent(
		channelId: string,
		calendarEventId: number,
	): `/channels/${string}/events/${number}` {
		return `/channels/${channelId}/events/${calendarEventId}`;
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
	static calendarEventRsvp(
		channelId: string,
		calendarEventId: number,
		userId: string,
	): `/channels/${string}/events/${number}/rsvps/${string}` {
		return `/channels/${channelId}/events/${calendarEventId}/rsvps/${userId}`;
	}

	/**
	 * The endpoint for calendar event RSVPs on Guilded.
	 * @param channelId The ID of the channel the calendar event belongs to.
	 * @param calendarEventId The ID of the calendar event the RSVPs belong to.
	 * @see https://www.guilded.gg/docs/api/calendarEvents/CalendarEventRsvpReadMany
	 */
	static calendarEventRsvps(
		channelId: string,
		calendarEventId: number,
	): `/channels/${string}/events/${number}/rsvps` {
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
	static reaction(
		channelId: string,
		contentId: string,
		emoteId: number,
	): `/channels/${string}/content/${string}/emotes/${number}` {
		return `/channels/${channelId}/content/${contentId}/emotes/${emoteId}`;
	}

	/**
	 * The endpoint for server member XP on Guilded.
	 * @param serverId The ID of the server the member belongs to.
	 * @param memberId The ID of the member.
	 * @see https://www.guilded.gg/docs/api/server-xp/ServerXpForUserCreate
	 * @example Routes.serverMemberXp('abc', 'abc'); // '/servers/abc/members/abc/xp'
	 */
	static serverMemberXp(
		serverId: string,
		memberId: string,
	): `/servers/${string}/members/${string}/xp` {
		return `/servers/${serverId}/members/${memberId}/xp`;
	}

	/**
	 * The endpoint for server role XP on Guilded.
	 * @param serverId The ID of the server the role belongs to.
	 * @param roleId The ID of the role.
	 * @see https://www.guilded.gg/docs/api/server-xp/ServerXpForRoleCreate
	 * @example Routes.serverRoleXp('abc', 123); // '/servers/abc/roles/123/xp'
	 */
	static serverRoleXp(serverId: string, roleId: number): `/servers/${string}/roles/${number}/xp` {
		return `/servers/${serverId}/roles/${roleId}/xp`;
	}

	/**
	 * The endpoint for a server member social link on Guilded.
	 * @param serverId The ID of the server the member belongs to.
	 * @param memberId The ID of the member.
	 * @param type The type of social link.
	 * @see https://www.guilded.gg/docs/api/socialLinks/MemberSocialLinkRead
	 * @example Routes.socialLink('abc', 'abc', 'youtube'); // '/servers/abc/members/abc/social-links/youtube'
	 */
	static socialLink(
		serverId: string,
		memberId: string,
		type: string,
	): `/servers/${string}/members/${string}/social-links/${string}` {
		return `/servers/${serverId}/members/${memberId}/social-links/${type}`;
	}

	/**
	 * The endpoint for a group member on Guilded.
	 * @param groupId The ID of the group the member belongs to.
	 * @param memberId The ID of the member.
	 * @see https://www.guilded.gg/docs/api/groupMembership/GroupMembershipCreate
	 * @see https://www.guilded.gg/docs/api/groupMembership/GroupMembershipDelete
	 * @example Routes.groupMember('abc', 'abc'); // '/groups/abc/members/abc'
	 */
	static groupMember(groupId: string, memberId: string): `/groups/${string}/members/${string}` {
		return `/groups/${groupId}/members/${memberId}`;
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
	static serverMemberRole(
		serverId: string,
		memberId: string,
		roleId: number,
	): `/servers/${string}/members/${string}/roles/${number}` {
		return `/servers/${serverId}/members/${memberId}/roles/${roleId}`;
	}

	/**
	 * The endpoint for server member roles on Guilded.
	 * @param serverId The ID of the server the member belongs to.
	 * @param memberId The ID of the member.
	 * @see https://www.guilded.gg/docs/api/roleMembership/RoleMembershipReadMany
	 * @example Routes.serverMemberRoles('abc', 'abc'); // '/servers/abc/members/abc/roles'
	 */
	static serverMemberRoles(
		serverId: string,
		memberId: string,
	): `/servers/${string}/members/${string}/roles` {
		return `/servers/${serverId}/members/${memberId}/roles`;
	}

	/**
	 * The endpoint for webhooks on Guilded.
	 * @param serverId The ID of the server the webhooks belongs to.
	 * @see https://www.guilded.gg/docs/api/webhook/WebhookCreate
	 * @see https://www.guilded.gg/docs/api/webhook/WebhookReadMany
	 * @example Routes.webhooks('abc'); // '/servers/abc/webhooks'
	 */
	static webhooks(serverId: string): `/servers/${string}/webhooks` {
		return `/servers/${serverId}/webhooks`;
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
	static webhook(serverId: string, webhookId: string): `/servers/${string}/webhooks/${string}` {
		return `/servers/${serverId}/webhooks/${webhookId}`;
	}

	/**
	 * The endpoint for a webhook execution on Guilded.
	 * @param webhookId The ID of the webhook.
	 * @param webhookToken The ID of the webhook.
	 * @example Routes.webhookExecute('abc', 'abc'); // '/webhooks/abc/abc'
	 */
	static webhookExecute(
		webhookId: string,
		webhookToken: string,
	): `/webhooks/${string}/${string}` {
		return `/webhooks/${webhookId}/${webhookToken}`;
	}
}
