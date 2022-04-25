import {
	APIChatMessage,
	APIChatMessagePayload,
	APIChatMessageType,
	APIDeletedChatMessage,
	Routes,
} from 'guilded-api-typings';
import { Base, Channel } from '..';
import { CacheCollection } from './CacheCollection';

/** Represents a message in a chanel. */
export class Message extends Base {
	/** The ID of the message. */
	public readonly id: string;
	/** The type of message. */
	public readonly type?: APIChatMessageType;
	/** The ID of the server the message was sent from. */
	public readonly serverId?: string;
	/** The ID of the channel the message was sent from. */
	public readonly channelId: string;
	/** The content of the message. */
	public content?: string;
	/** Message IDs that were replied to. */
	public replyMessageIds: string[];
	/** Whether the message is private. */
	public readonly isPrivate?: boolean;
	/** The time the message was sent. */
	public readonly createdAt?: Date;
	/** The ID of the user who sent the message. */
	public readonly createdBy?: string;
	/** The ID of the webhook that sent the message. */
	public readonly createdByWebhookId?: string;
	/** The time the message was edited. */
	public editedAt?: Date;
	/** Whether this message is deleted. */
	public isDeleted?: boolean;
	/** The time the message was deleted. */
	public deletedAt?: Date;

	/**
	 * @param channel The channel that owns this message.
	 * @param data The data of the message.
	 */
	public constructor(
		public readonly channel: Channel,
		data: APIChatMessage | APIDeletedChatMessage,
	) {
		super(channel.client);
		this.id = data.id;
		this.type = 'type' in data ? data.type : undefined;
		this.serverId = data.serverId;
		this.channelId = data.channelId;
		this.content = 'content' in data ? data.content : undefined;
		this.replyMessageIds = 'replyMessageIds' in data ? data.replyMessageIds ?? [] : [];
		this.isPrivate = data.isPrivate;
		this.createdAt = 'createdAt' in data ? new Date(data.createdAt) : undefined;
		this.createdBy = 'createdBy' in data ? data.createdBy : undefined;
		this.createdByWebhookId =
			'createdByWebhookId' in data ? data.createdByWebhookId : undefined;
		this.editedAt =
			'updatedAt' in data
				? data.updatedAt
					? new Date(data.updatedAt)
					: undefined
				: undefined;
	}

	/** The server the message was sent from. */
	public get server() {
		return this.serverId ? this.client.servers.fetch(this.serverId) : undefined;
	}

	/** The timestamp of when the message was sent. */
	public get createdTimestamp() {
		return this.createdAt?.getTime();
	}

	/** The timestamp of when the message was edited. */
	public get editedTimestamp() {
		return this.editedAt?.getTime();
	}

	/** The author of the message. */
	public get author() {
		return this.createdBy ? this.client.users.cache.get(this.createdBy) : undefined;
	}

	/** The ID of the author. */
	public get authorId() {
		return this.createdByWebhookId ?? this.createdBy;
	}

	/** The messages that were replied to. */
	public get replies() {
		const messages = new CacheCollection<string, Message>();

		for (const id of this.replyMessageIds) {
			const message = this.channel.messages.cache.get(id);
			if (message) messages.set(id, message);
		}

		return messages;
	}

	/** The timestamp of when the message was deleted. */
	public get deletedTimestamp() {
		return this.deletedAt?.getTime();
	}

	/**
	 * Fetch this message.
	 * @param cache Whether to cache the message.
	 * @returns The message.
	 */
	public async fetch(cache: boolean = this.channel.messages.cachingEnabled) {
		const response = await this.client.rest.get<{ message: APIChatMessage }>(
			Routes.channelMessage(this.channel.id, this.id),
		);

		const message = new Message(this.channel, response.message);

		if (cache) this.channel.messages.cache.set(this.id, message);

		return message;
	}

	/**
	 * Delete this message.
	 * @returns The deleted message.
	 */
	public async delete() {
		return this.channel.messages.delete(this.id);
	}

	/**
	 * Edit this message.
	 * @param content The new content of the message.
	 * @returns The edited message.
	 */
	public async edit(content: string) {
		return this.channel.messages.edit(this.id, content);
	}

	/**
	 * Reply to this message.
	 * @param payload The message payload.
	 * @returns The sent message.
	 */
	public async reply(payload: string | APIChatMessagePayload) {
		return this.channel.messages.create({
			content: typeof payload === 'string' ? payload : payload.content,
			isPrivate: typeof payload !== 'string' ? payload.isPrivate : undefined,
			replyMessageIds: [
				...this.replyMessageIds,
				this.id,
				...(typeof payload !== 'string' ? payload.replyMessageIds ?? [] : []),
			],
		});
	}
}
