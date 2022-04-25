import {
	APIChatMessage,
	APIDeletedChatMessage,
	APIServerMember,
	APIServerMemberBan,
	APIWebhook,
} from '.';

/**
 * Guilded API websocket events.
 * @see https://www.guilded.gg/docs/api/websockets
 */
export interface WSEvents {
	/**
	 * Emitted when a message is created.
	 * @see https://www.guilded.gg/docs/api/websockets/ChatMessageCreated
	 */
	ChatMessageCreated: {
		serverId: string;
		message: APIChatMessage;
	};
	/**
	 * Emitted when a chat message is edited.
	 * @see https://www.guilded.gg/docs/api/websockets/ChatMessageUpdated
	 */
	ChatMessageUpdated: {
		serverId: string;
		message: APIChatMessage;
	};
	/**
	 * Emitted when a chat message is deleted.
	 * @see https://www.guilded.gg/docs/api/websockets/ChatMessageDeleted
	 */
	ChatMessageDeleted: {
		serverId: string;
		message: APIDeletedChatMessage;
	};
	/**
	 * Emitted whan a user joins a server.
	 * @see https://www.guilded.gg/docs/api/websockets/TeamMemberJoined
	 */
	TeamMemberJoined: {
		serverId: string;
		member: APIServerMember;
	};
	/**
	 * Emitted when a user leaves a server.
	 * @see https://www.guilded.gg/docs/api/websockets/TeamMemberRemoved
	 */
	TeamMemberRemoved: {
		serverId: string;
		userId: string;
		isKick: boolean;
		isBan: boolean;
	};
	/**
	 * Emitted when a user is banned from a server.
	 * @see https://www.guilded.gg/docs/api/websockets/TeamMemberBanned
	 */
	TeamMemberBanned: {
		serverId: string;
		serverMemberBan: APIServerMemberBan;
	};
	/**
	 * Emitted when a user is unbanned from a server.
	 * @see https://www.guilded.gg/docs/api/websockets/TeamMemberUnbanned
	 */
	TeamMemberUnbanned: {
		serverId: string;
		serverMemberBan: APIServerMemberBan;
	};
	/**
	 * Emitted when a server member is updated.
	 * @see https://www.guilded.gg/docs/api/websockets/TeamMemberUpdated
	 */
	TeamMemberUpdated: {
		serverId: string;
		userInfo: {
			id: string;
			nickname: string;
		};
	};
	/**
	 * Emitted when team roles are updated.
	 * @see https://www.guilded.gg/docs/api/websockets/teamRolesUpdated
	 */
	teamRolesUpdated: {
		serverId: string;
		memberRoleIds: {
			userId: string;
			roleIds: number[];
		}[];
	};
	/**
	 * Emitted when a webhook is created.
	 * @see https://www.guilded.gg/docs/api/websockets/TeamWebhookCreated
	 */
	TeamWebhookCreated: {
		serverId: string;
		webhook: APIWebhook;
	};
	/**
	 * Emitted when a webhook is updated.
	 * @see https://www.guilded.gg/docs/api/websockets/TeamWebhookUpdated
	 */
	TeamWebhookUpdated: {
		serverId: string;
		webhook: APIWebhook;
	};
}
