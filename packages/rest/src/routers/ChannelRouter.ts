import {
	APIChannel,
	RESTPatchChannelJSONBody,
	RESTPostChannelJSONBody,
	Routes,
} from 'guilded-api-typings';
import { BaseRouter } from './BaseRouter';

/**
 * The channel router for the Guilded REST API
 */
export class ChannelRouter extends BaseRouter {
	/**
	 * Fetch a channel from Guilded
	 * @param channelId The ID of the channel
	 * @returns The fetched channel
	 */
	async fetch(channelId: string) {
		const { channel } = await this.rest.get<{ channel: APIChannel }>(Routes.channel(channelId));
		return channel;
	}

	/**
	 * Create a channel on Guilded
	 * @param payload The payload of the channel
	 * @returns The created channel
	 */
	async create(payload: RESTPostChannelJSONBody) {
		const { channel } = await this.rest.post<{ channel: APIChannel }, RESTPostChannelJSONBody>(
			Routes.channels,
			payload,
		);
		return channel;
	}

	/**
	 * Edit a channel on Guilded
	 * @param channelId The ID of the channel
	 * @param payload The payload of the channel
	 * @returns The edited channel
	 */
	async edit(channelId: string, payload: RESTPatchChannelJSONBody) {
		const { channel } = await this.rest.patch<
			{ channel: APIChannel },
			RESTPatchChannelJSONBody
		>(Routes.channel(channelId), payload);
		return channel;
	}

	/**
	 * Delete a channel from Guilded
	 * @param channelId The ID of the channel
	 */
	delete(channelId: string) {
		return this.rest.delete<void>(Routes.channel(channelId));
	}
}
