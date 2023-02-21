import {
	APIForumTopic,
	RESTPatchForumTopicJSONBody,
	RESTGetForumTopicsQuery,
	APIForumTopicSummary,
	Routes,
	RESTPostForumTopicJSONBody,
} from 'guilded-api-typings';
import { BaseRouter } from '../BaseRouter';

/**
 * The forum topic router for the Guilded REST API
 */
export class ForumTopicRouter extends BaseRouter {
	/**
	 * Fetch a forum topic from Guilded
	 * @param channelId The ID of the channel
	 * @param forumTopicId The ID of the forum topic
	 * @returns The fetched forum topic
	 */
	fetch(channelId: string, forumTopicId: number): Promise<APIForumTopic>;
	/**
	 * Fetch forum topics from Guilded
	 * @param channelId The ID of the channel
	 * @param options The options to fetch forum topics with
	 * @returns The fetched forum topics
	 */
	fetch(channelId: string, options?: RESTGetForumTopicsQuery): Promise<APIForumTopicSummary[]>;
	fetch(channelId: string, docIdOrOptions?: number | RESTGetForumTopicsQuery) {
		if (typeof docIdOrOptions === 'number') return this.fetchSingle(channelId, docIdOrOptions);
		return this.fetchMany(channelId, docIdOrOptions);
	}

	private async fetchSingle(channelId: string, forumTopicId: number) {
		const { forumTopic } = await this.rest.get<{ forumTopic: APIForumTopic }>(
			Routes.forumTopic(channelId, forumTopicId),
		);
		return forumTopic;
	}

	private async fetchMany(channelId: string, options?: RESTGetForumTopicsQuery) {
		const { forumTopics } = await this.rest.get<
			{ forumTopics: APIForumTopicSummary[] },
			RESTGetForumTopicsQuery
		>(Routes.forumTopics(channelId), options);
		return forumTopics;
	}

	/**
	 * Create a forum topic on Guilded
	 * @param channelId The ID of the channel
	 * @param payload The payload of the forum topic
	 * @returns The created forum topic
	 */
	async create(channelId: string, payload: RESTPostForumTopicJSONBody) {
		const { forumTopic } = await this.rest.post<
			{ forumTopic: APIForumTopic },
			RESTPostForumTopicJSONBody
		>(Routes.forumTopics(channelId), payload);
		return forumTopic;
	}

	/**
	 * Edit a forum topic on Guilded
	 * @param channelId The ID of the channel
	 * @param forumTopicId The ID of the forum topic
	 * @param payload The payload of the forum topic
	 * @returns The edited forum topic
	 */
	async edit(channelId: string, forumTopicId: number, payload: RESTPatchForumTopicJSONBody) {
		const { forumTopic } = await this.rest.put<
			{ forumTopic: APIForumTopic },
			RESTPatchForumTopicJSONBody
		>(Routes.forumTopic(channelId, forumTopicId), payload);
		return forumTopic;
	}

	/**
	 * Delete a forum topic from Guilded
	 * @param channelId The ID of the channel
	 * @param forumTopicId The ID of the forum topic
	 */
	delete(channelId: string, forumTopicId: number) {
		return this.rest.delete<void>(Routes.forumTopic(channelId, forumTopicId));
	}

	/**
	 * Pin a forum topic on Guilded
	 * @param channelId The ID of the channel
	 * @param forumTopicId The ID of the forum topic
	 */
	pin(channelId: string, forumTopicId: number) {
		return this.rest.put<void>(Routes.forumTopicPin(channelId, forumTopicId));
	}

	/**
	 * Unpin a forum topic on Guilded
	 * @param channelId The ID of the channel
	 * @param forumTopicId The ID of the forum topic
	 */
	unpin(channelId: string, forumTopicId: number) {
		return this.rest.delete<void>(Routes.forumTopicPin(channelId, forumTopicId));
	}

	/**
	 * Lock a forum topic on Guilded
	 * @param channelId The ID of the channel
	 * @param forumTopicId The ID of the forum topic
	 */
	lock(channelId: string, forumTopicId: number) {
		return this.rest.put<void>(Routes.forumTopicLock(channelId, forumTopicId));
	}

	/**
	 * Unlock a forum topic on Guilded
	 * @param channelId The ID of the channel
	 * @param forumTopicId The ID of the forum topic
	 */
	unlock(channelId: string, forumTopicId: number) {
		return this.rest.delete<void>(Routes.forumTopicLock(channelId, forumTopicId));
	}
}
