import { Routes } from '@guildedts/rest';
import { APIServerMember } from 'guilded-api-typings';
import { BaseManager, Server, ServerMember } from '..';

/** A manager of members that belong to a server. */
export class ServerMemberManager extends BaseManager<string, ServerMember> {
	/** @param server The server that the members belong to. */
	constructor(public readonly server: Server) {
		super(server.client);
	}

	/**
	 * Fetch a member by its ID.
	 * @param id The ID of the member.
	 * @returns The member.
	 */
	public async fetch(id: string) {
		let member = this.cache.get(id);
		if (member) return member;
		const response = await this.client.rest.get<{ member: APIServerMember }>(
			Routes.serverMember(this.server.id, id),
		);
		member = new ServerMember(response.member, this.server);
		this.cache.set(id, member);
		return member;
	}
}
