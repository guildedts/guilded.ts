import { Routes } from '@guildedts/rest';
import { APIChatMessage } from 'guilded-api-typings';
import { BaseManager, Channel, Message } from '..';

/** A manager of messages that belong to a channel. */
export class MessageManager extends BaseManager<string, Message> {
	/** @param channel The channel that the messages belong to. */
	constructor(public channel: Channel) {
		super(channel.client);
	}

	/**
	 * Fetch a message by its ID.
	 * @param id The ID of the message.
	 * @returns The message.
	 */
	public async fetch(id: string) {
		let message = this.cache.get(id);
		if (message) return message;
		const response = await this.client.rest.get<{ message: APIChatMessage }>(
			Routes.channelMessage(this.channel.id, id)
		);
		message = new Message(
			response.message,
			(
				await this.client.servers
					.fetch(response.message.serverId!)
					.members.fetch(response.message.createdBy)
			).user,
			this.channel
		);
		this.cache.set(id, message);
		return message;
	}
}
