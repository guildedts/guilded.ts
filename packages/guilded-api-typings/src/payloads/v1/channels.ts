import { APIEmote, APIUser } from '../../v1';

/**
 * https://www.guilded.gg/docs/api/channels/Mentions
 */
export interface APIMentions {
	/**
	 * Info on mentioned users (`1`+ length)
	 *
	 * @default []
	 */
	users?: Pick<APIUser, 'id'>[];
	/**
	 * Info on mentioned channels (`1`+ length)
	 *
	 * @default []
	 */
	channels?: Pick<APIChannel, 'id'>[];
	/**
	 * Info on mentioned roles (`1`+ length)
	 * @default []
	 */
	roles?: { id: number }[];
	/**
	 * Whether @everyone was mentioned
	 *
	 * @default false
	 */
	everyone?: boolean;
	/**
	 * Whether @here was mentioned
	 *
	 * @default false
	 */
	here?: boolean;
}

/**
 * https://www.guilded.gg/docs/api/channels/ServerChannel
 */
export interface APIChannel {
	/**
	 * The ID of the channel
	 */
	id: string;
	/**
	 * The type of channel
	 *
	 * This will determine what routes to use for creating content in a channel
	 *
	 * For example, if `chat`, then one must use the routes for creating channel messages
	 */
	type: ChannelType;
	/**
	 * The name of the channel (`1`-`100` characters)
	 */
	name: string;
	/**
	 * The topic of the channel (`1`-`512` characters)
	 */
	topic?: string;
	/**
	 * When the channel was created
	 */
	createdAt: string;
	/**
	 * The ID of the user that created the channel
	 */
	createdBy: string;
	/**
	 * When the channel was updated, if relevant
	 */
	updatedAt?: string;
	/**
	 * The ID of the server
	 */
	serverId: string;
	/**
	 * The ID of the parent channel or parent thread, if present
	 *
	 * Only relevant for server channels
	 */
	parentId?: string;
	/**
	 * The ID of the category, only relevant for server channels
	 */
	categoryId?: number;
	/**
	 * The ID of the group
	 */
	groupId: string;
	/**
	 * Whether the channel can be accessed from users who are not a member of the server
	 *
	 * @default false
	 */
	isPublic?: boolean;
	/**
	 * The ID of the user that archived the channel
	 */
	archivedBy?: string;
	/**
	 * When the channel was archived, if relevant
	 */
	archivedAt?: string;
}

/**
 * https://www.guilded.gg/docs/api/channels/ServerChannel
 */
export enum ChannelType {
	/**
	 * An announcement channel
	 */
	Announcements = 'announcements',
	/**
	 * A chat channel
	 */
	Chat = 'chat',
	/**
	 * A calendar channel
	 */
	Calendar = 'calendar',
	/**
	 * A forum channel
	 */
	Forums = 'forums',
	/**
	 * A media channel
	 */
	Media = 'media',
	/**
	 * A doc channel
	 */
	Docs = 'docs',
	/**
	 * A voice channel
	 */
	Voice = 'voice',
	/**
	 * A list channel
	 */
	List = 'list',
	/**
	 * A schedule channel
	 */
	Scheduling = 'scheduling',
	/**
	 * A stream channel
	 */
	Stream = 'stream',
}

/**
 * Not documented. The base model for reactions.
 */
export interface APIReaction {
	/**
	 * The ID of the channel
	 */
	channelId: string;
	/**
	 * The ID of the user that added the reaction
	 */
	createdBy: string;
	/**
	 * The emote of the reaction
	 */
	emote: APIEmote;
}
