import {
	APIChannelPayload,
	APIServer,
	APIServerType,
	APIServerTypeString,
} from 'guilded-api-typings';
import { Client } from '../Client';
import { Base } from '../Base';
import { ServerMemberManager } from '../../managers/server/ServerMemberManager';
import { ServerBanManager } from '../../managers/server/ServerBanManager';
import { ServerRoleManager } from '../../managers/server/ServerRoleManager';

/** Represents a server on Guilded. */
export class Server extends Base {
	/** The ID of the user the server belongs to. */
	public readonly ownerId: string;
	/** The type of the server. */
	public readonly type?: APIServerTypeString;
	/** The name of the server. */
	public readonly name: string;
	/** The vanity URL of the server. */
	public readonly url?: string;
	/** The description of the server. */
	public readonly about?: string;
	/** The avatar of the server. */
	public readonly avatar?: string;
	/** The banner of the server. */
	public readonly banner?: string;
	/** The timezone of the server. */
	public readonly timezone?: string;
	/** Whether the server is verified. */
	public readonly isVerified?: boolean;
	/** The ID of the server's default channel. */
	public readonly defaultChannelId?: string;
	/** The date the server was created. */
	public readonly createdAt: Date;

	/** The manager of members that belong to the server. */
	public readonly members: ServerMemberManager;
	/** The manager of bans that belong to the server. */
	public readonly bans: ServerBanManager;
	/** The manager of roles that belong to the server. */
	public readonly roles: ServerRoleManager;

	/**
	 * @param client The client the server belongs to.
	 * @param raw The raw data of the server.
	 */
	constructor(client: Client, public readonly raw: APIServer) {
		super(client, raw.id);
		this.ownerId = raw.ownerId;
		this.type = raw.type;
		this.name = raw.name;
		this.url = raw.url;
		this.about = raw.about;
		this.avatar = raw.avatar;
		this.banner = raw.banner;
		this.timezone = raw.timezone;
		this.isVerified = raw.isVerified;
		this.defaultChannelId = raw.defaultChannelId;
		this.createdAt = new Date(raw.createdAt);
		this.members = new ServerMemberManager(this);
		this.bans = new ServerBanManager(this);
		this.roles = new ServerRoleManager(this);
	}

	/** Whether the server is cached. */
	public get isCached() {
		return this.client.servers.cache.has(this.id);
	}

	/** The server member the server belongs to. */
	public get owner() {
		return this.members.cache.get(this.ownerId);
	}

	/** Whether the server is a team server. */
	public get isTeam() {
		return this.type === APIServerType.Team;
	}

	/** Whether the server is a organization server. */
	public get isOrganization() {
		return this.type === APIServerType.Organization;
	}

	/** Whether the server is a community server. */
	public get isCommunity() {
		return this.type === APIServerType.Community;
	}

	/** Whether the server is a clan server. */
	public get isClan() {
		return this.type === APIServerType.Clan;
	}

	/** Whether the server is a guild server. */
	public get isGuild() {
		return this.type === APIServerType.Guild;
	}

	/** Whether the server is a friends server. */
	public get isFriends() {
		return this.type === APIServerType.Friends;
	}

	/** Whether the server is a streaming server. */
	public get isStreaming() {
		return this.type === APIServerType.Streaming;
	}

	/** Whether the server is a other type. */
	public get isOther() {
		return this.type === APIServerType.Other;
	}

	/** The server's default channel. */
	public get defaultChannel() {
		return this.defaultChannelId
			? this.client.channels.cache.get(this.defaultChannelId)
			: undefined;
	}

	/**
	 * Fetch the server.
	 * @param cache Whether to cache the fetched server.
	 * @returns The fetched server.
	 */
	public fetch(cache?: boolean) {
		this.client.servers.cache.delete(this.id);
		return this.client.servers.fetch(this.id, cache) as Promise<this>;
	}

	/**
	 * Create a channel in the server.
	 * @param payload The payload of the channel.
	 * @returns The created channel.
	 */
	public createChannel(payload: Omit<APIChannelPayload, 'serverId'>) {
		return this.client.channels.create({ serverId: this.id, ...payload });
	}
}
