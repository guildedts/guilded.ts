import { APIServerBan } from 'guilded-api-typings';
import { Base } from '../Base';
import { Server } from './Server';
import { User } from '../User';

/** Represents a server ban on Guilded. */
export class ServerBan extends Base {
	/** The user the ban belongs to. */
	public readonly user: User;
	/** The reason of the ban. */
	public readonly reason?: string;
	/** The ID of the user that created the ban. */
	public readonly createdBy: string;
	/** The date the ban was created. */
	public readonly createdAt: Date;

	/**
	 * @param server The server the ban belongs to.
	 * @param raw The raw data of the server ban.
	 * @param cache Whether to cache the server ban.
	 */
	public constructor(
		public readonly server: Server,
		public readonly raw: APIServerBan,
		cache = server.client.options.cacheServerBans ?? true,
	) {
		super(server.client, raw.user.id);
		this.user = new User(server.client, raw.user);
		this.reason = raw.reason;
		this.createdBy = raw.createdBy;
		this.createdAt = new Date(raw.createdAt);
		if (cache) server.bans.cache.set(this.id, this);
	}

	/** Whether the server ban is cached. */
	public get isCached() {
		return this.server.bans.cache.has(this.id);
	}

	/** The user that created the server ban. */
	public get author() {
		return this.client.users.cache.get(this.createdBy);
	}

	/** The timestamp the ban was created. */
	public get createdTimestamp() {
		return this.createdAt.getTime();
	}

	/**
	 * Fetch the server ban.
	 * @param cache Whether to cache the fetched server ban.
	 * @returns The fetched server ban.
	 */
	public fetch(cache?: boolean) {
		this.server.bans.cache.delete(this.id);
		return this.server.bans.fetch(this.id, cache) as Promise<this>;
	}

	/**
	 * Fetch the server member that created the ban.
	 * @param cache Whether to cache the fetched server member.
	 * @returns The fetched server member.
	 */
	public async fetchAuthor(cache?: boolean) {
		return this.server.members.fetch(this.createdBy, cache);
	}
}
