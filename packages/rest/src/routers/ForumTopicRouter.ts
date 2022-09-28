import {
	APIForumTopic,
	APIForumTopicEditPayload,
	APIForumTopicFetchManyOptions,
	APIForumTopicSummary,
	Routes,
	APIForumTopicPayload,
} from 'guilded-api-typings';
import { BaseRouter } from './BaseRouter';

/**
 * The forum topic router for the Guilded REST API.
 * @example new ForumTopicRouter(rest);
 */
export class ForumTopicRouter extends BaseRouter {
	/**
	 * Fetch a forum topic from Guilded.
	 * @param channelId The ID of the channel the forum topic belongs to.
	 * @param forumTopicId The ID of the forum topic to fetch.
	 * @returns The fetched forum topic.
	 * @example docs.fetch('abc', 123);
	 */
	fetch(channelId: string, forumTopicId: number): Promise<APIForumTopic>;
	/**
	 * Fetch forum topics from Guilded.
	 * @param channelId The ID of the channel the forum topics belong to.
	 * @param options The options to fetch forum topics with.
	 * @returns The fetched forum topics.
	 * @example docs.fetchMany('abc');
	 */
	fetch(
		channelId: string,
		options?: APIForumTopicFetchManyOptions,
	): Promise<APIForumTopicSummary[]>;
	/** @ignore */
	fetch(channelId: string, docIdOrOptions?: number | APIForumTopicFetchManyOptions) {
		if (typeof docIdOrOptions === 'number') return this.fetchSingle(channelId, docIdOrOptions);
		return this.fetchMany(channelId, docIdOrOptions);
	}

	/** @ignore */
	private async fetchSingle(channelId: string, forumTopicId: number) {
		const { forumTopic } = await this.rest.get<{ forumTopic: APIForumTopic }>(
			Routes.forumTopic(channelId, forumTopicId),
		);
		return forumTopic;
	}

	/** @ignore */
	private async fetchMany(channelId: string, options?: APIForumTopicFetchManyOptions) {
		const { forumTopics } = await this.rest.get<
			{ forumTopics: APIForumTopicSummary[] },
			APIForumTopicFetchManyOptions
		>(Routes.forumTopics(channelId), options);
		return forumTopics;
	}

	/**
	 * Create a forum topic on Guilded.
	 * @param channelId The ID of the channel the forum topic belongs to.
	 * @param payload The payload of the forum topic.
	 * @returns The created forum topic.
	 * @example topics.create('abc', { title: 'My Topic!' });
	 */
	async create(channelId: string, payload: APIForumTopicPayload) {
		const { forumTopic } = await this.rest.post<
			{ forumTopic: APIForumTopic },
			APIForumTopicPayload
		>(Routes.forumTopics(channelId), payload);
		return forumTopic;
	}

	/**
	 * Edit a forum topic on Guilded.
	 * @param channelId The ID of the channel the forum topic belongs to.
	 * @param forumTopicId The ID of the forum topic to edit.
	 * @param payload The payload of the forum topic.
	 * @returns The edited forum topic.
	 * @example topics.edit('abc', 123, { title: 'New Title', content: 'New Content' });
	 */
	async edit(channelId: string, forumTopicId: number, payload: APIForumTopicEditPayload) {
		const { forumTopic } = await this.rest.put<
			{ forumTopic: APIForumTopic },
			APIForumTopicEditPayload
		>(Routes.forumTopic(channelId, forumTopicId), payload);
		return forumTopic;
	}

	/**
	 * Delete a forum topic from Guilded.
	 * @param channelId The ID of the channel the forum topic belongs to.
	 * @param forumTopicId The ID of the forum topic to delete.
	 * @example topics.delete('abc', 123);
	 */
	delete(channelId: string, forumTopicId: number) {
		return this.rest.delete<void>(Routes.forumTopic(channelId, forumTopicId));
	}

	/**
	 * Pin a forum topic on Guilded.
	 * @param channelId The ID of the channel the forum topic belongs to.
	 * @param forumTopicId The ID of the forum topic to pin.
	 * @example topics.pin('abc', 123);
	 */
	pin(channelId: string, forumTopicId: number) {
		return this.rest.put<void>(Routes.forumTopicPin(channelId, forumTopicId));
	}

	/**
	 * Unpin a forum topic on Guilded.
	 * @param channelId The ID of the channel the forum topic belongs to.
	 * @param forumTopicId The ID of the forum topic to unpin.
	 * @example topics.unpin('abc', 123);
	 */
	unpin(channelId: string, forumTopicId: number) {
		return this.rest.delete<void>(Routes.forumTopicPin(channelId, forumTopicId));
	}

	/**
	 * Lock a forum topic on Guilded.
	 * @param channelId The ID of the channel the forum topic belongs to.
	 * @param forumTopicId The ID of the forum topic to lock.
	 * @example topics.lock('abc', 123);
	 */
	lock(channelId: string, forumTopicId: number) {
		return this.rest.put<void>(Routes.forumTopicLock(channelId, forumTopicId));
	}

	/**
	 * Unlock a forum topic on Guilded.
	 * @param channelId The ID of the channel the forum topic belongs to.
	 * @param forumTopicId The ID of the forum topic to unlock.
	 * @example topics.unlock('abc', 123);
	 */
	unlock(channelId: string, forumTopicId: number) {
		return this.rest.delete<void>(Routes.forumTopicLock(channelId, forumTopicId));
	}
}
