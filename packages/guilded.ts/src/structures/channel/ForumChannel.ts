import { APIChannel } from 'guilded-api-typings';
import { Client } from '../Client';
import { Channel } from './Channel';
import { ForumThreadManager } from '../../managers/ForumThreadManager';

/** Represents a forum channel on Guilded. */
export class ForumChannel extends Channel {
	/** The type of channel. */
	public declare readonly type: 'forums';

	/** A manager of threads that belong to the forum channel. */
	public readonly threads: ForumThreadManager;

	/**
	 * @param client The client that owns the forum channel.
	 * @param raw The raw data of the forum channel.
	 */
	constructor(client: Client, raw: APIChannel) {
		super(client, raw);
		this.threads = new ForumThreadManager(this);
	}

	/**
	 * Post a new thread to the forum channel.
	 * @param title The title to post the thread with.
	 * @param content The content to post the thread with.
	 * @returns The posted thread.
	 */
	public post(title: string, content: string) {
		return this.threads.post(title, content);
	}
}
