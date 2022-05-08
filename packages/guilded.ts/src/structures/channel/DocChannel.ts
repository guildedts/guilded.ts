import { APIChannel } from 'guilded-api-typings';
import { Channel, Client } from '..';
import { DocManager } from '../../managers';

/** Represents a doc channel on Guilded. */
export class DocChannel extends Channel {
	/** The type of this channel. */
	public declare readonly type: 'docs';

	/** A manager of docs that belong to this doc channel. */
	public readonly docs: DocManager;

	/**
	 * @param client The client that owns this doc channel.
	 * @param data The data of the doc channel.
	 */
	public constructor(client: Client, data: APIChannel) {
		super(client, data);

		this.docs = new DocManager(this);
	}

	/**
	 * Post a new doc to this doc channel.
	 * @param title The title of the doc.
	 * @param content The content of the doc.
	 * @param cache Whether to cache the doc.
	 * @returns The created doc.
	 */
	public post(title: string, content: string, cache = this.docs.caching) {
		return this.docs.create(title, content, cache);
	}
}
