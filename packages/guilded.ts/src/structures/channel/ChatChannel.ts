import { APIChannel } from 'guilded-api-typings';
import { Channel, Client } from '..';
import { MessageManager, MessagePayload } from '../../managers';

/** Represents a chat channel on Guilded. */
export class ChatChannel extends Channel {
	/** The type of this channel. */
	public declare readonly type: 'chat' | 'stream' | 'voice';

	/** A manager of messages that belong to this channel. */
	public readonly messages: MessageManager;

	/**
	 * @param client The client that owns this channel.
	 * @param data The data of the channel.
	 */
	public constructor(client: Client, data: APIChannel) {
		super(client, data);

		this.messages = new MessageManager(this);
	}

	/**
	 * Send a message to the channel.
	 * @param payload The messgae payload.
	 * @returns The message.
	 */
	public async send(payload: string | MessagePayload) {
		return this.messages.create(payload);
	}
}
