import { APIListItemNote, APIListItemNoteSummary } from 'guilded-api-typings';
import { Base } from '../Base';
import { ListItem } from './ListItem';

/**
 * Represents a list item note on Guilded
 */
export class ListItemNote extends Base {
	/**
	 * @param item The list item
	 * @param data The data of the list item note
	 */
	constructor(
		public readonly item: ListItem,
		public readonly data: APIListItemNote | APIListItemNoteSummary,
	) {
		super(item.client);
	}

	/**
	 * When the list item note was created
	 */
	get createdAt() {
		return new Date(this.data.createdAt);
	}

	/**
	 * The ID of the user that created the list item note
	 */
	get creatorId() {
		return this.data.createdBy;
	}

	/**
	 * The user that created the list item note
	 */
	get creator() {
		return this.client.users.cache.get(this.creatorId) ?? null;
	}

	/**
	 * Whether the client user created the list item note
	 */
	get isCreator() {
		return this.creatorId === this.client.user?.id;
	}

	/**
	 * When the list item note was updated, if relevant
	 */
	get updatedAt() {
		return this.data.updatedAt ? new Date(this.data.updatedAt) : null;
	}

	/**
	 * The ID of the user that updated the list item note, if relevant
	 */
	get updaterId() {
		return this.data.updatedBy ?? null;
	}

	/**
	 * The user that updated the list item note, if relevant
	 */
	get updater() {
		return this.updaterId ? this.client.users.cache.get(this.updaterId) ?? null : null;
	}

	/**
	 * Whether the client user updated the list item note
	 */
	get isUpdater() {
		return this.updaterId === this.client.user?.id;
	}

	/**
	 * Whether the list item note is updated
	 */
	get isUpdated() {
		return !!this.updatedAt;
	}

	/**
	 * The mentions of the list item note
	 */
	get mentions() {
		return 'mentions' in this.data ? this.data.mentions ?? {} : {};
	}

	/**
	 * The content of the list item note
	 */
	get content() {
		return 'content' in this.data ? this.data.content : null;
	}

	/**
	 * Fetch the user that created the list item note
	 * @returns The fetched user
	 */
	fetchCreator() {
		return this.client.users.fetch(this.item.channel.serverId, this.creatorId);
	}

	/**
	 * Fetch the user that updated the list item note
	 * @returns The fetched user, if relevant
	 */
	async fetchUpdater() {
		return this.updaterId
			? this.client.users.fetch(this.item.channel.serverId, this.updaterId)
			: null;
	}
}
