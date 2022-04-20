import { BaseManager, Channel } from '..';
/** A manager of channels that belong to the client. */
export declare class ChannelManager extends BaseManager<string, Channel> {
    /**
     * Fetch a channel by its ID.
     * @param id The ID of the channel.
     * @returns The channel.
     */
    fetch(id: string): Channel;
}
//# sourceMappingURL=ChannelManager.d.ts.map