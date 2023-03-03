import { Collector, CollectorOptions } from './Collector';
import { ForumTopicCommentReaction } from '../structures/forum/ForumTopicCommentReaction';
import { ForumTopicCommentReactionManager } from '../managers/forum/ForumTopicCommentReactionManager';

/**
 * The collector for message reactions
 */
export class ForumTopicCommentReactionCollector extends Collector<
	number,
	ForumTopicCommentReaction
> {
	/**
	 * @param reactions The manager for message reactions
	 * @param options The options for the reaction collector
	 */
	constructor(
		public readonly reactions: ForumTopicCommentReactionManager,
		options?: CollectorOptions<ForumTopicCommentReaction>,
	) {
		super(reactions.client, options);
		this.options.dispose =
			options?.dispose ?? this.client.options.disposeCollectedMessageReactions;
		this.client.on('forumTopicCommentReactionAdd', this.collectReaction.bind(this));
		this.client.on('forumTopicCommentReactionRemove', this.disposeReaction.bind(this));
	}

	private collectReaction(reaction: ForumTopicCommentReaction) {
		if (reaction.forumTopicComment.id !== this.reactions.forumTopicComment.id) return;
		this.collect(reaction.emote.id, reaction);
	}

	private disposeReaction(reaction: ForumTopicCommentReaction) {
		this.dispose(reaction.emote.id);
	}
}
