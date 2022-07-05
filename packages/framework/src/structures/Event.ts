import { ClientEvents } from 'guilded.ts';
import { Client } from './Client';

/** The builder for a event. */
export abstract class Event<Event extends keyof ClientEvents = keyof ClientEvents> {
	/** The name of the event. */
	public name!: Event;
	/** Whether the event should run once. */
	public once?: boolean;

	/** @param client The client the event belongs to. */
	constructor(public readonly client: Client) {}

	/**
	 * The execute method of the event.
	 * @param args The arguments of the event.
	 */
	public abstract execute(...args: ClientEvents[Event]): unknown;
}

/** The constructor for a event. */
export type EventConstructor = new (client: Client) => Event;
