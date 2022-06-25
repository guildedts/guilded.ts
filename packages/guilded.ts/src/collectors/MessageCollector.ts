import { APIMessageSummary } from 'guilded-api-typings';
import { ChatChannel } from '../structures/channel/ChatChannel';
import { Message } from '../structures/message/Message';
import { Collector, CollectorOptions } from './Collector';

/** The message collector for a channel. */
export class MessageCollector extends Collector<Message> {
	/**
	 * @param channel The channel the message collector belongs to.
	 * @param options The options of the message collector.
	 */
	constructor(public readonly channel: ChatChannel, options?: CollectorOptions<Message>) {
		super(channel.client, options);
		this.options.dispose = options?.dispose ?? this.client.options.disposeCollectedMessages;
		this.client.on('messageCreate', this.collectMessage.bind(this));
		this.client.on('messageEdit', this.collectMessage.bind(this));
		this.client.on('messageDelete', this.disposeMessage.bind(this));
	}

	/** @ignore */
	private collectMessage(message: Message) {
		if (message.channelId !== this.channel.id) return;
		this.collect(message);
	}

	/** @ignore */
	private disposeMessage(message: Message | APIMessageSummary) {
		this.dispose(message.id);
	}
}
