/**
 * https://www.guilded.gg/docs/api/http_methods
 */
export enum RESTMethod {
	/**
	 * Fetch a representation of the specified resource.
	 *
	 * Requests using `GET` should only retrieve data.
	 */
	Get = 'GET',
	/**
	 * Get a response identical to a `GET request, but without the response body.
	 */
	Head = 'HEAD',
	/**
	 * Submit an entity to the specified resource, often causing a change in state or side effects on the server.
	 */
	Post = 'POST',
	/**
	 * Replace all current representations of the target resource with the request payload.
	 */
	Put = 'PUT',
	/**
	 * Apply partial modifications to a resource.
	 *
	 * Guilded API routes that utilize this method should allow for optional passing of all request body properties.
	 */
	Patch = 'PATCH',
	/**
	 * Remove the specified resource.
	 */
	Delete = 'DELETE',
}

/**
 * Not documented. The headers for a REST API request.
 */
export interface RESTHeaders {
	/**
	 * The content type for the request
	 */
	'Content-Type': string;
	/**
	 * The authorization for the request
	 */
	Authorization?: string;
	/**
	 * The user agent of the request
	 */
	'User-Agent'?: string;
}

/**
 * https://www.guilded.gg/docs/api/http_api_errors
 */
export interface RESTError {
	/**
	 * The code of the error
	 */
	code: string;
	/**
	 * The message of the error
	 */
	message: string;
	/**
	 * The meta data of the error
	 */
	meta?: any;
}

/**
 * https://www.guilded.gg/docs/api/http_status_codes
 */
export enum RESTStatusCode {
	/**
	 * The request succeeded
	 */
	Ok = 200,
	/**
	 * The request succeeded, and a new resource was created as a result
	 */
	Created,
	/**
	 * There is no content to send for this request, but the headers may be useful
	 */
	NoContent = 204,
	/**
	 * The server cannot or will not process the request due to something that is perceived to be a client error
	 */
	BadRequest = 400,
	/**
	 * The client must authenticate itself to get the requested response
	 */
	Unauthorized,
	/**
	 * The client does not have access rights to the content
	 */
	Forbidden = 403,
	/**
	 * The server cannot find the requested resource
	 */
	NotFound,
	/**
	 * This response is sent when a request conflicts with the current state of the server
	 */
	Conflict = 409,
	/**
	 * The user has sent too many requests in a given amount of time (is rate limited)
	 */
	TooManyRequests = 429,
	/**
	 * The server has encountered a situation it does not know how to handle
	 */
	InternalServerError = 500,
	/**
	 * While working as a gateway to get a response needed to handle the request, got an invalid response
	 */
	BadGateway = 502,
	/**
	 * The server is not ready to handle the request
	 */
	ServiceUnavailable,
	/**
	 * This error response is given when the server is acting as a gateway and cannot get a response in time
	 */
	GatewayTimeout,
}
