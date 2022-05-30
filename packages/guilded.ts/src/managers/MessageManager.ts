import {
	APIMessagePayload,
	APIEmbed,
	APIFetchMessagesQuery,
	APIMessageEditPayload,
} from 'guilded-api-typings';
import { Embed } from '@guildedts/builders';
import { BaseManager } from './BaseManager';
import { ChatBasedChannel } from './channel/ChannelManager';
import { CacheCollection } from '../structures/CacheCollection';
import { ChatChannel } from '../structures/channel/ChatChannel';
import { Message } from '../structures/Message';

/** A manager of messages that belong to a chat based channel. */
export class MessageManager extends BaseManager<string, Message> {
	/** @param channel The chat based channel the messages belong to. */
	public constructor(public readonly channel: ChatBasedChannel) {
		super(channel.client, channel.client.options.maxMessageCache);
	}

	/** @ignore */
	public async fetch(
		arg1: string | APIFetchMessagesQuery = {},
		arg2 = this.client.options.cacheMessages ?? true,
	) {
		if (typeof arg1 === 'string') return this.fetchSingle(arg1, arg2);
		return this.fetchMany(arg1, arg2);
	}

	/** @ignore */
	private async fetchSingle(messageId: string, cache: boolean) {
		let message = this.cache.get(messageId);
		if (message) return message;
		const raw = await this.client.api.messages.fetch(this.channel.id, messageId);
		message = new Message(this.channel, raw);
		if (cache) this.cache.set(messageId, message);
		return message;
	}

	/** @ignore */
	private async fetchMany(options: APIFetchMessagesQuery = {}, cache: boolean) {
		const raw = await this.client.api.messages.fetch(this.channel.id, options);
		const messages = new CacheCollection<string, Message>();
		for (const data of raw) {
			const message = new Message(this.channel as ChatChannel, data);
			messages.set(message.id, message);
			if (cache) this.cache.set(message.id, message);
		}
		return messages;
	}

	/**
	 * Create a message in the chat based channel.
	 * @param payload The payload to create the message with.
	 * @returns The created message.
	 */
	public async create(payload: string | MessagePayload) {
		const raw = await this.client.api.messages.create(
			this.channel.id,
			payload as string | APIMessagePayload,
		);
		return new Message(this.channel, raw);
	}

	/**
	 * Edit a message in the chat based channel.
	 * @param messageId The ID of the message to edit.
	 * @param payload The payload to edit the message with.
	 * @returns The edited message.
	 */
	public async edit(messageId: string, payload: string | MessageEditPayload) {
		const raw = await this.client.api.messages.edit(
			this.channel.id,
			messageId,
			payload as string | APIMessagePayload,
		);
		return new Message(this.channel, raw);
	}

	/**
	 * Delete a message in the chat based channel.
	 * @param messageId The ID of the message to delete.
	 */
	public delete(messageId: string) {
		return this.client.api.messages.delete(this.channel.id, messageId);
	}
}

export declare interface MessageManager {
	/**
	 * Fetch a single message from the channel, or cache.
	 * @param messageId The ID of the message to fetch.
	 * @param cache Whether to cache the fetched message.
	 * @returns The fetched message.
	 */
	fetch(messageId: string, cache?: boolean): Promise<Message>;

	/**
	 * Fetch multiple messages from the channel.
	 * @param options The options to fetch the messages with.
	 * @param cache Whether to cache the fetched messages.
	 * @returns The fetched messages.
	 */
	fetch(
		options?: APIFetchMessagesQuery,
		cache?: boolean,
	): Promise<CacheCollection<string, Message>>;
}

/** The payload for creating a message. */
export interface MessagePayload extends Omit<APIMessagePayload, 'embeds'> {
	/** The embeds of the message. */
	embeds?: (APIEmbed | Embed)[];
}

/** The payload for editing a message. */
export interface MessageEditPayload extends Omit<APIMessageEditPayload, 'embeds'> {
	/** The embeds of the message. */
	embeds?: (APIEmbed | Embed)[];
}
