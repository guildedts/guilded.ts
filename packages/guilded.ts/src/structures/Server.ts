import Client, { Base, ServerBanManager, ServerMemberManager } from '..';

/** Represents a server on Guilded. */
export class Server extends Base {
	/** The ID of the server. */
	public readonly id: string;

	/** A manager of members that belong to this server. */
	public readonly members: ServerMemberManager;
	/** A manager of bans that belong to this server. */
	public readonly bans: ServerBanManager;

	/**
	 * @param client The client that owns this server.
	 * @param data The data of the server.
	 */
	public constructor(client: Client, data: { id: string }) {
		super(client);
		this.id = data.id;
		this.members = new ServerMemberManager(this);
		this.bans = new ServerBanManager(this);
	}
}
