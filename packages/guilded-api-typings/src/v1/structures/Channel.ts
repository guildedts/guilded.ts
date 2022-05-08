/**
 * The API channel object.
 * @see https://www.guilded.gg/docs/api/channels/ServerChannel
 */
export interface APIChannel {
	/** The ID of the channel. */
	id: string;
	/** The type of channel. */
	type: APIChannelType;
	/** The name of the channel. */
	name: string;
	/** The topic of the channel. */
	topic?: string;
	/** The time the channel was created. */
	createdAt: string;
	/** The ID of the user who created the channel. */
	createdBy: string;
	/** The time the channel was edited. */
	updatedAt?: string;
	/** The ID of the server the channel is in. */
	serverId: string;
	/** The ID of the parent channel. */
	parentId?: string;
	/** The ID of the category the channel is in. */
	categoryId?: number;
	/** The ID of the group the channel is in. */
	groupId: string;
	/** Whether this channel is public. */
	isPublic?: boolean;
	/** The ID of the user who archived the channel. */
	archivedBy?: string;
	/** The time the channel was archived. */
	archivedAt?: string;
}

/**
 * The API channel types.
 * @see https://www.guilded.gg/docs/api/channels/ServerChannel
 */
export type APIChannelType =
	| 'announcements'
	| 'chat'
	| 'calendar'
	| 'forums'
	| 'media'
	| 'docs'
	| 'voice'
	| 'list'
	| 'scheduling'
	| 'stream';

/**
 * The payload for creating a channel.
 * @see https://www.guilded.gg/docs/api/channels/ChannelCreate
 */
export interface APIChannelPayload {
	/** The name of the channel. */
	name?: string;
	/** The topic of the channel. */
	topic?: string;
	/** Whether this channel is public. */
	isPublic?: boolean;
	/** The type of channel. */
	type?: APIChannelType;
	/** The ID of the server to create the channel in. */
	serverId: string;
	/** The ID of the group to create the channel in. */
	groupId?: string;
	/** The ID of the category to create the channel in. */
	categoryId?: number;
}
