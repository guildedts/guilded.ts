import { APIServerMember, APIServerMemberSummary, APISocialLink } from 'guilded-api-typings';
import { Base } from '../Base';
import { Server } from './Server';
import { User } from '../User';
import { ServerMemberRoleManager } from '../../managers/server/ServerMemberRoleManager';
import { FetchOptions } from '../../managers/BaseManager';
import { Collection } from '@discordjs/collection';

/**
 * Represents a server member on Guilded
 */
export class ServerMember extends Base {
	/**
	 * The user
	 */
	readonly user: User;
	/**
	 * The IDs of roles the server member has
	 */
	roleIds: number[];
	/**
	 * The nickname of the server member
	 */
	nickname?: string;
	/**
	 * When the member joined the server
	 */
	readonly joinedAt?: Date;
	/**
	 * Whether the member is the owner of the server
	 *
	 * @default false
	 */
	readonly isOwner?: boolean;
	/**
	 * The social links of the server member
	 */
	readonly socialLinks = new Collection<string, APISocialLink>();

	/**
	 * The manager for roles
	 */
	readonly roles: ServerMemberRoleManager;

	/**
	 * @param server The server
	 * @param raw The data of the server member
	 * @param cache Whether to cache the server member
	 */
	constructor(
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

	/**
	 * Whether the server member is cached
	 */
	get isCached() {
		return this.server.members.cache.has(this.id);
	}

	/**
	 * The timestamp of when the member joined the server
	 */
	get joinedTimestamp() {
		return this.joinedAt?.getTime();
	}

	/**
	 * Fetch the server member
	 * @param options The options to fetch the server member with
	 * @returns The fetched server member
	 */
	fetch(options?: FetchOptions) {
		return this.server.members.fetch(this, options) as Promise<this>;
	}

	/**
	 * Set the nickname of the server member
	 * @param nickname The nickname of the server member
	 * @returns The edited server member
	 */
	async setNickname(nickname: string) {
		await this.server.members.setNickname(this, nickname);
		return this;
	}

	/**
	 * Remove the nickname of the server member
	 * @returns The edited server member
	 */
	async removeNickname() {
		await this.server.members.removeNickname(this);
		return this;
	}

	/**
	 * Kick the server member
	 * @returns The kicked member
	 */
	async kick() {
		await this.server.members.kick(this);
		return this;
	}

	/**
	 * Ban the server member
	 * @param reason The reason for the server ban
	 * @returns The created server ban
	 */
	ban(reason?: string) {
		return this.server.members.ban(this, reason);
	}

	/**
	 * Unban the server member
	 * @returns The unbanned server member
	 */
	async unban() {
		await this.server.members.unban(this);
		return this;
	}

	/**
	 * Award XP to the server member
	 * @param amount The amount of XP to award
	 * @returns The total amount of XP the server member has
	 */
	awardXp(amount: number) {
		return this.server.members.awardXp(this, amount);
	}

	/**
	 * Set XP of the server member
	 * @param amount The total XP of the server member
	 * @returns The total amount of XP the server member has
	 */
	setXp(amount: number) {
		return this.server.members.setXp(this, amount);
	}

	/**
	 * Fetch a social link of the server member
	 * @param type The type of social link
	 * @returns The fetched server member social link
	 */
	async fetchSocialLink(type: string) {
		let socialLink = this.socialLinks.get(type);
		if (socialLink) return socialLink;
		socialLink = await this.server.members.fetchSocialLink(this, type);
		this.socialLinks.set(socialLink.type, socialLink);
		return socialLink;
	}
}
