import { APIServerBan } from 'guilded-api-typings';
import { Base } from '../Base';
import { Server } from './Server';
import { User } from '../User';
import { FetchOptions } from '../../managers/BaseManager';

/**
 * Represents a server ban on Guilded.
 * @example new ServerBan(server, rawBan);
 */
export class ServerBan extends Base {
	/** The user the ban belongs to. */
	readonly user: User;
	/** The reason of the ban. */
	readonly reason?: string;
	/** The ID of the user that created the ban. */
	readonly createdBy: string;
	/** The date the ban was created. */
	readonly createdAt: Date;

	/**
	 * @param server The server the ban belongs to.
	 * @param raw The raw data of the server ban.
	 * @param cache Whether to cache the server ban.
	 */
	constructor(
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
	get isCached() {
		return this.server.bans.cache.has(this.id);
	}

	/** The user that created the server ban. */
	get author() {
		return this.client.users.cache.get(this.createdBy);
	}

	/** The timestamp the ban was created. */
	get createdTimestamp() {
		return this.createdAt.getTime();
	}

	/**
	 * Fetch the server ban.
	 * @param options The options to fetch the server ban with.
	 * @returns The fetched server ban.
	 * @example ban.fetch();
	 */
	fetch(options?: FetchOptions) {
		return this.server.bans.fetch(this, options) as Promise<this>;
	}

	/**
	 * Fetch the server member that created the ban.
	 * @param options The options to fetch the server member with.
	 * @returns The fetched server member.
	 * @example ban.fetchAuthor();
	 */
	fetchAuthor(options?: FetchOptions) {
		return this.server.members.fetch(this.createdBy, options);
	}

	/**
	 * Remove the server ban from the server.
	 * @example ban.remove();
	 */
	remove() {
		return this.server.bans.remove(this);
	}
}
