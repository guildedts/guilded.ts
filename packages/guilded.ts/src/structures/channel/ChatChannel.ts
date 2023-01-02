import { APIChannel } from 'guilded-api-typings';
import { Client } from '../Client';
import { Channel } from './Channel';
import { MessageManager, MessagePayloadResolvable } from '../../managers/message/MessageManager';
import { CollectorOptions } from '../../collectors/Collector';
import { Message } from '../message/Message';
import { MessageCollector } from '../../collectors/MessageCollector';
import { Collection } from '@discordjs/collection';

/**
 * Represents a chat channel on Guilded
 */
export class ChatChannel extends Channel {
	/**
	 * The manager for messages
	 */
	readonly messages: MessageManager;

	/**
	 * @param client The client
	 * @param raw The data of the chat channel
	 * @param cache Whether to cache the chat channel
	 */
	constructor(client: Client, raw: APIChannel, cache?: boolean) {
		super(client, raw, cache);
		this.messages = new MessageManager(this);
	}

	/**
	 * Create a message in the chat channel
	 * @param payload The payload of the message
	 * @returns The created message
	 */
	send(payload: MessagePayloadResolvable) {
		return this.messages.create(payload);
	}

	/**
	 * Create a message collector for the chat channel
	 * @param options The options for the message collector
	 * @returns The created message collector
	 * @example
	 * const collector = channel.createMessageCollector({ time: 15 * 1000 });
	 *
	 * collector.on('end', (messages) => console.log(`Collected ${messages.size} messages!`));
	 */
	createMessageCollector(options?: CollectorOptions<Message>) {
		return new MessageCollector(this, options);
	}

	/**
	 * Similar to {@link ChatChannel.createMessageCollector createMessageCollector} but in promise form
	 * @param options The options for the message collector
	 * @returns The collected messages
	 * @example
	 * const messages = await channel.awaitMessages({ time: 15 * 1000 });
	 *
	 * console.log(`Collected ${messages.size} messages!`);
	 */
	awaitMessages(options?: CollectorOptions<Message>) {
		return new Promise<Collection<string, Message>>((resolve) =>
			this.createMessageCollector(options).once('end', resolve),
		);
	}
}
