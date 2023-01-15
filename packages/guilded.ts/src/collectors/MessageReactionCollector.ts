import { MessageReactionManager } from '../managers/message/MessageReactionManager';
import { MessageReaction } from '../structures/message/MessageReaction';
import { Collector, CollectorOptions } from './Collector';

/**
 * The collector for message reactions
 */
export class MessageReactionCollector extends Collector<number, MessageReaction> {
	/**
	 * @param reactions The manager for message reactions
	 * @param options The options for the reaction collector
	 */
	constructor(
		public readonly reactions: MessageReactionManager,
		options?: CollectorOptions<MessageReaction>,
	) {
		super(reactions.client, options);
		this.options.dispose =
			options?.dispose ?? this.client.options.disposeCollectedMessageReactions;
		this.client.on('messageReactionAdd', this.collectReaction.bind(this));
		this.client.on('messageReactionRemove', this.disposeReaction.bind(this));
	}

	private collectReaction(reaction: MessageReaction) {
		if (reaction.message.id !== this.reactions.message.id) return;
		this.collect(reaction.emote.id, reaction);
	}

	private disposeReaction(reaction: MessageReaction) {
		this.dispose(reaction.emote.id);
	}
}
