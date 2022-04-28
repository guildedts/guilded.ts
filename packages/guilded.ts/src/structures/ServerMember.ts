import {
	APIServerMember,
	APIServerMemberSummary,
	APISocialLink,
	APISocialLinkType,
	Routes,
} from 'guilded-api-typings';
import { Base, CacheCollection, Server, User } from '.';

/** Represents a member of a server. */
export class ServerMember extends Base {
	/** The IDs of the roles this server member has. */
	public readonly roleIds: number[];
	/** The nickname of the server member. */
	public nickname?: string;
	/** The time the server member joined the server. */
	public readonly joinedAt?: Date;
	/** The members social links. */
	public socialLinks = new CacheCollection<APISocialLinkType, APISocialLink>();

	/**
	 * @param server The server that this member belongs to.
	 * @param user The user that this member represents.
	 * @param data The data of the member.
	 */
	public constructor(
		public readonly server: Server,
		public readonly user: User,
		data: APIServerMember | APIServerMemberSummary,
	) {
		super(server.client);
		this.roleIds = data.roleIds;
		this.nickname = 'nickname' in data ? data.nickname : undefined;
		this.joinedAt = 'joinedAt' in data ? new Date(data.joinedAt) : undefined;
	}

	/** The timestamp of when the member joined the server. */
	public get joinedTimestamp() {
		return this.joinedAt?.getTime();
	}

	/** The ID of the member. */
	public get id() {
		return this.user.id;
	}

	/**
	 * Fetch this server member.
	 * @param cache Whether to cache the server member.
	 * @returns The server member.
	 */
	public async fetch(cache: boolean = this.server.members.cachingEnabled) {
		this.server.members.cache.delete(this.id);
		return this.server.members.fetch(this.id, cache);
	}

	/**
	 * Set the nickname of the server member.
	 * @param nickname The nickname of the server member.
	 * @returns The updated server member.
	 */
	public setNickname(nickname: string) {
		return this.server.members.setNickname(this.id, nickname);
	}

	/**
	 * Remove the nickname of the server member.
	 * @returns The updated server member.
	 */
	public removeNickname() {
		return this.server.members.removeNickname(this.id);
	}

	/**
	 * Kick the server member.
	 * @returns The kicked member if cached.
	 */
	public kick() {
		return this.server.members.kick(this.id);
	}

	/**
	 * Ban the server member.
	 * @param reason The reason for banning the member.
	 * @returns The server ban.
	 */
	public ban(reason?: string) {
		return this.server.members.ban(this.id, reason);
	}

	/** Unban the server member. */
	public unban() {
		return this.server.members.unban(this.id);
	}

	/**
	 * Award EX to the server member.
	 * @param amount The amount of EX to award.
	 * @returns The total amount of EX the member has.
	 */
	public async awardXP(amount: number) {
		return this.server.members.awardXP(this.id, amount);
	}

	/**
	 * Fetch one of the member's social links.
	 * @param type The type of social link to fetch.
	 * @returns The social link.
	 */
	public async fetchSocialLink(type: APISocialLinkType) {
		const response = await this.client.rest.get<{ socialLink: APISocialLink }>(
			Routes.memberSocialLink(this.server.id, this.id, type),
		);

		const socialLink = response.socialLink;

		this.socialLinks.set(socialLink.type, socialLink);

		return socialLink;
	}
}
