import {
	APIChatMessage,
	APIChatMessageType,
	APIDeletedChatMessage,
	APIEmbed,
} from 'guilded-api-typings';
import { ChatBasedChannel, MessagePayload, MessageReactionManager } from '../managers';
import { CacheCollection, Base } from '.';

/** Represents a message in a chanel. */
export class Message extends Base {
	/** The type of message. */
	public readonly type?: APIChatMessageType;
	/** The ID of the server the message was sent from. */
	public readonly serverId?: string;
	/** The ID of the channel the message was sent from. */
	public readonly channelId: string;
	/** The content of the message. */
	public readonly content?: string;
	/** The embeds in this message. */
	public readonly embeds: APIEmbed[] = [];
	/** Message IDs that were replied to. */
	public readonly replyMessageIds: string[];
	/** Whether the message is private. */
	public readonly private?: boolean;
	/** The time the message was sent. */
	public readonly createdAt?: Date;
	/** The ID of the user who sent the message. */
	public readonly createdBy?: string;
	/** The ID of the webhook that sent the message. */
	public readonly createdByWebhookId?: string;
	/** The time the message was edited. */
	public readonly editedAt?: Date;
	/** The time the message was deleted. */
	public deletedAt?: Date;

	/** A manager of reactions that belong to this message. */
	public readonly reactions: MessageReactionManager;

	/**
	 * @param channel The channel that owns this message.
	 * @param data The data of the message.
	 */
	public constructor(
		public readonly channel: ChatBasedChannel,
		data: APIChatMessage | APIDeletedChatMessage,
	) {
		super(channel.client, data.id);

		this.reactions = new MessageReactionManager(this);

		this.type = 'type' in data ? data.type : undefined;
		this.serverId = data.serverId;
		this.channelId = data.channelId;
		this.content = 'content' in data ? data.content : undefined;
		this.embeds = 'embeds' in data ? data.embeds : [];
		this.replyMessageIds = 'replyMessageIds' in data ? data.replyMessageIds ?? [] : [];
		this.private = data.isPrivate;
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
		this.deletedAt = 'deletedAt' in data ? new Date(data.deletedAt) : undefined;
	}

	/** Whether this message is cached. */
	public get cached() {
		return this.channel.messages.cache.has(this.id);
	}

	/** Whether this message is a default message. */
	public get default() {
		return this.type === 'default';
	}

	/** Whether this message is a system message. */
	public get system() {
		return this.type === 'system';
	}

	/** The server the message was sent from. */
	public get server() {
		return this.channel.server;
	}

	/** The group this message was sent in. */
	public get group() {
		return this.client.groups.fetch(this.channel.groupId);
	}

	/** The timestamp of when the message was sent. */
	public get createdTimestamp() {
		return this.createdAt?.getTime();
	}

	/** The timestamp of when the message was edited. */
	public get editedTimestamp() {
		return this.editedAt?.getTime();
	}

	/** Whether this message is deleted. */
	public get deleted() {
		return !!this.deletedAt;
	}

	/** The author of the message. */
	public get author() {
		return this.createdBy ? this.client.users.cache.get(this.createdBy) : undefined;
	}

	/** The webhook that sent the message. */
	public get webhook() {
		return this.createdByWebhookId
			? this.channel.webhooks.cache.get(this.createdByWebhookId)
			: undefined;
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

	/** Whether this message is editable. */
	public get editable() {
		return this.createdBy === this.client.user?.id;
	}

	/**
	 * Fetch this message.
	 * @param cache Whether to cache the message.
	 * @returns The message.
	 */
	public fetch(cache = this.channel.messages.caching) {
		this.channel.messages.cache.delete(this.id);
		return this.channel.messages.fetch(this.id, cache);
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
	 * @param payload The new content of the message.
	 * @param cache Whether to cache the message.
	 * @returns The edited message.
	 */
	public async edit(payload: string | MessagePayload, cache = this.channel.messages.caching) {
		return this.channel.messages.edit(this.id, payload, cache);
	}

	/**
	 * Reply to this message.
	 * @param payload The message payload.
	 * @param cache Whether to cache the message.
	 * @returns The sent message.
	 */
	public async reply(payload: string | MessagePayload, cache = this.channel.messages.caching) {
		return this.channel.messages.create(
			{
				content: typeof payload === 'string' ? payload : payload.content,
				embeds: typeof payload !== 'string' ? payload.embeds : undefined,
				replyMessageIds: [
					...this.replyMessageIds,
					this.id,
					...(typeof payload !== 'string' ? payload.replyMessageIds ?? [] : []),
				],
				private: typeof payload !== 'string' ? payload.private : undefined,
				silent: typeof payload !== 'string' ? payload.silent : undefined,
			},
			cache,
		);
	}

	/**
	 * React to this message.
	 * @param emojiId The ID of the emoji to react with.
	 * @returns The message.
	 */
	public async react(emojiId: string) {
		return this.reactions.add(emojiId);
	}
}
