import { WSEvents } from 'guilded-api-typings';
import { ChannelResolvable, ChatBasedChannel } from './managers';
import {
	Channel,
	ChatChannel,
	Client,
	Doc,
	DocChannel,
	ForumChannel,
	ListChannel,
	ListItem,
	Message,
	ServerBan,
	ServerMember,
	StreamChannel,
	VoiceChannel,
	Webhook,
} from './structures';

export async function handleWSEvent(
	client: Client,
	...args: {
		[K in keyof WSEvents]: [event: K, data: WSEvents[K]];
	}[keyof WSEvents]
) {
	const [event, data] = args;

	const server = client.servers.fetch(data.serverId);

	switch (event) {
		case 'ChatMessageCreated': {
			const channel = (await client.channels.fetch(
				data.message.channelId,
			)) as ChatBasedChannel;

			const message = new Message(channel, data.message);

			if (channel.messages.caching) channel.messages.cache.set(message.id, message);

			client.emit('messageCreate', message);
			break;
		}
		case 'ChatMessageUpdated': {
			const channel = (await client.channels.fetch(
				data.message.channelId,
			)) as ChatBasedChannel;

			const message = new Message(channel, data.message);

			if (channel.messages.caching) channel.messages.cache.set(message.id, message);

			client.emit('messageEdit', message);
			break;
		}
		case 'ChatMessageDeleted': {
			const channel = (await client.channels.fetch(
				data.message.channelId,
			)) as ChatBasedChannel;

			let message = channel.messages.cache.get(data.message.id);

			if (message) message.deletedAt = new Date(data.message.deletedAt);

			if (!message) message = new Message(channel, data.message);

			client.emit('messageDelete', message);
			break;
		}
		case 'TeamMemberJoined': {
			const member = new ServerMember(server, data.member);

			if (client.users.caching) client.users.cache.set(member.id, member.user);
			if (server.members.caching) server.members.cache.set(member.id, member);

			client.emit('memberAdd', member);
			break;
		}
		case 'TeamMemberRemoved': {
			client.emit('memberRemove', server);
			break;
		}
		case 'TeamMemberBanned': {
			const ban = new ServerBan(server, data.serverMemberBan);

			if (server.bans.caching) server.bans.cache.set(ban.id, ban);

			client.emit('memberBan', ban);
			break;
		}
		case 'TeamMemberUnbanned': {
			const ban = new ServerBan(server, data.serverMemberBan);

			server.bans.cache.delete(ban.id);

			client.emit('memberUnban', ban);
			break;
		}
		case 'TeamMemberUpdated': {
			let member = server.members.cache.get(data.userInfo.id);
			if (!member) member = await server.members.fetch(data.userInfo.id);

			member.nickname = data.userInfo.nickname;

			client.emit('memberEdit', member);
			break;
		}
		case 'teamRolesUpdated':
			client.emit('serverRolesEdit', server);
			break;
		case 'TeamChannelCreated': {
			let channel: ChannelResolvable;

			switch (data.channel.type) {
				case 'chat':
					channel = new ChatChannel(client, data.channel);
					break;
				case 'docs':
					channel = new DocChannel(client, data.channel);
					break;
				case 'forums':
					channel = new ForumChannel(client, data.channel);
					break;
				case 'list':
					channel = new ListChannel(client, data.channel);
					break;
				case 'stream':
					channel = new StreamChannel(client, data.channel);
					break;
				case 'voice':
					channel = new VoiceChannel(client, data.channel);
					break;
				default:
					channel = new Channel(client, data.channel);
					break;
			}

			if (client.channels.caching) client.channels.cache.set(channel.id, channel);

			client.emit('channelCreate', channel);
			break;
		}
		case 'TeamChannelUpdated': {
			let channel: ChannelResolvable;

			switch (data.channel.type) {
				case 'chat':
					channel = new ChatChannel(client, data.channel);
					break;
				case 'docs':
					channel = new DocChannel(client, data.channel);
					break;
				case 'forums':
					channel = new ForumChannel(client, data.channel);
					break;
				case 'list':
					channel = new ListChannel(client, data.channel);
					break;
				case 'stream':
					channel = new StreamChannel(client, data.channel);
					break;
				case 'voice':
					channel = new VoiceChannel(client, data.channel);
					break;
				default:
					channel = new Channel(client, data.channel);
					break;
			}

			if (client.channels.caching) client.channels.cache.set(channel.id, channel);

			client.emit('channelEdit', channel);
			break;
		}
		case 'TeamChannelDeleted': {
			let channel: ChannelResolvable;

			switch (data.channel.type) {
				case 'chat':
					channel = new ChatChannel(client, data.channel);
					break;
				case 'docs':
					channel = new DocChannel(client, data.channel);
					break;
				case 'forums':
					channel = new ForumChannel(client, data.channel);
					break;
				case 'list':
					channel = new ListChannel(client, data.channel);
					break;
				case 'stream':
					channel = new StreamChannel(client, data.channel);
					break;
				case 'voice':
					channel = new VoiceChannel(client, data.channel);
					break;
				default:
					channel = new Channel(client, data.channel);
					break;
			}

			if (client.channels.caching) client.channels.cache.set(channel.id, channel);

			client.emit('channelDelete', channel);
			break;
		}
		case 'TeamWebhookCreated': {
			const channel = await client.channels.fetch(data.webhook.channelId);

			const webhook = new Webhook(channel, data.webhook);

			if (channel.webhooks.caching) channel.webhooks.cache.set(webhook.id, webhook);

			client.emit('webhookCreate', webhook);
			break;
		}
		case 'TeamWebhookUpdated': {
			const channel = await client.channels.fetch(data.webhook.channelId);

			const webhook = new Webhook(channel, data.webhook);

			if (channel.webhooks.caching) channel.webhooks.cache.set(webhook.id, webhook);

			client.emit('webhookEdit', webhook);
			break;
		}
		case 'DocCreated': {
			const channel = (await client.channels.fetch(data.doc.channelId)) as DocChannel;

			const doc = new Doc(channel, data.doc);

			if (channel.docs.caching) channel.docs.cache.set(doc.id, doc);

			client.emit('docCreate', doc);
			break;
		}
		case 'DocUpdated': {
			const channel = (await client.channels.fetch(data.doc.channelId)) as DocChannel;

			const doc = new Doc(channel, data.doc);

			if (channel.docs.caching) channel.docs.cache.set(doc.id, doc);

			client.emit('docEdit', doc);
			break;
		}
		case 'DocDeleted': {
			const channel = (await client.channels.fetch(data.doc.channelId)) as DocChannel;

			const doc = new Doc(channel, data.doc);

			channel.docs.cache.delete(doc.id);

			client.emit('docDelete', doc);
			break;
		}
		case 'ListItemCreated': {
			const channel = (await client.channels.fetch(data.listItem.channelId)) as ListChannel;

			const listItem = new ListItem(channel, data.listItem);

			if (channel.items.caching) channel.items.cache.set(listItem.id, listItem);

			client.emit('listItemCreate', listItem);
			break;
		}
		case 'ListItemUpdated': {
			const channel = (await client.channels.fetch(data.listItem.channelId)) as ListChannel;

			const listItem = new ListItem(channel, data.listItem);

			if (channel.items.caching) channel.items.cache.set(listItem.id, listItem);

			client.emit('listItemEdit', listItem);
			break;
		}
		case 'ListItemDeleted': {
			const channel = (await client.channels.fetch(data.listItem.channelId)) as ListChannel;

			const listItem = new ListItem(channel, data.listItem);

			channel.items.cache.delete(listItem.id);

			client.emit('listItemDelete', listItem);
			break;
		}
		case 'ListItemCompleted': {
			const channel = (await client.channels.fetch(data.listItem.channelId)) as ListChannel;

			const listItem = new ListItem(channel, data.listItem);

			if (channel.items.caching) channel.items.cache.set(listItem.id, listItem);

			client.emit('listItemComplete', listItem);
			break;
		}
		case 'ListItemUncompleted': {
			const channel = (await client.channels.fetch(data.listItem.channelId)) as ListChannel;

			const listItem = new ListItem(channel, data.listItem);

			if (channel.items.caching) channel.items.cache.set(listItem.id, listItem);

			client.emit('listItemUncomplete', listItem);
			break;
		}
	}
}
