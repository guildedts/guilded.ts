import { GuildedAPIError } from '.';
import fetch from 'node-fetch';

/** The REST manager for the Guilded API. */
export class RestManager {
	/** The authoization token for the REST api. */
	public token: string | null = null;
	/** The base url for the REST api. */
	public get baseUrl(): string {
		return `https://www.guilded.gg/api/v${this.version}/`;
	}

	/** @param version The API version for the REST api. */
	public constructor(public readonly version: number) {}

	/**
	 * Make a request to the REST api.
	 * @param options The options for the request.
	 * @param authenticated Whether the request should be authenticated.
	 * @returns The response from the REST api.
	 * @throws {GuildedAPIError} if the request fails.
	 */
	public async make<R = any, B = any, P extends Record<string, string> = Record<string, string>>(
		options: MakeOptions<B, P>,
		authenticated = true,
	): Promise<R> {
		const searchParams = new URLSearchParams();
		const headers: any = {
			'Content-Type': 'application/json',
		};

		if (options.params)
			Object.entries(options.params).forEach(([key, value]) =>
				searchParams.append(key, value),
			);
		if (authenticated && this.token) headers.Authorization = `Bearer ${this.token}`;

		const response = await fetch(this.baseUrl + options.path + searchParams, {
			method: options.method,
			headers,
			body: options.body ? JSON.stringify(options.body) : undefined,
		});

		const data = await response.json().catch(() => ({}));

		if (!response.ok) {
			throw new GuildedAPIError(
				data.code,
				data.message,
				response.status,
				options.method,
				options.path,
				options.body,
			);
		}

		return data;
	}

	/**
	 * Make a GET request to the REST api.
	 * @param path The path to the resource.
	 * @param params The query parameters.
	 * @param authenticated Whether the request should be authenticated.
	 * @returns The response from the REST api.
	 * @throws {GuildedAPIError} if the request fails.
	 */
	public async get<R = any, P extends Record<string, string> = Record<string, string>>(
		path: string,
		authenticated = true,
		params?: P,
	) {
		return this.make<R, any, P>({ method: 'GET', path, params }, authenticated);
	}

	/**
	 * Make a POST request to the REST api.
	 * @param path The path to the resource.
	 * @param body The body of the request.
	 * @param authenticated Whether the request should be authenticated.
	 * @returns The response from the REST api.
	 * @throws {GuildedAPIError} if the request fails.
	 */
	public async post<R = any, B = any>(path: string, body: B, authenticated = true) {
		return this.make<R, B>({ method: 'POST', path, body }, authenticated);
	}

	/**
	 * Make a PUT request to the REST api.
	 * @param path The path to the resource.
	 * @param body The body of the request.
	 * @param authenticated Whether the request should be authenticated.
	 * @returns The response from the REST api.
	 * @throws {GuildedAPIError} if the request fails.
	 */
	public async put<R = any, B = any>(path: string, body: B, authenticated = true) {
		return this.make<R, B>({ method: 'PUT', path, body }, authenticated);
	}

	/**
	 * Make a DELETE request to the REST api.
	 * @param path The path to the resource.
	 * @param authenticated Whether the request should be authenticated.
	 * @returns The response from the REST api.
	 * @throws {GuildedAPIError} if the request fails.
	 */
	public async delete<R>(path: string, authenticated = true) {
		return this.make<R>({ method: 'DELETE', path }, authenticated);
	}
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
