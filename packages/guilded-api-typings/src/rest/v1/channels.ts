import { APIChannel } from '../../v1';

/**
 * https://www.guilded.gg/docs/api/channels/ChannelCreate
 */
export type RESTPostChannelJSONBody = Pick<
	APIChannel,
	'name' | 'topic' | 'isPublic' | 'type' | 'categoryId'
> &
	Partial<Pick<APIChannel, 'serverId' | 'groupId'>>;
/**
 * https://www.guilded.gg/docs/api/channels/ChannelCreate
 */
export type RESTPostChannelResult = RESTGetChannelResult;

/**
 * https://www.guilded.gg/docs/api/channels/ChannelRead
 */
export interface RESTGetChannelResult {
	/**
	 * The channel
	 */
	channel: APIChannel;
}

/**
 * https://www.guilded.gg/docs/api/channels/ChannelUpdate
 */
export type RESTPatchChannelJSONBody = Partial<
	Pick<RESTPostChannelJSONBody, 'name' | 'topic' | 'isPublic'>
>;
/**
 * https://www.guilded.gg/docs/api/channels/ChannelUpdate
 */
export type RESTPatchChannelResult = RESTGetChannelResult;

/**
 * https://www.guilded.gg/docs/api/channels/ChannelDelete
 */
export type RESTDeleteChannelResult = never;
