import { ChatChannel } from '..';

/** Represents a stream channel on Guilded. */
export class StreamChannel extends ChatChannel {
	/** The type of this channel. */
	public declare readonly type: 'stream';
}
