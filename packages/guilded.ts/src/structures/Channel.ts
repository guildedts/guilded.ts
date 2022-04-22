import { APIChatMessagePayload } from 'guilded-api-typings';
import Client, { Base, MessageManager } from '..';

/** Represents a channel on Guilded. */
export class Channel extends Base {
	/** The ID of the channel. */
	public readonly id: string;

	/** A manager of messages that belong to this channel. */
	public readonly messages: MessageManager;

	/**
	 * @param client The client that owns this channel.
	 * @param data The data of the channel.
	 */
	public constructor(client: Client, data: { id: string }) {
		super(client);
		this.id = data.id;
		this.messages = new MessageManager(this);
	}

	/**
	 * Fetch this channel.
	 * @param cache Whether to cache the channel.
	 * @returns The channel.
	 */
	public async fetch(cache: boolean) {
		return cache;
	}

	/**
	 * Send a message to the channel.
	 * @param payload The messgae payload.
	 * @returns The message.
	 */
	public async send(payload: string | APIChatMessagePayload) {
		return this.messages.create(typeof payload === 'string' ? { content: payload } : payload);
	}
}
