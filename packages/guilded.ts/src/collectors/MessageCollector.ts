import { APIMessageSummary } from 'guilded-api-typings';
import { Message } from '../structures/message/Message';
import { Collector, CollectorOptions } from './Collector';
import { MessageManager } from '../managers/message/MessageManager';

/**
 * The collector for messages
 */
export class MessageCollector extends Collector<string, Message> {
	/**
	 * @param messages The manager for messages
	 * @param options The options for the message collector
	 */
	constructor(public readonly messages: MessageManager, options?: CollectorOptions<Message>) {
		super(messages.client, options);
		this.options.dispose = options?.dispose ?? this.client.options.disposeCollectedMessages;
		this.client.on('messageCreate', this.collectMessage.bind(this));
		this.client.on('messageEdit', this.collectMessage.bind(this));
		this.client.on('messageDelete', this.disposeMessage.bind(this));
	}

	private collectMessage(message: Message) {
		if (message.channel.id !== this.messages.channel.id) return;
		this.collect(message.id, message);
	}

	private disposeMessage(message: Message | APIMessageSummary) {
		this.dispose(message.id);
	}
}
