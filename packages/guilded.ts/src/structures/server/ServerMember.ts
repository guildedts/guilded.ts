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
	 * The social links of the server member
	 */
	readonly socialLinks = new Collection<string, APISocialLink>();

	/**
	 * The manager for roles
	 */
	readonly roles: ServerMemberRoleManager;

	/**
	 * @param server The server
	 * @param data The data of the server member
	 * @param cache Whether to cache the server member
	 */
	constructor(
		public readonly server: Server,
		public readonly data: APIServerMember | APIServerMemberSummary,
		cache = server.client.options.cacheServerMembers ?? true,
	) {
		super(server.client);
		this.roles = new ServerMemberRoleManager(this);
		this.user = new User(this.client, data.user);
		if (cache) server.members.cache.set(this.user.id, this);
	}

	/**
	 * Whether the server member is cached
	 */
	get isCached() {
		return this.server.members.cache.has(this.user.id);
	}

	/**
	 * The IDs of roles the server member has
	 */
	get roleIds() {
		return this.data.roleIds;
	}

	/**
	 * The nickname of the server member
	 */
	get nickname() {
		return 'nickname' in this.data ? this.data.nickname ?? null : null;
	}

	/**
	 * When the member joined the server
	 */
	get joinedAt() {
		return 'joinedAt' in this.data ? new Date(this.data.joinedAt) : null;
	}

	/**
	 * Whether the member is the owner of the server
	 */
	get isOwner() {
		return 'isOwner' in this.data
			? this.data.isOwner ?? false
			: this.user.id === this.server.ownerId;
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
	 * @param nickname The nickname of the server member, or `null` to remove the nickname
	 * @returns The updated server member
	 */
	async setNickname(nickname: string | null) {
		await this.server.members.setNickname(this, nickname);
		if (nickname) (this.data as APIServerMember).nickname = nickname;
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
		return this.server.bans.create(this, reason);
	}

	/**
	 * Add XP to the server member
	 * @param amount The amount of XP to add
	 * @returns The total amount of XP the server member has
	 */
	addXp(amount: number) {
		return this.server.members.addXp(this, amount);
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
