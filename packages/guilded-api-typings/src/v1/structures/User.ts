/**
 * The API user object.
 * @see https://www.guilded.gg/docs/api/members/User
 */
export interface APIUser extends APIUserSummary {
	/** The URL of the user's banner. */
	banner?: string;
	/** The time the user was created. */
	createdAt: string;
}

/**
 * The API user summary object.
 * @see https://www.guilded.gg/docs/api/members/UserSummary
 */
export interface APIUserSummary {
	/** The ID of the user. */
	id: string;
	/** The type of user. */
	type?: APIUserType;
	/** The name of the user. */
	name: string;
	/** The URL of the user's avatar. */
	avatar?: string;
}

/**
 * The API user types.
 * @see https://www.guilded.gg/docs/api/members/User
 */
export type APIUserType = 'bot' | 'user';
