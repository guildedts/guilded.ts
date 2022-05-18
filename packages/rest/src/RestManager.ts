import { GuildedAPIError } from '.';
import fetch from 'node-fetch';

/**
 * The REST manager for the Guilded API.
 * Inspired by Guilded.JS' {@link https://github.com/guildedjs/guilded.js/blob/main/packages/rest/lib/RestManager.ts#L9 REST manager}.
 */
export class RESTManager {
	/** The authoization token for the REST API. */
	public token?: string;
	/** The API version for the manager. */
	public readonly version: number;

	/** @param options The options for the REST manager. */
	public constructor(public readonly options: RESTOptions) {
		this.token = options.token;
		this.version = options.version;
	}

	/** The base URL for the REST API. */
	public get baseURL(): `https://www.guilded.gg/api/v${number}/` {
		return `https://www.guilded.gg/api/v${this.version}/`;
	}

	/**
	 * Set the authorization token for the REST API.
	 * @param token The authorization token.
	 * @returns The REST manager.
	 */
	public setToken(token?: string) {
		this.token = token;
		return this;
	}

	/**
	 * Make a request to the REST API.
	 * @param path The path to the resource.
	 * @param method The HTTP method.
	 * @param options The options for the request.
	 * @returns The response from the REST API.
	 */
	public async fetch<R = any, B = any, P extends Record<string, any> = Record<string, any>>(
		path: string,
		method: string,
		options: FetchOptions<B, P> = {},
		retries = 0,
	): Promise<R> {
		const searchParams = new URLSearchParams();
		if (options.params)
			for (const [key, value] of Object.entries(options.params))
				searchParams.append(key, value.toString());
		const response = await fetch(this.baseURL + path + searchParams, {
			method,
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${this.token}`,
			},
			body: options.body ? JSON.stringify(options.body) : undefined,
		});
		const data = await response.json().catch();
		if (!response.ok) {
			if (response.status === 429 && retries <= (this.options?.maxRetries ?? 3)) {
				const retryAfter = response.headers.get('Retry-After');
				const retryDelay = retryAfter ? parseInt(retryAfter) : undefined;
				await new Promise((resolve) =>
					setTimeout(resolve, retryDelay ?? this.options?.retryInterval ?? 3000),
				);
				return this.fetch<R, B, P>(path, method, options, retries++);
			}
			throw new GuildedAPIError(
				data.code,
				data.message,
				response.status,
				method,
				path,
				options.body,
			);
		}
		return data;
	}

	/**
	 * Make a GET request to the REST API.
	 * @param path The path to the resource.
	 * @param params The query parameters for the request.
	 * @returns The response from the REST API.
	 */
	public async get<R = any, P extends Record<string, any> = Record<string, any>>(
		path: string,
		params?: P,
	) {
		return this.fetch<R, any, P>(path, 'GET', { params });
	}

	/**
	 * Make a POST request to the REST API.
	 * @param path The path to the resource.
	 * @param body The body for the request.
	 * @returns The response from the REST API.
	 */
	public async post<R = any, B = any>(path: string, body?: B) {
		return this.fetch<R, B>(path, 'POST', { body });
	}

	/**
	 * Make a PATCH request to the REST API.
	 * @param path The path to the resource.
	 * @param body The body for the request.
	 * @returns The response from the REST API.
	 */
	public async patch<R = any, B = any>(path: string, body?: B) {
		return this.fetch<R, B>(path, 'PATCH', { body });
	}

	/**
	 * Make a PUT request to the REST API.
	 * @param path The path to the resource.
	 * @param body The body for the request.
	 * @returns The response from the REST API.
	 */
	public async put<R = any, B = any>(path: string, body?: B) {
		return this.fetch<R, B>(path, 'PUT', { body });
	}

	/**
	 * Make a DELETE request to the REST API.
	 * @param path The path for the resource.
	 * @returns The response from the REST API.
	 */
	public async delete<R>(path: string) {
		return this.fetch<R>(path, 'DELETE');
	}
}

/** The options for the REST manager. */
export interface RESTOptions {
	/** The authoization token for the REST API. */
	token?: string;
	/** The API version for the manager. */
	version: number;
	/** The interval to wait between retries. */
	retryInterval?: number;
	/** The maximum number of retry attempts. */
	maxRetries?: number;
}

/** The options for making a request to the REST API. */
export interface FetchOptions<B = any, P extends Record<string, any> = Record<string, any>> {
	/** The query parameters for the request. */
	params?: P;
	/** The body for the request. */
	body?: B;
}
