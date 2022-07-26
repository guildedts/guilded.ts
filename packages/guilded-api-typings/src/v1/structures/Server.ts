import { APIUser, APIUserSummary } from './User';

/**
 * Represents a server on Guilded.
 * @see https://www.guilded.gg/docs/api/servers/Server
 */
export interface APIServer {
	/** The ID of the server. */
	id: string;
	/** The ID of the user the server belongs to. */
	ownerId: string;
	/** The type of the server. */
	type?: ServerType;
	/** The name of the server. */
	name: string;
	/** The vanity URL of the server. */
	url?: string;
	/** The description of the server. */
	about?: string;
	/** The URL of the server's avatar. */
	avatar?: string;
	/** The URL of the server's banner. */
	banner?: string;
	/** The timezone of the server. */
	timezone?: string;
	/** Whether the server is verified. */
	isVerified?: boolean;
	/** The ID of the server's default channel. */
	defaultChannelId?: string;
	/** The date the server was created. */
	createdAt: string;
}

/**
 * The type of a server on Guilded.
 * @see https://www.guilded.gg/docs/api/servers/Server
 */
export enum ServerType {
	Team = 'team',
	Organization = 'organization',
	Community = 'community',
	Clan = 'clan',
	Guild = 'guild',
	Friends = 'friends',
	Streaming = 'streaming',
	Other = 'other',
}

/**
 * Represents a server member on Guilded.
 * @see https://www.guilded.gg/docs/api/members/ServerMember
 */
export interface APIServerMember extends APIServerMemberSummary {
	user: APIUser;
	/** The nickname of the server member. */
	nickname?: string;
	/** The date the member joined the server. */
	joinedAt: string;
	/** Whether the server member is the owner of the server. */
	isOwner?: boolean;
}

/**
 * Represents a summary of a server member on Guilded.
 * @see https://www.guilded.gg/docs/api/members/ServerMemberSummary
 */
export interface APIServerMemberSummary {
	/** The user the server member belongs to. */
	user: APIUserSummary;
	/** The IDs of roles that belong to the server member. */
	roleIds: number[];
}

/**
 * Represents a server ban on Guilded.
 * @see https://www.guilded.gg/docs/api/member-bans/ServerMemberBan
 */
export interface APIServerBan {
	/** The user the server ban belongs to. */
	user: APIUserSummary;
	/** The reason of the server ban. */
	reason?: string;
	/** The ID of the user that created the server ban. */
	createdBy: string;
	/** The date the server ban was created. */
	createdAt: string;
}

/**
 * The payload for editing the nickname of a server member.
 * @see https://www.guilded.gg/docs/api/members/MemberNicknameUpdate
 */
export interface APIServerNicknameEditPayload {
	/** The nickname of the server member. */
	nickname: string;
}

/**
 * The payload for creating a server ban.
 * @see https://www.guilded.gg/docs/api/member-bans/ServerMemberBanCreate
 */
export interface APIServerBanPayload {
	/** The reason of the server ban. */
	reason?: string;
}

/**
 * The payload for awarding XP.
 * @see https://www.guilded.gg/docs/api/server-xp/ServerXpForUserCreate
 * @see https://www.guilded.gg/docs/api/server-xp/ServerXpForRoleCreate
 */
export interface APIServerXpPayload {
	/** The amount of XP to award. */
	amount: number;
}

/**
 * Represents a social link on Guilded.
 * @see https://www.guilded.gg/docs/api/socialLinks/MemberSocialLinkRead
 */
export interface APISocialLink {
	/** The handle of the social link. */
	handle?: string;
	/** The ID of the service the social link belongs to. */
	serviceId?: string;
	/** The type of the social link. */
	type: string;
}

/**
 * Represents a emote on Guilded.
 * @see https://www.guilded.gg/docs/api/emote/Emote
 */
export interface APIEmote {
	/** The ID of the emote. */
	id: number;
	/** The name of the emote. */
	name: string;
	/** The URL of the emote. */
	url: string;
}
