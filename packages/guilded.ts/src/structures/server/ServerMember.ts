import { APIServerMember, APIServerMemberSummary, APISocialLink } from 'guilded-api-typings';
import { Base } from '../Base';
import { CacheCollection } from '../CacheCollection';
import { Server } from './Server';
import { User } from '../User';
import { ServerMemberRoleManager } from '../../managers/server/ServerMemberRoleManager';

/** Represents a server member on Guilded. */
export class ServerMember extends Base {
	/** The user the server member belongs to. */
	public readonly user: User;
	/** The IDs of roles the server member has. */
	public readonly roleIds: number[];
	/** The nickname of the server member. */
	public readonly nickname?: string;
	/** The date the member joined the server. */
	public readonly joinedAt?: Date;
	/** Whether the server member is the server owner. */
	public readonly isOwner?: boolean;
	/** The social links of the server member. */
	public readonly socialLinks = new CacheCollection<string, APISocialLink>();

	/** The manager of roles that belong to the server member. */
	public readonly roles: ServerMemberRoleManager;

	/**
	 * @param server The server the member belongs to.
	 * @param raw The raw data of the server member.
	 * @param cache Whether to cache the server member.
	 */
	public constructor(
		public readonly server: Server,
		public readonly raw: APIServerMember | APIServerMemberSummary,
		cache = server.client.options.cacheServerMembers ?? true,
	) {
		super(server.client, raw.user.id);
		this.roles = new ServerMemberRoleManager(this);
		this.user = new User(this.client, raw.user);
		this.roleIds = raw.roleIds;
		this.nickname = 'nickname' in raw ? raw.nickname : undefined;
		this.joinedAt = 'joinedAt' in raw ? new Date(raw.joinedAt) : undefined;
		this.isOwner = 'isOwner' in raw ? raw.isOwner : undefined;
		if (cache) server.members.cache.set(this.id, this);
	}

	/** Whether the server member is cached. */
	public get isCached() {
		return this.server.members.cache.has(this.id);
	}

	/** The timestamp the member joined the server. */
	public get joinedTimestamp() {
		return this.joinedAt?.getTime();
	}

	/**
	 * Fetch the server member.
	 * @param cache Whether to cache the fetched server member.
	 * @returns The fetched server member.
	 */
	public async fetch(cache?: boolean) {
		this.server.members.cache.delete(this.id);
		return this.server.members.fetch(this.id, cache) as Promise<this>;
	}

	/**
	 * Set the nickname of the server member.
	 * @param nickname The nickname of the server member.
	 * @returns The edited server member.
	 */
	public async setNickname(nickname: string) {
		await this.server.members.setNickname(this.id, nickname);
		return this;
	}

	/**
	 * Remove the nickname of the server member.
	 * @returns The edited server member.
	 */
	public async removeNickname() {
		await this.server.members.removeNickname(this.id);
		return this;
	}

	/**
	 * Kick the server member.
	 * @returns The kicked member.
	 */
	public async kick() {
		await this.server.members.kick(this.id);
		return this;
	}

	/**
	 * Ban the server member.
	 * @param reason The reason of the ban.
	 * @returns The created server ban.
	 */
	public ban(reason?: string) {
		return this.server.members.ban(this.id, reason);
	}

	/**
	 * Unban the server member.
	 * @returns The unbanned member.
	 */
	public async unban() {
		await this.server.members.unban(this.id);
		return this;
	}

	/**
	 * Award XP to the server member.
	 * @param amount The amount of XP to award.
	 * @returns The total amount of XP the server member has.
	 */
	public async awardXp(amount: number) {
		return this.server.members.awardXp(this.id, amount);
	}

	/**
	 * Fetch a social link of the server member.
	 * @param type The type of social link to fetch.
	 * @returns The fetched social link.
	 */
	public async fetchSocialLink(type: string) {
		let socialLink = this.socialLinks.get(type);
		if (socialLink) return socialLink;
		socialLink = await this.client.api.serverMembers.fetchSocialLink(
			this.server.id,
			this.id,
			type,
		);
		this.socialLinks.set(socialLink.type, socialLink);
		return socialLink;
	}
}
