import { Base, Client, ServerBanManager, ServerMemberManager } from "..";
/**
 * Represents a server on Guilded.
 */
export class Server extends Base {
	/**
	 * The ID of the server.
	 */
	public readonly id: string;
	/**
	 * A manager of members that belong to a server.
	 */
	public readonly members: ServerMemberManager;
	/**
	 * A manager of bans that belong to a server.
	 */
    public readonly bans: ServerBanManager;

	/**
	 * @param data The data of the server.
	 */
	constructor(data: { id: string }, client: Client) {
		super(client);
		this.id = data.id;
        this.members = new ServerMemberManager(this);
        this.bans = new ServerBanManager(this);
	}

	/**
	 * Fetch the server.
	 * @returns The server.
	 */
	public async fetch() {
		return this.client.servers.fetch(this.id);
	}
}
