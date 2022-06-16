import { BaseManager } from './BaseManager';
import { Message } from '../structures/Message';

/** The manager of reactions that belong to content. */
export class ReactionManager extends BaseManager<string, void> {
	/** @param content The content the reactions belong to. */
	constructor(public readonly content: Message) {
		super(content.client);
	}

	/**
	 * Add a reaction to the content.
	 * @param emojiId The ID of the emoji to react with.
	 */
	public add(emojiId: number) {
		return this.client.api.reactions.create(this.content.channel.id, this.content.id, emojiId);
	}

	/**
	 * Remove a reaction from the content.
	 * @param emojiId The ID of the emoji to remove.
	 */
	public remove(emojiId: number) {
		return this.client.api.reactions.delete(this.content.channel.id, this.content.id, emojiId);
	}
}
