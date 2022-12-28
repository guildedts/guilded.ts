import { APIUser, APIUserSummary } from './users';

/**
 * https://www.guilded.gg/docs/api/servers/Server
 */
export interface APIServer {
	/**
	 * The ID of the server
	 */
	id: string;
	/**
	 * The ID of the user that created the server
	 */
	ownerId: string;
	/**
	 * The type of server designated from the server's settings page
	 */
	type?: ServerType;
	/**
	 * The name of the server
	 */
	name: string;
	/**
	 * The URL of the server
	 *
	 * For example, a value of "Guilded-Official" means the server can be accessible from https://www.guilded.gg/Guilded-Official
	 */
	url?: string;
	/**
	 * The description of the server
	 */
	about?: string;
	/**
	 * The avatar of the server
	 */
	avatar?: string;
	/**
	 * The banner of the server
	 */
	banner?: string;
	/**
	 * The timezone of the server
	 */
	timezone?: string;
	/**
	 * Whether the server is verified
	 *
	 * @default false
	 */
	isVerified?: boolean;
	/**
	 * The ID of the default channel in the server
	 *
	 * Useful for welcome messages
	 */
	defaultChannelId?: string;
	/**
	 * When the channel was created
	 */
	createdAt: string;
}

/**
 * https://www.guilded.gg/docs/api/servers/Server
 */
export enum ServerType {
	/**
	 * A team server
	 */
	Team = 'team',
	/**
	 * An organization server
	 */
	Organization = 'organization',
	/**
	 * A community server
	 */
	Community = 'community',
	/**
	 * A clan server
	 */
	Clan = 'clan',
	/**
	 * A guild server
	 */
	Guild = 'guild',
	/**
	 * A friends server
	 */
	Friends = 'friends',
	/**
	 * A streaming server
	 */
	Streaming = 'streaming',
	/**
	 * A server
	 */
	Other = 'other',
}

/**
 * https://www.guilded.gg/docs/api/members/ServerMember
 */
export interface APIServerMember extends APIServerMemberSummary {
	user: APIUser;
	/**
	 * The nickname of the server member
	 */
	nickname?: string;
	/**
	 * When the member joined the server
	 */
	joinedAt: string;
	/**
	 * Whether the member is the owner of the server
	 *
	 * @default false
	 */
	isOwner?: boolean;
}

/**
 * https://www.guilded.gg/docs/api/members/ServerMemberSummary
 */
export interface APIServerMemberSummary {
	/**
	 * The user
	 */
	user: APIUserSummary;
	/**
	 * The IDs of roles the server member has
	 */
	roleIds: number[];
}

/**
 * https://www.guilded.gg/docs/api/member-bans/ServerMemberBan
 */
export interface APIServerBan {
	/**
	 * The user that was banned
	 */
	user: APIUserSummary;
	/**
	 * The reason of the server ban
	 */
	reason?: string;
	/**
	 * The ID of the user that created the server ban
	 */
	createdBy: string;
	/**
	 * When the server ban was created
	 */
	createdAt: string;
}

/**
 * https://www.guilded.gg/docs/api/socialLinks/MemberSocialLinkRead
 */
export interface APISocialLink {
	/**
	 * The handle within the external service
	 */
	handle?: string;
	/**
	 * The user ID within the external service
	 */
	serviceId?: string;
	/**
	 * The type of social link
	 */
	type: string;
}

/**
 * https://www.guilded.gg/docs/api/emote/Emote
 */
export interface APIEmote {
	/**
	 * The ID of the emote
	 */
	id: number;
	/**
	 * The name of the emote
	 */
	name: string;
	/**
	 * The URL of the emote
	 */
	url: string;
}
