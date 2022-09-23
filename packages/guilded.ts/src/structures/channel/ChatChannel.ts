import { APIChannel } from 'guilded-api-typings';
import { Client } from '../Client';
import { Channel } from './Channel';
import { MessageManager, MessagePayloadResolvable } from '../../managers/message/MessageManager';
import { CollectorOptions } from '../../collectors/Collector';
import { Message } from '../message/Message';
import { MessageCollector } from '../../collectors/MessageCollector';
import { Collection } from '@discordjs/collection';

/**
 * Represents a chat channel on Guilded.
 * @example new ChatChannel(client, rawChannel);
 */
export class ChatChannel extends Channel {
	/** The manager of messages that belong to the chat channel. */
	readonly messages: MessageManager;

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
	 * @example channel.send('Hello world!');
	 */
	send(payload: MessagePayloadResolvable) {
		return this.messages.create(payload);
	}

	/**
	 * Create a message collector for the chat channel.
	 * @param options The options of the message collector.
	 * @returns The created message collector.
	 * @example channel.createMessageCollector();
	 */
	createMessageCollector(options?: CollectorOptions<Message>) {
		return new MessageCollector(this, options);
	}

	/**
	 * Similar to createMessageCollector but in promise form.
	 * @param options The options of the message collector.
	 * @returns The collected messages.
	 * @example channel.awaitMessages();
	 */
	awaitMessages(options?: CollectorOptions<Message>) {
		return new Promise<Collection<string, Message>>((resolve) =>
			this.createMessageCollector(options).once('end', resolve),
		);
	}
}
