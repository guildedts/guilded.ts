import { APIUser, APIUserSummary, APIUserType } from 'guilded-api-typings';
import { Base, Client } from '.';

/** Represents a user on Guilded. */
export class User extends Base {
	/** The type of user. */
	public readonly type?: APIUserType;
	/** The name of the user. */
	public readonly name: string;
	/** The URL of this user's avatar. */
	public readonly avatar?: string;
	/** The URL of this user's banner. */
	public readonly banner?: string;
	/** The time the user was created. */
	public readonly createdAt?: Date;

	/**
	 * @param client The client that owns this user.
	 * @param data The data of the user.
	 */
	public constructor(client: Client, data: APIUser | APIUserSummary) {
		super(client, data.id);

		this.type = data.type;
		this.name = data.name;
		this.avatar = data.avatar;
		this.banner = 'banner' in data ? data.banner : undefined;
		this.createdAt = 'createdAt' in data ? new Date(data.createdAt) : undefined;
	}

	/** Whether this user is cached. */
	public get cached() {
		return this.client.users.cache.has(this.id);
	}

	/** The timestamp of when the user was created. */
	public get createdTimestamp() {
		return this.createdAt ? this.createdAt.getTime() : undefined;
	}

	/** Whether this user is a bot. */
	public get bot() {
		return this.type === 'bot';
	}

	/** Whether this user is a human. */
	public get human() {
		return this.type === 'user';
	}

	/**
	 * Cache this user.
	 * @returns The user.
	 */
	public cache() {
		this.client.users.cache.set(this.id, this);

		return this;
	}
}
