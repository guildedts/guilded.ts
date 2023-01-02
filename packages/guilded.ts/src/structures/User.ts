import { APIBot, APIUser, APIUserSummary, UserType } from 'guilded-api-typings';
import { Base } from './Base';
import { Client } from './Client';

/**
 * Represents a user on Guilded
 */
export class User extends Base {
	/**
	 * The type of user
	 *
	 * @default UserType.User
	 */
	readonly type?: UserType;
	/**
	 * The name of the user
	 */
	readonly name: string;
	/**
	 * The avatar of the user
	 */
	readonly avatar?: string;
	/**
	 * The banner of the user
	 */
	readonly banner?: string;
	/**
	 * When the user was created
	 */
	readonly createdAt?: Date;

	/**
	 * @param client The client
	 * @param raw The data of the user
	 * @param cache Whether to cache the user
	 */
	constructor(
		client: Client,
		public readonly raw: APIUser | APIUserSummary,
		cache = client.options.cacheUsers ?? true,
	) {
		super(client, raw.id);
		this.type = raw.type;
		this.name = raw.name;
		this.avatar = raw.avatar;
		this.banner = 'banner' in raw ? raw.banner : undefined;
		this.createdAt = 'createdAt' in raw ? new Date(raw.createdAt) : undefined;
		if (cache) client.users.cache.set(this.id, this);
	}

	/**
	 * Whether the user is cached
	 */
	get isCached() {
		return this.client.users.cache.has(this.id);
	}

	/**
	 * The timestamp of when the user was created
	 */
	get createdTimestamp() {
		return this.createdAt?.getTime();
	}

	/**
	 * Whether the user is a bot
	 */
	get isBot() {
		return this.type === UserType.Bot;
	}

	/**
	 * Whether the user is a human
	 */
	get isUser() {
		return !this.type || this.type === UserType.User;
	}
}

/**
 * Represents a client user
 */
export class ClientUser extends User {
	/**
	 * The bot ID of the client user
	 */
	readonly botId: string;
	/**
	 * The ID of the user that created the client user
	 */
	readonly createdBy: string;

	/**
	 * @param client The client
	 * @param raw The data of the client user
	 * @param cache Whether to cache the client user
	 */
	constructor(client: Client, public readonly raw: APIBot, cache?: boolean) {
		super(client, { type: UserType.Bot, ...raw }, cache);
		this.botId = raw.botId;
		this.createdBy = raw.createdBy;
	}
}

export { UserType };
