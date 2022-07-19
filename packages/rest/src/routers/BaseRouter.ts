import { RESTManager } from '../RESTManager';

/**
 * The base router for a data model on the Guilded REST API.
 * @example new BaseRouter(rest);
 */
export class BaseRouter {
	/** @param rest The REST API manager the router belongs to. */
	constructor(public readonly rest: RESTManager) {}
}
