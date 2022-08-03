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
	const member = new ServerMember(server, data.member);
	client.emit('memberAdd', member);
}

/**
 * Handle the TeamMemberRemoved event.
 * @param client The client the Websocket belongs to.
 * @param data The data of the event.
 */
export async function removed(client: Client, data: WSEvents['TeamMemberRemoved']) {
	const server = await client.servers.fetch(data.serverId);
	if (client.options.disposeCachedServerMembers ?? true) server.members.cache.delete(data.userId);
	client.emit('memberRemove', data, server);
}

/**
 * Handle the TeamMemberBanned event.
 * @param client The client the Websocket belongs to.
 * @param data The data of the event.
 */
export async function banned(client: Client, data: WSEvents['TeamMemberBanned']) {
	const server = await client.servers.fetch(data.serverId);
	const ban = new ServerBan(server, data.serverMemberBan);
	client.emit('memberBan', ban);
}

/**
 * Handle the TeamMemberUnbanned event.
 * @param client The client the Websocket belongs to.
 * @param data The data of the event.
 */
export async function unbanned(client: Client, data: WSEvents['TeamMemberUnbanned']) {
	const server = await client.servers.fetch(data.serverId);
	const ban = new ServerBan(server, data.serverMemberBan);
	if (client.options.disposeCachedServerBans ?? true) server.bans.cache.delete(ban.id);
	client.emit('memberUnban', ban);
}

/**
 * Handle the TeamMemberUpdated event.
 * @param client The client the Websocket belongs to.
 * @param data The data of the event.
 */
export async function updated(client: Client, data: WSEvents['TeamMemberUpdated']) {
	const server = await client.servers.fetch(data.serverId);
	const oldMember = server.members.cache.get(data.userInfo.id);
	const newMember = await server.members.fetch(data.userInfo.id);
	newMember.nickname = data.userInfo.nickname;
	client.emit('memberEdit', newMember, oldMember);
}
