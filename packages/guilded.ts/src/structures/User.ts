import { APIUser, APIUserSummary, APIUserType } from 'guilded-api-typings';
import { Base, Client } from '.';

/** Represents a user on Guilded. */
export class User extends Base {
	/** The ID of the user. */
	public readonly id: string;
	/** The type of user. */
	public readonly type?: APIUserType;
	/** The name of the user. */
	public readonly name: string;
	/** The time the user was created. */
	public readonly createdAt?: Date;

	/**
	 * @param client The client that owns this user.
	 * @param data The data of the user.
	 */
	public constructor(client: Client, data: APIUser | APIUserSummary) {
		super(client);
		this.id = data.id;
		this.type = data.type;
		this.name = data.name;
		this.createdAt = 'createdAt' in data ? new Date(data.createdAt) : undefined;
	}

	/** The timestamp of when the user was created. */
	public get createdTimestamp() {
		return this.createdAt ? this.createdAt.getTime() : undefined;
	}

	/** Whether this user is a bot. */
	public get isBot() {
		return this.type === 'bot';
	}

	/** Whether this user is a human. */
	public get isHuman() {
		return this.type === 'user';
	}
}
