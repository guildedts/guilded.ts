import { APIDoc } from 'guilded-api-typings';
import { FetchOptions } from '../managers/BaseManager';
import { Base } from './Base';
import { DocChannel } from './channel/DocChannel';

/**
 * Represents a doc on Guilded
 */
export class Doc extends Base {
	/**
	 * @param channel The doc channel
	 * @param data The data of the doc
	 * @param cache Whether to cache the doc
	 */
	constructor(
		public readonly channel: DocChannel,
		public readonly data: APIDoc,
		cache = channel.client.options.cacheDocs ?? true,
	) {
		super(channel.client);
		if (cache) channel.docs.cache.set(this.id, this);
	}

	/**
	 * Whether the doc is cached
	 */
	get isCached() {
		return this.channel.docs.cache.has(this.id);
	}

	/**
	 * The ID of the doc
	 */
	get id() {
		return this.data.id;
	}

	/**
	 * The title of the doc (min characters: `1`)
	 */
	get title() {
		return this.data.title;
	}

	/**
	 * The content of the doc
	 */
	get content() {
		return this.data.content;
	}

	/**
	 * The mentions of the doc
	 */
	get mentions() {
		return this.data.mentions ?? {};
	}

	/**
	 * When the doc was created
	 */
	get createdAt() {
		return new Date(this.data.createdAt);
	}

	/**
	 * The ID of the user that created the doc
	 */
	get creatorId() {
		return this.data.createdBy;
	}

	/**
	 * The user that created the doc
	 */
	get creator() {
		return this.client.users.cache.get(this.creatorId) ?? null;
	}

	/**
	 * Whether the client user created the doc
	 */
	get isCreator() {
		return this.creatorId === this.client.user?.id;
	}

	/**
	 * When the doc was updated, if relevant
	 */
	get updatedAt() {
		return this.data.updatedAt ? new Date(this.data.updatedAt) : null;
	}

	/**
	 * Whether the doc is updated
	 */
	get isUpdated() {
		return !!this.updatedAt;
	}

	/**
	 * The ID of the user that updated the doc, if relevant
	 */
	get updaterId() {
		return this.data.updatedBy ?? null;
	}

	/**
	 * The user that updated the doc, if relevant
	 */
	get updater() {
		return this.updaterId ? this.client.users.cache.get(this.updaterId) ?? null : null;
	}

	/**
	 * Whether the client user updated the doc
	 */
	get isUpdater() {
		return this.updaterId === this.client.user?.id;
	}

	/**
	 * Fetch the doc
	 * @param options The options to fetch the doc with
	 * @returns The fetched doc
	 */
	fetch(options?: FetchOptions) {
		return this.channel.docs.fetch(this, options) as Promise<this>;
	}

	/**
	 * Fetch the user that created the doc
	 * @returns The fetched user
	 */
	fetchCreator() {
		return this.client.users.fetch(this.channel.serverId, this.creatorId);
	}

	/**
	 * Fetch the user that updated the doc
	 * @returns The fetched user, if relevant
	 */
	async fetchUpdater() {
		return this.updaterId
			? this.client.users.fetch(this.channel.serverId, this.updaterId)
			: null;
	}

	/**
	 * Update the doc
	 * @param title The title of the doc
	 * @param content The content of the doc
	 * @returns The updated doc
	 */
	update(title: string, content: string) {
		return this.channel.docs.edit(this, title, content) as Promise<this>;
	}

	/**
	 * Delete the doc
	 * @returns The deleted doc
	 */
	async delete() {
		await this.channel.docs.delete(this);
		return this;
	}
}
