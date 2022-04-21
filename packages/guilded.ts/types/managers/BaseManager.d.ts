import { Client } from '..';
/** Manager for managing API methods of a data model. */
export declare class BaseManager<K = string, V = any> {
	readonly client: Client;
	/** The manager's cache. */
	readonly cache: Map<K, V>;
	/** @param client The client that instantiated this manager. */
	constructor(client: Client);
}
//# sourceMappingURL=BaseManager.d.ts.map
