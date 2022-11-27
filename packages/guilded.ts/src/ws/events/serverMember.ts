import { WSEvents } from 'guilded-api-typings';
import { Client } from '../../structures/Client';
import { ServerBan } from '../../structures/server/ServerBan';
import { ServerMember } from '../../structures/server/ServerMember';

/**
 * Handle the ServerMemberJoined event.
 * @param client The client the Websocket belongs to.
 * @param data The data of the event.
 */
export async function joined(client: Client, data: WSEvents['ServerMemberJoined']) {
	const server = await client.servers.fetch(data.serverId);
	const member = new ServerMember(server, data.member);
	client.emit('serverMemberAdd', member);
}

/**
 * Handle the ServerMemberRemoved event.
 * @param client The client the Websocket belongs to.
 * @param data The data of the event.
 */
export async function removed(client: Client, data: WSEvents['ServerMemberRemoved']) {
	const server = await client.servers.fetch(data.serverId);
	if (client.options.disposeCachedServerMembers ?? true) server.members.cache.delete(data.userId);
	client.emit('serverMemberRemove', data, server);
}

/**
 * Handle the ServerMemberBanned event.
 * @param client The client the Websocket belongs to.
 * @param data The data of the event.
 */
export async function banned(client: Client, data: WSEvents['ServerMemberBanned']) {
	const server = await client.servers.fetch(data.serverId);
	const ban = new ServerBan(server, data.serverMemberBan);
	client.emit('serverMemberBan', ban);
}

/**
 * Handle the ServerMemberUnbanned event.
 * @param client The client the Websocket belongs to.
 * @param data The data of the event.
 */
export async function unbanned(client: Client, data: WSEvents['ServerMemberUnbanned']) {
	const server = await client.servers.fetch(data.serverId);
	const ban = new ServerBan(server, data.serverMemberBan);
	if (client.options.disposeCachedServerBans ?? true) server.bans.cache.delete(ban.id);
	client.emit('serverMemberUnban', ban);
}

/**
 * Handle the ServerMemberUpdated event.
 * @param client The client the Websocket belongs to.
 * @param data The data of the event.
 */
export async function updated(client: Client, data: WSEvents['ServerMemberUpdated']) {
	const server = await client.servers.fetch(data.serverId);
	const oldMember = server.members.cache.get(data.userInfo.id);
	const newMember = await server.members.fetch(data.userInfo.id);
	newMember.nickname = data.userInfo.nickname;
	client.emit('serverMemberEdit', newMember, oldMember);
}
