import { Base, Server, User } from '..';

/**
 * Represents a server ban on Guilded.
 */
export class ServerBan extends Base {
	/**
	 * The reason for the ban.
	 */
	public readonly reason: string | null;
	/**
	 * The date the ban was created.
	 */
	public readonly createdAt: Date;

	/**
	 * @param data The data of the ban.
     * @param server The server that the ban belongs to.
	 * @param user The user this ban applies to.
	 * @param creator The user who created the ban.
	 */
	constructor(
        data: { reason?: string; createdAt: string },
        public readonly server: Server,
		public readonly user: User,
		public readonly creator: User
	) {
		super(creator.client);
		this.reason = data.reason ?? null;
		this.createdAt = new Date(data.createdAt);
	}

	/**
	 * Fetch the ban.
	 * @returns The ban.
	 */
    public async fetch() {
        return await this.server.bans.fetch(this.user.id);
    }
}
