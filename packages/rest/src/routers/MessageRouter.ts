import {
	RESTGetMessagesQuery,
	APIMessage,
	RESTPutMessageJSONBody,
	RESTPostMessageJSONBody,
	Routes,
} from 'guilded-api-typings';
import { BaseRouter } from './BaseRouter';

/**
 * The message router for the Guilded REST API
 */
export class MessageRouter extends BaseRouter {
	/**
	 * Fetch a message from Guilded
	 * @param channelId The ID of the channel
	 * @param messageId The ID of the message
	 * @returns The fetched message
	 */
	fetch(channelId: string, messageId: string): Promise<APIMessage>;
	/**
	 * Fetch messages from Guilded
	 * @param channelId The ID of the channel
	 * @param options The options to fetch messages with
	 * @returns The fetched messages
	 */
	fetch(channelId: string, options?: RESTGetMessagesQuery): Promise<APIMessage[]>;
	fetch(channelId: string, messageIdOrOptions?: string | RESTGetMessagesQuery) {
		if (typeof messageIdOrOptions === 'string')
			return this.fetchSingle(channelId, messageIdOrOptions);
		return this.fetchMany(channelId, messageIdOrOptions);
	}

	private async fetchSingle(channelId: string, messageId: string) {
		const { message } = await this.rest.get<{ message: APIMessage }>(
			Routes.message(channelId, messageId),
		);
		return message;
	}

	private async fetchMany(channelId: string, options?: RESTGetMessagesQuery) {
		const { messages } = await this.rest.get<{ messages: APIMessage[] }, RESTGetMessagesQuery>(
			Routes.messages(channelId),
			options,
		);
		return messages;
	}

	/**
	 * Create a message on Guilded
	 * @param channelId The ID of the channel
	 * @param payload The payload of the message
	 * @returns The created message
	 */
	async create(channelId: string, payload: RESTPostMessageJSONBody) {
		const { message } = await this.rest.post<{ message: APIMessage }, RESTPostMessageJSONBody>(
			Routes.messages(channelId),
			payload,
		);
		return message;
	}

	/**
	 * Edit a message on Guilded
	 * @param channelId The ID of the channel
	 * @param messageId The ID of the message
	 * @param payload The payload of the message
	 * @returns The edited message
	 */
	async edit(channelId: string, messageId: string, payload: RESTPutMessageJSONBody) {
		const { message } = await this.rest.put<{ message: APIMessage }, RESTPutMessageJSONBody>(
			Routes.message(channelId, messageId),
			payload,
		);
		return message;
	}

	/**
	 * Delete a message from Guilded
	 * @param channelId The ID of the channel
	 * @param messageId The ID of the message
	 */
	delete(channelId: string, messageId: string) {
		return this.rest.delete<void>(Routes.message(channelId, messageId));
	}
}
