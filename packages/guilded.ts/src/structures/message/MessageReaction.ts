import { APIEmote, APIMessageReaction } from 'guilded-api-typings';
import { FetchOptions } from '../../managers/BaseManager';
import { Base } from '../Base';
import { Message } from './Message';

/** Represents a message reaction on Guilded. */
export class MessageReaction extends Base<number> {
	/** The ID of the channel the message belongs to. */
	public readonly channelId: string;
	/** The ID of the message. */
	public readonly messageId: string;
	/** The ID of the user that created the reaction. */
	public readonly createdBy: string;
	/** The emote of the reaction. */
	public readonly emote: APIEmote;

	/**
	 * @param message The message the reaction belongs to.
	 * @param raw The raw data of the reaction.
	 * @param cache Whether to cache the reaction.
	 */
	public constructor(
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

	/** Whether the reaction is cached. */
	public get isCached() {
		return this.message.reactions.cache.has(this.id);
	}

	/** The channel the message belongs to. */
	public get channel() {
		return this.message.channel;
	}

	/** The ID of the server the message belongs to. */
	public get serverId() {
		return this.message.serverId;
	}

	/** The server the message belongs to. */
	public get server() {
		return this.message.server;
	}

	/** The server member that created the reaction. */
	public get author() {
		return this.server?.members.cache.get(this.createdBy);
	}

	/**
	 * Fetch the server the message belongs to.
	 * @param options The options to fetch the server with.
	 * @returns The fetched server.
	 */
	public fetchServer(options?: FetchOptions) {
		return this.message.fetchServer(options);
	}

	/**
	 * Fetch the server member that created the reaction.
	 * @param options The options to fetch the server member with.
	 * @returns The fetched server member.
	 */
	public async fetchAuthor(options?: FetchOptions) {
		const server = await this.fetchServer();
		return server.members.fetch(this.createdBy, options);
	}

	/** Remove the reaction from the message. */
	public remove() {
		return this.message.reactions.remove(this.id);
	}
}
