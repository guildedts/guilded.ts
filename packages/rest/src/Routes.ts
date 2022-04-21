/** The Guilded REST API endpoints. */
export const Routes = {
	channelMessages: (channelId: string): `/channels/${string}/messages` =>
		`/channels/${channelId}/messages`,

	channelMessage: (
		channelId: string,
		messageId: string,
	): `/channels/${string}/messages/${string}` => `/channels/${channelId}/messages/${messageId}`,

	userNickname: (
		serverId: string,
		userId: string,
	): `/servers/${string}/users/${string}/nickname` =>
		`/servers/${serverId}/users/${userId}/nickname`,

	serverMember: (serverId: string, userId: string): `/servers/${string}/members/${string}` =>
		`/servers/${serverId}/members/${userId}`,

	serverMembers: (serverId: string): `/servers/${string}/members` =>
		`/servers/${serverId}/members`,

	serverBan: (serverId: string, userId: string): `/servers/${string}/bans/${string}` =>
		`/servers/${serverId}/bans/${userId}`,

	serverBans: (serverId: string): `/servers/${string}/bans` => `/servers/${serverId}/bans`,

	channelForum: (channelId: string): `/channels/${string}/forum` =>
		`/channels/${channelId}/forum`,

	channelListItems: (channelId: string): `/channels/${string}/items` =>
		`/channels/${channelId}/items`,

	channelListItem: (
		channelId: string,
		listItemId: string,
	): `/channels/${string}/items/${string}` => `/channels/${channelId}/items/${listItemId}`,

	channelDocs: (channelId: string): `/channels/${string}/docs` => `/channels/${channelId}/docs`,

	channelDoc: (channelId: string, docId: string): `/channels/${string}/docs/${string}` =>
		`/channels/${channelId}/docs/${docId}`,

	messageReaction: (
		channelId: string,
		contentId: string,
		emoteId: string,
	): `/channels/${string}/content/${string}/emotes/${string}` =>
		`/channels/${channelId}/content/${contentId}/emotes/${emoteId}`,

	memberXp: (serverId: string, userId: string): `/servers/${string}/members/${string}/xp` =>
		`/servers/${serverId}/members/${userId}/xp`,

	roleExp: (serverId: string, roleId: string): `/servers/${string}/roles/${string}/xp` =>
		`/servers/${serverId}/roles/${roleId}/xp`,

	memberSocialLink: (
		serverId: string,
		userId: string,
		type: string,
	): `/servers/${string}/members/${string}/social-links/${string}` =>
		`/servers/${serverId}/members/${userId}/social-links/${type}`,

	groupMember: (groupId: string, userId: string): `/groups/${string}/members/${string}` =>
		`/groups/${groupId}/members/${userId}`,

	memberRole: (
		serverId: string,
		userId: string,
		roleId: string,
	): `/servers/${string}/members/${string}/roles/${string}` =>
		`/servers/${serverId}/members/${userId}/roles/${roleId}`,

	memberRoles: (serverId: string, userId: string): `/servers/${string}/members/${string}/roles` =>
		`/servers/${serverId}/members/${userId}/roles`,

	serverWebhooks: (serverId: string): `/servers/${string}/webhooks` =>
		`/servers/${serverId}/webhooks`,

	serverWebhook: (serverId: string, webhookId: string): `/servers/${string}/webhooks/${string}` =>
		`/servers/${serverId}/webhooks/${webhookId}`,
};
