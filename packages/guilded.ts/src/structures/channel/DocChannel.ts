import { APIChannel } from 'guilded-api-typings';
import { Client } from '../Client';
import { Channel } from './Channel';
import { DocManager } from '../../managers/DocManager';

/** Represents a doc channel on Guilded. */
export class DocChannel extends Channel {
	/** The type of channel. */
	public declare readonly type: 'docs';

	/** A manager of docs that belong to the doc channel. */
	public readonly docs: DocManager;

	/**
	 * @param client The client that owns the doc channel.
	 * @param raw The raw data of the doc channel.
	 */
	constructor(client: Client, raw: APIChannel) {
		super(client, raw);
		this.docs = new DocManager(this);
	}

	/**
	 * Post a new doc to the doc channel.
	 * @param title The title to post the doc with.
	 * @param content The content to post the doc with.
	 * @returns The posted doc.
	 */
	public post(title: string, content: string) {
		return this.docs.create(title, content);
	}
}
