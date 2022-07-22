import {
	APIMessagePayload,
	APIEmbed,
	APIFetchMessagesQuery,
	APIMessageEditPayload,
	APIMessageEditPayloadResolvable,
	APIMessagePayloadResolvable,
} from 'guilded-api-typings';
import { Embed } from '@guildedts/builders';
import { BaseManager, FetchManyOptions, FetchOptions } from '../BaseManager';
import { Message } from '../../structures/message/Message';
import { ChatChannel } from '../../structures/channel/ChatChannel';
import { Collection } from '@discordjs/collection';

/**
 * The manager of messages that belong to a chat based channel.
 * @example new MessageManager(channel);
 */
export class MessageManager extends BaseManager<string, Message> {
	/** @param channel The chat based channel the messages belong to. */
	constructor(public readonly channel: ChatChannel) {
		super(channel.client, channel.client.options.maxMessageCache);
	}

	/**
	 * Fetch a message from the chat based channel, or cache.
	 * @param message The message to fetch.
	 * @param options The options to fetch the message with.
	 * @returns The fetched message.
	 * @example messages.fetch(message);
	 */
	fetch(message: string | Message, options?: FetchOptions): Promise<Message>;
	/**
	 * Fetch messages from the chat based channel.
	 * @param options The options to fetch the messages with.
	 * @returns The fetched messages.
	 * @example messages.fetch();
	 */
	fetch(options?: FetchMessagesOptions): Promise<Collection<string, Message>>;
	/** @ignore */
	fetch(arg1?: string | Message | FetchMessagesOptions, arg2?: FetchOptions) {
		if (typeof arg1 === 'string' || arg1 instanceof Message)
			return this.fetchSingle(arg1, arg2);
		return this.fetchMany(arg1);
	}

	/** @ignore */
	private async fetchSingle(message: string | Message, options?: FetchOptions) {
		message = message instanceof Message ? message.id : message;
		const cached = this.cache.get(message);
		if (cached && !options?.force) return cached;
		const raw = await this.client.api.messages.fetch(this.channel.id, message);
		return new Message(this.channel, raw, options?.cache);
	}

	/** @ignore */
	private async fetchMany(options?: FetchMessagesOptions) {
		const raw = await this.client.api.messages.fetch(this.channel.id, options);
		const messages = new Collection<string, Message>();
		for (const data of raw) {
			const message = new Message(this.channel, data, options?.cache);
			messages.set(message.id, message);
		}
		return messages;
	}

	/**
	 * Create a message in the chat based channel.
	 * @param payload The payload of the message.
	 * @returns The created message.
	 * @example messages.create('Hello world!');
	 */
	async create(payload: MessagePayloadResolvable) {
		const raw = await this.client.api.messages.create(
			this.channel.id,
			payload as APIMessagePayloadResolvable,
		);
		return new Message(this.channel, raw);
	}

	/**
	 * Edit a message in the chat based channel.
	 * @param message The message to edit.
	 * @param payload The payload of the message.
	 * @returns The edited message.
	 * @example messages.edit(message, 'Hello world!');
	 */
	async edit(message: string | Message, payload: MessageEditPayloadResolvable) {
		message = message instanceof Message ? message.id : message;
		const raw = await this.client.api.messages.edit(
			this.channel.id,
			message,
			payload as APIMessageEditPayloadResolvable,
		);
		return new Message(this.channel, raw);
	}

	/**
	 * Delete a message in the chat based channel.
	 * @param message The message to delete.
	 * @example messages.delete(message);
	 */
	delete(message: string | Message) {
		message = message instanceof Message ? message.id : message;
		return this.client.api.messages.delete(this.channel.id, message);
	}
}

/** The options for fetching messages. */
export interface FetchMessagesOptions extends FetchManyOptions, APIFetchMessagesQuery {}

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
