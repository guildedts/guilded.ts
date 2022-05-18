import { APIUser, APIUserSummary } from './User';

/**
 * The API server member model.
 * @see https://www.guilded.gg/docs/api/members/ServerMember
 */
export interface APIServerMember extends APIServerMemberSummary {
	/** The user of the server member. */
	user: APIUser;
	/** The nickname of the server member. */
	nickname?: string;
	/** The date the server member joined the server. */
	joinedAt: string;
	/** Whether the server member is the owner of the server. */
	isOwner?: boolean;
}

/**
 * The API server member summary model.
 * @see https://www.guilded.gg/docs/api/members/ServerMemberSummary
 */
export interface APIServerMemberSummary {
	/** The user of the server member. */
	user: APIUserSummary;
	/** The IDs of roles the server member has. */
	roleIds: number[];
}

/**
 * The API server ban model.
 * @see https://www.guilded.gg/docs/api/member-bans/ServerMemberBan
 */
export interface APIServerBan {
	/** The user that was banned. */
	user: APIUserSummary;
	/** The reason for the ban. */
	reason?: string;
	/** The ID of the user who created the ban. */
	createdBy: string;
	/** The date the ban was created. */
	createdAt: string;
}

/** The payload for editing a server member nickname. */
export interface APIServerMemberNicknamePayload {
	/** The nickname of the server member. */
	nickname: string;
}

/**
 * The payload for creating a server ban.
 * @see https://www.guilded.gg/docs/api/member-bans/ServerMemberBanCreate
 */
export interface APIServerBanPayload {
	/** The reason for the ban. */
	reason?: string;
}

/**
 * The payload for awarding xp.
 * @see https://www.guilded.gg/docs/api/server-xp/ServerXpForUserCreate
 */
export interface APIServerXPPayload {
	/** The amount of XP to award. */
	amount: number;
}

/**
 * The API social link model.
 * @see https://www.guilded.gg/docs/api/socialLinks/MemberSocialLinkRead
 */
export interface APISocialLink {
	/** The name of the external social link. */
	handle?: string;
	/** The ID of the external social link. */
	serviceId?: string;
	/** The type of social link. */
	type: string;
}
