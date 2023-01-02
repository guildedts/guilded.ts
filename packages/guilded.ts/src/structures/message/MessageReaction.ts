import { APIEmote, APIMessageReaction } from 'guilded-api-typings';
import { FetchOptions } from '../../managers/BaseManager';
import { Base } from '../Base';
import { Message } from './Message';

/**
 * Represents a message reaction on Guilded
 */
export class MessageReaction extends Base<number> {
	/**
	 * The ID of the channel
	 */
	readonly channelId: string;
	/**
	 * The ID of the message
	 */
	readonly messageId: string;
	/**
	 * The ID of the user that created the reaction
	 */
	readonly createdBy: string;
	/**
	 * The emote
	 */
	readonly emote: APIEmote;

	/**
	 * @param message The message
	 * @param raw The data of the message reaction
	 * @param cache Whether to cache the message reaction
	 */
	constructor(
		public readonly message: Message,
		public readonly raw: APIMessageReaction,
		cache = message.channel.client.options.cacheMessageReactions ?? true,
	) {
		super(message.client, raw.emote.id);
		this.channelId = raw.channelId;
		this.messageId = raw.messageId;
		this.createdBy = raw.createdBy;
		this.emote = raw.emote;
		if (cache) message.reactions.cache.set(this.id, this);
	}

	/**
	 * Whether the message reaction is cached
	 */
	get isCached() {
		return this.message.reactions.cache.has(this.id);
	}

	/**
	 * The channel
	 */
	get channel() {
		return this.message.channel;
	}

	/**
	 * The ID of the server
	 */
	get serverId() {
		return this.message.serverId;
	}

	/**
	 * The server
	 */
	get server() {
		return this.message.server;
	}

	/**
	 * The server member that created the reaction
	 */
	get author() {
		return this.server?.members.cache.get(this.createdBy);
	}

	/**
	 * Fetch the server
	 * @param options The options to fetch the server with
	 * @returns The fetched server
	 */
	fetchServer(options?: FetchOptions) {
		return this.message.fetchServer(options);
	}

	/**
	 * Fetch the server member that created the reaction
	 * @param options The options to fetch the server member with
	 * @returns The fetched server member
	 */
	async fetchAuthor(options?: FetchOptions) {
		const server = await this.fetchServer();
		return server.members.fetch(this.createdBy, options);
	}

	/**
	 * Remove the reaction from the message
	 */
	remove() {
		return this.message.reactions.remove(this.id);
	}
}
