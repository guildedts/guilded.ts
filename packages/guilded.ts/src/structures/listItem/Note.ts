import { APIListItemNote, APIListItemNoteSummary } from 'guilded-api-typings';
import { Base } from '../Base';
import { ListItem } from './/ListItem';

/** Represents a list item note on Guilded. */
export class Note extends Base {
	/** The content of the note. */
	public readonly content?: string;
	/** The date the note was created. */
	public readonly createdAt: Date;
	/** The ID of the user that created the note. */
	public readonly createdBy: string;
	/** The date the note was edited. */
	public readonly editedAt?: Date;
	/** The ID of the user that edited the note. */
	public readonly editedBy?: string;

	/**
	 * @param item The list item the note belongs to.
	 * @param raw The raw data of the note.
	 */
	public constructor(
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

	/** The timestamp the note was created. */
	public get createdTimestamp() {
		return this.createdAt.getTime();
	}

	/** The author of the note. */
	public get author() {
		return this.client.users.cache.get(this.createdBy);
	}

	/** The timestamp the note was edited. */
	public get editedTimestamp() {
		return this.editedAt ? this.editedAt.getTime() : undefined;
	}

	/** The editor of the note. */
	public get editor() {
		return this.editedBy ? this.client.users.cache.get(this.editedBy) : undefined;
	}
}
