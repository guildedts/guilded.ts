import { APIMessage, APIEmbed, APIMentions, MessageType } from 'guilded-api-typings';
import { Base } from '../Base';
import {
	MessageEditPayloadResolvable,
	MessagePayloadResolvable,
} from '../../managers/message/MessageManager';
import { MessageReactionManager } from '../../managers/message/MessageReactionManager';
import { MessageReaction } from './MessageReaction';
import { CollectorOptions } from '../../collectors/Collector';
import { MessageReactionCollector } from '../../collectors/MessageReactionCollector';
import { FetchManyOptions, FetchOptions } from '../../managers/BaseManager';
import { ChatChannel } from '../channel/ChatChannel';
import { Collection } from '@discordjs/collection';

/**
 * Represents a message on Guilded
 */
export class Message extends Base {
	/**
	 * The type of message
	 */
	readonly type: MessageType;
	/**
	 * The ID of the server
	 */
	readonly serverId?: string;
	/**
	 * The ID of the channel
	 */
	readonly channelId: string;
	/**
	 * The content of the message
	 */
	readonly content?: string;
	/**
	 * The embeds of the message (`1`-`10` length)
	 */
	readonly embeds: APIEmbed[];
	/**
	 * The IDs of messages the message replies to (`1`-`5` length)
	 */
	readonly replyMessageIds: string[];
	/**
	 * Whether the message is private
	 *
	 * If true, this message will only be seen by those mentioned or replied to
	 *
	 * @default false
	 */
	readonly isPrivate?: boolean;
	/**
	 * Whether the message is silent
	 *
	 * If true, this message did not notify those mentioned or replied to
	 *
	 * @default false
	 */
	readonly isSilent?: boolean;
	/**
	 * The mentions of the message
	 */
	readonly mentions?: APIMentions;
	/**
	 * When the message was created
	 */
	readonly createdAt: Date;
	/**
	 * The ID of the user that created the message
	 *
	 * Note: If this message has {@link createdByWebhookId}, this field will still be populated, but can be ignored
	 */
	readonly createdBy: string;
	/**
	 * The ID of the webhook that created the message, if it was created by a webhook
	 */
	readonly createdByWebhookId?: string;
	/**
	 * When the message was edited, if relevant
	 */
	readonly editedAt?: Date;
	/**
	 * When the message was deleted, if relevant
	 */
	deletedAt?: Date;

	/**
	 * The manager for reactions
	 */
	readonly reactions: MessageReactionManager;

	/**
	 * @param channel The chat channel
	 * @param raw The data of the message
	 * @param cache Whether to cache the message
	 */
	constructor(
		public readonly channel: ChatChannel,
		public readonly raw: APIMessage,
		cache = channel.client.options.cacheMessages ?? true,
	) {
		super(channel.client, raw.id);
		this.reactions = new MessageReactionManager(this);
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
		if (cache) channel.messages.cache.set(this.id, this);
	}

	/**
	 * Whether the message is cached
	 */
	get isCached() {
		return this.channel.messages.cache.has(this.id);
	}

	/**
	 * Whether the message is a default message
	 */
	get isDefault() {
		return this.type === MessageType.Default;
	}

	/**
	 * Whether the message is a system message
	 */
	get isSystem() {
		return this.type === MessageType.System;
	}

	/**
	 * The server
	 */
	get server() {
		return this.channel.server;
	}

	/**
	 * The group
	 */
	get group() {
		return this.channel.group;
	}

	/**
	 * The timestamp of when the message was created
	 */
	get createdTimestamp() {
		return this.createdAt.getTime();
	}

	/**
	 * The timestamp of when the message was edited, if relevant
	 */
	get editedTimestamp() {
		return this.editedAt?.getTime();
	}

	/**
	 * Whether the message is deleted
	 */
	get isDeleted() {
		return !!this.deletedAt;
	}

	/**
	 * The server member that created the message
	 */
	get author() {
		return this.server?.members.cache.get(this.createdBy);
	}

	/**
	 * The webhook that created the message, if it was created by a webhook
	 */
	get webhook() {
		return this.createdByWebhookId
			? this.channel.webhooks.cache.get(this.createdByWebhookId)
			: undefined;
	}

	/**
	 * The ID of the user that created the message
	 */
	get authorId() {
		return this.createdByWebhookId || this.createdBy;
	}

