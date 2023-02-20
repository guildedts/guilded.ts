import {
	RESTGetForumTopicsQuery,
	Routes,
	APIForumTopicComment,
	RESTPostForumTopicCommentJSONBody,
	RESTPatchForumTopicCommentJSONBody,
} from 'guilded-api-typings';
import { BaseRouter } from './BaseRouter';

/**
 * The forum topic router for the Guilded REST API
 */
export class ForumTopicCommentRouter extends BaseRouter {
	/**
	 * Fetch forum topic comments from Guilded
	 * @param channelId The ID of the channel
	 * @param forumTopicId The ID of the forum topic
	 * @returns The fetched forum topic
	 */
	fetch(
		channelId: string,
		forumTopicId: number,
		forumTopicCommentId?: number,
	): Promise<APIForumTopicComment>;
	/**
	 * Fetch a forum topic comment from Guilded
	 * @param channelId The ID of the channel
	 * @param forumTopicId The ID of the forum topic
	 * @param forumTopicCommentId The ID of the forum topic comment
	 * @returns The fetched forum topic
	 */
	fetch(channelId: string, forumTopicId: number): Promise<APIForumTopicComment[]>;
	fetch(channelId: string, forumTopicId: number, forumTopicCommentId?: number) {
		if (typeof forumTopicCommentId === 'number')
			return this.fetchSingle(channelId, forumTopicId, forumTopicCommentId);
		else return this.fetchMany(channelId, forumTopicId);
	}

	private async fetchSingle(
		channelId: string,
		forumTopicId: number,
		forumTopicCommentId: number,
	) {
		const { forumTopicComment } = await this.rest.get<{
			forumTopicComment: APIForumTopicComment;
		}>(Routes.forumTopicComment(channelId, forumTopicId, forumTopicCommentId));
		return forumTopicComment;
	}

	private async fetchMany(channelId: string, forumTopicId: number) {
		const { forumTopicComments } = await this.rest.get<
			{ forumTopicComments: APIForumTopicComment[] },
			RESTGetForumTopicsQuery
		>(Routes.forumTopicComments(channelId, forumTopicId));
		return forumTopicComments;
	}

	/**
	 * Create a forum topic comment on Guilded
	 * @param channelId The ID of the channel
	 * @param payload The payload of the forum topic
	 * @returns The created forum topic
	 */
	async create(
		channelId: string,
		forumTopicId: number,
		payload: RESTPostForumTopicCommentJSONBody,
	) {
		const { forumTopicComment } = await this.rest.post<
			{ forumTopicComment: APIForumTopicComment },
			RESTPostForumTopicCommentJSONBody
		>(Routes.forumTopicComments(channelId, forumTopicId), payload);
		return forumTopicComment;
	}

	/**
	 * Edit a forum topic comment on Guilded
	 * @param channelId The ID of the channel
	 * @param forumTopicId The ID of the forum topic
	 * @param forumTopicCommentId The ID of the forum topic comment
	 * @param payload The payload of the forum topic
	 * @returns The edited forum topic
	 */
	async edit(
		channelId: string,
		forumTopicId: number,
		forumTopicCommentId: number,
		payload: RESTPatchForumTopicCommentJSONBody,
	) {
		const { forumTopicComment } = await this.rest.patch<
			{ forumTopicComment: APIForumTopicComment },
			RESTPatchForumTopicCommentJSONBody
		>(Routes.forumTopicComment(channelId, forumTopicId, forumTopicCommentId), payload);
		return forumTopicComment;
	}

	/**
	 * Delete a forum topic from Guilded
	 * @param channelId The ID of the channel
	 * @param forumTopicId The ID of the forum topic
	 * @param forumTopicCommentId The ID of the forum topic comment
	 */
	delete(channelId: string, forumTopicId: number, forumTopicCommentId: number) {
		return this.rest.delete<void>(
			Routes.forumTopicComment(channelId, forumTopicId, forumTopicCommentId),
		);
	}
}
