import { APIMentions, APIListItemNote, APIListItemNoteSummary } from 'guilded-api-typings';
import { FetchOptions } from '../../managers/BaseManager';
import { Base } from '../Base';
import { ListItem } from './ListItem';

/**
 * Represents a list item note on Guilded.
 * @example new ListItemNote(item, rawListItemNote);
 */
export class ListItemNote extends Base {
	/** The date the list item note was created. */
	readonly createdAt: Date;
	/** The ID of the user that created the list item note. */
	readonly createdBy: string;
	/** The date the list item note was edited. */
	readonly editedAt?: Date;
	/** The ID of the user that edited the list item note. */
	readonly editedBy?: string;
	/** The mentions of the list item note. */
	readonly mentions?: APIMentions;
	/** The content of the list item note. */
	readonly content?: string;

	/**
	 * @param item The list item the note belongs to.
	 * @param raw The raw data of the list item note.
	 */
	constructor(
		public readonly item: ListItem,
		public readonly raw: APIListItemNote | APIListItemNoteSummary,
	) {
		super(item.client, item.id);
		this.content = 'content' in raw ? raw.content : undefined;
		this.createdAt = new Date(raw.createdAt);
		this.createdBy = raw.createdBy;
		this.editedAt = raw.updatedAt ? new Date(raw.updatedAt) : undefined;
		this.editedBy = raw.updatedBy;
	}

	/** The timestamp the list item note was created. */
	get createdTimestamp() {
		return this.createdAt.getTime();
	}

	/** The server member that created the list item note. */
	get author() {
		return this.item.server?.members.cache.get(this.createdBy);
	}

	/** The timestamp the list item note was edited. */
	get editedTimestamp() {
		return this.editedAt ? this.editedAt.getTime() : undefined;
	}

	/** The server member that edited the list item note. */
	get editor() {
		return this.editedBy ? this.item.server?.members.cache.get(this.editedBy) : undefined;
	}

	/**
	 * Fetch the server member that created the list item note.
	 * @param options The options to fetch the server member with.
	 * @returns The fetched server member.
	 * @example note.fetchAuthor();
	 */
	async fetchAuthor(options?: FetchOptions) {
		const server = await this.item.fetchServer();
		return server.members.fetch(this.createdBy, options);
	}

	/**
	 * Fetch the server member that edited the list item note.
	 * @param options The options to fetch the server member with.
	 * @returns The fetched server member.
	 * @example note.fetchEditor();
	 */
	async fetchEditor(options?: FetchOptions) {
		const server = await this.item.fetchServer();
		return this.editedBy ? server.members.fetch(this.editedBy, options) : undefined;
	}
}
