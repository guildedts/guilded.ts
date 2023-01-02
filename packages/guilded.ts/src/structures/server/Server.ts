import { RESTPostChannelJSONBody, APIServer, ServerType } from 'guilded-api-typings';
import { Client } from '../Client';
import { Base } from '../Base';
import { ServerMemberManager } from '../../managers/server/ServerMemberManager';
import { ServerBanManager } from '../../managers/server/ServerBanManager';
import { ServerRoleManager } from '../../managers/server/ServerRoleManager';
import { FetchOptions } from '../../managers/BaseManager';

/**
 * Represents a server on Guilded
 */
export class Server extends Base {
	/**
	 * The ID of the user that created the server
	 */
	readonly ownerId: string;
	/**
	 * The type of server designated from the server's settings page
	 */
	readonly type?: ServerType;
	/**
	 * The name of the server
	 */
	readonly name: string;
	/**
	 * The URL of the server
	 *
	 * For example, a value of "Guilded-Official" means the server can be accessible from https://www.guilded.gg/Guilded-Official
	 */
	readonly url?: string;
	/**
	 * The description of the server
	 */
	readonly about?: string;
	/**
	 * The avatar of the server
	 */
	readonly avatar?: string;
	/**
	 * The banner of the server
	 */
	readonly banner?: string;
	/**
	 * The timezone of the server
	 */
	readonly timezone?: string;
	/**
	 * Whether the server is verified
	 *
	 * @default false
	 */
	readonly isVerified?: boolean;
	/**
	 * The ID of the default channel in the server
	 *
	 * Useful for welcome messages
	 */
	readonly defaultChannelId?: string;
	/**
	 * When the server was created
	 */
	readonly createdAt: Date;

	/**
	 * The manager for members
	 */
	readonly members: ServerMemberManager;
	/**
	 * The manager for bans
	 */
	readonly bans: ServerBanManager;
	/**
	 * The manager for roles
	 */
	readonly roles: ServerRoleManager;

	/**
	 * @param client The client
	 * @param raw The data of the server
	 * @param cache Whether to cache the server
	 */
	constructor(
		client: Client,
		public readonly raw: APIServer,
		cache = client.options.cacheServers ?? true,
	) {
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
		if (cache) client.servers.cache.set(this.id, this);
	}

	/**
	 * Whether the server is cached
	 */
	get isCached() {
		return this.client.servers.cache.has(this.id);
	}

	/**
	 * The server member that created the server
	 */
	get owner() {
		return this.members.cache.get(this.ownerId);
	}

	/**
	 * Whether the server is a team server
	 */
	get isTeam() {
		return this.type === ServerType.Team;
	}

	/** Whether the server is a organization server. */
	get isOrganization() {
		return this.type === ServerType.Organization;
	}

	/**
	 * Whether the server is a community server
	 */
	get isCommunity() {
		return this.type === ServerType.Community;
	}

	/**
	 * Whether the server is a clan server
	 */
	get isClan() {
		return this.type === ServerType.Clan;
	}

	/**
	 * Whether the server is a guild server
	 */
	get isGuild() {
		return this.type === ServerType.Guild;
	}

	/**
	 * Whether the server is a friends server
	 */
	get isFriends() {
		return this.type === ServerType.Friends;
	}

	/**
	 * Whether the server is a streaming server
	 */
	get isStreaming() {
		return this.type === ServerType.Streaming;
	}

	/**
	 * Whether the server is another type
	 */
	get isOther() {
		return this.type === ServerType.Other;
	}

	/**
	 * The default channel in the server
	 *
	 * Useful for welcome messages
	 */
	get defaultChannel() {
		return this.defaultChannelId
			? this.client.channels.cache.get(this.defaultChannelId)
			: undefined;
	}

	/**
	 * Fetch the server
	 * @param options The options to fetch the server with
	 * @returns The fetched server
	 */
	fetch(options?: FetchOptions) {
		return this.client.servers.fetch(this, options) as Promise<this>;
	}

	/**
	 * Fetch the server member that created the server
	 * @param options The options to fetch the server member with
	 * @returns The fetched server member
	 */
	fetchOwner(options?: FetchOptions) {
		return this.members.fetch(this.ownerId, options);
	}

	/**
	 * Fetch the default channel in the server
	 * @param options The options to fetch the channel with
	 * @returns The fetched channel
	 */
	fetchDefaultChannel(options?: FetchOptions) {
		return this.defaultChannelId
			? this.client.channels.fetch(this.defaultChannelId, options)
			: undefined;
	}

	/**
	 * Create a channel in the server
	 * @param payload The payload of the channel
	 * @returns The created channel
	 */
	createChannel(payload: Omit<RESTPostChannelJSONBody, 'serverId'>) {
		return this.client.channels.create({ serverId: this.id, ...payload });
	}

	/**
	 * Leave the server
	 * @returns The server
	 */
	async leave() {
		await this.members.kick(this.client.user!.id);
		return this;
	}
}

export { ServerType };
