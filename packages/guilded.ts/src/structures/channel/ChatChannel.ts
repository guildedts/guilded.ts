import { APIChannel, APIChannelType } from 'guilded-api-typings';
import { Client } from '../Client';
import { Channel } from './Channel';
import { MessageManager, MessagePayloadResolvable } from '../../managers/MessageManager';
import { CollectorOptions } from '../../collectors/Collector';
import { Message } from '../Message';
import { MessageCollector } from '../../collectors/MessageCollector';

/** Represents a chat channel on Guilded. */
export class ChatChannel extends Channel {
	public declare readonly type:
		| APIChannelType.Chat
		| APIChannelType.Stream
		| APIChannelType.Voice;

	/** The manager of messages that belong to the chat channel. */
	public readonly messages: MessageManager;

	/**
	 * @param client The client the chat channel belongs to.
	 * @param raw The raw data of the chat channel.
	 * @param cache Whether to cache the chat channel.
	 */
	constructor(client: Client, raw: APIChannel, cache?: boolean) {
		super(client, raw, cache);
		this.messages = new MessageManager(this);
	}

	/**
	 * Create a message in the chat channel.
	 * @param payload The payload of the message.
	 * @returns The created message.
	 */
	public send(payload: MessagePayloadResolvable) {
		return this.messages.create(payload);
	}

	/**
	 * Create a message collector for the chat channel.
	 * @param options The options of the message collector.
	 * @returns The created message collector.
	 */
	public createMessageCollector(options?: CollectorOptions<Message>) {
		return new MessageCollector(this, options);
	}
}
