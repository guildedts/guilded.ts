import { APIUser, APIUserSummary, APIUserType, APIUserTypeString } from 'guilded-api-typings';
import { Base } from './Base';
import { Client } from './Client';

/** Represents a user on Guilded. */
export class User extends Base {
	/** The type of the user. */
	public readonly type?: APIUserTypeString;
	/** The name of the user. */
	public readonly name: string;
	/** The avatar of the user. */
	public readonly avatar?: string;
	/** The banner of the user. */
	public readonly banner?: string;
	/** The date the user was created. */
	public readonly createdAt?: Date;

	/**
	 * @param client The client the user belongs to.
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
		return this.createdAt?.getTime();
	}

	/** Whether the user is a bot. */
	public get isBot() {
		return this.type === APIUserType.Bot;
	}

	/** Whether the user is a human. */
	public get isUser() {
		return this.type === APIUserType.User;
	}
}
