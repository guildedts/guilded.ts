import { BaseManager, Server } from '..';
/** A manager of servers that belong to the client. */
export declare class ServerManager extends BaseManager<string, Server> {
	/**
	 * Fetch a server by its ID.
	 * @param id The ID of the server.
	 * @returns The server.
	 */
	fetch(id: string): Server;
}
//# sourceMappingURL=ServerManager.d.ts.map
