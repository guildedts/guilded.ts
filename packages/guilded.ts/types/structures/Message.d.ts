import { APIChatMessage, APIChatMessageType } from 'guilded-api-typings';
import { Base, Channel, User } from '..';
/** Represents a message on Guilded. */
export declare class Message extends Base {
    readonly author: User;
    readonly channel: Channel;
    /** The ID of the message. */
    readonly id: string;
    /** The ID of the channel that the message belongs to. */
    readonly channelId: string;
    /** The ID of the server that the message belongs to. */
    readonly serverId?: string;
    /** The content of the message. */
    readonly content: string;
    /** The timestamp of when the message was sent. */
    readonly createdAt: Date;
    /** The id of the user who created the message. */
    readonly createdBy: string;
    /** If the message was sent by a webhook, this will be the ID of the webhook. */
    readonly webhookId?: string;
    /** Whether the message is private. */
    readonly private?: boolean;
    /** An array of IDs of messages that were replied to. */
    readonly replies?: string[];
    /** When the message was last edited. */
    readonly editedAt?: Date;
    /** The type of the message. */
    readonly type: APIChatMessageType;
    /**
     * @param data The data of the message.
     * @param author The author of the message.
     * @param channel The channel that the message belongs to.
     */
    constructor(data: APIChatMessage, author: User, channel: Channel);
    /**
     * Fetch the message.
     * @returns The message.
     */
    fetch(): Promise<Message>;
    /**
     * Delete the message.
     * @returns The message.
     */
    delete(): Promise<this>;
    /**
     * Edit the message.
     * @param content The new content of the message.
     * @returns The message.
     */
    edit(content: string): Promise<Message>;
}
//# sourceMappingURL=Message.d.ts.map