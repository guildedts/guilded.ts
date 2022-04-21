import { Client, MessageManager, Base } from '..';
/** Represents a channel on Guilded. */
export declare class Channel extends Base {
	/** The ID of the channel. */
	readonly id: string;
	/** A manager of messages that belong to this channel. */
	readonly messages: MessageManager;
	/** @param data The data of the channel. */
	constructor(
		data: {
			id: string;
		},
		client: Client,
	);
	/**
	 * Send a message to the channel.
	 * @param payload The payload of the message.
	 */
	send(payload: string | MessagePayload): Promise<import('./Message').Message>;
	/**
	 * Fetch the channel.
	 * @returns The channel.
	 */
	fetch(): Channel;
}
export interface MessagePayload {
	content: string;
	private?: boolean;
}
//# sourceMappingURL=Channel.d.ts.map
