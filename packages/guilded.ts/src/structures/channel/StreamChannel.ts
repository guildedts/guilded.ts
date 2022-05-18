import { ChatChannel } from './ChatChannel';

/** Represents a stream channel on Guilded. */
export class StreamChannel extends ChatChannel {
	/** The type of channel. */
	public declare readonly type: 'stream';
}
