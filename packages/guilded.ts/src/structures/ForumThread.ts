import { APIForumThread } from 'guilded-api-typings';
import { Base, ForumChannel } from '.';

/** Represents a forum thread on Guilded. */
export class ForumThread extends Base<number> {
	/** The ID of the server this forum thread was created on. */
	public readonly serverId: string;
	/** The ID of the channel this forum thread was created in. */
	public readonly channelId: string;
	/** The title of this thread. */
	public readonly title?: string;
	/** The content of this thread. */
	public readonly content?: string;
	/** The time this thread was created. */
	public readonly createdAt: Date;
	/** The ID of the author of this thread. */
	public readonly createdBy: string;
	/** The ID of the webhook who created this thread. */
	public readonly createdByWebhookId?: string;
	/** The time this thread was last edited. */
	public readonly editedAt?: Date;

	/**
	 * @param channel The channel this thread belongs to.
	 * @param data The data of this thread.
	 */
	public constructor(public readonly channel: ForumChannel, data: APIForumThread) {
		super(channel.client, data.id);

		this.serverId = data.serverId;
		this.channelId = data.channelId;
		this.title = data.title;
		this.content = data.content;
		this.createdAt = new Date(data.createdAt);
		this.createdBy = data.createdBy;
		this.createdByWebhookId = data.createdByWebhookId;
		this.editedAt = data.updatedAt ? new Date(data.updatedAt) : undefined;
	}

	/** Whether this thread is cached. */
	public get cached() {
		return this.channel.threads.cache.has(this.id);
	}

	/** The server this thread belongs to. */
	public get server() {
		return this.channel.server;
	}

	/** The timestamp this thread was created. */
	public get createdTimestamp() {
		return this.createdAt.getTime();
	}

	/** The author of this thread. */
	public get author() {
		return this.client.users.cache.get(this.createdBy);
	}

	/** The webhook who created this thread. */
	public get webhook() {
		return this.createdByWebhookId
			? this.channel.webhooks.cache.get(this.createdByWebhookId)
			: undefined;
	}

	/** The ID of the author of this thread. */
	public get authorId() {
		return this.createdByWebhookId ?? this.createdBy;
	}

	/** The timestamp this thread was last edited. */
	public get editedTimestamp() {
		return this.editedAt?.getTime();
	}
}
