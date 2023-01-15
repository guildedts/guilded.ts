import { APIChannel } from 'guilded-api-typings';
import { Client } from '../Client';
import { Channel } from './Channel';
import { MessageManager } from '../../managers/message/MessageManager';
import { ChannelWebhookManager } from '../../managers/channel/ChannelWebhookManager';

/**
 * Represents a chat channel on Guilded
 */
export class ChatChannel extends Channel {
	/**
	 * The manager for webhooks
	 */
	readonly webhooks: ChannelWebhookManager;
	/**
	 * The manager for messages
	 */
	readonly messages: MessageManager;

	/**
	 * @param client The client
	 * @param data The data of the chat channel
	 * @param cache Whether to cache the chat channel
	 */
	constructor(client: Client, data: APIChannel, cache?: boolean) {
		super(client, data, cache);
		this.webhooks = new ChannelWebhookManager(this);
		this.messages = new MessageManager(this);
	}
}
