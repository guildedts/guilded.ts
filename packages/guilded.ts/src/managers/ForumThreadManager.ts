import { APIForumThread, APIForumThreadPayload, Routes } from 'guilded-api-typings';
import { BaseManager } from './BaseManager';
import { ForumChannel } from '../structures/channel/ForumChannel';
import { ForumThread } from '../structures/ForumThread';

/** A manager of threads that belong to a forum channel. */
export class ForumThreadManager extends BaseManager<number, ForumThread> {
	/** @param channel The forum channel that owns the threads. */
	public constructor(public readonly channel: ForumChannel) {
		super(channel.client, channel.client.options.maxForumThreadCache);
	}

	/**
	 * Create a thread in the channel.
	 * @param title The title to create the thread with.
	 * @param content The content to create the thread with.
	 * @returns The created thread.
	 */
	public async post(title: string, content: string) {
		const response = await this.client.rest.post<
			{ forumThread: APIForumThread },
			APIForumThreadPayload
		>(Routes.forums(this.channel.id), {
			title,
			content,
		});
		return new ForumThread(this.channel, response.forumThread);
	}
}
