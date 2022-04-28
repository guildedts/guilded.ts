import {
	APIChatMessage,
	APIChatMessagePayload,
	APIDeletedChatMessage,
	APIEmbed,
	APIGetChatMessagesQuery,
	Routes,
} from 'guilded-api-typings';
import { Embed } from '@guildedts/builders';
import { BaseManager } from '.';
import { CacheCollection, Channel, Message } from '../structures';

/** A manager of messages that belong to a channel. */
export class MessageManager extends BaseManager<string, Message> {
	/** @param channel The channel this manager belongs to. */
	public constructor(public readonly channel: Channel) {
		super(channel.client, {
			cachingEnabled: channel.client.options.cacheMessages,
			maxCache: channel.client.options.maxMessageCache,
		});
	}

	/** @ignore */
	public async fetch(arg1?: string | FetchMessagesOptions, arg2?: boolean) {
		if (typeof arg1 === 'string') return this.fetchSingle(arg1, arg2);

		return this.fetchMany(arg1);
	}

	/** @ignore */
	private async fetchSingle(id: string, cache: boolean = this.cachingEnabled) {
		let message = this.cache.get(id);
		if (message) return message;

		const response = await this.client.rest.get<{ message: APIChatMessage }>(
			Routes.channelMessage(this.channel.id, id),
		);

		message = new Message(this.channel, response.message);

		if (cache) this.cache.set(id, message);

		return message;
	}

	/** @ignore */
	private async fetchMany(options: FetchMessagesOptions = {}) {
		const cache = options.cache ?? this.cachingEnabled;

		const response = await this.client.rest.get<
			{ messages: APIChatMessage[] },
			APIGetChatMessagesQuery
		>(Routes.channelMessages(this.channel.id), {
			limit: options.limit,
			before: options.before,
			after: options.after,
			includePrivate: options.includePrivate,
		});

		const messages = new CacheCollection<string, Message>();

		for (const data of response.messages) {
			const message = new Message(this.channel, data);
			messages.set(message.id, message);
			if (cache) this.cache.set(message.id, message);
		}

		return messages;
	}

	/**
	 * Create a message in this channel.
	 * @param payload The payload to create the message with.
	 * @returns The created message.
	 */
	public async create(payload: string | MessagePayload) {
		const response = await this.client.rest.post<
			{ message: APIChatMessage },
			APIChatMessagePayload
		>(
			Routes.channelMessages(this.channel.id),
			typeof payload === 'string' ? { content: payload } : payload,
		);

		const message = new Message(this.channel, response.message);

		if (this.cachingEnabled) this.cache.set(message.id, message);

		return message;
	}

	/**
	 * Edit a message in this channel.
	 * @param id The ID of the message to edit.
	 * @param payload The new content of the message.
	 * @returns The edited message.
	 */
	public async edit(
		id: string,
		payload: string | Omit<APIChatMessagePayload, 'isPrivate' | 'isSilent' | 'replyMessageIds'>,
	) {
		const response = await this.client.rest.put<
			{ message: APIChatMessage },
			Omit<APIChatMessagePayload, 'isPrivate' | 'isSilent' | 'replyMessageIds'>
		>(Routes.channelMessage(this.channel.id, id), typeof payload === 'string' ? { content: payload } : payload);

		const message = new Message(this.channel, response.message);

		if (this.cachingEnabled) this.cache.set(message.id, message);

		return message;
	}

	/**
	 * Delete a message in this channel.
	 * @param id The ID of the message to delete.
	 * @returns The deleted message.
	 */
	public async delete(id: string) {
		const response = await this.client.rest.delete<{ message: APIDeletedChatMessage }>(
			Routes.channelMessage(this.channel.id, id),
		);

		let message = this.cache.get(id);

		if (message) {
			message.isDeleted = true;
			message.deletedAt = new Date(response.message.deletedAt);
			this.cache.delete(id);
		} else {
			message = new Message(this.channel, response.message);
		}

		return message;
	}

	/**
	 * Add a reaction to a message in this channel.
	 * @param messageId The ID of the message to react to.
	 * @param emojiId The ID of the emoji to react with.
	 * @returns The message that was reacted to.
	 */
	public async react(messageId: string, emojiId: string) {
		await this.client.rest.put<{ message: APIChatMessage }>(
			Routes.messageReaction(this.channel.id, messageId, emojiId),
		);

		const message = await this.fetch(messageId);

		return message;
	}
}

export declare interface MessageManager {
	/**
	 * Fetch a single message from this channel, or cache if it's already cached.
	 * @param id The ID of the message.
	 * @param cache Whether to cache the message.
	 * @returns The message.
	 */
	fetch(id: string, cache?: boolean): Promise<Message>;

	/**
	 * Fetch multiple messages from this channel.
	 * @param options The options to fetch the messages with.
	 * @returns The messages.
	 */
	fetch(options?: FetchMessagesOptions): Promise<CacheCollection<string, Message>>;
}

/** The options to fetch messages with. */
export interface FetchMessagesOptions extends APIGetChatMessagesQuery {
	/** Whether to cache the messages. */
	cache?: boolean;
}

/** Payload to create a message with. */
export interface MessagePayload extends APIChatMessagePayload {
	/** The embeds of the message. */
	embeds?: (APIEmbed | Embed)[];
}
