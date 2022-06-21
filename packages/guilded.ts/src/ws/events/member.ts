import { WSEvents } from 'guilded-api-typings';
import { Client } from '../../structures/Client';
import { ServerBan } from '../../structures/server/ServerBan';
import { ServerMember } from '../../structures/server/ServerMember';

/**
 * Handle the TeamMemberJoined event.
 * @param client The client the Websocket belongs to.
 * @param data The data of the event.
 */
export async function joined(client: Client, data: WSEvents['TeamMemberJoined']) {
	const server = await client.servers.fetch(data.serverId);
	client.emit('memberAdd', new ServerMember(server, data.member));
}

/**
 * Handle the TeamMemberRemoved event.
 * @param client The client the Websocket belongs to.
 * @param data The data of the event.
 */
export async function removed(client: Client, data: WSEvents['TeamMemberRemoved']) {
	const server = await client.servers.fetch(data.serverId);
	server.members.cache.delete(data.userId);
	client.emit('memberRemove', server);
}

/**
 * Handle the TeamMemberBanned event.
 * @param client The client the Websocket belongs to.
 * @param data The data of the event.
 */
export async function banned(client: Client, data: WSEvents['TeamMemberBanned']) {
	const server = await client.servers.fetch(data.serverId);
	client.emit('memberBan', new ServerBan(server, data.serverMemberBan));
}

/**
 * Handle the TeamMemberUnbanned event.
 * @param client The client the Websocket belongs to.
 * @param data The data of the event.
 */
export async function unbanned(client: Client, data: WSEvents['TeamMemberUnbanned']) {
	const server = await client.servers.fetch(data.serverId);
	client.emit('memberUnban', new ServerBan(server, data.serverMemberBan));
}

/**
 * Handle the TeamMemberUpdated event.
 * @param client The client the Websocket belongs to.
 * @param data The data of the event.
 */
export async function updated(client: Client, data: WSEvents['TeamMemberUpdated']) {
	const server = await client.servers.fetch(data.serverId);
	const member = await server.members.fetch(data.userInfo.id);
	client.emit('memberEdit', member);
}
