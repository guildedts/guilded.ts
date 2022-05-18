import { APIUser, APIUserSummary, APIUserType } from 'guilded-api-typings';
import { Base } from './Base';
import { Client } from './Client';

/** Represents a user on Guilded. */
export class User extends Base {
	/** The type of user. */
	public readonly type?: APIUserType;
	/** The name of the user. */
	public readonly name: string;
	/** The URL of the user's avatar. */
	public readonly avatar?: string;
	/** The URL of the user's banner. */
	public readonly banner?: string;
	/** The date the user was created. */
	public readonly createdAt?: Date;

	/**
	 * @param client The client that owns the user.
	 * @param raw The raw data of the user.
	 */
	public constructor(client: Client, public readonly raw: APIUser | APIUserSummary) {
		super(client, raw.id);
		this.type = raw.type;
		this.name = raw.name;
		this.avatar = raw.avatar;
		this.banner = 'banner' in raw ? raw.banner : undefined;
		this.createdAt = 'createdAt' in raw ? new Date(raw.createdAt) : undefined;
	}

	/** Whether the user is cached. */
	public get isCached() {
		return this.client.users.cache.has(this.id);
	}

	/** The timestamp the user was created. */
	public get createdTimestamp() {
		return this.createdAt ? this.createdAt.getTime() : undefined;
	}

	/** Whether the user is a bot. */
	public get isBot() {
		return this.type === 'bot';
	}

	/** Whether the user is a human. */
	public get isHuman() {
		return this.type === 'user';
	}
}
