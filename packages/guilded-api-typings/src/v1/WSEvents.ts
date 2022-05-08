import {
	APIChannel,
	APIChatMessage,
	APIDeletedChatMessage,
	APIDoc,
	APIListItem,
	APIServerMember,
	APIServerMemberBan,
	APIWebhook,
} from './structures';

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
		/** The ID of the server this message was sent in. */
		serverId: string;
		/** The message that was created. */
		message: APIChatMessage;
	};
	/**
	 * Emitted when a chat message is edited.
	 * @see https://www.guilded.gg/docs/api/websockets/ChatMessageUpdated
	 */
	ChatMessageUpdated: {
		/** The ID of the server this message was edited in. */
		serverId: string;
		/** The message that was edited. */
		message: APIChatMessage;
	};
	/**
	 * Emitted when a chat message is deleted.
	 * @see https://www.guilded.gg/docs/api/websockets/ChatMessageDeleted
	 */
	ChatMessageDeleted: {
		/** The ID of the server this message was deleted in. */
		serverId: string;
		/** The message that was deleted. */
		message: APIDeletedChatMessage;
	};
	/**
	 * Emitted whan a user joins a server.
	 * @see https://www.guilded.gg/docs/api/websockets/TeamMemberJoined
	 */
	TeamMemberJoined: {
		/** The ID of the server this user joined. */
		serverId: string;
		/** The user that joined the server. */
		member: APIServerMember;
	};
	/**
	 * Emitted when a user leaves a server.
	 * @see https://www.guilded.gg/docs/api/websockets/TeamMemberRemoved
	 */
	TeamMemberRemoved: {
		/** The ID of the server this user left. */
		serverId: string;
		/** The user that left the server. */
		userId: string;
		/** Whether the user was kicked from the server. */
		isKick: boolean;
		/** Whether the user was banned from the server. */
		isBan: boolean;
	};
	/**
	 * Emitted when a user is banned from a server.
	 * @see https://www.guilded.gg/docs/api/websockets/TeamMemberBanned
	 */
	TeamMemberBanned: {
		/** The ID of the server this user was banned from. */
		serverId: string;
		/** The created server ban. */
		serverMemberBan: APIServerMemberBan;
	};
	/**
	 * Emitted when a user is unbanned from a server.
	 * @see https://www.guilded.gg/docs/api/websockets/TeamMemberUnbanned
	 */
	TeamMemberUnbanned: {
		/** The ID of the server this user was unbanned from. */
		serverId: string;
		/** The deleted server ban. */
		serverMemberBan: APIServerMemberBan;
	};
	/**
	 * Emitted when a server member is edited.
	 * @see https://www.guilded.gg/docs/api/websockets/TeamMemberUpdated
	 */
	TeamMemberUpdated: {
		/** The ID of the server this member was edited in. */
		serverId: string;
		/** The updated information about the server member. */
		userInfo: {
			/** The ID of the user that was edited. */
			id: string;
			/** The new nickname of the user. */
			nickname: string;
		};
	};
	/**
	 * Emitted when server roles are edited.
	 * @see https://www.guilded.gg/docs/api/websockets/teamRolesUpdated
	 */
	teamRolesUpdated: {
		/** The ID of the server the roles were edited in. */
		serverId: string;
		/** The updated roles. */
		memberRoleIds: {
			/** The ID of the member that was edited. */
			userId: string;
			/** The IDs of the roles the member now has. */
			roleIds: number[];
		}[];
	};
	/**
	 * Emitted when a server channel is created.
	 * @see https://www.guilded.gg/docs/api/websockets/TeamChannelCreated
	 */
	TeamChannelCreated: {
		/** The ID of the server this channel was created in. */
		serverId: string;
		/** The created channel. */
		channel: APIChannel;
	};
	/**
	 * Emitted when a server channel is edited.
	 * @see https://www.guilded.gg/docs/api/websockets/TeamChannelUpdated
	 */
	TeamChannelUpdated: {
		/** The ID of the server this channel was edited in. */
		serverId: string;
		/** The edited channel. */
		channel: APIChannel;
	};
	/**
	 * Emitted when a server channel is deleted.
	 * @see https://www.guilded.gg/docs/api/websockets/TeamChannelDeleted
	 */
	TeamChannelDeleted: {
		/** The ID of the server this channel was deleted in. */
		serverId: string;
		/** The deleted channel. */
		channel: APIChannel;
	};
	/**
	 * Emitted when a webhook is created.
	 * @see https://www.guilded.gg/docs/api/websockets/TeamWebhookCreated
	 */
	TeamWebhookCreated: {
		/** The ID of the server this webhook was created in. */
		serverId: string;
		/** The created webhook. */
		webhook: APIWebhook;
	};
	/**
	 * Emitted when a webhook is edited.
	 * @see https://www.guilded.gg/docs/api/websockets/TeamWebhookUpdated
	 */
	TeamWebhookUpdated: {
		/** The ID of the server this webhook was edited in. */
		serverId: string;
		/** The edited webhook. */
		webhook: APIWebhook;
	};
	/**
	 * Emitted when a doc is created.
	 * @see https://www.guilded.gg/docs/api/websockets/DocCreated
	 */
	DocCreated: {
		/** The ID of the server this doc was created in. */
		serverId: string;
		/** The created doc. */
		doc: APIDoc;
	};
	/**
	 * Emitted when a doc is edited.
	 * @see https://www.guilded.gg/docs/api/websockets/DocUpdated
	 */
	DocUpdated: {
		/** The ID of the server this doc was edited in. */
		serverId: string;
		/** The edited doc. */
		doc: APIDoc;
	};
	/**
	 * Emitted when a doc is deleted.
	 * @see https://www.guilded.gg/docs/api/websockets/DocDeleted
	 */
	DocDeleted: {
		/** The ID of the server this doc was deleted in. */
		serverId: string;
		/** The deleted doc. */
		doc: APIDoc;
	};
	/**
	 * Emitted when a list item is created.
	 * @see https://www.guilded.gg/docs/api/websockets/ListItemCreated
	 */
	ListItemCreated: {
		/** The ID of the server this list item was created in. */
		serverId: string;
		/** The created list item. */
		listItem: APIListItem;
	};
	/**
	 * Emitted when a list item is edited.
	 * @see https://www.guilded.gg/docs/api/websockets/ListItemUpdated
	 */
	ListItemUpdated: {
		/** The ID of the server this list item was edited in. */
		serverId: string;
		/** The edited list item. */
		listItem: APIListItem;
	};
	/**
	 * Emitted when a list item is deleted.
	 * @see https://www.guilded.gg/docs/api/websockets/ListItemDeleted
	 */
	ListItemDeleted: {
		/** The ID of the server this list item was deleted in. */
		serverId: string;
		/** The deleted list item. */
		listItem: APIListItem;
	};
	/**
	 * Emitted when a list item is completed.
	 * @see https://www.guilded.gg/docs/api/websockets/ListItemCompleted
	 */
	ListItemCompleted: {
		/** The ID of the server this list item was completed in. */
		serverId: string;
		/** The completed list item. */
		listItem: APIListItem;
	};
	/**
	 * Emitted when a list item is uncompleted.
	 * @see https://www.guilded.gg/docs/api/websockets/ListItemUncompleted
	 */
	ListItemUncompleted: {
		/** The ID of the server this list item was uncompleted in. */
		serverId: string;
		/** The uncompleted list item. */
		listItem: APIListItem;
	};
}
