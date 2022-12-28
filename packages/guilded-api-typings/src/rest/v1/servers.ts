import {
	APIServer,
	APIServerBan,
	APIServerMember,
	APIServerMemberSummary,
	APISocialLink,
} from '../../v1';

/**
 * https://www.guilded.gg/docs/api/servers/ServerRead
 */
export interface RESTGetServerResult {
	/**
	 * The server
	 */
	server: APIServer;
}

/**
 * https://www.guilded.gg/docs/api/members/MemberNicknameUpdate
 */
export type RESTPutServerMemberNicknameJSONBody = Required<Pick<APIServerMember, 'nickname'>>;
/**
 * https://www.guilded.gg/docs/api/members/MemberNicknameUpdate
 */
export type RESTPutServerMemberNicknameResult = Required<Pick<APIServerMember, 'nickname'>>;

/**
 * https://www.guilded.gg/docs/api/members/MemberNicknameDelete
 */
export type RESTDeleteServerMemberNicknameResult = never;

/**
 * https://www.guilded.gg/docs/api/members/ServerMemberRead
 */
export interface RESTGetServerMemberResult {
	/**
	 * The server member
	 */
	member: APIServerMember;
}

/**
 * https://www.guilded.gg/docs/api/members/ServerMemberDelete
 */
export type RESTDeleteServerMemberResult = never;

/**
 * https://www.guilded.gg/docs/api/members/ServerMemberReadMany
 */
export interface RESTGetServerMembersResult {
	/**
	 * The server members
	 */
	members: APIServerMemberSummary[];
}

/**
 * https://www.guilded.gg/docs/api/member-bans/ServerMemberBanCreate
 */
export type RESTPostServerBanJSONBody = Pick<APIServerBan, 'reason'>;
/**
 * https://www.guilded.gg/docs/api/member-bans/ServerMemberBanCreate
 */
export type RESTPostServerBanResult = RESTGetServerBanResult;

/**
 * https://www.guilded.gg/docs/api/member-bans/ServerMemberBanRead
 */
export interface RESTGetServerBanResult {
	/**
	 * The server ban
	 */
	serverMemberBan: APIServerBan;
}

/**
 * https://www.guilded.gg/docs/api/member-bans/ServerMemberBanDelete
 */
export type RESTDeleteServerBanResult = never;

/**
 * https://www.guilded.gg/docs/api/member-bans/ServerMemberBanReadMany
 */
export interface RESTGetServerBansResult {
	/**
	 * The server bans
	 */
	serverMemberBans: APIServerBan[];
}

/**
 * https://www.guilded.gg/docs/api/server-xp/ServerXpForUserCreate
 */
export interface RESTPostServerMemberXpJSONBody {
	/**
	 * The amount of XP to award (range: `-1000`-`1000`)
	 */
	amount: number;
}
/**
 * https://www.guilded.gg/docs/api/server-xp/ServerXpForUserCreate
 */
export interface RESTPostServerMemberXpResult {
	/**
	 * The total XP the server member has (range: `-1000000000`-`1000000000`)
	 */
	total: number;
}

/**
 * https://www.guilded.gg/docs/api/server-xp/ServerXpForUserUpdate
 */
export type RESTPutServerMemberXpJSONBody = RESTPostServerMemberXpResult;
/**
 * https://www.guilded.gg/docs/api/server-xp/ServerXpForUserUpdate
 */
export type RESTPutServerMemberXpResult = RESTPostServerMemberXpResult;

/**
 * https://www.guilded.gg/docs/api/server-xp/ServerXpForRoleCreate
 */
export type RESTPostServerRoleXpJSONBody = RESTPostServerMemberXpJSONBody;
/**
 * https://www.guilded.gg/docs/api/server-xp/ServerXpForRoleCreate
 */
export type RESTPostServerRoleXpResult = never;

/**
 * https://www.guilded.gg/docs/api/socialLinks/MemberSocialLinkRead
 */
export interface RESTGetServerMemberSocialLinkResult {
	/**
	 * The social link
	 */
	socialLink: APISocialLink;
}

/**
 * https://www.guilded.gg/docs/api/roleMembership/RoleMembershipCreate
 */
export type RESTPutServerMemberRoleResult = never;

/**
 * https://www.guilded.gg/docs/api/roleMembership/RoleMembershipDelete
 */
export type RESTDeleteServerMemberRoleResult = never;

/**
 * https://www.guilded.gg/docs/api/roleMembership/RoleMembershipReadMany
 */
export interface RESTGetServerMemberRolesResult {
	/**
	 * The IDs of roles the server member has
	 */
	roleIds: number[];
}
