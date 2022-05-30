import { APIChannel } from 'guilded-api-typings';
import { Client } from '../Client';
import { Channel } from './Channel';
import { MessageManager, MessagePayload } from '../../managers/MessageManager';
import { CollectorOptions } from '../../collectors/Collector';
import { Message } from '../Message';
import { MessageCollector } from '../../collectors/MessageCollector';

/** Represents a chat channel on Guilded. */
export class ChatChannel extends Channel {
	/** The type of channel. */
	public declare readonly type: 'chat' | 'stream' | 'voice';

	/** A manager of messages that belong to the chat channel. */
	public readonly messages: MessageManager;

	/**
	 * @param client The client that owns the chat channel.
	 * @param raw The raw data of the chat channel.
	 */
	constructor(client: Client, raw: APIChannel) {
		super(client, raw);
		this.messages = new MessageManager(this);
	}

	/**
	 * Send a message to the chat channel.
	 * @param payload The payload to sent the message with.
	 * @returns The sent message.
	 */
	public send(payload: string | MessagePayload) {
		return this.messages.create(payload);
	}

	/**
	 * Create a message collector for the chat channel.
	 * @param options The options for the message collector.
	 * @returns The message collector.
	 */
	public createMessageCollector(options?: CollectorOptions<Message>) {
		return new MessageCollector(this, options);
	}
}
