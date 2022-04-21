/** The Guilded REST API endpoints. */
export declare const Routes: {
	channelMessages: (channelId: string) => `/channels/${string}/messages`;
	channelMessage: (
		channelId: string,
		messageId: string,
	) => `/channels/${string}/messages/${string}`;
	userNickname: (
		serverId: string,
		userId: string,
	) => `/servers/${string}/users/${string}/nickname`;
	serverMember: (serverId: string, userId: string) => `/servers/${string}/members/${string}`;
	serverMembers: (serverId: string) => `/servers/${string}/members`;
	serverBan: (serverId: string, userId: string) => `/servers/${string}/bans/${string}`;
	serverBans: (serverId: string) => `/servers/${string}/bans`;
	channelForum: (channelId: string) => `/channels/${string}/forum`;
	channelListItems: (channelId: string) => `/channels/${string}/items`;
	channelListItem: (
		channelId: string,
		listItemId: string,
	) => `/channels/${string}/items/${string}`;
	channelDocs: (channelId: string) => `/channels/${string}/docs`;
	channelDoc: (channelId: string, docId: string) => `/channels/${string}/docs/${string}`;
	messageReaction: (
		channelId: string,
		contentId: string,
		emoteId: string,
	) => `/channels/${string}/content/${string}/emotes/${string}`;
	memberXp: (serverId: string, userId: string) => `/servers/${string}/members/${string}/xp`;
	roleExp: (serverId: string, roleId: string) => `/servers/${string}/roles/${string}/xp`;
	memberSocialLink: (
		serverId: string,
		userId: string,
		type: string,
	) => `/servers/${string}/members/${string}/social-links/${string}`;
	groupMember: (groupId: string, userId: string) => `/groups/${string}/members/${string}`;
	memberRole: (
		serverId: string,
		userId: string,
		roleId: string,
	) => `/servers/${string}/members/${string}/roles/${string}`;
	memberRoles: (serverId: string, userId: string) => `/servers/${string}/members/${string}/roles`;
	serverWebhooks: (serverId: string) => `/servers/${string}/webhooks`;
	serverWebhook: (serverId: string, webhookId: string) => `/servers/${string}/webhooks/${string}`;
};
//# sourceMappingURL=Routes.d.ts.map
