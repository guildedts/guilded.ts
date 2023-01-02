import { APIMessageSummary } from 'guilded-api-typings';
import { ChatChannel } from '../structures/channel/ChatChannel';
import { Message } from '../structures/message/Message';
import { Collector, CollectorOptions } from './Collector';

/**
 * The collector for messages
 */
export class MessageCollector extends Collector<Message> {
	/**
	 * @param channel The chat channel
	 * @param options The options for the message collector
	 */
	constructor(public readonly channel: ChatChannel, options?: CollectorOptions<Message>) {
		super(channel.client, options);
		this.options.dispose = options?.dispose ?? this.client.options.disposeCollectedMessages;
		this.client.on('messageCreate', this.collectMessage.bind(this));
		this.client.on('messageEdit', this.collectMessage.bind(this));
		this.client.on('messageDelete', this.disposeMessage.bind(this));
	}

	private collectMessage(message: Message) {
		if (message.channelId !== this.channel.id) return;
		this.collect(message);
	}

	private disposeMessage(message: Message | APIMessageSummary) {
		this.dispose(message.id);
	}
}
