import { RESTManager } from "../RESTManager";

/** The base router for a data model on the Guilded REST API. */
export class BaseRouter {
    /** @param rest The REST API manager that owns this router. */
    public constructor(public readonly rest: RESTManager) { }
}
