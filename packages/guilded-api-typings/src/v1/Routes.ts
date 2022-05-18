/** The Guilded REST API endpoints. */
export const Routes = {
	/**
	 * The REST API enpoint for channels.
	 *
	 * @see https://www.guilded.gg/docs/api/channels/ChannelCreate
	 */
	channels: (): '/channels' => `/channels`,
	/**
	 * The REST API endpoint for a channel.
	 * @param channelId The ID of the channel.
	 *
	 * @see https://www.guilded.gg/docs/api/channels/ChannelRead
	 * @see https://www.guilded.gg/docs/api/channels/ChannelUpdate
	 * @see https://www.guilded.gg/docs/api/channels/ChannelDelete
	 */
	channel: (channelId: string): `/channels/${string}` => `/channels/${channelId}`,
	/**
	 * The REST API endpoint for channel messages.
	 * @param channelId The ID of the channel.
	 *
	 * @see https://www.guilded.gg/docs/api/chat/ChannelMessageCreate
	 * @see https://www.guilded.gg/docs/api/chat/ChannelMessageReadMany
	 */
	messages: (channelId: string): `/channels/${string}/messages` =>
		`/channels/${channelId}/messages`,
	/**
	 * The REST API endpoint for a channel message.
	 * @param channelId The ID of the channel.
	 * @param messageId The ID of the message.
	 *
	 * @see https://www.guilded.gg/docs/api/chat/ChannelMessageRead
	 * @see https://www.guilded.gg/docs/api/chat/ChannelMessageUpdate
	 * @see https://www.guilded.gg/docs/api/chat/ChannelMessageDelete
	 */
	message: (channelId: string, messageId: string): `/channels/${string}/messages/${string}` =>
		`/channels/${channelId}/messages/${messageId}`,
	/**
	 * The REST API endpoint for a member nickname.
	 * @param serverId The ID of the server.
	 * @param userId The ID of the user.
	 *
	 * @see https://www.guilded.gg/docs/api/members/MemberNicknameUpdate
	 * @see https://www.guilded.gg/docs/api/members/MemberNicknameDelete
	 */
	serverMemberNickname: (
		serverId: string,
		userId: string,
	): `/servers/${string}/members/${string}/nickname` =>
		`/servers/${serverId}/members/${userId}/nickname`,
	/**
	 * The REST API endpoint for a server member.
	 * @param serverId The ID of the server.
	 * @param userId The ID of the user.
	 *
	 * @see https://www.guilded.gg/docs/api/members/ServerMemberRead
	 * @see https://www.guilded.gg/docs/api/members/ServerMemberDelete
	 */
	serverMember: (serverId: string, userId: string): `/servers/${string}/members/${string}` =>
		`/servers/${serverId}/members/${userId}`,
	/**
	 * The REST API endpoint for server members.
	 * @param serverId The ID of the server.
	 *
	 * @see https://www.guilded.gg/docs/api/members/ServerMemberReadMany
	 */
	serverMembers: (serverId: string): `/servers/${string}/members` =>
		`/servers/${serverId}/members`,
	/**
	 * The REST API endpoint for a server ban.
	 * @param serverId The ID of the server.
	 * @param userId The ID of the user.
	 *
	 * @see https://www.guilded.gg/docs/api/member-bans/ServerMemberBanCreate
	 * @see https://www.guilded.gg/docs/api/member-bans/ServerMemberBanRead
	 * @see https://www.guilded.gg/docs/api/member-bans/ServerMemberBanDelete
	 */
	serverBan: (serverId: string, userId: string): `/servers/${string}/bans/${string}` =>
		`/servers/${serverId}/bans/${userId}`,
	/**
	 * The REST API endpoint for server bans.
	 * @param serverId The ID of the server.
	 *
	 * @see https://www.guilded.gg/docs/api/member-bans/ServerMemberBanReadMany
	 */
	serverBans: (serverId: string): `/servers/${string}/bans` => `/servers/${serverId}/bans`,
	/**
	 * The REST API endpoint for channel forums.
	 * @param channelId The ID of the channel.
	 *
	 * @see https://www.guilded.gg/docs/api/forums/ForumThreadCreate
	 */
	forums: (channelId: string): `/channels/${string}/forum` => `/channels/${channelId}/forum`,
	/**
	 * The REST API endpoint for channel list items.
	 * @param channelId The ID of the channel.
	 *
	 * @see https://www.guilded.gg/docs/api/listItems/ListItemCreate
	 * @see https://www.guilded.gg/docs/api/listItems/ListItemReadMany
	 */
	listItems: (channelId: string): `/channels/${string}/items` => `/channels/${channelId}/items`,
	/**
	 * The REST API endpoint for a channel list item.
	 * @param channelId The ID of the channel.
	 * @param listItemId The ID of the list item.
	 *
	 * @see https://www.guilded.gg/docs/api/listItems/ListItemRead
	 * @see https://www.guilded.gg/docs/api/listItems/ListItemUpdate
	 * @see https://www.guilded.gg/docs/api/listItems/ListItemDelete
	 */
	listItem: (channelId: string, listItemId: string): `/channels/${string}/items/${string}` =>
		`/channels/${channelId}/items/${listItemId}`,
	/**
	 * The REST API endpoint for completing and uncompleting a channel list item.
	 *  @param channelId The ID of the channel.
	 *  @param listItemId The ID of the list item.
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
	 * The REST API endpoint for channel docs.
	 * @param channelId The ID of the channel.
	 *
	 * @see https://www.guilded.gg/docs/api/docs/DocCreate
	 * @see https://www.guilded.gg/docs/api/docs/DocReadMany
	 */
	docs: (channelId: string): `/channels/${string}/docs` => `/channels/${channelId}/docs`,
	/**
	 * The REST API endpoint for a channel doc.
	 * @param channelId The ID of the channel.
	 * @param docId The ID of the doc.
	 *
	 * @see https://www.guilded.gg/docs/api/docs/DocRead
	 * @see https://www.guilded.gg/docs/api/docs/DocUpdate
	 * @see https://www.guilded.gg/docs/api/docs/DocDelete
	 */
	doc: (channelId: string, docId: number): `/channels/${string}/docs/${number}` =>
		`/channels/${channelId}/docs/${docId}`,
	/**
	 * The REST API endpoint for a content reaction.
	 * @param channelId The ID of the channel.
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
	 * The REST API endpoint for server member XP.
	 * @param serverId The ID of the server.
	 * @param userId The ID of the user.
	 *
	 * @see https://www.guilded.gg/docs/api/server-xp/ServerXpForUserCreate
	 */
	serverMemberXP: (serverId: string, userId: string): `/servers/${string}/members/${string}/xp` =>
		`/servers/${serverId}/members/${userId}/xp`,
	/**
	 * The REST API endpoint for server role XP.
	 * @param serverId The ID of the server.
	 * @param roleId The ID of the role.
	 *
	 * @see https://www.guilded.gg/docs/api/server-xp/ServerXpForRoleCreate
	 */
	serverRoleXP: (serverId: string, roleId: number): `/servers/${string}/roles/${number}/xp` =>
		`/servers/${serverId}/roles/${roleId}/xp`,
	/**
	 * The REST API endpoint for a server member social link.
	 * @param serverId The ID of the server.
	 * @param userId The ID of the user.
	 * @param type The type of social link.
	 *
	 * @see https://www.guilded.gg/docs/api/socialLinks/MemberSocialLinkRead
	 */
	socialLink: (
		serverId: string,
		userId: string,
		type: string,
	): `/servers/${string}/members/${string}/social-links/${string}` =>
		`/servers/${serverId}/members/${userId}/social-links/${type}`,
	/**
	 * The REST API endpoint for a group member.
	 * @param groupId The ID of the group.
	 * @param userId The ID of the user.
	 *
	 * @see https://www.guilded.gg/docs/api/groupMembership/GroupMembershipCreate
	 * @see https://www.guilded.gg/docs/api/groupMembership/GroupMembershipDelete
	 */
	groupMember: (groupId: string, userId: string): `/groups/${string}/members/${string}` =>
		`/groups/${groupId}/members/${userId}`,
	/**
	 * The REST API endpoint for a server member role.
	 * @param serverId The ID of the server.
	 * @param userId The ID of the user.
	 * @param roleId The ID of the role.
	 *
	 * @see https://www.guilded.gg/docs/api/roleMembership/RoleMembershipCreate
	 * @see https://www.guilded.gg/docs/api/roleMembership/RoleMembershipDelete
	 */
	serverMemberRole: (
		serverId: string,
		userId: string,
		roleId: number,
	): `/servers/${string}/members/${string}/roles/${number}` =>
		`/servers/${serverId}/members/${userId}/roles/${roleId}`,
	/**
	 * The REST API endpoint for server member roles.
	 * @param serverId The ID of the server.
	 * @param userId The ID of the user.
	 *
	 * @see https://www.guilded.gg/docs/api/roleMembership/RoleMembershipReadMany
	 */
	serverMemberRoles: (
		serverId: string,
		userId: string,
	): `/servers/${string}/members/${string}/roles` =>
		`/servers/${serverId}/members/${userId}/roles`,
	/**
	 * The REST API endpoint for server webhooks.
	 * @param serverId The ID of the server.
	 *
	 * @see https://www.guilded.gg/docs/api/webhook/WebhookCreate
	 * @see https://www.guilded.gg/docs/api/webhook/WebhookReadMany
	 */
	webhooks: (serverId: string): `/servers/${string}/webhooks` => `/servers/${serverId}/webhooks`,
	/**
	 * The REST API endpoint for a server webhook.
	 * @param serverId The ID of the server.
	 * @param webhookId The ID of the webhook.
	 *
	 * @see https://www.guilded.gg/docs/api/webhook/WebhookRead
	 * @see https://www.guilded.gg/docs/api/webhook/WebhookUpdate
	 * @see https://www.guilded.gg/docs/api/webhook/WebhookDelete
	 */
	webhook: (serverId: string, webhookId: string): `/servers/${string}/webhooks/${string}` =>
		`/servers/${serverId}/webhooks/${webhookId}`,
};
