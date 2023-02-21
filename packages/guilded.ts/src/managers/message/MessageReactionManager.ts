import { Collection } from '@discordjs/collection';
import { CollectorOptions } from '../../collectors/Collector';
import { MessageReactionCollector } from '../../collectors/MessageReactionCollector';
import { Message } from '../../structures/message/Message';
import { MessageReaction } from '../../structures/message/MessageReaction';
import { BaseManager } from '../BaseManager';

/**
 * The manager for message reactions
 */
export class MessageReactionManager extends BaseManager<number, MessageReaction> {
	/**
	 * @param message The message
	 */
	constructor(public readonly message: Message) {
		super(message.client, message.client.options.maxMessageReactionCache);
	}

	/**
	 * Add a reaction to the message
	 * @param emojiId The ID of the emoji
	 */
	add(emojiId: number) {
		return this.client.api.reactions.create(this.message.channel.id, this.message.id, emojiId);
	}

	/**
	 * Remove a reaction from message
	 * @param emojiId The ID of the emoji
	 */
	remove(emojiId: number) {
		return this.client.api.reactions.delete(this.message.channel.id, this.message.id, emojiId);
	}

	/**
	 * Create a reaction collector for the message
	 * @param options The options for the message reaction collector
	 * @returns The created message reaction collector
	 * @example
	 * const collector = message.reactions.createCollector({ time: 15 * 1000 });
	 *
	 * collector.on('end', (reactions) => console.log(`Collected ${reactions.size} reactions!`));
	 */
	createCollector(options?: CollectorOptions<MessageReaction>) {
		return new MessageReactionCollector(this, options);
	}

	/**
	 * Similar to {@link createCollector} but in promise form
	 * @param options The options for the message reaction collector
	 * @returns The collected message reactions
	 * @example
	 * const reactions = await message.reactions.awaitReactions({ time: 15 * 1000 });
	 *
	 * console.log(`Collected ${reactions.size} reactions!`);
	 */
	awaitReactions(options?: CollectorOptions<MessageReaction>) {
		return new Promise<Collection<number, MessageReaction>>((resolve) =>
			this.createCollector(options).once('end', resolve),
		);
	}
}
