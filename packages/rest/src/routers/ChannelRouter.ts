import { APIChannel, APIChannelEditPayload, APIChannelPayload, Routes } from 'guilded-api-typings';
import { BaseRouter } from './BaseRouter';

/**
 * The channel router for the Guilded REST API.
 * @example new ChannelRouter(rest);
 */
export class ChannelRouter extends BaseRouter {
	/**
	 * Fetch a channel from Guilded.
	 * @param channelId The ID of the channel to fetch.
	 * @returns The fetched channel.
	 * @example channels.fetch('abc');
	 */
	async fetch(channelId: string) {
		const { channel } = await this.rest.get<{ channel: APIChannel }>(Routes.channel(channelId));
		return channel;
	}

	/**
	 * Create a channel on Guilded.
	 * @param payload The payload of the channel.
	 * @returns The created channel.
	 * @example channels.create({ name: 'Chat', type: 'chat' });
	 */
	async create(payload: APIChannelPayload) {
		const { channel } = await this.rest.post<{ channel: APIChannel }, APIChannelPayload>(
			Routes.channels,
			payload,
		);
		return channel;
	}

	/**
	 * Edit a channel on Guilded.
	 * @param channelId The ID of the channel to edit.
	 * @param payload The payload of the channel.
	 * @returns The edited channel.
	 * @example channels.edit('abc', { name: 'Chat' });
	 */
	async edit(channelId: string, payload: APIChannelEditPayload) {
		const { channel } = await this.rest.patch<{ channel: APIChannel }, APIChannelEditPayload>(
			Routes.channel(channelId),
			payload,
		);
		return channel;
	}

	/**
	 * Delete a channel from Guilded.
	 * @param channelId The ID of the channel to delete.
	 * @example channels.delete('abc');
	 */
	delete(channelId: string) {
		return this.rest.delete<void>(Routes.channel(channelId));
	}
}
