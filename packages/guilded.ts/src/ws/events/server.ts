import { WSEvents } from "guilded-api-typings";
import { Client } from "../../structures/Client";

/**
 * Handle the teamRolesUpdated event.
 * @param client The client instance.
 * @param data The data of the event.
 */
export async function rolesUpdated(client: Client, data: WSEvents['teamRolesUpdated']) {
    const server = client.servers.fetch(data.serverId); 
    client.emit('rolesEdit', server);
}
