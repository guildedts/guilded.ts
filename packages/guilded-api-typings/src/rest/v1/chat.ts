import { APIMessage } from '../../v1';

/**
 * https://www.guilded.gg/docs/api/chat/ChannelMessageCreate
 */
export type RESTPostMessageJSONBody = Pick<
	APIMessage,
	'isPrivate' | 'isSilent' | 'replyMessageIds' | 'content' | 'embeds'
>;
/**
 * https://www.guilded.gg/docs/api/chat/ChannelMessageCreate
 */
export type RESTPostMessageResult = RESTGetMessageResult;

/**
 * https://www.guilded.gg/docs/api/chat/ChannelMessageReadMany
 */
export interface RESTGetMessagesQuery {
	/**
	 * The date that will be used to filter out results for the current page
	 */
	before?: Date;
	/**
	 * The date that will be used to filter out results for the current page
	 */
	after?: Date;
	/**
	 * The max size of the page (range: `1`-`100`)
	 *
	 * @default 50
	 */
	limit?: number;
	/**
	 * Whether to include private messages between all users in response
	 *
	 * @default false
	 */
	includePrivate?: boolean;
}
/**
 * https://www.guilded.gg/docs/api/chat/ChannelMessageReadMany
 */
export interface RESTGetMessagesResult {
	/**
	 * The messages
	 */
	messages: APIMessage[];
}

/**
 * https://www.guilded.gg/docs/api/chat/ChannelMessageRead
 */
export interface RESTGetMessageResult {
	/**
	 * The message
	 */
	message: APIMessage;
}

/**
 * https://www.guilded.gg/docs/api/chat/ChannelMessageUpdate
 */
export type RESTPutMessageJSONBody = Pick<RESTPostMessageJSONBody, 'content' | 'embeds'>;
/**
 * https://www.guilded.gg/docs/api/chat/ChannelMessageUpdate
 */
export type RESTPutMessageResult = RESTGetMessageResult;

/**
 * https://www.guilded.gg/docs/api/chat/ChannelMessageDelete
 */
export type RESTDeleteMessageResult = never;

/**
 * https://www.guilded.gg/docs/api/reactions/ContentReactionCreate
 */
export type RESTPutMessageReactionResult = never;

/**
 * https://www.guilded.gg/docs/api/reactions/ContentReactionDelete
 */
export type RESTDeleteMessageReactionResult = never;
