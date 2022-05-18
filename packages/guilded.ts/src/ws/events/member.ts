import { WSEvents } from 'guilded-api-typings';
import { Client } from '../../structures/Client';
import { ServerBan } from '../../structures/server/ServerBan';
import { ServerMember } from '../../structures/server/ServerMember';

/**
 * Handle the TeamMemberJoined event.
 * @param client The client instance.
 * @param data The data of the event.
 */
export async function joined(client: Client, data: WSEvents['TeamMemberJoined']) {
	const server = client.servers.fetch(data.serverId);
	const member = new ServerMember(server, data.member);
	if (client.options.cacheUsers) client.users.cache.set(member.id, member.user);
	if (client.options.cacheServerMembers) server.members.cache.set(member.id, member);
	client.emit('memberAdd', member);
}

/**
 * Handle the TeamMemberRemoved event.
 * @param client The client instance.
 * @param data The data of the event.
 */
export async function removed(client: Client, data: WSEvents['TeamMemberRemoved']) {
	const server = client.servers.fetch(data.serverId);
	server.members.cache.delete(data.userId);
	client.emit('memberRemove', server);
}

/**
 * Handle the TeamMemberBanned event.
 * @param client The client instance.
 * @param data The data of the event.
 */
export async function banned(client: Client, data: WSEvents['TeamMemberBanned']) {
	const server = client.servers.fetch(data.serverId);
	const ban = new ServerBan(server, data.serverMemberBan);
	if (client.options.cacheServerBans) server.bans.cache.set(ban.id, ban);
	client.emit('memberBan', ban);
}

/**
 * Handle the TeamMemberUnbanned event.
 * @param client The client instance.
 * @param data The data of the event.
 */
export async function unbanned(client: Client, data: WSEvents['TeamMemberUnbanned']) {
	const server = client.servers.fetch(data.serverId);
	const ban = new ServerBan(server, data.serverMemberBan);
	server.bans.cache.delete(ban.id);
	client.emit('memberUnban', ban);
}

/**
 * Handle the TeamMemberUpdated event.
 * @param client The client instance.
 * @param data The data of the event.
 */
export async function updated(client: Client, data: WSEvents['TeamMemberUpdated']) {
	const server = client.servers.fetch(data.serverId);
	const member = await server.members.fetch(data.userInfo.id);
	client.emit('memberEdit', member);
}
