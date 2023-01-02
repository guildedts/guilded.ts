import { RESTManager } from '../RESTManager';

/**
 * The base router for a data model on the Guilded REST API
 */
export class BaseRouter {
	/**
	 * @param rest The REST manager
	 */
	constructor(public readonly rest: RESTManager) {}
}
