import { APIUser, APIUserSummary } from '..';

/**
 * The API server member object.
 * @see https://www.guilded.gg/docs/api/members/ServerMember
 */
export interface APIServerMember extends APIServerMemberSummary {
	user: APIUser;
	nickname?: string;
	joinedAt: string;
}

/**
 * The API server member summary object.
 * @see https://www.guilded.gg/docs/api/members/ServerMemberSummary
 */
export interface APIServerMemberSummary {
	user: APIUserSummary;
	roleIds: number[];
}

/**
 * The API server member nickname object.
 * @see https://www.guilded.gg/docs/api/members/MemberNicknameUpdate
 */
export interface APIServerMemberNickname {
	nickname: string;
}

/**
 * The API server member ban object.
 * @see https://www.guilded.gg/docs/api/member-bans/ServerMemberBan
 */
export interface APIServerMemberBan {
	user: APIUserSummary;
	reason?: string;
	createdBy: string;
	createdAt: string;
}

/**
 * The payload for creating a server member ban.
 * @see https://www.guilded.gg/docs/api/member-bans/ServerMemberBanCreate
 */
export interface APIServerMemberBanPayload {
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
