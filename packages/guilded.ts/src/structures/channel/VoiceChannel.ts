import { ChatChannel } from '..';

/** Represents a voice channel on Guilded. */
export class VoiceChannel extends ChatChannel {
	/** The type of this channel. */
	public declare readonly type: 'voice';
}
