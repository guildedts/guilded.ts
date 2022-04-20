import { Base, Server, User } from '..';
/**
 * Represents a server ban on Guilded.
 */
export declare class ServerBan extends Base {
    readonly server: Server;
    readonly user: User;
    readonly creator: User;
    /**
     * The reason for the ban.
     */
    readonly reason: string | null;
    /**
     * The date the ban was created.
     */
    readonly createdAt: Date;
    /**
     * @param data The data of the ban.
     * @param server The server that the ban belongs to.
     * @param user The user this ban applies to.
     * @param creator The user who created the ban.
     */
    constructor(data: {
        reason?: string;
        createdAt: string;
    }, server: Server, user: User, creator: User);
    /**
     * Fetch the ban.
     * @returns The ban.
     */
    fetch(): Promise<ServerBan>;
}
//# sourceMappingURL=ServerBan.d.ts.map