import {
	WebSocketServerAddEventData,
	WebSocketServerRemoveEventData,
	WebSocketServerRolesUpdateEventData,
} from 'guilded-api-typings';
import { Client } from '../../structures/Client';
import { Collection } from '@discordjs/collection';
import { ServerMember } from '../../structures/server/ServerMember';
import { Server } from '../../structures/server/Server';

/**
 * Handle the `ServerRolesUpdated` event
 * @param client The client
 * @param data The data of the event
 */
export async function rolesUpdated(client: Client, data: WebSocketServerRolesUpdateEventData) {
	const server = await client.servers.fetch(data.serverId);
	const oldMembers = new Collection<string, ServerMember>();
	const newMembers = new Collection<string, ServerMember>();
	for (const { roleIds, userId } of data.memberRoleIds) {
		const oldMember = server.members.cache.get(userId);
		const newMember = await server.members.fetch(userId);
		newMember.data.roleIds = roleIds || [];
		if (oldMember) oldMembers.set(userId, oldMember);
		newMembers.set(userId, newMember);
	}
	client.emit('serverRolesEdit', newMembers, oldMembers);
}

/**
 * Handle the `BotServerMembershipCreated` event
 * @param client The client
 * @param data The data of the event
 */
export async function botAdded(client: Client, data: WebSocketServerAddEventData) {
	const server = new Server(client, data.server);
	const addedBy = await server.members.fetch(data.createdBy);
	client.emit('serverAdd', server, addedBy);
}

/**
 * Handle the `BotServerMembershipDeleted` event
 * @param client The client
 * @param data The data of the event
 */
export async function botRemoved(client: Client, data: WebSocketServerRemoveEventData) {
	const server = new Server(client, data.server);
	const removedBy = server.members.cache.get(data.deletedBy);
	client.emit('serverRemove', server, removedBy);
}
