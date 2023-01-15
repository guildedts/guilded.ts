import {
	RESTPostMessageJSONBody,
	APIEmbed,
	RESTGetMessagesQuery,
	RESTPutMessageJSONBody,
} from 'guilded-api-typings';
import { EmbedBuilder } from '@guildedts/builders';
import { BaseManager, FetchManyOptions, FetchOptions } from '../BaseManager';
import { Message } from '../../structures/message/Message';
import { ChatChannel } from '../../structures/channel/ChatChannel';
import { Collection } from '@discordjs/collection';
import { CollectorOptions } from '../../collectors/Collector';
import { MessageCollector } from '../../collectors/MessageCollector';

/**
 * The manager for messages
 */
export class MessageManager extends BaseManager<string, Message> {
	/**
	 * @param channel The chat channel
	 */
	constructor(public readonly channel: ChatChannel) {
		super(channel.client, channel.client.options.maxMessageCache);
	}

	/**
	 * Fetch a message from the channel
	 * @param message The message
	 * @param options The options to fetch the message with
	 * @returns The fetched message
	 */
	fetch(message: string | Message, options?: FetchOptions): Promise<Message>;
	/**
	 * Fetch messages from the channel
	 * @param options The options to fetch the messages with
	 * @returns The fetched messages
	 */
	fetch(options?: MessageFetchManyOptions): Promise<Collection<string, Message>>;
	fetch(arg1?: string | Message | MessageFetchManyOptions, arg2?: FetchOptions) {
		if (typeof arg1 === 'string' || arg1 instanceof Message)
			return this.fetchSingle(arg1, arg2);
		return this.fetchMany(arg1);
	}

	private async fetchSingle(message: string | Message, options?: FetchOptions) {
		message = message instanceof Message ? message.id : message;
		const cached = this.cache.get(message);
		if (cached && !options?.force) return cached;
		const raw = await this.client.api.messages.fetch(this.channel.id, message);
		return new Message(this.channel, raw, options?.cache);
	}

	private async fetchMany(options?: MessageFetchManyOptions) {
		const raw = await this.client.api.messages.fetch(this.channel.id, options);
		const messages = new Collection<string, Message>();
		for (const data of raw) {
			const message = new Message(this.channel, data, options?.cache);
			messages.set(message.id, message);
		}
		return messages;
	}

	/**
	 * Create a message in the channel
	 * @param options The options to create the message with
	 * @returns The created message
	 */
	async create(options: MessagePayloadResolvable) {
		const raw = await this.client.api.messages.create(
			this.channel.id,
			(typeof options === 'string'
				? { content: options }
				: Array.isArray(options)
				? { embeds: options }
				: options) as RESTPostMessageJSONBody,
		);
		return new Message(this.channel, raw);
	}

	/**
	 * Update a message in the channel
	 * @param message The message
	 * @param options The options to update the message with
	 * @returns The updated message
	 */
	async update(message: string | Message, options: MessageEditPayloadResolvable) {
		message = message instanceof Message ? message.id : message;
		const raw = await this.client.api.messages.edit(
			this.channel.id,
			message,
			(typeof options === 'string'
				? { content: options }
				: Array.isArray(options)
				? { embeds: options }
				: options) as RESTPutMessageJSONBody,
		);
		return new Message(this.channel, raw);
	}

	/**
	 * Delete a message from the channel
	 * @param message The message
	 */
	delete(message: string | Message) {
		message = message instanceof Message ? message.id : message;
		return this.client.api.messages.delete(this.channel.id, message);
	}

	/**
	 * Create a message collector for the chat channel
	 * @param options The options for the message collector
	 * @returns The created message collector
	 * @example
	 * const collector = channel.messages.createCollector({ time: 15 * 1000 });
	 *
	 * collector.on('end', (messages) => console.log(`Collected ${messages.size} messages!`));
	 */
	createCollector(options?: CollectorOptions<Message>) {
		return new MessageCollector(this, options);
	}

	/**
	 * Similar to {@link createCollector} but in promise form
	 * @param options The options for the message collector
	 * @returns The collected messages
	 * @example
	 * const messages = await channel.messages.await({ time: 15 * 1000 });
	 *
	 * console.log(`Collected ${messages.size} messages!`);
	 */
	await(options?: CollectorOptions<Message>) {
		return new Promise<Collection<string, Message>>((resolve) =>
			this.createCollector(options).once('end', resolve),
		);
	}
}

/**
 * The options for fetching messages
 */
export interface MessageFetchManyOptions extends FetchManyOptions, RESTGetMessagesQuery {}

/**
 * The payload for creating a message
 */
export interface MessagePayload extends Omit<RESTPostMessageJSONBody, 'embeds'> {
	/**
	 * The embeds of the message
	 */
	embeds?: (EmbedBuilder | APIEmbed)[];
}

/**
 * The payload for editing a message
 */
export interface MessageEditPayload extends Omit<RESTPutMessageJSONBody, 'embeds'> {
	/**
	 * The embeds of the message
	 */
	embeds?: (EmbedBuilder | APIEmbed)[];
}

/**
 * The resolvable payload for creating a message
 */
export type MessagePayloadResolvable = string | (EmbedBuilder | APIEmbed)[] | MessagePayload;

/**
 * The resolvable payload for editing a message
 */
export type MessageEditPayloadResolvable =
	| string
	| (EmbedBuilder | APIEmbed)[]
	| MessageEditPayload;
