import { Routes } from '@guildedts/rest';
import { APIChatMessage, APIChatMessageType } from 'guilded-api-typings';
import { Base, Channel, User } from '..';

/** Represents a message on Guilded. */
export class Message extends Base {
	/** The ID of the message. */
	public readonly id: string;
	/** The ID of the channel that the message belongs to. */
	public readonly channelId: string;
	/** The ID of the server that the message belongs to. */
	public readonly serverId?: string;
	/** The content of the message. */
	public readonly content: string;
	/** The timestamp of when the message was sent. */
	public readonly createdAt: Date;
	/** The id of the user who created the message. */
	public readonly createdBy: string;
	/** If the message was sent by a webhook, this will be the ID of the webhook. */
	public readonly webhookId?: string;
	/** Whether the message is private. */
	public readonly private?: boolean;
	/** An array of IDs of messages that were replied to. */
	public readonly replies?: string[];
	/** When the message was last edited. */
	public readonly editedAt?: Date;
	/** The type of the message. */
	public readonly type: APIChatMessageType;

	/**
	 * @param data The data of the message.
	 * @param author The author of the message.
	 * @param channel The channel that the message belongs to.
	 */
	constructor(
		data: APIChatMessage,
		public readonly author: User,
		public readonly channel: Channel,
	) {
		super(channel.client);
		this.id = data.id;
		this.channelId = data.channelId;
		this.serverId = data.serverId;
		this.content = data.content;
		this.createdAt = new Date(data.createdAt);
		this.createdBy = data.createdBy;
		this.webhookId = data.createdByWebhookId;
		this.private = data.isPrivate;
		this.replies = data.replyMessageIds;
		this.editedAt = data.updatedAt ? new Date(data.updatedAt) : undefined;
		this.type = data.type;
	}

	/**
	 * Fetch the message.
	 * @returns The message.
	 */
	public async fetch() {
		return await this.channel.messages.fetch(this.id);
	}

	/**
	 * Delete the message.
	 * @returns The message.
	 */
	public async delete() {
		await this.client.rest.delete(Routes.channelMessage(this.channelId, this.id));

		this.channel.messages.cache.delete(this.id);

		return this;
	}

	/**
	 * Edit the message.
	 * @param content The new content of the message.
	 * @returns The message.
	 */
	public async edit(content: string) {
		await this.client.rest.put(Routes.channelMessage(this.channelId, this.id), {
			content,
		});

		return await this.fetch();
	}
}
