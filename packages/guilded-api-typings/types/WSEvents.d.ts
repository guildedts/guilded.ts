import { APIChatMessage, APIDeletedChatMessage } from ".";
/**
 * Guilded API websocket events.
 * @see https://www.guilded.gg/docs/api/websockets
 */
export interface WSEvents {
    /** @see https://www.guilded.gg/docs/api/websockets/ChatMessageCreated */
    ChatMessageCreated: {
        serverId: string;
        message: APIChatMessage;
    };
    /** @see https://www.guilded.gg/docs/api/websockets/ChatMessageUpdated */
    ChatMessageUpdated: {
        serverId: string;
        message: APIChatMessage;
    };
    /** @see https://www.guilded.gg/docs/api/websockets/ChatMessageDeleted */
    ChatMessageDeleted: {
        serverId: string;
        message: APIDeletedChatMessage;
    };
}
//# sourceMappingURL=WSEvents.d.ts.map