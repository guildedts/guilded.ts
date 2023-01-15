import { APIMessage, MessageType } from 'guilded-api-typings';
import { Base } from '../Base';
import {
	MessageEditPayloadResolvable,
	MessagePayloadResolvable,
} from '../../managers/message/MessageManager';
import { MessageReactionManager } from '../../managers/message/MessageReactionManager';
import { FetchManyOptions, FetchOptions } from '../../managers/BaseManager';
import { ChatChannel } from '../channel/ChatChannel';
import { Collection } from '@discordjs/collection';

/**
 * Represents a message on Guilded
 */
export class Message extends Base {
	/**
	 * When the message was deleted, if relevant
	 */
	deletedAt: Date | null = null;

	/**
	 * The manager for reactions
	 */
	readonly reactions: MessageReactionManager;

	/**
	 * @param channel The chat channel
	 * @param data The data of the message
	 * @param cache Whether to cache the message
	 */
	constructor(
		public readonly channel: ChatChannel,
		public readonly data: APIMessage,
		cache = channel.client.options.cacheMessages ?? true,
	) {
		super(channel.client);
		this.reactions = new MessageReactionManager(this);
		if (cache) channel.messages.cache.set(this.id, this);
	}

	/**
	 * Whether the message is cached
	 */
	get isCached() {
		return this.channel.messages.cache.has(this.id);
	}

	/**
	 * The ID of the message
	 */
	get id() {
		return this.data.id;
	}

	/**
	 * The type of message
	 */
	get type() {
		return this.data.type;
	}

	/**
	 * The content of the message
	 */
	get content() {
		return this.data.content ?? null;
	}

	/**
	 * The embeds of the message (`1`-`10` length)
	 */
	get embeds() {
		return this.data.embeds ?? [];
	}

	/**
	 * The IDs of messages the message replies to (`1`-`5` length)
	 */
	get replyIds() {
		return this.data.replyMessageIds ?? [];
	}

	/**
	 * The messages the message replies to (`0`-`5` size)
	 */
	get replies() {
		return this.replyIds.reduce(
			(messages, messageId) =>
				messages.set(messageId, this.channel.messages.cache.get(messageId) ?? null),
			new Collection<string, Message | null>(),
		);
	}

	/**
	 * Whether the message is private
	 *
	 * If `true`, the message will only be seen by those mentioned or replied to
	 */
	get isPrivate() {
		return this.data.isPrivate ?? false;
	}

	/**
	 * Whether the message is silent
	 *
	 * If `true`, the message did not notify those mentioned or replied to
	 */
	get isSilent() {
		return this.data.isSilent ?? false;
	}

	/**
	 * The mentions of the message
	 */
	get mentions() {
		return this.data.mentions ?? {};
	}

	/**
	 * When the message was created
	 */
	get createdAt() {
		return new Date(this.data.createdAt);
	}

	/**
	 * The ID of the user that created the message, if it was created by a user
	 */
	get creatorId() {
		return !this.webhookId ? this.data.createdBy : null;
	}

	/**
	 * The user that created the message, if it was created by a user
	 */
	get creator() {
		return this.creatorId ? this.client.users.cache.get(this.creatorId) ?? null : null;
	}

	/**
	 * Whether the client user created the message
	 */
	get isCreator() {
		return this.creatorId === this.client.user?.id;
	}

	/**
	 * The ID of the webhook that created the message, if it was created by a webhook
	 */
	get webhookId() {
		return this.data.createdByWebhookId ?? null;
	}

	/**
	 * The webhook that created the message, if it was created by a webhook
	 */
	get webhook() {
		return this.webhookId ? this.channel.webhooks.cache.get(this.webhookId) ?? null : null;
	}

	/**
	 * When the message was updated, if relevant
	 */
	get updatedAt() {
		return this.data.updatedAt ? new Date(this.data.updatedAt) : null;
	}

	/**
	 * Whether the message is updated
	 */
	get isUpdated() {
		return !!this.updatedAt;
	}

	/**
	 * Whether the message is deleted
	 */
	get isDeleted() {
		return !!this.deletedAt;
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
	 * Fetch the user that created the message
	 * @returns The fetched user, if created by one
	 */
	async fetchCreator() {
		return this.creatorId
			? this.client.users.fetch(this.channel.serverId, this.creatorId)
			: null;
	}

	/**
	 * Fetch the webhook that created the message
	 * @param options The options to fetch the webhook with
	 * @returns The fetched webhook, if created by one
	 */
	fetchWebhook(options?: FetchOptions) {
		return this.webhookId ? this.channel.webhooks.fetch(this.webhookId, options) : null;
	}

	/**
	 * Fetch the messages the message replies to
	 * @param options The options to fetch the messages with
	 * @returns The fetched messages
	 */
	async fetchReplies(options?: FetchManyOptions) {
		const messages = new Collection<string, Message>();
		for (const messageId of this.replyIds) {
			const message = await this.channel.messages.fetch(messageId, { cache: options?.cache });
			messages.set(messageId, message);
		}
		return messages;
	}

	/**
	 * Reply to the message
	 * @param options The options to update the message with
	 * @returns The created message
	 */
	reply(options: MessagePayloadResolvable) {
		options =
			typeof options === 'string'
				? { content: options }
				: Array.isArray(options)
				? { embeds: options }
				: options;
		if (typeof options === 'object')
			options.replyMessageIds = [
				...(options.replyMessageIds ?? []),
				...this.replies,
				this.id,
			];
		return this.channel.messages.create(options);
	}

	/**
	 * Update the message
	 * @param options The options to update the message with
	 * @returns The updated message
	 */
	update(options: MessageEditPayloadResolvable) {
		return this.channel.messages.update(this, options) as Promise<this>;
	}

	/**
	 * Delete the message
	 * @returns The deleted message
	 */
	async delete() {
		await this.channel.messages.delete(this);
		return this;
	}
}

export { MessageType };
