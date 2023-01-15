import { APIBot, APIUser, APIUserSummary, UserType } from 'guilded-api-typings';
import { Base } from './Base';
import { Client } from './Client';

/**
 * Represents a user on Guilded
 */
export class User extends Base {
	/**
	 * @param client The client
	 * @param data The data of the user
	 * @param cache Whether to cache the user
	 */
	constructor(
		client: Client,
		public readonly data: APIUser | APIUserSummary,
		cache = client.options.cacheUsers ?? true,
	) {
		super(client);
		if (cache) client.users.cache.set(this.id, this);
	}

	/**
	 * Whether the user is cached
	 */
	get isCached() {
		return this.client.users.cache.has(this.id);
	}

	/**
	 * The ID of the user
	 */
	get id() {
		return this.data.id;
	}

	/**
	 * The type of user
	 */
	get type() {
		return this.data.type ?? UserType.User;
	}

	/**
	 * The name of the user
	 */
	get name() {
		return this.data.name;
	}

	/**
	 * The avatar of the user
	 */
	get avatar() {
		return this.data.avatar ?? null;
	}

	/**
	 * The banner of the user
	 */
	get banner() {
		return 'banner' in this.data ? this.data.banner ?? null : null;
	}

	/**
	 * When the user was created
	 */
	get createdAt() {
		return 'createdAt' in this.data ? new Date(this.data.createdAt) : null;
	}
}

/**
 * Represents a client user
 */
export class ClientUser extends User {
	/**
	 * @param client The client
	 * @param data The data of the bot
	 * @param cache Whether to cache the client user
	 */
	constructor(client: Client, public readonly data: APIBot, cache?: boolean) {
		super(client, { type: UserType.Bot, ...data }, cache);
	}

	/**
	 * The ID of the bot
	 */
	get botId() {
		return this.data.botId;
	}

	/**
	 * The ID of the user that created the bot
	 */
	get creatorId() {
		return this.data.createdBy;
	}

	/**
	 * The user that created the bot
	 */
	get creator() {
		return this.client.users.cache.get(this.creatorId) ?? null;
	}
}

export { UserType };
