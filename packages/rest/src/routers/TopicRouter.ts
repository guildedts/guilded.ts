import { APITopic, APITopicPayload, Routes } from 'guilded-api-typings';
import { BaseRouter } from './BaseRouter';

/** The forum thread router for the Guilded REST API. */
export class TopicRouter extends BaseRouter {
	/**
	 * Create a topic on Guilded.
	 * @param channelId The ID of the channel the topic belongs to.
	 * @param title The title of the topic.
	 * @param content The content of the topic.
	 * @returns The created topic.
	 */
	public async create(channelId: string, title: string, content: string) {
		const { forumTopic } = await this.rest.post<{ forumTopic: APITopic }, APITopicPayload>(
			Routes.topics(channelId),
			{ title, content },
		);
		return forumTopic;
	}
}
