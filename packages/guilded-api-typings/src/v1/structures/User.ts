/**
 * Represents a user on Guilded.
 * @see https://www.guilded.gg/docs/api/members/User
 */
export interface APIUser extends APIUserSummary {
	/** The URL of the user's banner. */
	banner?: string;
	/** The date the user was created. */
	createdAt: string;
}

/**
 * Represents a summary of a user on Guilded.
 * @see https://www.guilded.gg/docs/api/members/UserSummary
 */
export interface APIUserSummary {
	/** The ID of the user. */
	id: string;
	/** The type of the user. */
	type?: UserType;
	/** The name of the user. */
	name: string;
	/** The URL of the user's avatar. */
	avatar?: string;
}

/**
 * The type of a user on Guilded.
 * @see https://www.guilded.gg/docs/api/members/User
 * @see https://www.guilded.gg/docs/api/members/UserSummary
 */
export enum UserType {
	Bot = 'bot',
	User = 'user',
}

/** Represents a client user. */
export interface APIClientUser extends APIUser {
	/** The bot ID of the client user. */
	botId: string;
	/** The ID of the user that created the client user. */
	createdBy: string;
}
