import { APIChannel } from 'guilded-api-typings';
import { Channel, Client } from '..';
import { ForumThreadManager } from '../../managers';

/** Represents a forum channel on Guilded. */
export class ForumChannel extends Channel {
	/** The type of this channel. */
	public declare readonly type: 'forums';

	/** A manager of forum threads that belong to this forum channel. */
	public readonly threads: ForumThreadManager;

	/**
	 * @param client The client that owns this forum channel.
	 * @param data The data of the forum channel.
	 */
	public constructor(client: Client, data: APIChannel) {
		super(client, data);

		this.threads = new ForumThreadManager(this);
	}

	/**
	 * Post a new topic to this forum channel.
	 * @param title The title of the topic.
	 * @param content The content of the topic.
	 * @returns The created forum thread.
	 */
	public async post(title: string, content: string) {
		return this.threads.post(title, content);
	}
}
