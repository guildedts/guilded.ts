/** The REST API endpoints for Guilded. */
export const Routes = {
	/**
	 * The enpoint for channels on Guilded.
	 *
	 * @see https://www.guilded.gg/docs/api/channels/ChannelCreate
	 */
	channels: (): '/channels' => `/channels`,
	/**
	 * The endpoint for a channel on Guilded.
	 * @param channelId The ID of the channel.
	 *
	 * @see https://www.guilded.gg/docs/api/channels/ChannelRead
	 * @see https://www.guilded.gg/docs/api/channels/ChannelUpdate
	 * @see https://www.guilded.gg/docs/api/channels/ChannelDelete
	 */
	channel: (channelId: string): `/channels/${string}` => `/channels/${channelId}`,
	/**
	 * The endpoint for a server on Guilded.
	 * @param serverId The ID of the server.
	 *
	 * @see https://www.guilded.gg/docs/api/servers/ServerRead
	 */
	server: (serverId: string): `/servers/${string}` => `/servers/${serverId}`,
	/**
	 * The endpoint for messages on Guilded.
	 * @param channelId The ID of the channel the messages belongs to.
	 *
	 * @see https://www.guilded.gg/docs/api/chat/ChannelMessageCreate
	 * @see https://www.guilded.gg/docs/api/chat/ChannelMessageReadMany
	 */
	messages: (channelId: string): `/channels/${string}/messages` =>
		`/channels/${channelId}/messages`,
	/**
	 * The endpoint for a message on Guilded.
	 * @param channelId The ID of the channel the message belongs to.
	 * @param messageId The ID of the message.
	 *
	 * @see https://www.guilded.gg/docs/api/chat/ChannelMessageRead
	 * @see https://www.guilded.gg/docs/api/chat/ChannelMessageUpdate
	 * @see https://www.guilded.gg/docs/api/chat/ChannelMessageDelete
	 */
	message: (channelId: string, messageId: string): `/channels/${string}/messages/${string}` =>
		`/channels/${channelId}/messages/${messageId}`,
	/**
	 * The endpoint for a server nickname on Guilded.
	 * @param serverId The ID of the server the member belongs to.
	 * @param memberId The ID of the member.
	 *
	 * @see https://www.guilded.gg/docs/api/members/MemberNicknameUpdate
	 * @see https://www.guilded.gg/docs/api/members/MemberNicknameDelete
	 */
	serverNickname: (
		serverId: string,
		memberId: string,
	): `/servers/${string}/members/${string}/nickname` =>
		`/servers/${serverId}/members/${memberId}/nickname`,
	/**
	 * The endpoint for a server member on Guilded.
	 * @param serverId The ID of the server the member belongs to.
	 * @param memberId The ID of the member.
	 *
	 * @see https://www.guilded.gg/docs/api/members/ServerMemberRead
	 * @see https://www.guilded.gg/docs/api/members/ServerMemberDelete
	 */
	serverMember: (serverId: string, memberId: string): `/servers/${string}/members/${string}` =>
		`/servers/${serverId}/members/${memberId}`,
	/**
	 * The endpoint for server members on Guilded.
	 * @param serverId The ID of the server the members belong to.
	 *
	 * @see https://www.guilded.gg/docs/api/members/ServerMemberReadMany
	 */
	serverMembers: (serverId: string): `/servers/${string}/members` =>
		`/servers/${serverId}/members`,
	/**
	 * The endpoint for a server ban on Guilded.
	 * @param serverId The ID of the server the ban belongs to.
	 * @param banId The ID of the ban.
	 *
	 * @see https://www.guilded.gg/docs/api/member-bans/ServerMemberBanCreate
	 * @see https://www.guilded.gg/docs/api/member-bans/ServerMemberBanRead
	 * @see https://www.guilded.gg/docs/api/member-bans/ServerMemberBanDelete
	 */
	serverBan: (serverId: string, banId: string): `/servers/${string}/bans/${string}` =>
		`/servers/${serverId}/bans/${banId}`,
	/**
	 * The endpoint for server bans on Guilded.
	 * @param serverId The ID of the server the bans belong to.
	 *
	 * @see https://www.guilded.gg/docs/api/member-bans/ServerMemberBanReadMany
	 */
	serverBans: (serverId: string): `/servers/${string}/bans` => `/servers/${serverId}/bans`,
	/**
	 * The endpoint for topics.
	 * @param channelId The ID of the channel the topics belongs to.
	 *
	 * @see https://www.guilded.gg/docs/api/forums/ForumTopicCreate
	 */
	topics: (channelId: string): `/channels/${string}/topics` => `/channels/${channelId}/topics`,
	/**
	 * The endpoint for list items on Guilded.
	 * @param channelId The ID of the channel the list items belongs to.
	 *
	 * @see https://www.guilded.gg/docs/api/listItems/ListItemCreate
	 * @see https://www.guilded.gg/docs/api/listItems/ListItemReadMany
	 */
	listItems: (channelId: string): `/channels/${string}/items` => `/channels/${channelId}/items`,
	/**
	 * The endpoint for a list item on Guilded.
	 * @param channelId The ID of the channel the list item belongs to.
	 * @param listItemId The ID of the list item.
	 *
	 * @see https://www.guilded.gg/docs/api/listItems/ListItemRead
	 * @see https://www.guilded.gg/docs/api/listItems/ListItemUpdate
	 * @see https://www.guilded.gg/docs/api/listItems/ListItemDelete
	 */
	listItem: (channelId: string, listItemId: string): `/channels/${string}/items/${string}` =>
		`/channels/${channelId}/items/${listItemId}`,
	/**
	 * The endpoint for list item completions on Guilded.
	 * @param channelId The ID of the channel the list item belongs to.
	 * @param listItemId The ID of the list item.
	 *
	 * @see https://www.guilded.gg/docs/api/listItems/ListItemCompleteCreate
	 * @see https://www.guilded.gg/docs/api/listItems/ListItemCompleteDelete
	 */
	listItemComplete: (
		channelId: string,
		listItemId: string,
	): `/channels/${string}/items/${string}/complete` =>
		`/channels/${channelId}/items/${listItemId}/complete`,
	/**
	 * The endpoint for docs on Guilded.
	 * @param channelId The ID of the channel the docs belongs to.
	 *
	 * @see https://www.guilded.gg/docs/api/docs/DocCreate
	 * @see https://www.guilded.gg/docs/api/docs/DocReadMany
	 */
	docs: (channelId: string): `/channels/${string}/docs` => `/channels/${channelId}/docs`,
	/**
	 * The endpoint for a doc on Guilded.
	 * @param channelId The ID of the channel the doc belongs to.
	 * @param docId The ID of the doc.
	 *
	 * @see https://www.guilded.gg/docs/api/docs/DocRead
	 * @see https://www.guilded.gg/docs/api/docs/DocUpdate
	 * @see https://www.guilded.gg/docs/api/docs/DocDelete
	 */
	doc: (channelId: string, docId: number): `/channels/${string}/docs/${number}` =>
		`/channels/${channelId}/docs/${docId}`,
	/**
	 * The endpoint for calendar events on Guilded.
	 * @param channelId The ID of the channel the calendar events belongs to.
	 *
	 * @see https://www.guilded.gg/docs/api/calendarEvents/CalendarEventCreate
	 * @see https://www.guilded.gg/docs/api/calendarEvents/CalendarEventReadMany
	 */
	calendarEvents: (channelId: string): `/channels/${string}/events` =>
		`/channels/${channelId}/events`,
	/**
	 * The endpoint for a calendar event on Guilded.
	 * @param channelId The ID of the channel the calendar event belongs to.
	 * @param calendarEventId The ID of the calendar event.
	 *
	 * @see https://www.guilded.gg/docs/api/calendarEvents/CalendarEventRead
	 * @see https://www.guilded.gg/docs/api/calendarEvents/CalendarEventUpdate
	 * @see https://www.guilded.gg/docs/api/calendarEvents/CalendarEventDelete
	 */
	calendarEvent: (
		channelId: string,
		calendarEventId: number,
	): `/channels/${string}/events/${number}` => `/channels/${channelId}/events/${calendarEventId}`,
	/**
	 * The endpoint for a content reaction on Guilded.
	 * @param channelId The ID of the channel the content belongs to.
	 * @param contentId The ID of the content.
	 * @param emoteId The ID of the emote.
	 *
	 * @see https://www.guilded.gg/docs/api/reactions/ContentReactionCreate
	 */
	reaction: (
		channelId: string,
		contentId: string,
		emoteId: number,
	): `/channels/${string}/content/${string}/emotes/${number}` =>
		`/channels/${channelId}/content/${contentId}/emotes/${emoteId}`,
	/**
	 * The endpoint for server member XP on Guilded.
	 * @param serverId The ID of the server the member belongs to.
	 * @param memberId The ID of the member.
	 *
	 * @see https://www.guilded.gg/docs/api/server-xp/ServerXpForUserCreate
	 */
	serverMemberXp: (
		serverId: string,
		memberId: string,
	): `/servers/${string}/members/${string}/xp` => `/servers/${serverId}/members/${memberId}/xp`,
	/**
	 * The endpoint for server role XP on Guilded.
	 * @param serverId The ID of the server the role belongs to.
	 * @param roleId The ID of the role.
	 *
	 * @see https://www.guilded.gg/docs/api/server-xp/ServerXpForRoleCreate
	 */
	serverRoleXp: (serverId: string, roleId: number): `/servers/${string}/roles/${number}/xp` =>
		`/servers/${serverId}/roles/${roleId}/xp`,
	/**
	 * The endpoint for a server member social link on Guilded.
	 * @param serverId The ID of the server the member belongs to.
	 * @param memberId The ID of the member.
	 * @param type The type of social link.
	 *
	 * @see https://www.guilded.gg/docs/api/socialLinks/MemberSocialLinkRead
	 */
	socialLink: (
		serverId: string,
		memberId: string,
		type: string,
	): `/servers/${string}/members/${string}/social-links/${string}` =>
		`/servers/${serverId}/members/${memberId}/social-links/${type}`,
	/**
	 * The endpoint for a group member on Guilded.
	 * @param groupId The ID of the group the member belongs to.
	 * @param memberId The ID of the member.
	 *
	 * @see https://www.guilded.gg/docs/api/groupMembership/GroupMembershipCreate
	 * @see https://www.guilded.gg/docs/api/groupMembership/GroupMembershipDelete
	 */
	groupMember: (groupId: string, memberId: string): `/groups/${string}/members/${string}` =>
		`/groups/${groupId}/members/${memberId}`,
	/**
	 * The endpoint for a server member role on Guilded.
	 * @param serverId The ID of the server the member belongs to.
	 * @param memberId The ID of the member.
	 * @param roleId The ID of the role.
	 *
	 * @see https://www.guilded.gg/docs/api/roleMembership/RoleMembershipCreate
	 * @see https://www.guilded.gg/docs/api/roleMembership/RoleMembershipDelete
	 */
	serverMemberRole: (
		serverId: string,
		memberId: string,
		roleId: number,
	): `/servers/${string}/members/${string}/roles/${number}` =>
		`/servers/${serverId}/members/${memberId}/roles/${roleId}`,
	/**
	 * The endpoint for server member roles on Guilded.
	 * @param serverId The ID of the server the member belongs to.
	 * @param memberId The ID of the member.
	 *
	 * @see https://www.guilded.gg/docs/api/roleMembership/RoleMembershipReadMany
	 */
	serverMemberRoles: (
		serverId: string,
		memberId: string,
	): `/servers/${string}/members/${string}/roles` =>
		`/servers/${serverId}/members/${memberId}/roles`,
	/**
	 * The endpoint for webhooks on Guilded.
	 * @param serverId The ID of the server the webhooks belongs to.
	 *
	 * @see https://www.guilded.gg/docs/api/webhook/WebhookCreate
	 * @see https://www.guilded.gg/docs/api/webhook/WebhookReadMany
	 */
	webhooks: (serverId: string): `/servers/${string}/webhooks` => `/servers/${serverId}/webhooks`,
	/**
	 * The endpoint for a webhook on Guilded.
	 * @param serverId The ID of the server the webhook belongs to.
	 * @param webhookId The ID of the webhook.
	 *
	 * @see https://www.guilded.gg/docs/api/webhook/WebhookRead
	 * @see https://www.guilded.gg/docs/api/webhook/WebhookUpdate
	 * @see https://www.guilded.gg/docs/api/webhook/WebhookDelete
	 */
	webhook: (serverId: string, webhookId: string): `/servers/${string}/webhooks/${string}` =>
		`/servers/${serverId}/webhooks/${webhookId}`,
};
