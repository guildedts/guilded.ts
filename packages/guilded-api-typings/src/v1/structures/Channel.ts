/**
 * Represents a channel on Guilded.
 * @see https://www.guilded.gg/docs/api/channels/ServerChannel
 */
export interface APIChannel {
	/** The ID of the channel. */
	id: string;
	/** The type of the channel. */
	type: APIChannelTypeString;
	/** The name of the channel. */
	name: string;
	/** The topic of the channel. */
	topic?: string;
	/** The date the channel was created. */
	createdAt: string;
	/** The ID of the user that created the channel. */
	createdBy: string;
	/** The date the channel was edited. */
	updatedAt?: string;
	/** The ID of the server the channel belongs to. */
	serverId: string;
	/** The ID of the parent channel the channel belongs to. */
	parentId?: string;
	/** The ID of the category the channel belongs to. */
	categoryId?: number;
	/** The ID of the group the channel belongs to. */
	groupId: string;
	/** Whether the channel is public. */
	isPublic?: boolean;
	/** The ID of the user that archived the channel. */
	archivedBy?: string;
	/** The date the channel was archived. */
	archivedAt?: string;
}

/**
 * The type of a channel on Guilded.
 * @see https://www.guilded.gg/docs/api/channels/ServerChannel
 */
export enum APIChannelType {
	Announcements = 'announcements',
	Chat = 'chat',
	Calendar = 'calendar',
	Forums = 'forums',
	Media = 'media',
	Docs = 'docs',
	Voice = 'voice',
	List = 'list',
	Scheduling = 'scheduling',
	Stream = 'stream',
}

/**
 * The type string of a channel on Guilded.
 * @see https://www.guilded.gg/docs/api/channels/ServerChannel
 */
export type APIChannelTypeString = `${APIChannelType}`;

/**
 * The payload for creating a channel.
 * @see https://www.guilded.gg/docs/api/channels/ChannelCreate
 */
export interface APIChannelPayload extends APIChannelEditPayload {
	/** The name of the channel. */
	name: string;
	/** The type of the channel. */
	type: APIChannelTypeString;
	/** The ID of the server the channel belongs to. */
	serverId?: string;
	/** The ID of the group the channel belongs to. */
	groupId?: string;
	/** The ID of the category the channel belongs to. */
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
	/** Whether the channel is public. */
	isPublic?: boolean;
}

/**
 * Represents mentions on Guilded.
 * @see https://www.guilded.gg/docs/api/channels/Mentions
 */
export interface APIMentions {
	/** The users that were mentioned. */
	users?: { id: string }[];
	/** The channels that were mentioned. */
	channels?: { id: string }[];
	/** The roles that were mentioned. */
	roles?: { id: number }[];
	/** Whether everyone was mentioned. */
	everyone?: boolean;
	/** Whether here was mentioned. */
	here?: boolean;
}

/**
 * Represents a content reaction on Guilded.
 * @see https://www.guilded.gg/docs/api/reactions/ContentReaction
 */
export interface APIReaction {
	/** The ID of the reaction. */
	id: number;
	/** The ID of the server the reaction belongs to. */
	serverId?: string;
	/** The date the reaction was created. */
	createdAt: string;
	/** The ID of the user that created the reaction. */
	createdBy: string;
	/** The ID of the webhook that created the reaction. */
	createdByWebhookId?: string;
}
