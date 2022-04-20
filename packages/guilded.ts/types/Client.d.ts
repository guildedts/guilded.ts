/// <reference types="node" />
import EventEmitter from 'events';
import { RestManager } from '@guildedts/rest';
import { WebsocketManager } from '@guildedts/ws';
import { ChannelManager, Message, ServerManager, User } from '.';
/**
 * The main hub for interacting with the Guilded API.
 */
export declare class Client extends EventEmitter {
    token: string | null;
    /**
     * The REST manager for the client.
     */
    readonly rest: RestManager;
    /**
     * The websocket manager for the client.
     */
    readonly ws: WebsocketManager;
    /**
     * A manager of channels that belong to the client.
     */
    readonly channels: ChannelManager;
    /**
     * A manager of servers that belong to the client.
     */
    readonly servers: ServerManager;
    /**
     * Whether the client is ready to use.
     */
    ready: boolean;
    /**
     * When the client was ready to use.
     */
    readyAt: Date | null;
    /**
     * The client user.
     */
    user: User | null;
    /**
     * @param token The client token.
     */
    constructor(token?: string | null);
    /**
     * Log in to the Guilded API.
     * @param token The client token.
     */
    login(token: string): void;
    /**
     * Log out of Guilded.
     */
    logout(): void;
}
export interface Client {
    on<Event extends keyof ClientEvents>(event: Event, listener: (...args: ClientEvents[Event]) => any): this;
    once<Event extends keyof ClientEvents>(event: Event, listener: (...args: ClientEvents[Event]) => any): this;
    off<Event extends keyof ClientEvents>(event: Event, listener: (...args: ClientEvents[Event]) => any): this;
    emit<Event extends keyof ClientEvents>(event: Event, ...args: ClientEvents[Event]): boolean;
}
/**
 * The client events.
 */
export interface ClientEvents {
    ready: [client: Client];
    disconnect: [client: Client];
    messageCreate: [message: Message];
    messageUpdate: [message: Message];
    messageDelete: [message: Message];
}
//# sourceMappingURL=Client.d.ts.map