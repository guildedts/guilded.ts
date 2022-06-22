import {
	APIMessagePayload,
	APIEmbed,
	APIFetchMessagesQuery,
	APIMessageEditPayload,
	APIMessageEditPayloadResolvable,
	APIMessagePayloadResolvable,
} from 'guilded-api-typings';
import { Embed } from '@guildedts/builders';
import { BaseManager } from './BaseManager';
import { ChatBasedChannel } from './channel/ChannelManager';
import { CacheCollection } from '../structures/CacheCollection';
import { Message } from '../structures/Message';

/** The manager of messages that belong to a chat based channel. */
export class MessageManager extends BaseManager<string, Message> {
	/** @param channel The chat based channel the messages belong to. */
	public constructor(public readonly channel: ChatBasedChannel) {
		super(channel.client, channel.client.options.maxMessageCache);
	}

	/**
	 * Fetch a message from the chat based channel, or cache.
	 * @param messageId The ID of the message to fetch.
	 * @param cache Whether to cache the fetched message.
	 * @returns The fetched message.
	 */
	public fetch(messageId: string, cache?: boolean): Promise<Message>;
	/**
	 * Fetch messages from the chat based channel.
	 * @param options The options to fetch the messages with.
	 * @param cache Whether to cache the fetched messages.
	 * @returns The fetched messages.
	 */
	public fetch(
		options?: APIFetchMessagesQuery,
		cache?: boolean,
	): Promise<CacheCollection<string, Message>>;
	/** @ignore */
	public async fetch(arg1?: string | APIFetchMessagesQuery, arg2?: boolean) {
		if (typeof arg1 === 'string') return this.fetchSingle(arg1, arg2);
		return this.fetchMany(arg1, arg2);
	}

	/** @ignore */
	private async fetchSingle(messageId: string, cache?: boolean) {
		const message = this.cache.get(messageId);
		if (message) return message;
		const raw = await this.client.api.messages.fetch(this.channel.id, messageId);
		return new Message(this.channel, raw, cache);
	}

	/** @ignore */
	private async fetchMany(options?: APIFetchMessagesQuery, cache?: boolean) {
		const raw = await this.client.api.messages.fetch(this.channel.id, options);
		const messages = new CacheCollection<string, Message>();
		for (const data of raw) {
			const message = new Message(this.channel, data, cache);
			messages.set(message.id, message);
		}
		return messages;
	}

	/**
	 * Create a message in the chat based channel.
	 * @param payload The payload of the message.
	 * @returns The created message.
	 */
	public async create(payload: MessagePayloadResolvable) {
		const raw = await this.client.api.messages.create(
			this.channel.id,
			payload as APIMessagePayloadResolvable,
		);
		return new Message(this.channel, raw);
	}

	/**
	 * Edit a message in the chat based channel.
	 * @param messageId The ID of the message to edit.
	 * @param payload The payload of the message.
	 * @returns The edited message.
	 */
	public async edit(messageId: string, payload: MessageEditPayloadResolvable) {
		const raw = await this.client.api.messages.edit(
			this.channel.id,
			messageId,
			payload as APIMessageEditPayloadResolvable,
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

/** The payload for creating a message. */
export interface MessagePayload extends Omit<APIMessagePayload, 'embeds'> {
	/** The embeds of the message. */
	embeds?: (Embed | APIEmbed)[];
}

/** The payload for editing a message. */
export interface MessageEditPayload extends Omit<APIMessageEditPayload, 'embeds'> {
	/** The embeds of the message. */
	embeds?: (Embed | APIEmbed)[];
}

/** The resolvable payload for creating a message. */
export type MessagePayloadResolvable = string | (Embed | APIEmbed)[] | MessagePayload;

/** The resolvable payload for editing a message. */
export type MessageEditPayloadResolvable = string | (Embed | APIEmbed)[] | MessageEditPayload;
