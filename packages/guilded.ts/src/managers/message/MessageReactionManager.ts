import { Message } from '../../structures/message/Message';
import { MessageReaction } from '../../structures/message/MessageReaction';
import { BaseManager } from '../BaseManager';

/** The manager of reactions that belong to a message. */
export class MessageReactionManager extends BaseManager<number, MessageReaction> {
	/** @param message The message the reactions belong to. */
	constructor(public readonly message: Message) {
		super(message.client, message.client.options.maxMessageReactionCache);
	}

	/**
	 * Add a reaction to the message.
	 * @param emojiId The ID of the emoji to react with.
	 */
	public add(emojiId: number) {
		return this.client.api.reactions.create(this.message.channel.id, this.message.id, emojiId);
	}

	/**
	 * Remove a reaction from message.
	 * @param emojiId The ID of the emoji to remove.
	 */
	public remove(emojiId: number) {
		return this.client.api.reactions.delete(this.message.channel.id, this.message.id, emojiId);
	}
}
