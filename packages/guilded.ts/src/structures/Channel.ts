import { Routes } from '@guildedts/rest';
import { APIChatMessage, APIChatMessagePayload } from 'guilded-api-typings';
import { Client, MessageManager, Base } from '..';

/** Represents a channel on Guilded. */
export class Channel extends Base {
	/** The ID of the channel. */
	public readonly id: string;
	/** A manager of messages that belong to this channel. */
	public readonly messages: MessageManager;

	/** @param data The data of the channel. */
	constructor(data: { id: string }, client: Client) {
		super(client);
		this.id = data.id;
		this.messages = new MessageManager(this);
	}

	/**
	 * Send a message to the channel.
	 * @param payload The payload of the message.
	 */
	public async send(payload: string | MessagePayload) {
		const body: APIChatMessagePayload =
			typeof payload === 'string'
				? { content: payload }
				: { content: payload.content, isPrivate: payload.private };

		const response = await this.client.rest.post<{ message: APIChatMessage }>(
			Routes.channelMessages(this.id),
			body,
		);

		return await this.messages.fetch(response.message.id);
	}

	/**
	 * Fetch the channel.
	 * @returns The channel.
	 */
	public fetch() {
		return this.client.channels.fetch(this.id);
	}
}

export interface MessagePayload {
	content: string;
	private?: boolean;
}
