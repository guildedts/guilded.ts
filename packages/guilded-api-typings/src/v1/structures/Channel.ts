/**
 * The API channel model.
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
	/** The date the channel was created. */
	createdAt: string;
	/** The ID of the user who created the channel. */
	createdBy: string;
	/** The date the channel was edited. */
	updatedAt?: string;
	/** The ID of the server the channel belongs to. */
	serverId: string;
	/** The ID of the parent channel. */
	parentId?: string;
	/** The ID of the category the channel belongs to. */
	categoryId?: number;
	/** The ID of the group the channel belongs to. */
	groupId: string;
	/** Whether this channel is public. */
	isPublic?: boolean;
	/** The ID of the user who archived the channel. */
	archivedBy?: string;
	/** The date the channel was archived. */
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
export interface APIChannelPayload extends APIChannelEditPayload {
	/** The type of channel. */
	type?: APIChannelType;
	/** The ID of the server to create the channel in. */
	serverId: string;
	/** The ID of the group to create the channel in. */
	groupId?: string;
	/** The ID of the category to create the channel in. */
	categoryId?: number;
}

/**
 * The payload for editing a channel.
 * @see https://www.guilded.gg/docs/api/channels/ChannelUpdate
 */
export interface APIChannelEditPayload {
	/** The name of the channel. */
	name?: string;
	/** The topic of the channel. */
	topic?: string;
	/** Whether this channel is public. */
	isPublic?: boolean;
}

/**
 * The API mentions model.
 * @see https://www.guilded.gg/docs/api/channels/Mentions
 */
export interface APIMentions {
	/** The users that were mentioned. */
	users?: { id: string }[];
	/** The channels that were mentioned. */
	channels?: { id: string }[];
	/** The roles that were mentioned. */
	roles?: { id: number }[];
	/** Whether `@everyone` was mentioned. */
	everyone?: boolean;
	/** Whether `@here` was mentioned. */
	here?: boolean;
}
