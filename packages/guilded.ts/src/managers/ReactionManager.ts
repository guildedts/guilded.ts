import { BaseManager } from './BaseManager';
import { Message } from '../structures/Message';

/** A manager of reactions that belong to some content. */
export class ReactionManager extends BaseManager<string, void> {
	/** @param content The content that owns the reactions. */
	constructor(public readonly content: Message) {
		super(content.client);
	}

	/**
	 * Add a reaction to the content.
	 * @param emojiId The ID of the emoji to add.
	 * @returns The ID of the emoji that was added.
	 */
	public add(emojiId: number) {
		return this.client.api.reactions.create(this.content.channel.id, this.content.id, emojiId);
	}
}
