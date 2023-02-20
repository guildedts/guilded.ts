import {
	WebSocketForumTopicCreateEventData,
	WebSocketForumTopicDeleteEventData,
	WebSocketForumTopicLockEventData,
	WebSocketForumTopicPinEventData,
	WebSocketForumTopicUnlockEventData,
	WebSocketForumTopicUnpinEventData,
	WebSocketForumTopicUpdateEventData,
} from 'guilded-api-typings';
import { ForumChannel } from '../../structures/channel/ForumChannel';
import { Client } from '../../structures/Client';
import { ForumTopic } from '../../structures/ForumTopic';

/**
 * Handle the `ForumTopicCreated` event
 * @param client The client
 * @param data The data of the event
 */
export async function created(client: Client, data: WebSocketForumTopicCreateEventData) {
	const channel = (await client.channels.fetch(data.forumTopic.channelId)) as ForumChannel;
	const topic = new ForumTopic(channel, data.forumTopic);
	client.emit('forumTopicCreate', topic);
}

/**
 * Handle the `ForumTopicUpdated` event
 * @param client The client
 * @param data The data of the event
 */
export async function updated(client: Client, data: WebSocketForumTopicUpdateEventData) {
	const channel = (await client.channels.fetch(data.forumTopic.channelId)) as ForumChannel;
	const oldForumTopic = channel.topics.cache.get(data.forumTopic.id);
	const newForumTopic = new ForumTopic(channel, data.forumTopic);
	client.emit('forumTopicEdit', newForumTopic, oldForumTopic);
}

/**
 * Handle the `ForumTopicDeleted` event
 * @param client The client
 * @param data The data of the event
 */
export async function deleted(client: Client, data: WebSocketForumTopicDeleteEventData) {
	const channel = (await client.channels.fetch(data.forumTopic.channelId)) as ForumChannel;
	const forumTopic = new ForumTopic(channel, data.forumTopic);
	if (client.options.disposeCachedForumTopics ?? true) channel.topics.cache.delete(forumTopic.id);
	client.emit('forumTopicDelete', forumTopic);
}

/**
 * Handle the `ForumTopicPinned` event
 * @param client The client
 * @param data The data of the event
 */
export async function pinned(client: Client, data: WebSocketForumTopicPinEventData) {
	const channel = (await client.channels.fetch(data.forumTopic.channelId)) as ForumChannel;
	const forumTopic = new ForumTopic(channel, data.forumTopic);
	client.emit('forumTopicPin', forumTopic);
}

/**
 * Handle the `ForumTopicUnpinned` event
 * @param client The client
 * @param data The data of the event
 */
export async function unpinned(client: Client, data: WebSocketForumTopicUnpinEventData) {
	const channel = (await client.channels.fetch(data.forumTopic.channelId)) as ForumChannel;
	const forumTopic = new ForumTopic(channel, data.forumTopic);
	client.emit('forumTopicUnpin', forumTopic);
}

/**
 * Handle the `ForumTopicLocked` event
 * @param client The client
 * @param data The data of the event
 */
export async function locked(client: Client, data: WebSocketForumTopicLockEventData) {
	const channel = (await client.channels.fetch(data.forumTopic.channelId)) as ForumChannel;
	const forumTopic = new ForumTopic(channel, data.forumTopic);
	client.emit('forumTopicLock', forumTopic);
}

/**
 * Handle the `ForumTopicUnlocked` event
 * @param client The client
 * @param data The data of the event
 */
export async function unlocked(client: Client, data: WebSocketForumTopicUnlockEventData) {
	const channel = (await client.channels.fetch(data.forumTopic.channelId)) as ForumChannel;
	const forumTopic = new ForumTopic(channel, data.forumTopic);
	client.emit('forumTopicUnlock', forumTopic);
}
