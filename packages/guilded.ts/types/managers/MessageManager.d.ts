import { BaseManager, Channel, Message } from '..';
/** A manager of messages that belong to a channel. */
export declare class MessageManager extends BaseManager<string, Message> {
	channel: Channel;
	/** @param channel The channel that the messages belong to. */
	constructor(channel: Channel);
	/**
	 * Fetch a message by its ID.
	 * @param id The ID of the message.
	 * @returns The message.
	 */
	fetch(id: string): Promise<Message>;
}
//# sourceMappingURL=MessageManager.d.ts.map
