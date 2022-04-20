import { APIServerMember } from 'guilded-api-typings';
import { Base, Server, User } from '..';
/**
 * Represent a server member on Guilded.
 */
export declare class ServerMember extends Base {
    readonly server: Server;
    /**
     * The user that this server member represents.
     */
    readonly user: User;
    /**
     * An array of roles ID's of roles that this member has.
     */
    readonly roles: number[];
    /**
     * The server member's nickname.
     */
    nickname: string | null;
    /**
     * The server member's join date.
     */
    readonly joinedAt: Date;
    /**
     * @param data The data of the server member.
     * @param server The server that the member belongs to.
     */
    constructor(data: APIServerMember, server: Server);
    /**
     * Fetch the server member.
     */
    fetch(): Promise<ServerMember>;
    /**
     * Set the nickname of the server member.
     * @param nickname The nickname to set.
     */
    setNickname(nickname: string): Promise<ServerMember>;
    /**
     * Remove the nickname of the server member.
     */
    removeNickname(): Promise<ServerMember>;
    /**
     * Kick the server member.
     * @returns The user.
     */
    kick(): Promise<User>;
    /**
     * Ban the server member.
     * @param reason The reason for the ban.
     * @returns The ban.
     */
    ban(reason?: string): Promise<import("./ServerBan").ServerBan>;
    /**
     * Unban the server member.
     * @returns The unban.
     */
    unban(): Promise<import("./ServerBan").ServerBan | undefined>;
}
//# sourceMappingURL=ServerMember.d.ts.map