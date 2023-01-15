import { APIServerBan } from 'guilded-api-typings';
import { Base } from '../Base';
import { Server } from './Server';
import { User } from '../User';
import { FetchOptions } from '../../managers/BaseManager';

/**
 * Represents a server ban on Guilded
 */
export class ServerBan extends Base {
	/**
	 * The user
	 */
	readonly user: User;

	/**
	 * @param server The server
	 * @param data The data of the server ban
	 * @param cache Whether to cache the server ban
	 */
	constructor(
		public readonly server: Server,
		public readonly data: APIServerBan,
		cache = server.client.options.cacheServerBans ?? true,
	) {
		super(server.client);
		this.user = new User(this.client, data.user);
		if (cache) server.bans.cache.set(this.user.id, this);
	}

	/**
	 * Whether the server ban is cached
	 */
	get isCached() {
		return this.server.bans.cache.has(this.user.id);
	}

	/**
	 * The reason of the server ban
	 */
	get reason() {
		return this.data.reason ?? null;
	}

	/**
	 * The ID of the user that created the server ban
	 */
	get creatorId() {
		return this.data.createdBy;
	}

	/**
	 * The user that created the server ban
	 */
	get creator() {
		return this.client.users.cache.get(this.creatorId) ?? null;
	}

	/**
	 * Whether the client user created the server ban
	 */
	get isCreator() {
		return this.creatorId === this.client.user?.id;
	}

	/**
	 * When the server ban was created
	 */
	get createdAt() {
		return new Date(this.data.createdAt);
	}

	/**
	 * Fetch the server ban
	 * @param options The options to fetch the server ban with
	 * @returns The fetched server ban
	 */
	fetch(options?: FetchOptions) {
		return this.server.bans.fetch(this, options) as Promise<this>;
	}

	/**
	 * Fetch the user that created the server ban
	 * @returns The fetched user
	 */
	fetchCreator() {
		return this.client.users.fetch(this.server.id, this.creatorId);
	}

	/**
	 * Unban the user from the server
	 * @returns The unbanned user
	 */
	async remove() {
		await this.server.bans.remove(this);
		return this.user;
	}
}
