import { ClientEvents } from 'guilded.ts';
import { Client } from './Client';

/**
 * Represents an event
 * @example
 * class Ready extends Event<'ready'> {
 *     name = 'ready' as const;
 *
 *     execute(client: Client) {
 *         console.log(`Logged in as ${client.user?.name}!`);
 *     }
 * }
 */
export abstract class Event<Event extends keyof ClientEvents = keyof ClientEvents> {
	/**
	 * The name of the event
	 */
	name!: Event;
	/**
	 * Whether the event should only run once
	 */
	once = false;

	/**
	 * @param client The client
	 */
	constructor(public readonly client: Client) {}

	/**
	 * The execute method of the event
	 * @param args The arguments of the event
	 */
	abstract execute(...args: ClientEvents[Event]): unknown;
}

/**
 * The constructor for an event
 */
export type EventConstructor = new (client: Client) => Event;
