import { APIServerMemberBan } from 'guilded-api-typings';
import { Base, Server, User } from '.';

/** Represents a server ban. */
export class ServerBan extends Base {
	/** The user of the member that was banned. */
	public readonly user: User;
	/** The reason for the ban. */
	public readonly reason?: string;
	/** The ID of the user that created the ban. */
	public readonly createdBy: string;
	/** The time the ban was created. */
	public readonly createdAt: Date;

	/**
	 * @param server The server that this ban belongs to.
	 * @param data The data of the ban.
	 */
	public constructor(public readonly server: Server, data: APIServerMemberBan) {
		super(server.client);
		this.user = new User(server.client, data.user);
		this.reason = data.reason;
		this.createdBy = data.createdBy;
		this.createdAt = new Date(data.createdAt);
	}

	/** The ID of the server ban. */
	public get id() {
		return this.user.id;
	}

	/** The author of the ban. */
	public get author() {
		return this.client.users.cache.get(this.createdBy);
	}

	/** The timestamp of when the ban was created. */
	public get createdTimestamp() {
		return this.createdAt.getTime();
	}

	/**
	 * Fetch this server ban.
	 * @param cache Whether to cache the server ban.
	 * @returns The server ban.
	 */
	public fetch(cache: boolean = this.server.bans.cachingEnabled) {
		this.server.bans.cache.delete(this.id);
		return this.server.bans.fetch(this.id, cache);
	}
}
