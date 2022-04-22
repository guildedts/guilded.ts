import { APIUser, APIUserSummary } from '..';

/**
 * The API server member object.
 * @see https://www.guilded.gg/docs/api/members/ServerMember
 */
export interface APIServerMember extends APIServerMemberSummary {
	/** The user of the server member. */
	user: APIUser;
	/** The nickname of the server member. */
	nickname?: string;
	/** The time the server member joined. */
	joinedAt: string;
}

/**
 * The API server member summary object.
 * @see https://www.guilded.gg/docs/api/members/ServerMemberSummary
 */
export interface APIServerMemberSummary {
	/** The user of the server member. */
	user: APIUserSummary;
	/** The role IDs of the roles the server member has. */
	roleIds: number[];
}

/**
 * The API server member ban object.
 * @see https://www.guilded.gg/docs/api/member-bans/ServerMemberBan
 */
export interface APIServerMemberBan {
	/** The user that was banned. */
	user: APIUserSummary;
	/** The reason for the ban. */
	reason?: string;
	/** The ID of the user who created the ban. */
	createdBy: string;
	/** The time the ban was created. */
	createdAt: string;
}

/**
 * The payload for creating a server member ban.
 * @see https://www.guilded.gg/docs/api/member-bans/ServerMemberBanCreate
 */
export interface APIServerMemberBanPayload {
	/** The reason for the ban. */
	reason?: string;
}

/**
 * The payload for awarding xp.
 * @see https://www.guilded.gg/docs/api/server-xp/ServerXpForUserCreate
 */
export interface APIServerXpPayload {
	amount: number;
}

/**
 * The API member social link object.
 * @see https://www.guilded.gg/docs/api/socialLinks/MemberSocialLinkRead
 */
export interface APISocialLink {
	handle?: string;
	serviceId?: string;
	type: APISocialLinkType;
}

/**
 * The API member social link types.
 * @see https://www.guilded.gg/docs/api/socialLinks/MemberSocialLinkRead
 */
export type APISocialLinkType =
	| 'twitch'
	| 'bnet'
	| 'psn'
	| 'xbox'
	| 'steam'
	| 'origin'
	| 'youtube'
	| 'twitter'
	| 'facebook'
	| 'switch'
	| 'patreon'
	| 'roblox';
