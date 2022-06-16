import { APIChannelType } from 'guilded-api-typings';
import { ChatChannel } from './ChatChannel';

/** Represents a stream channel on Guilded. */
export class StreamChannel extends ChatChannel {
	public declare readonly type: APIChannelType.Stream;
}
