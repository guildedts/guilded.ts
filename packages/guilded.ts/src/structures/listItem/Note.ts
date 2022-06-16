import { APIMentions, APINote, APINoteSummary } from 'guilded-api-typings';
import { Base } from '../Base';
import { ListItem } from './/ListItem';

/** Represents a list item note on Guilded. */
export class Note extends Base {
	/** The date the note was created. */
	public readonly createdAt: Date;
	/** The ID of the user that created the note. */
	public readonly createdBy: string;
	/** The date the note was edited. */
	public readonly editedAt?: Date;
	/** The ID of the user that edited the note. */
	public readonly editedBy?: string;
	/** The mentions of the note. */
	public readonly mentions?: APIMentions;
	/** The content of the note. */
	public readonly content?: string;

	/**
	 * @param item The list item the note belongs to.
	 * @param raw The raw data of the note.
	 */
	public constructor(
		public readonly item: ListItem,
		public readonly raw: APINote | APINoteSummary,
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

	/** The server member that created the note. */
	public get author() {
		return this.item.server?.members.cache.get(this.createdBy);
	}

	/** The timestamp the note was edited. */
	public get editedTimestamp() {
		return this.editedAt ? this.editedAt.getTime() : undefined;
	}

	/** The server member that edited the note. */
	public get editor() {
		return this.editedBy ? this.item.server?.members.cache.get(this.editedBy) : undefined;
	}
}
