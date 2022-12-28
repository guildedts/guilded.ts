import { BaseManager, FetchManyOptions, FetchOptions } from './BaseManager';
import { ForumChannel } from '../structures/channel/ForumChannel';
import { ForumTopic } from '../structures/ForumTopic';
import {
	RESTPatchForumTopicJSONBody,
	RESTGetForumTopicsQuery,
	RESTPostForumTopicJSONBody,
} from 'guilded-api-typings';
import { Collection } from '@discordjs/collection';

/**
 * The manager of topics that belong to a forum channel.
 * @example new ForumTopicManager(channel);
 */
export class ForumTopicManager extends BaseManager<number, ForumTopic> {
	/** @param channel The forum channel the topics belong to. */
	constructor(public readonly channel: ForumChannel) {
		super(channel.client, channel.client.options.maxForumTopicCache);
	}

	/**
	 * Fetch a forum topic from the channel, or cache.
	 * @param forumTopic The forum topic to fetch.
	 * @param options The options to fetch the forum topic with.
	 * @returns The fetched forum topic.
	 * @example topics.fetch(forumTopic);
	 */
	fetch(forumTopic: number | ForumTopic, options?: FetchOptions): Promise<ForumTopic>;
	/**
	 * Fetch forum topics from the channel.
	 * @param options The options to fetch the forum topics with.
	 * @returns The fetched forum topics.
	 * @example topics.fetch();
	 */
	fetch(options?: ForumTopicFetchManyOptions): Promise<Collection<number, ForumTopic>>;
	fetch(arg1?: number | ForumTopic | ForumTopicFetchManyOptions, arg2?: FetchOptions) {
		if (typeof arg1 === 'number' || arg1 instanceof ForumTopic)
			return this.fetchSingle(arg1, arg2);
		return this.fetchMany(arg1);
	}

	/** @ignore */
	private async fetchSingle(forumTopic: number | ForumTopic, options?: FetchOptions) {
		forumTopic = forumTopic instanceof ForumTopic ? forumTopic.id : forumTopic;
		const cached = this.cache.get(forumTopic);
		if (cached && !options?.force) return cached;
		const raw = await this.client.api.forumTopics.fetch(this.channel.id, forumTopic);
		return new ForumTopic(this.channel, raw, options?.cache);
	}

	/** @ignore */
	private async fetchMany(options?: ForumTopicFetchManyOptions) {
		const raw = await this.client.api.forumTopics.fetch(this.channel.id, options);
		const forumTopics = new Collection<number, ForumTopic>();
		for (const data of raw) {
			const forumTopic = new ForumTopic(this.channel, data, options?.cache);
			forumTopics.set(forumTopic.id, forumTopic);
		}
		return forumTopics;
	}

	/**
	 * Create a topic in the forum channel.
	 * @param payload The payload of the forum topic.
	 * @returns The created forum topic.
	 * @example topics.create({ title: 'My Topic' });
	 */
	async create(payload: RESTPostForumTopicJSONBody) {
		const raw = await this.client.api.forumTopics.create(this.channel.id, payload);
		return new ForumTopic(this.channel, raw);
	}

	/**
	 * Edit a forum topic in the channel.
	 * @param forumTopic The forum topic to edit.
	 * @param payload The payload of the forum topic.
	 * @returns The edited forum topic.
	 * @example topics.edit(forumTopic, { title: 'My Topic' });
	 */
	async edit(forumTopic: number | ForumTopic, payload: RESTPatchForumTopicJSONBody) {
		forumTopic = forumTopic instanceof ForumTopic ? forumTopic.id : forumTopic;
		const raw = await this.client.api.forumTopics.edit(this.channel.id, forumTopic, payload);
		return new ForumTopic(this.channel, raw);
	}

	/**
	 * Delete a forum topic from the channel.
	 * @param forumTopic The forum topic to delete.
	 * @example topics.delete(forumTopic);
	 */
	delete(forumTopic: number | ForumTopic) {
		forumTopic = forumTopic instanceof ForumTopic ? forumTopic.id : forumTopic;
		return this.client.api.forumTopics.delete(this.channel.id, forumTopic);
	}

	/**
	 * Pin a forum topic in the channel.
	 * @param forumTopic The forum topic to pin.
	 * @example topics.pin(forumTopic);
	 */
	pin(forumTopic: number | ForumTopic) {
		forumTopic = forumTopic instanceof ForumTopic ? forumTopic.id : forumTopic;
		return this.client.api.forumTopics.pin(this.channel.id, forumTopic);
	}

	/**
	 * Unpin a forum topic from the channel.
	 * @param forumTopic The forum topic to unpin.
	 * @example topics.unpin(forumTopic);
	 */
	unpin(forumTopic: number | ForumTopic) {
		forumTopic = forumTopic instanceof ForumTopic ? forumTopic.id : forumTopic;
		return this.client.api.forumTopics.unpin(this.channel.id, forumTopic);
	}

	/**
	 * Lock a forum topic in the channel.
	 * @param forumTopic The forum topic to lock.
	 * @example topics.lock(forumTopic);
	 */
	lock(forumTopic: number | ForumTopic) {
		forumTopic = forumTopic instanceof ForumTopic ? forumTopic.id : forumTopic;
		return this.client.api.forumTopics.lock(this.channel.id, forumTopic);
	}

	/**
	 * Unlock a forum topic in the channel.
	 * @param forumTopic The forum topic to unlock.
	 * @example topics.unlock(forumTopic);
	 */
	unlock(forumTopic: number | ForumTopic) {
		forumTopic = forumTopic instanceof ForumTopic ? forumTopic.id : forumTopic;
		return this.client.api.forumTopics.unlock(this.channel.id, forumTopic);
	}
}

/** The options for fetching forum topics. */
export interface ForumTopicFetchManyOptions extends FetchManyOptions, RESTGetForumTopicsQuery {}
