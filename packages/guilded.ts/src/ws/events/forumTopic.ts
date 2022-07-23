import { WSEvents } from 'guilded-api-typings';
import { ForumChannel } from '../../structures/channel/ForumChannel';
import { Client } from '../../structures/Client';
import { ForumTopic } from '../../structures/ForumTopic';

/**
 * Handle the ForumTopicCreated event.
 * @param client The client the Websocket belongs to.
 * @param data The data of the event.
 */
export async function created(client: Client, data: WSEvents['ForumTopicCreated']) {
	const channel = (await client.channels.fetch(data.forumTopic.channelId)) as ForumChannel;
	const topic = new ForumTopic(channel, data.forumTopic);
	client.emit('forumTopicCreate', topic);
}

/**
 * Handle the ForumTopicUpdated event.
 * @param client The client the Websocket belongs to.
 * @param data The data of the event.
 */
export async function updated(client: Client, data: WSEvents['ForumTopicUpdated']) {
	const channel = (await client.channels.fetch(data.forumTopic.channelId)) as ForumChannel;
	const oldForumTopic = channel.topics.cache.get(data.forumTopic.id);
	const newForumTopic = new ForumTopic(channel, data.forumTopic);
	client.emit('forumTopicEdit', newForumTopic, oldForumTopic);
}

/**
 * Handle the ForumTopicDeleted event.
 * @param client The client the Websocket belongs to.
 * @param data The data of the event.
 */
export async function deleted(client: Client, data: WSEvents['ForumTopicDeleted']) {
	const channel = (await client.channels.fetch(data.forumTopic.channelId)) as ForumChannel;
	const forumTopic = new ForumTopic(channel, data.forumTopic);
	if (client.options.disposeCachedForumTopics ?? true) channel.topics.cache.delete(forumTopic.id);
	client.emit('forumTopicDelete', forumTopic);
}
