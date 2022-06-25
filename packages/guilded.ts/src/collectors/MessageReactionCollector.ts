import { Message } from '../structures/message/Message';
import { MessageReaction } from '../structures/message/MessageReaction';
import { Collector, CollectorOptions } from './Collector';

/** The reaction collector for a message. */
export class MessageReactionCollector extends Collector<MessageReaction> {
	/**
	 * @param message The message the reaction collector belongs to.
	 * @param options The options of the reaction collector.
	 */
	constructor(public readonly message: Message, options?: CollectorOptions<MessageReaction>) {
		super(message.client, options);
		this.options.dispose =
			options?.dispose ?? this.client.options.disposeCollectedMessageReactions;
		this.client.on('messageReactionAdd', this.collectReaction.bind(this));
		this.client.on('messageReactionRemove', this.disposeReaction.bind(this));
	}

	/** @ignore */
	private collectReaction(reaction: MessageReaction) {
		if (reaction.messageId !== this.message.id) return;
		this.collect(reaction);
	}

	/** @ignore */
	private disposeReaction(reaction: MessageReaction) {
		this.dispose(reaction.id);
	}
}
