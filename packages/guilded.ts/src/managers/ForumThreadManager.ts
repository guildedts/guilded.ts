import { APIForumThread, APIForumThreadPayload, Routes } from 'guilded-api-typings';
import { BaseManager } from '.';
import { ForumChannel, ForumThread } from '../structures';

/** A manager of forum threads that belong to a forum channel. */
export class ForumThreadManager extends BaseManager<number, ForumThread> {
	/** @param channel The channel that owns the forum threads. */
	public constructor(public readonly channel: ForumChannel) {
		super(channel.client, {
			caching: channel.client.options.cacheForumThreads,
			maxCache: channel.client.options.maxForumThreadCache,
		});
	}

	/**
	 * Post a new topic to the forum channel.
	 * @param title The title of the topic.
	 * @param content The content of the topic.
	 * @param cache Whether to cache the topic.
	 * @returns The forum thread.
	 */
	public async post(title: string, content: string, cache = this.caching) {
		const response = await this.client.rest.post<
			{ forumThread: APIForumThread },
			APIForumThreadPayload
		>(Routes.channelForum(this.channel.id), {
			title,
			content,
		});

		const thread = new ForumThread(this.channel, response.forumThread);

		if (cache) this.cache.set(thread.id, thread);

		return thread;
	}
}
