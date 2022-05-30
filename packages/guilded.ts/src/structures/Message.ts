import { APIMessage, APIMessageType, APIEmbed, APIMentions } from 'guilded-api-typings';
import { Base } from './Base';
import { CacheCollection } from './CacheCollection';
import { ChatBasedChannel } from '../managers/channel/ChannelManager';
import { MessagePayload } from '../managers/MessageManager';
import { ReactionManager } from '../managers/ReactionManager';

/** Represents a message on Guilded. */
export class Message extends Base {
	/** The type of message. */
	public readonly type: APIMessageType;
	/** The ID of the server the message belongs to. */
	public readonly serverId?: string;
	/** The ID of the channel the message belongs to. */
	public readonly channelId: string;
	/** The content of the message. */
	public readonly content?: string;
	/** The embeds in the message. */
	public readonly embeds: APIEmbed[] = [];
	/** The IDs of messages that were replied to. */
	public readonly replyMessageIds: string[];
	/** Whether the message is private. */
	public readonly isPrivate?: boolean;
	/** Whether the message is silent. */
	public readonly isSilent?: boolean;
	/** The mentions of the message. */
	public readonly mentions?: APIMentions;
	/** The date the message was created. */
	public readonly createdAt: Date;
	/** The ID of the user that created the message. */
	public readonly createdBy: string;
	/** The ID of the webhook that created the message. */
	public readonly createdByWebhookId?: string;
	/** The date the message was edited. */
	public readonly editedAt?: Date;
	/** The date the message was deleted. */
	public deletedAt?: Date;

	/** A manager of reactions that belong to the message. */
	public readonly reactions: ReactionManager;

	/**
	 * @param channel The channel that owns the message.
	 * @param raw The raw data of the message.
	 */
	public constructor(public readonly channel: ChatBasedChannel, public readonly raw: APIMessage) {
		super(channel.client, raw.id);
		this.reactions = new ReactionManager(this);
		this.type = raw.type;
		this.serverId = raw.serverId;
		this.channelId = raw.channelId;
		this.content = raw.content;
		this.embeds = raw.embeds ?? [];
		this.replyMessageIds = raw.replyMessageIds ?? [];
		this.isPrivate = raw.isPrivate;
		this.isSilent = raw.isSilent;
		this.mentions = raw.mentions;
		this.createdAt = new Date(raw.createdAt);
		this.createdBy = raw.createdBy;
		this.createdByWebhookId = raw.createdByWebhookId;
		this.editedAt = raw.updatedAt ? new Date(raw.updatedAt) : undefined;
	}

	/** Whether the message is cached. */
	public get isCached() {
		return this.channel.messages.cache.has(this.id);
	}

	/** Whether the message is a default message. */
	public get isDefault() {
		return this.type === 'default';
	}

	/** Whether the message is a system message. */
	public get isSystem() {
		return this.type === 'system';
	}

	/** The server the message belongs to. */
	public get server() {
		return this.channel.server;
	}

	/** The group the message belongs to. */
	public get group() {
		return this.client.groups.fetch(this.channel.groupId);
	}

	/** The timestamp the message was created. */
	public get createdTimestamp() {
		return this.createdAt?.getTime();
	}

	/** The timestamp the message was edited. */
	public get editedTimestamp() {
		return this.editedAt?.getTime();
	}

	/** Whether the message is deleted. */
	public get isDeleted() {
		return !!this.deletedAt;
	}

	/** The author of the message. */
	public get author() {
		return this.client.users.cache.get(this.createdBy);
	}

	/** The webhook that created the message. */
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

	/** The timestamp the message was deleted. */
	public get deletedTimestamp() {
		return this.deletedAt?.getTime();
	}

	/** Whether the message is editable. */
	public get editable() {
		return this.createdBy === this.client.user?.id;
	}

	/**
	 * Fetch the message.
	 * @param cache Whether to cache the fetched message.
	 * @returns The fetched message.
	 */
	public fetch(cache?: boolean) {
		this.channel.messages.cache.delete(this.id);
		return this.channel.messages.fetch(this.id, cache);
	}

	/**
	 * Delete the message.
	 * @returns The deleted message.
	 */
	public async delete() {
		await this.channel.messages.delete(this.id);
		return this;
	}

	/**
	 * Edit the message.
	 * @param payload The payload to edit the message with.
	 * @returns The edited message.
	 */
	public async edit(payload: string | MessagePayload) {
		return this.channel.messages.edit(this.id, payload);
	}

	/**
	 * Reply to the message.
	 * @param payload The payload to reply with.
	 * @returns The created message.
	 */
	public reply(payload: string | MessagePayload) {
		return this.channel.messages.create(
			{
				content: typeof payload === 'string' ? payload : payload.content,
				embeds: typeof payload !== 'string' ? payload.embeds : undefined,
				replyMessageIds: [
					...this.replyMessageIds,
					this.id,
					...(typeof payload !== 'string' ? payload.replyMessageIds ?? [] : []),
				],
				isPrivate: typeof payload !== 'string' ? payload.isPrivate : undefined,
				isSilent: typeof payload !== 'string' ? payload.isSilent : undefined,
			}
		);
	}

	/**
	 * React to the message.
	 * @param emojiId The ID of the emoji to react with.
	 * @returns The message.
	 */
	public react(emojiId: number) {
		return this.reactions.add(emojiId);
	}
}
