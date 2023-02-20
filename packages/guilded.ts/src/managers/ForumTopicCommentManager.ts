import { BaseManager, FetchManyOptions, FetchOptions } from './BaseManager';
import { RESTGetForumTopicCommentsResult, APIForumTopicComment } from 'guilded-api-typings';
import { ForumComment } from '../structures/ForumComment';
import { ForumChannel } from '../structures/channel/ForumChannel';
import {
	APIForumTopic,
	APIForumTopicSummary,
	RESTPostForumTopicCommentJSONBody,
	RESTPatchForumTopicCommentJSONBody,
} from 'guilded-api-typings';
import { Collection } from '@discordjs/collection';

/**
 * The manager for forum topic comments
 */
export class ForumTopicCommentManager extends BaseManager<number, ForumComment> {
	/**
	 * @param forumTopic The forum topic
	 */
	constructor(
		public readonly channel: ForumChannel,
		public readonly forumTopic: APIForumTopic | APIForumTopicSummary,
	) {
		super(channel.client, channel.client.options.maxForumTopicCommentCache);
	}
	/**
	 * Fetch the forum topic comment
	 * @param forumTopicComment The ID of the forum topic comment
	 * @param options The options to fetch the forum topic comments with
	 * @returns The fetched forum topic comments
	 */
	fetch(forumTopicComment: number | ForumComment, options?: FetchOptions): Promise<ForumComment>;
	/**
	 * Fetch the forum topic comment
	 * @param forumTopicComment The forum topic comment
	 * @param options The options to fetch the forum topic comments with
	 * @returns The fetched forum topic comments
	 */
	fetch(options?: ForumTopicCommentFetchManyOptions): Promise<Collection<number, ForumComment>>;
	fetch(arg1?: number | ForumComment | ForumTopicCommentFetchManyOptions, arg2?: FetchOptions) {
		if (typeof arg1 === 'number' || arg1 instanceof ForumComment)
			return this.fetchSingle(arg1, arg2);
		return this.fetchMany(arg1);
	}

	private async fetchSingle(forumTopicComment: number | ForumComment, options?: FetchOptions) {
		const forumTopic = this.forumTopic.id;
		forumTopicComment =
			forumTopicComment instanceof ForumComment ? forumTopicComment.id : forumTopicComment;
		const cached = this.cache.get(forumTopicComment);
		if (cached && !options?.force) return cached;
		const raw = await this.client.api.forumTopicComments.fetch(
			this.channel.id,
			forumTopic,
			forumTopicComment,
		);
		const topic = await this.channel.topics.fetch(forumTopic);
		return new ForumComment(
			this.channel,
			topic,
			Array.isArray(raw) ? raw[0] : raw,
			options?.cache,
		);
	}

	private async fetchMany(options?: ForumTopicCommentFetchManyOptions) {
		const forumTopic = this.forumTopic.id;
		const raw = (await this.client.api.forumTopicComments.fetch(
			this.channel.id,
			forumTopic,
		)) as unknown as APIForumTopicComment[];
		const topic = await this.channel.topics.fetch(forumTopic);
		const forumComments = new Collection<number, ForumComment>();
		for (const data of raw) {
			const forumComment = new ForumComment(this.channel, topic, data, options?.cache);
			forumComments.set(forumComment.id, forumComment);
		}
		return forumComments;
	}

	/**
	 * Create a forum topic comment in the forum topic
	 * @param options The options to create the forum topic with
	 * @returns The created forum topic
	 */
	async create(options: RESTPostForumTopicCommentJSONBody) {
		const raw = await this.client.api.forumTopicComments.create(
			this.channel.id,
			this.forumTopic.id,
			options,
		);
		const topic = await this.channel.topics.fetch(this.forumTopic.id);
		return new ForumComment(this.channel, topic, raw);
	}

	/**
	 * Update a forum topic comment in the forum topic
	 * @param forumTopicComment The forum topic comment
	 * @param options The options to update the forum topic with
	 * @returns The updated forum topic
	 */
	async update(
		forumTopicComment: number | ForumComment,
		options: RESTPatchForumTopicCommentJSONBody,
	) {
		forumTopicComment =
			forumTopicComment instanceof ForumComment ? forumTopicComment.id : forumTopicComment;
		const raw = await this.client.api.forumTopicComments.edit(
			this.channel.id,
			this.forumTopic.id,
			forumTopicComment,
			options,
		);
		const topic = await this.channel.topics.fetch(this.forumTopic.id);
		return new ForumComment(this.channel, topic, raw);
	}

	/**
	 * Delete a forum topic comment from the channel
	 * @param forumTopic The forum topic
	 */
	delete(forumTopicComment: number | ForumComment) {
		forumTopicComment =
			forumTopicComment instanceof ForumComment ? forumTopicComment.id : forumTopicComment;
		return this.client.api.forumTopicComments.delete(
			this.channel.id,
			this.forumTopic.id,
			forumTopicComment,
		);
	}
}

/**
 * The options for fetching forum topics
 */
export interface ForumTopicCommentFetchManyOptions
	extends FetchManyOptions,
		RESTGetForumTopicCommentsResult {}
