import {
	APIServerBan,
	APIServerMember,
	APIUser,
	WebSocketBaseEventPayload,
	WebSocketEvent,
} from '../../v1';

/**
 * https://www.guilded.gg/docs/api/websockets/ServerMemberJoined
 */
export type WebSocketServerMemberAddEventPayload = WebSocketBaseEventPayload<
	WebSocketEvent.ServerMemberAdd,
	WebSocketServerMemberAddEventData
>;
/**
 * https://www.guilded.gg/docs/api/websockets/ServerMemberJoined
 */
export interface WebSocketServerMemberAddEventData {
	/**
	 * The ID of the server
	 */
	serverId: string;
	/**
	 * The server member
	 */
	member: APIServerMember;
}

/**
 * https://www.guilded.gg/docs/api/websockets/ServerMemberRemoved
 */
export type WebSocketServerMemberRemoveEventPayload = WebSocketBaseEventPayload<
	WebSocketEvent.ServerMemberRemove,
	WebSocketServerMemberRemoveEventData
>;
/**
 * https://www.guilded.gg/docs/api/websockets/ServerMemberRemoved
 */
export interface WebSocketServerMemberRemoveEventData {
	/**
	 * The ID of the server
	 */
	serverId: string;
	/**
	 * The ID of the user
	 */
	userId: string;
	/**
	 * Whether the server member was kicked
	 *
	 * @default false
	 */
	isKick?: boolean;
	/**
	 * Whether the server member was banned
	 *
	 * @default false
	 */
	isBan?: boolean;
}

/**
 * https://www.guilded.gg/docs/api/websockets/ServerMemberBanned
 */
export type WebSocketServerBanAddEventPayload = WebSocketBaseEventPayload<
	WebSocketEvent.ServerBanAdd,
	WebSocketServerBanAddEventData
>;
/**
 * https://www.guilded.gg/docs/api/websockets/ServerMemberBanned
 */
export interface WebSocketServerBanAddEventData {
	/**
	 * The ID of the server
	 */
	serverId: string;
	/**
	 * The server ban
	 */
	serverMemberBan: APIServerBan;
}

/**
 * https://www.guilded.gg/docs/api/websockets/ServerMemberUnbanned
 */
export type WebSocketServerBanRemoveEventPayload = WebSocketBaseEventPayload<
	WebSocketEvent.ServerBanRemove,
	WebSocketServerBanRemoveEventData
>;
/**
 * https://www.guilded.gg/docs/api/websockets/ServerMemberUnbanned
 */
export type WebSocketServerBanRemoveEventData = WebSocketServerBanAddEventData;

/**
 * https://www.guilded.gg/docs/api/websockets/ServerMemberUpdated
 */
export type WebSocketServerMemberUpdateEventPayload = WebSocketBaseEventPayload<
	WebSocketEvent.ServerMemberUpdate,
	WebSocketServerMemberUpdateEventData
>;
/**
 * https://www.guilded.gg/docs/api/websockets/ServerMemberUpdated
 */
export interface WebSocketServerMemberUpdateEventData {
	/**
	 * The ID of the server
	 */
	serverId: string;
	/**
	 * The user info
	 */
	userInfo: Pick<APIUser, 'id'> & Pick<APIServerMember, 'nickname'>;
}

/**
 * https://www.guilded.gg/docs/api/websockets/ServerRolesUpdated
 */
export type WebSocketServerRolesUpdateEventPayload = WebSocketBaseEventPayload<
	WebSocketEvent.ServerRolesUpdate,
	WebSocketServerRolesUpdateEventData
>;
/**
 * https://www.guilded.gg/docs/api/websockets/ServerRolesUpdated
 */
export interface WebSocketServerRolesUpdateEventData {
	/**
	 * The ID of the server
	 */
	serverId: string;
	/**
	 * The IDs of roles of updated server members
	 */
	memberRoleIds: ({
		/**
		 * The ID of the user
		 */
		userId: string;
	} & Pick<APIServerMember, 'roleIds'>)[];
}
