/** The REST manager for the Guilded API. */
export declare class RestManager {
	readonly version: number;
	/** The authoization token for the REST api. */
	token: string | null;
	/** The base url for the REST api. */
	get baseUrl(): string;
	/** @param version The API version for the REST api. */
	constructor(version: number);
	/**
	 * Make a request to the REST api.
	 * @param options The options for the request.
	 * @param authenticated Whether the request should be authenticated.
	 * @returns The response from the REST api.
	 * @throws {GuildedAPIError} if the request fails.
	 */
	make<R = any, B = any, P extends Record<string, string> = Record<string, string>>(
		options: MakeOptions<B, P>,
		authenticated?: boolean,
	): Promise<R>;
	/**
	 * Make a GET request to the REST api.
	 * @param path The path to the resource.
	 * @param params The query parameters.
	 * @param authenticated Whether the request should be authenticated.
	 * @returns The response from the REST api.
	 * @throws {GuildedAPIError} if the request fails.
	 */
	get<R = any, P extends Record<string, string> = Record<string, string>>(
		path: string,
		authenticated?: boolean,
		params?: P,
	): Promise<R>;
	/**
	 * Make a POST request to the REST api.
	 * @param path The path to the resource.
	 * @param body The body of the request.
	 * @param authenticated Whether the request should be authenticated.
	 * @returns The response from the REST api.
	 * @throws {GuildedAPIError} if the request fails.
	 */
	post<R = any, B = any>(path: string, body: B, authenticated?: boolean): Promise<R>;
	/**
	 * Make a PUT request to the REST api.
	 * @param path The path to the resource.
	 * @param body The body of the request.
	 * @param authenticated Whether the request should be authenticated.
	 * @returns The response from the REST api.
	 * @throws {GuildedAPIError} if the request fails.
	 */
	put<R = any, B = any>(path: string, body: B, authenticated?: boolean): Promise<R>;
	/**
	 * Make a DELETE request to the REST api.
	 * @param path The path to the resource.
	 * @param authenticated Whether the request should be authenticated.
	 * @returns The response from the REST api.
	 * @throws {GuildedAPIError} if the request fails.
	 */
	delete<R>(path: string, authenticated?: boolean): Promise<R>;
}
/**
 * The options for making a request to the REST api.
 */
export interface MakeOptions<B = any, P extends Record<string, string> = Record<string, string>> {
	method: string;
	path: string;
	params?: P;
	body?: B;
}
//# sourceMappingURL=RestManager.d.ts.map
