/**
 * The API user object.
 * @see https://www.guilded.gg/docs/api/members/User
 */
export interface APIUser extends APIUserSummary {
	createdAt: string;
}

/**
 * The API user summary object.
 * @see https://www.guilded.gg/docs/api/members/UserSummary
 */
export interface APIUserSummary {
	id: string;
	type?: APIUserType;
	name: string;
}

/**
 * The API user types.
 * @see https://www.guilded.gg/docs/api/members/User
 */
export type APIUserType = 'bot' | 'user';