	/**
	 * The messages the message replies to (`0`-`5` size)
	 */
	get replies() {
		const messages = new Collection<string, Message>();
		for (const id of this.replyMessageIds) {
			const message = this.channel.messages.cache.get(id);
			if (message) messages.set(id, message);
		}
		return messages;
	}

	/**
	 * The timestamp of when the message was deleted, if relevant
	 */
	get deletedTimestamp() {
		return this.deletedAt?.getTime();
	}

	/**
	 * Whether the message is editable
	 */
	get isEditable() {
		return this.createdBy === this.client.user?.id;
	}

	/**
	 * Fetch the message
	 * @param options The options to fetch the message with
	 * @returns The fetched message
	 */
	fetch(options?: FetchOptions) {
		return this.channel.messages.fetch(this, options) as Promise<this>;
	}

	/**
	 * Fetch the server
	 * @param options The options to fetch the server with
	 * @returns The fetched server
	 */
	fetchServer(options?: FetchOptions) {
		return this.channel.fetchServer(options);
	}

	/**
	 * Fetch the server member that created the message
	 * @param options The options to fetch the server member with
	 * @returns The fetched server member
	 */
	async fetchAuthor(options?: FetchOptions) {
		const server = await this.fetchServer();
		return server.members.fetch(this.createdBy, options);
	}

	/**
	 * Fetch the webhook that created the message
	 * @param options The options to fetch the webhook with
	 * @returns The fetched webhook
	 */
	fetchWebhook(options?: FetchOptions) {
		return this.createdByWebhookId
			? this.channel.webhooks.fetch(this.createdByWebhookId, options)
			: undefined;
	}

	/**
	 * Fetch the messages that were replied to
	 * @param options The options to fetch the messages with
	 * @returns The fetched messages
	 */
	async fetchReplies(options?: FetchManyOptions) {
		const messages = new Collection<string, Message>();
		for (const id of this.replyMessageIds) {
			const message = await this.channel.messages.fetch(id, { cache: options?.cache });
			messages.set(id, message);
		}
		return messages;
	}

	/**
	 * Edit the message
	 * @param payload The payload of the message
	 * @returns The edited message
	 */
	edit(payload: MessageEditPayloadResolvable) {
		return this.channel.messages.edit(this, payload) as Promise<this>;
	}

	/**
	 * Delete the message
	 * @returns The deleted message
	 */
	async delete() {
		await this.channel.messages.delete(this);
		return this;
	}

	/**
	 * Reply to the message
	 * @param payload The payload of the message
	 * @returns The created message
	 */
	reply(payload: MessagePayloadResolvable) {
		payload =
			typeof payload === 'string'
				? { content: payload }
				: Array.isArray(payload)
				? { embeds: payload }
				: payload;
		if (typeof payload === 'object')
			payload.replyMessageIds = [
				...(payload.replyMessageIds ?? []),
				...this.replyMessageIds,
				this.id,
			];
		return this.channel.messages.create(payload);
	}

	/**
	 * React to the message
	 * @param emojiId The ID of the emoji
	 * @returns The message
	 */
	async react(emojiId: number) {
		await this.reactions.add(emojiId);
		return this;
	}

	/**
	 * Create a reaction collector for the message
	 * @param options The options for the reaction collector
	 * @returns The created reaction collector
	 * @example
	 * const collector = message.createReactionCollector({ time: 15 * 1000 });
	 *
	 * collector.on('end', (reactions) => console.log(`Collected ${reactions.size} reactions!`));
	 */
	createReactionCollector(options?: CollectorOptions<MessageReaction>) {
		return new MessageReactionCollector(this, options);
	}

	/**
	 * Similar to {@link Message.createReactionCollector createReactionCollector} but in promise form
	 * @param options The options for the reaction collector
	 * @returns The collected reactions
	 * @example
	 * const reactions = await message.awaitReactions({ time: 15 * 1000 });
	 *
	 * console.log(`Collected ${reactions.size} reactions!`);
	 */
	awaitReactions(options?: CollectorOptions<MessageReaction>) {
		return new Promise<Collection<number, MessageReaction>>((resolve) =>
			this.createReactionCollector(options).once('end', resolve),
		);
	}
}

export { MessageType };
