import { ChatChannel } from './ChatChannel';

/** Represents a voice channel on Guilded. */
export class VoiceChannel extends ChatChannel {
	/** The type of channel. */
	public declare readonly type: 'voice';
}
