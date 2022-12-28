import { APIMentions } from '../../v1';

/**
 * https://www.guilded.gg/docs/api/docs/Doc
 */
export interface APIDoc {
	/**
	 * The ID of the doc (min value: `1`)
	 */
	id: number;
	/**
	 * The ID of the server
	 */
	serverId: string;
	/**
	 * The ID of the channel
	 */
	channelId: string;
	/**
	 * The title of the doc (min characters: `1`)
	 */
	title: string;
	/**
	 * The content of the doc
	 */
	content: string;
	/**
	 * The mentions of the doc
	 */
	mentions?: APIMentions;
	/**
	 * When the doc was created
	 */
	createdAt: string;
	/**
	 * The ID of the user that created the doc
	 */
	createdBy: string;
	/**
	 * When the doc was updated, if relevant
	 */
	updatedAt?: string;
	/**
	 * The ID of the user that updated the doc
	 */
	updatedBy?: string;
}
