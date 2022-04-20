/**
 * The API chat message object.
 * @see https://www.guilded.gg/docs/api/chat/ChatMessage
 */
export interface APIChatMessage {
    id: string;
    type: APIChatMessageType;
    serverId?: string;
    channelId: string;
    content: string;
    replyMessageIds?: string[];
    isPrivate?: boolean;
    createdAt: string;
    createdBy: string;
    createdByWebhookId?: string;
    updatedAt?: string;
}
/**
 * The API deleted chat message object.
 * @see https://www.guilded.gg/docs/api/websockets/ChatMessageDeleted
 */
export interface APIDeletedChatMessage {
    id: string;
    serverId: string;
    channelId: string;
    deletedAt: string;
    isPrivate: boolean;
}
/**
 * The API chat message types.
 * @see https://www.guilded.gg/docs/api/chat/ChatMessage
 */
export declare type APIChatMessageType = 'default' | 'system';
/**
 * The payload for creating a chat message.
 * @see https://www.guilded.gg/docs/api/chat/ChannelMessageCreate
 */
export interface APIChatMessagePayload {
    isPrivate?: boolean;
    replyMessageIds?: string[];
    content: string;
}
/**
 * The query parameters for getting chat messages.
 * @see https://www.guilded.gg/docs/api/chat/ChannelMessageReadMany
 */
export interface APIGetChatMessagesQuery {
    before?: string;
    after?: string;
    limit?: number;
    includePrivate?: boolean;
}
/**
 * The API message reaction object.
 * @see https://www.guilded.gg/docs/api/reactions/ContentReaction
 */
export interface APIMessageReaction {
    id: string;
    serverId?: string;
    createdAt: string;
    createdBy: string;
    createdByWebhookId?: string;
}
//# sourceMappingURL=ChatMessage.d.ts.map