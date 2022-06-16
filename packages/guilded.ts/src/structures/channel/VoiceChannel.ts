import { APIChannelType } from 'guilded-api-typings';
import { ChatChannel } from './ChatChannel';

/** Represents a voice channel on Guilded. */
export class VoiceChannel extends ChatChannel {
	public declare readonly type: APIChannelType.Voice;
}
