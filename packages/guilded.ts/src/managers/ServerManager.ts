import { BaseManager, Server } from "..";

/** A manager of servers that belong to the client. */
export class ServerManager extends BaseManager<string, Server> {
    /**
     * Fetch a server by its ID.
     * @param id The ID of the server.
     * @returns The server.
     */
    public fetch(id: string) {
        let server = this.cache.get(id);
        if (server) return server;
        server = new Server({ id }, this.client);
        this.cache.set(id, server);
        return server;
    }
}
