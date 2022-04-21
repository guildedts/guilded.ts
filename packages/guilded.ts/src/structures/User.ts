import { APIUser, APIUserSummary, APIUserType } from 'guilded-api-typings';
import { Base, Client } from '..';

/**
 * Represents a user on Guilded.
 */
export class User extends Base {
	/**
	 * The user's ID.
	 */
	public readonly id: string;
	/**
	 * The type of user.
	 */
	public readonly type?: APIUserType;
	/**
	 * The user's username.
	 */
	public readonly name: string;
	/**
	 * When the user was created.
	 */
	public readonly createdAt: Date | null;

	constructor(data: APIUser | APIUserSummary, client: Client) {
		super(client);
		this.id = data.id;
		this.type = data.type;
		this.name = data.name;
		this.createdAt = 'createdAt' in data ? new Date(data.createdAt) : null;
	}

	/**
	 * Whether the user is a bot.
	 */
	public get isBot() {
		return this.type ? this.type === 'bot' : false;
	}
}
