import { APIChannel, APIChannelEditPayload, APIChannelPayload, Routes } from 'guilded-api-typings';
import { BaseRouter } from './BaseRouter';

/** The channel router for the Guilded REST API. */
export class ChannelRouter extends BaseRouter {
	/**
	 * Fetch a channel from Guilded.
	 * @param channelId The ID of the channel to fetch.
	 * @returns The fetched channel.
	 */
	public async fetch(channelId: string) {
		const { channel } = await this.rest.get<{ channel: APIChannel }>(Routes.channel(channelId));
		return channel;
	}

	/**
	 * Create a channel on Guilded.
	 * @param payload The payload of the channel.
	 * @returns The created channel.
	 */
	public async create(payload: APIChannelPayload) {
		const { channel } = await this.rest.post<{ channel: APIChannel }, APIChannelPayload>(
			Routes.channels(),
			payload,
		);
		return channel;
	}

	/**
	 * Edit a channel on Guilded.
	 * @param channelId The ID of the channel to edit.
	 * @param payload The payload of the channel.
	 * @returns The edited channel.
	 */
	public async edit(channelId: string, payload: APIChannelEditPayload) {
		const { channel } = await this.rest.patch<{ channel: APIChannel }, APIChannelEditPayload>(
			Routes.channel(channelId),
			payload,
		);
		return channel;
	}

	/**
	 * Delete a channel from Guilded.
	 * @param channelId The ID of the channel to delete.
	 */
	public delete(channelId: string) {
		return this.rest.delete<void>(Routes.channel(channelId));
	}
}
