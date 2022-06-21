import {
	APIMessage,
	APIEmbed,
	APIMentions,
	APIMessageTypeString,
	APIMessageType,
} from 'guilded-api-typings';
import { Base } from './Base';
import { CacheCollection } from './CacheCollection';
import { ChatBasedChannel } from '../managers/channel/ChannelManager';
import { MessageEditPayloadResolvable, MessagePayloadResolvable } from '../managers/MessageManager';
import { ReactionManager } from '../managers/ReactionManager';

/** Represents a message on Guilded. */
export class Message extends Base {
	/** The type of the message. */
	public readonly type: APIMessageTypeString;
	/** The ID of the server the message belongs to. */
	public readonly serverId?: string;
	/** The ID of the channel the message belongs to. */
	public readonly channelId: string;
	/** The content of the message. */
	public readonly content?: string;
	/** The embeds in the message. */
	public readonly embeds: APIEmbed[];
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
	 * @param channel The chat channel the message belongs to.
	 * @param raw The raw data of the message.
	 * @param cache Whether to cache the message.
	 */
	public constructor(
		public readonly channel: ChatBasedChannel,
		public readonly raw: APIMessage,
		cache = channel.client.options.cacheMessages ?? true,
	) {
		super(channel.client, raw.id);
		this.reactions = new ReactionManager(this);
		this.type = raw.type;
		this.serverId = raw.serverId;
		this.channelId = raw.channelId;
		this.content = raw.content;
		this.embeds = raw.embeds || [];
		this.replyMessageIds = raw.replyMessageIds || [];
		this.isPrivate = raw.isPrivate;
		this.isSilent = raw.isSilent;
		this.mentions = raw.mentions;
		this.createdAt = new Date(raw.createdAt);
		this.createdBy = raw.createdBy;
		this.createdByWebhookId = raw.createdByWebhookId;
		this.editedAt = raw.updatedAt ? new Date(raw.updatedAt) : undefined;
		if(cache) channel.messages.cache.set(this.id, this);
	}

	/** Whether the message is cached. */
	public get isCached() {
		return this.channel.messages.cache.has(this.id);
	}

	/** Whether the message is a default message. */
	public get isDefault() {
		return this.type === APIMessageType.Default;
	}

	/** Whether the message is a system message. */
	public get isSystem() {
		return this.type === APIMessageType.System;
	}

	/** The server the message belongs to. */
	public get server() {
		return this.channel.server;
	}

	/** The group the message belongs to. */
	public get group() {
		return this.channel.group;
	}

	/** The timestamp the message was created. */
	public get createdTimestamp() {
		return this.createdAt.getTime();
	}

	/** The timestamp the message was edited. */
	public get editedTimestamp() {
		return this.editedAt?.getTime();
	}

	/** Whether the message is deleted. */
	public get isDeleted() {
		return !!this.deletedAt;
	}

	/** The server member that created the message. */
	public get author() {
		return this.server?.members.cache.get(this.createdBy);
	}

	/** The webhook that created the message. */
	public get webhook() {
		return this.createdByWebhookId
			? this.channel.webhooks.cache.get(this.createdByWebhookId)
			: undefined;
	}

	/** The ID of the user that created the message. */
	public get authorId() {
		return this.createdByWebhookId || this.createdBy;
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
		return this.channel.messages.fetch(this.id, cache) as Promise<this>;
	}

	/**
	 * Fetch the server the message belongs to.
	 * @param cache Whether to cache the fetched server.
	 * @returns The fetched server.
	 */
	public fetchServer(cache?: boolean) {
		return this.channel.fetchServer(cache);
	}

	/**
	 * Fetch the group the message belongs to.
	 * @param cache Whether to cache the fetched group.
	 * @returns The fetched group.
	 */
	public fetchGroup(cache?: boolean) {
		return this.channel.fetchGroup(cache);
	}

	/**
	 * Fetch the server member that created the message.
	 * @param cache Whether to cache the fetched server member.
	 * @returns The fetched server member.
	 */
	public async fetchAuthor(cache?: boolean) {
		const server = await this.fetchServer(cache);
		return server.members.fetch(this.createdBy, cache);
	}

	/**
	 * Fetch the webhook that created the message.
	 * @param cache Whether to cache the fetched webhook.
	 * @returns The fetched webhook.
	 */
	public fetchWebhook(cache?: boolean) {
		return this.createdByWebhookId ? this.channel.webhooks.fetch(this.createdByWebhookId, cache) : undefined;
	}

	/**
	 * Fetch the messages that were replied to.
	 * @param cache Whether to cache the fetched messages.
	 * @returns The fetched messages.
	 */
	public async fetchReplies(cache?: boolean) {
		const messages = new CacheCollection<string, Message>();
		for (const id of this.replyMessageIds) {
			const message = await this.channel.messages.fetch(id, cache);
			if (message) messages.set(id, message);
		}
		return messages;
	}

	/**
	 * Edit the message.
	 * @param payload The payload of the message.
	 * @returns The edited message.
	 */
	public async edit(payload: MessageEditPayloadResolvable) {
		return this.channel.messages.edit(this.id, payload) as Promise<this>;
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
	 * Reply to the message.
	 * @param payload The payload of the message.
	 * @returns The created message.
	 */
	public reply(payload: MessagePayloadResolvable) {
		payload =
			typeof payload === 'string'
				? { content: payload }
				: Array.isArray(payload)
				? { embeds: payload }
				: payload;
		payload.replyMessageIds = [
			...(payload.replyMessageIds || []),
			...this.replyMessageIds,
			this.id,
		];
		return this.channel.messages.create(payload);
	}

	/**
	 * React to the message.
	 * @param emojiId The ID of the emoji to react with.
	 * @returns The message.
	 */
	public async react(emojiId: number) {
		await this.reactions.add(emojiId);
		return this;
	}
}
