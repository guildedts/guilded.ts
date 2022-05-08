import { APIListItemNote, APIListItemNoteSummary } from 'guilded-api-typings';
import { Base, ListItem } from '..';

/** Represents a list item note on Guilded. */
export class Note extends Base {
	/** The content of this note. */
	public readonly content?: string;
	/** The time this note was created. */
	public readonly createdAt: Date;
	/** The ID of the user who created this note. */
	public readonly createdBy: string;
	/** The time this note was last edited. */
	public readonly editedAt?: Date;
	/** The ID of the user who last edited this note. */
	public readonly editedBy?: string;

	/**
	 * @param listItem The list item this note belongs to.
	 * @param data The data of this note.
	 */
	public constructor(
		public readonly listItem: ListItem,
		data: APIListItemNote | APIListItemNoteSummary,
	) {
		super(listItem.client, listItem.id);

		this.content = 'content' in data ? data.content : undefined;
		this.createdAt = new Date(data.createdAt);
		this.createdBy = data.createdBy;
		this.editedAt = data.updatedAt ? new Date(data.updatedAt) : undefined;
		this.editedBy = data.updatedBy;
	}

	/** The timestamp of when this note was created. */
	public get createdTimestamp() {
		return this.createdAt.getTime();
	}

	/** The author of this note. */
	public get author() {
		return this.client.users.cache.get(this.createdBy);
	}

	/** The timestamp of when this note was last edited. */
	public get editedTimestamp() {
		return this.editedAt ? this.editedAt.getTime() : undefined;
	}

	/** The editor of this note. */
	public get editor() {
		return this.editedBy ? this.client.users.cache.get(this.editedBy) : undefined;
	}
}
