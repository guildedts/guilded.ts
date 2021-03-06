import { ClientEvents } from 'guilded.ts';
import { Client } from './Client';

/**
 * The builder for a event.
 * @example
 * class Ready extends Event {
 *     name = 'ready';
 *
 *     execute() {
 *         console.log('Ready!');
 *     }
 * }
 */
export abstract class Event<Event extends keyof ClientEvents = keyof ClientEvents> {
	/** The name of the event. */
	name!: keyof ClientEvents;
	/** Whether the event should run once. */
	once?: boolean;

	/** @param client The client the event belongs to. */
	constructor(public readonly client: Client) {}

	/**
	 * The execute method of the event.
	 * @param args The arguments of the event.
	 * @example
	 * execute() {
	 *     console.log('Ready!');
	 * }
	 */
	abstract execute(...args: ClientEvents[keyof ClientEvents]): unknown;
}

/** The constructor for a event. */
export type EventConstructor = new (client: Client) => Event;
