import { Message } from '../structures/message/Message';
import { MessageReaction } from '../structures/message/MessageReaction';
import { Collector, CollectorOptions } from './Collector';

/**
 * The collector for message reactions
 */
export class MessageReactionCollector extends Collector<MessageReaction> {
	/**
	 * @param message The message
	 * @param options The options for the reaction collector
	 */
	constructor(public readonly message: Message, options?: CollectorOptions<MessageReaction>) {
		super(message.client, options);
		this.options.dispose =
			options?.dispose ?? this.client.options.disposeCollectedMessageReactions;
		this.client.on('messageReactionAdd', this.collectReaction.bind(this));
		this.client.on('messageReactionRemove', this.disposeReaction.bind(this));
	}

	private collectReaction(reaction: MessageReaction) {
		if (reaction.messageId !== this.message.id) return;
		this.collect(reaction);
	}

	private disposeReaction(reaction: MessageReaction) {
		this.dispose(reaction.id);
	}
}
