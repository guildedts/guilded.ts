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
	 * @param data The data of the server
	 * @param cache Whether to cache the server
	 */
	constructor(
		client: Client,
		public readonly data: APIServer,
		cache = client.options.cacheServers ?? true,
	) {
		super(client);
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
	 * The ID of the server
	 */
	get id() {
		return this.data.id;
	}

	/**
	 * The ID of the user that created the server
	 */
	get ownerId() {
		return this.data.ownerId;
	}

	/**
	 * The server member that created the server
	 */
	get owner() {
		return this.members.cache.get(this.ownerId) ?? null;
	}

	/**
	 * Whether the client user created the server
	 */
	get isOwner() {
		return this.ownerId === this.client.user?.id;
	}

	/**
	 * The type of server designated from the server's settings page
	 */
	get type() {
		return this.data.type ?? null;
	}

	/**
	 * The name of the server
	 */
	get name() {
		return this.data.name;
	}

	/**
	 * The vanity URL of the server
	 *
	 * For example, a value of "Guilded-Official" means the server can be accessible from https://www.guilded.gg/Guilded-Official
	 */
	get vanityUrl() {
		return this.data.url ?? null;
	}

	/**
	 * The description of the server
	 */
	get description() {
		return this.data.about ?? null;
	}

	/**
	 * The avatar of the server
	 */
	get avatar() {
		return this.data.avatar ?? null;
	}

	/**
	 * The banner of the server
	 */
	get banner() {
		return this.data.banner ?? null;
	}

	/**
	 * The timezone of the server
	 */
	get timezone() {
		return this.data.timezone ?? null;
	}

	/**
	 * Whether the server is verified
	 */
	get isVerified() {
		return this.data.isVerified ?? false;
	}

	/**
	 * The ID of the default channel of the server
	 *
	 * Useful for welcome messages
	 */
	get defaultChannelId() {
		return this.data.defaultChannelId ?? null;
	}

	/**
	 * The default channel of the server
	 *
	 * Useful for welcome messages
	 */
	get defaultChannel() {
		return this.defaultChannelId
			? this.client.channels.cache.get(this.defaultChannelId) ?? null
			: null;
	}

	/**
	 * When the server was created
	 */
	get createdAt() {
		return new Date(this.data.createdAt);
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
	 * Fetch the user that created the server
	 * @returns The fetched user
	 */
	fetchOwner() {
		return this.client.users.fetch(this.id, this.ownerId);
	}

	/**
	 * Fetch the default channel of the server
	 * @param options The options to fetch the channel with
	 * @returns The fetched channel, if present
	 */
	async fetchDefaultChannel(options?: FetchOptions) {
		return this.defaultChannelId
			? this.client.channels.fetch(this.defaultChannelId, options)
			: null;
	}

	/**
	 * Create a channel in the server
	 * @param options The options to create the channel with
	 * @returns The created channel
	 */
	createChannel(options: Omit<RESTPostChannelJSONBody, 'serverId'>) {
		return this.client.channels.create({ serverId: this.id, ...options });
	}

	/**
	 * Leave the server
	 * @returns The server
	 */
	async leave() {
		await this.members.kick('@me');
		return this;
	}
}

export { ServerType };
