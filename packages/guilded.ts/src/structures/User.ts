import { APIUser, APIUserSummary, APIUserType } from 'guilded-api-typings';
import Client, { Base } from '..';

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
}
