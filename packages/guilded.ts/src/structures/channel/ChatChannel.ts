import { APIChannel } from 'guilded-api-typings';
import { Client } from '../Client';
import { Channel } from './Channel';
import { MessageManager, MessagePayload } from '../../managers/MessageManager';

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
}
