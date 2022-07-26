/**
 * Represents a channel on Guilded.
 * @see https://www.guilded.gg/docs/api/channels/ServerChannel
 */
export interface APIChannel {
	/** The ID of the channel. */
	id: string;
	/** The type of the channel. */
	type: ChannelType;
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
export enum ChannelType {
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
 * The payload for creating a channel.
 * @see https://www.guilded.gg/docs/api/channels/ChannelCreate
 */
export interface APIChannelPayload extends APIChannelEditPayload {
	name: string;
	/** The type of the channel. */
	type: ChannelType;
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
