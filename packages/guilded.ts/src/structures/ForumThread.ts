import { APIForumThread } from 'guilded-api-typings';
import { Base } from './Base';
import { ForumChannel } from './channel/ForumChannel';

/** Represents a forum thread on Guilded. */
export class ForumThread extends Base<number> {
	/** The ID of the server the forum thread belongs to. */
	public readonly serverId: string;
	/** The ID of the channel the forum thread belongs to. */
	public readonly channelId: string;
	/** The title of the thread. */
	public readonly title?: string;
	/** The content of the thread. */
	public readonly content?: string;
	/** The date the thread was created. */
	public readonly createdAt: Date;
	/** The ID of the user that created the thread. */
	public readonly createdBy: string;
	/** The ID of the webhook that created the thread. */
	public readonly createdByWebhookId?: string;
	/** The date the thread was edited. */
	public readonly editedAt?: Date;

	/**
	 * @param channel The forum channel the thread belongs to.
	 * @param raw The raw data of the thread.
	 */
	public constructor(public readonly channel: ForumChannel, public readonly raw: APIForumThread) {
		super(channel.client, raw.id);
		this.serverId = raw.serverId;
		this.channelId = raw.channelId;
		this.title = raw.title;
		this.content = raw.content;
		this.createdAt = new Date(raw.createdAt);
		this.createdBy = raw.createdBy;
		this.createdByWebhookId = raw.createdByWebhookId;
		this.editedAt = raw.updatedAt ? new Date(raw.updatedAt) : undefined;
	}

	/** Whether the thread is cached. */
	public get isCached() {
		return this.channel.threads.cache.has(this.id);
	}

	/** The server the thread belongs to. */
	public get server() {
		return this.channel.server;
	}

	/** The timestamp the thread was created. */
	public get createdTimestamp() {
		return this.createdAt.getTime();
	}

	/** The author of the thread. */
	public get author() {
		return this.client.users.cache.get(this.createdBy);
	}

	/** The webhook that created the thread. */
	public get webhook() {
		return this.createdByWebhookId
			? this.channel.webhooks.cache.get(this.createdByWebhookId)
			: undefined;
	}

	/** The ID of the author of the thread. */
	public get authorId() {
		return this.createdByWebhookId ?? this.createdBy;
	}

	/** The timestamp the thread was edited. */
	public get editedTimestamp() {
		return this.editedAt?.getTime();
	}
}
