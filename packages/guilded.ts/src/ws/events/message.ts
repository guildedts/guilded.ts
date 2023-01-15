import {
	WebSocketMessageCreateEventData,
	WebSocketMessageDeleteEventData,
	WebSocketMessageReactionAddEventData,
	WebSocketMessageReactionRemoveEventData,
	WebSocketMessageUpdateEventData,
} from 'guilded-api-typings';
import { ChatChannel } from '../../structures/channel/ChatChannel';
import { Client } from '../../structures/Client';
import { Message } from '../../structures/message/Message';
import { MessageReaction } from '../../structures/message/MessageReaction';

/**
 * Handle the `ChatMessageCreated` event
 * @param client The client
 * @param data The data of the event
 */
export async function created(client: Client, data: WebSocketMessageCreateEventData) {
	const channel = (await client.channels.fetch(data.message.channelId)) as ChatChannel;
	const message = new Message(channel, data.message);
	client.emit('messageCreate', message);
}

/**
 * Handle the `ChatMessageUpdated` event
 * @param client The client
 * @param data The data of the event
 */
export async function updated(client: Client, data: WebSocketMessageUpdateEventData) {
	const channel = (await client.channels.fetch(data.message.channelId)) as ChatChannel;
	const oldMessage = channel.messages.cache.get(data.message.id);
	const newMessage = new Message(channel, data.message);
	client.emit('messageEdit', newMessage, oldMessage);
}

/**
 * Handle the `ChatMessageDeleted` event
 * @param client The client
 * @param data The data of the event
 */
export async function deleted(client: Client, data: WebSocketMessageDeleteEventData) {
	const channel = (await client.channels.fetch(data.message.channelId)) as ChatChannel;
	const message = channel.messages.cache.get(data.message.id);
	if (message) message.deletedAt = new Date(data.message.deletedAt);
	if (client.options.disposeCachedMessages ?? true)
		channel.messages.cache.delete(data.message.id);
	client.emit('messageDelete', message ?? data.message);
}

/**
 * Handle the `ChannelMessageReactionCreated` event
 * @param client The client
 * @param data The data of the event
 */
export async function reactionCreated(client: Client, data: WebSocketMessageReactionAddEventData) {
	const channel = (await client.channels.fetch(data.reaction.channelId)) as ChatChannel;
	const message = await channel.messages.fetch(data.reaction.messageId);
	const reaction = new MessageReaction(message, data.reaction);
	client.emit('messageReactionAdd', reaction);
}

/**
 * Handle the `ChannelMessageReactionDeleted` event
 * @param client The client
 * @param data The data of the event
 */
export async function reactionDeleted(
	client: Client,
	data: WebSocketMessageReactionRemoveEventData,
) {
	const channel = (await client.channels.fetch(data.reaction.channelId)) as ChatChannel;
	const message = await channel.messages.fetch(data.reaction.messageId);
	const reaction = new MessageReaction(message, data.reaction);
	if (client.options.disposeCachedMessageReactions ?? true)
		message.reactions.cache.delete(reaction.emote.id);
	client.emit('messageReactionRemove', reaction);
}
