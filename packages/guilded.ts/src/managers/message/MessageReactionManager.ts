import { Routes } from 'guilded-api-typings';
import { BaseManager } from '..';
import { Message } from '../../structures';

/** A manager of reactions that belong to some content. */
export class MessageReactionManager extends BaseManager<string, void> {
	/** @param message The message that owns the reactions. */
	constructor(public readonly message: Message) {
		super(message.client);
	}

	/**
	 * Add a reaction to the message.
	 * @param emojiId The ID of the emoji to add.
	 */
	public async add(emojiId: string) {
		await this.client.rest.put(
			Routes.messageReaction(this.message.channel.id, this.message.id, emojiId),
		);
	}
}
