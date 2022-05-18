import { APIServerBan } from 'guilded-api-typings';
import { Base } from '../Base';
import { Server } from './Server';
import { User } from '../User';

/** Represents a server ban on Guilded. */
export class ServerBan extends Base {
	/** The user that was banned. */
	public readonly user: User;
	/** The reason for the ban. */
	public readonly reason?: string;
	/** The ID of the user that created the ban. */
	public readonly createdBy: string;
	/** The date the ban was created. */
	public readonly createdAt: Date;

	/**
	 * @param server The server that the ban belongs to.
	 * @param raw The raw data of the ban.
	 */
	public constructor(public readonly server: Server, public readonly raw: APIServerBan) {
		super(server.client, raw.user.id);
		this.user = new User(server.client, raw.user);
		this.reason = raw.reason;
		this.createdBy = raw.createdBy;
		this.createdAt = new Date(raw.createdAt);
	}

	/** Whether the server ban is cached. */
	public get isCached() {
		return this.server.bans.cache.has(this.id);
	}

	/** The author of the ban. */
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
		return this.server.bans.fetch(this.id, cache);
	}
}
