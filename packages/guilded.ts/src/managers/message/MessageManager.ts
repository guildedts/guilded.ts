import {
	APIChatMessage,
	APIChatMessagePayload,
	APIEmbed,
	APIGetChatMessagesQuery,
	Routes,
} from 'guilded-api-typings';
import { Embed } from '@guildedts/builders';
import { BaseManager, ChatBasedChannel } from '..';
import { CacheCollection, ChatChannel, Message } from '../../structures';

/** A manager of messages that belong to a chat based channel. */
export class MessageManager extends BaseManager<string, Message> {
	/** @param channel The channel this manager belongs to. */
	public constructor(public readonly channel: ChatBasedChannel) {
		super(channel.client, {
			caching: channel.client.options.cacheMessages,
			maxCache: channel.client.options.maxMessageCache,
		});
	}

	/** @ignore */
	public async fetch(arg1: string | APIGetChatMessagesQuery = {}, arg2 = this.caching) {
		if (typeof arg1 === 'string') return this.fetchSingle(arg1, arg2);

		return this.fetchMany(arg1);
	}

	/** @ignore */
	private async fetchSingle(messageId: string, cache = this.caching) {
		let message = this.cache.get(messageId);
		if (message) return message;

		const response = await this.client.rest.get<{ message: APIChatMessage }>(
			Routes.channelMessage(this.channel.id, messageId),
		);

		message = new Message(this.channel as ChatChannel, response.message);

		if (cache) this.cache.set(messageId, message);

		return message;
	}

	/** @ignore */
	private async fetchMany(options: APIGetChatMessagesQuery = {}, cache = this.caching) {
		const response = await this.client.rest.get<
			{ messages: APIChatMessage[] },
			APIGetChatMessagesQuery
		>(Routes.channelMessages(this.channel.id), options);

		const messages = new CacheCollection<string, Message>();

		for (const data of response.messages) {
			const message = new Message(this.channel as ChatChannel, data);
			messages.set(message.id, message);
			if (cache) this.cache.set(message.id, message);
		}

		return messages;
	}

	/**
	 * Create a message in this channel.
	 * @param payload The payload to create the message with.
	 * @param cache Whether to cache the message.
	 * @returns The created message.
	 */
	public async create(payload: string | MessagePayload, cache = this.caching) {
		const response = await this.client.rest.post<
			{ message: APIChatMessage },
			APIChatMessagePayload
		>(
			Routes.channelMessages(this.channel.id),
			typeof payload === 'string'
				? { content: payload }
				: {
						content: payload.content,
						embeds: payload.embeds,
						replyMessageIds: payload.replyMessageIds,
						isPrivate: payload.private,
						isSilent: payload.silent,
				  },
		);

		const message = new Message(this.channel as ChatChannel, response.message);

		if (cache) this.cache.set(message.id, message);

		return message;
	}

	/**
	 * Edit a message in this channel.
	 * @param messageId The ID of the message to edit.
	 * @param payload The new content of the message.
	 * @param cache Whether to cache the message.
	 * @returns The edited message.
	 */
	public async edit(
		messageId: string,
		payload: string | Omit<MessagePayload, 'private' | 'silent' | 'replyMessageIds'>,
		cache = this.caching,
	) {
		const response = await this.client.rest.put<
			{ message: APIChatMessage },
			Omit<APIChatMessagePayload, 'isPrivate' | 'isSilent' | 'replyMessageIds'>
		>(
			Routes.channelMessage(this.channel.id, messageId),
			typeof payload === 'string'
				? { content: payload }
				: {
						content: payload.content,
						embeds: payload.embeds,
				  },
		);

		const message = new Message(this.channel, response.message);

		if (cache) this.cache.set(message.id, message);

		return message;
	}

	/**
	 * Delete a message in this channel.
	 * @param messageId The ID of the message to delete.
	 * @returns The deleted message.
	 */
	public async delete(messageId: string) {
		await this.client.rest.delete(Routes.channelMessage(this.channel.id, messageId));

		const message = this.cache.get(messageId);

		this.cache.delete(messageId);

		return message;
	}
}

export declare interface MessageManager {
	/**
	 * Fetch a single message from this channel, or cache if it's already cached.
	 * @param messageId The ID of the message.
	 * @param cache Whether to cache the message.
	 * @returns The message.
	 */
	fetch(messageId: string, cache?: boolean): Promise<Message>;

	/**
	 * Fetch multiple messages from this channel.
	 * @param options The options to fetch the messages with.
	 * @returns The messages.
	 */
	fetch(
		options?: APIGetChatMessagesQuery,
		cache?: boolean,
	): Promise<CacheCollection<string, Message>>;
}

/** Payload to create a message with. */
export interface MessagePayload {
	/** The content of this message. */
	content?: string;
	/** The embeds of this message. */
	embeds?: (APIEmbed | Embed)[];
	/** Message IDs to reply to. */
	replyMessageIds?: string[];
	/** Whether this message is private. */
	private?: boolean;
	/** Whether this message is silent. */
	silent?: boolean;
}
