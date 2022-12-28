/**
 * https://www.guilded.gg/docs/api/members/User
 */
export interface APIUser extends APIUserSummary {
	/**
	 * The banner of the user
	 */
	banner?: string;
	/**
	 * When the user was created
	 */
	createdAt: string;
}

/**
 * https://www.guilded.gg/docs/api/members/UserSummary
 */
export interface APIUserSummary {
	/**
	 * The ID of the user
	 */
	id: string;
	/**
	 * The type of user
	 *
	 * @default UserType.User
	 */
	type?: UserType;
	/**
	 * The name of the user
	 */
	name: string;
	/**
	 * The avatar of the user
	 */
	avatar?: string;
}

/**
 * https://www.guilded.gg/docs/api/members/User
 * https://www.guilded.gg/docs/api/members/UserSummary
 */
export enum UserType {
	/**
	 * A user
	 */
	User = 'user',
	/**
	 * A bot
	 */
	Bot = 'bot',
}

/**
 * Not documented. Sent from WebSocket ready payload.
 */
export interface APIBot extends Omit<APIUser, 'avatar' | 'banner' | 'type'> {
	/**
	 * The ID of the bot
	 */
	botId: string;
	/**
	 * The ID of the user that created the bot
	 */
	createdBy: string;
}
