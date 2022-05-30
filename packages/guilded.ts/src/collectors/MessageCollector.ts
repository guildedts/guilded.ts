import { APIMessageSummary } from 'guilded-api-typings';
import { ChatBasedChannel } from '../managers/channel/ChannelManager';
import { Message } from '../structures/Message';
import { Collector, CollectorOptions } from './Collector';

/** The message collector for a channel. */
export class MessageCollector extends Collector<Message> {
	/**
	 * @param channel The channel that the message collector belongs to.
	 * @param options The options of the message collector.
	 */
	constructor(public readonly channel: ChatBasedChannel, options?: CollectorOptions<Message>) {
		super(channel.client, options);
		this.client.on('messageCreate', this.onMessage.bind(this));
		this.client.on('messageEdit', this.onMessage.bind(this));
		this.client.on('messageDelete', this.onMessageDelete.bind(this));
	}

	/** @ignore */
	private onMessage(message: Message) {
		if (message.channelId !== this.channel.id) return;
		this.collect(message);
	}

	/** @ignore */
	private onMessageDelete(message: Message | APIMessageSummary) {
		if (message.channelId !== this.channel.id) return;
		this.dispose(message.id);
	}
}
