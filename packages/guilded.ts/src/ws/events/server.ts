import { WSEvents } from 'guilded-api-typings';
import { Client } from '../../structures/Client';
import Collection from '@discordjs/collection';
import { ServerMember } from '../../structures/server/ServerMember';

/**
 * Handle the teamRolesUpdated event.
 * @param client The client the Websocket belongs to.
 * @param data The data of the event.
 */
export async function rolesUpdated(client: Client, data: WSEvents['teamRolesUpdated']) {
	const server = await client.servers.fetch(data.serverId);
	const oldMembers = new Collection<string, ServerMember>();
	const newMembers = new Collection<string, ServerMember>();
	for (const { roleIds, userId } of data.memberRoleIds) {
		const oldMember = server.members.cache.get(userId);
		const newMember = await server.members.fetch(userId);
		newMember.roleIds = roleIds || [];
		if (oldMember) oldMembers.set(userId, oldMember);
		newMembers.set(userId, newMember);
	}
	client.emit('rolesEdit', newMembers, oldMembers);
}
