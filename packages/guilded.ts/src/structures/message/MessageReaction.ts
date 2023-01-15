import { APIMessageReaction } from 'guilded-api-typings';
import { Base } from '../Base';
import { Message } from './Message';

/**
 * Represents a message reaction on Guilded
 */
export class MessageReaction extends Base {
	/**
	 * @param message The message
	 * @param data The data of the message reaction
	 * @param cache Whether to cache the message reaction
	 */
	constructor(
		public readonly message: Message,
		public readonly data: APIMessageReaction,
		cache = message.client.options.cacheMessageReactions ?? true,
	) {
		super(message.client);
		if (cache) message.reactions.cache.set(this.emote.id, this);
	}

	/**
	 * Whether the message reaction is cached
	 */
	get isCached() {
		return this.message.reactions.cache.has(this.emote.id);
	}

	/**
	 * The ID of the user that created the message reaction
	 */
	get creatorId() {
		return this.data.createdBy;
	}

	/**
	 * The user that created the message reaction
	 */
	get creator() {
		return this.client.users.cache.get(this.creatorId) ?? null;
	}

	/**
	 * Whether the client user created the message reaction
	 */
	get isCreator() {
		return this.creatorId === this.client.user?.id;
	}

	/**
	 * The emote
	 */
	get emote() {
		return this.data.emote;
	}

	/**
	 * Fetch the user that created the message reaction
	 * @returns The fetched user
	 */
	async fetchCreator() {
		return this.client.users.fetch(this.message.channel.serverId, this.creatorId);
	}

	/**
	 * Remove the reaction from the message
	 */
	remove() {
		return this.message.reactions.remove(this.emote.id);
	}
}
