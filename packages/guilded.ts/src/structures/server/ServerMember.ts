import {
	APIServerMember,
	APIServerMemberSummary,
	APISocialLink,
	Routes,
} from 'guilded-api-typings';
import { Base } from '../Base';
import { CacheCollection } from '../CacheCollection';
import { Server } from './Server';
import { User } from '../User';
import { ServerMemberRoleManager } from '../../managers/server/ServerMemberRoleManager';

/** Represents a server member on Guilded. */
export class ServerMember extends Base {
	/** The IDs of roles the server member has. */
	public readonly roleIds: number[];
	/** The nickname of the server member. */
	public readonly nickname?: string;
	/** The date the member joined the server. */
	public readonly joinedAt?: Date;
	/** The user that the member represents. */
	public readonly user: User;
	/** The social links of the server member. */
	public readonly socialLinks = new CacheCollection<string, APISocialLink>();

	/** A manager of roles that belong to the server member. */
	public readonly roles: ServerMemberRoleManager;

	/**
	 * @param server The server that the member belongs to.
	 * @param raw The raw data of the server member.
	 */
	public constructor(
		public readonly server: Server,
		public readonly raw: APIServerMember | APIServerMemberSummary,
	) {
		super(server.client, raw.user.id);
		this.roles = new ServerMemberRoleManager(this);
		this.roleIds = raw.roleIds;
		this.nickname = 'nickname' in raw ? raw.nickname : undefined;
		this.joinedAt = 'joinedAt' in raw ? new Date(raw.joinedAt) : undefined;
		this.user = new User(this.server.client, raw.user);
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
	 * @returns The total amount of EX the server member has.
	 */
	public async awardXP(amount: number) {
		return this.server.members.awardXP(this.id, amount);
	}

	/**
	 * Fetch a social link of the server member.
	 * @param type The type of social link to fetch.
	 * @returns The fetched social link.
	 */
	public async fetchSocialLink(type: string) {
		const response = await this.client.rest.get<{ socialLink: APISocialLink }>(
			Routes.socialLink(this.server.id, this.id, type),
		);
		const socialLink = response.socialLink;
		this.socialLinks.set(socialLink.type, socialLink);
		return socialLink;
	}
}
