import { GuildedAPIError } from '.';
import fetch, { Response } from 'node-fetch';
import { Router } from './routers/Router';
import { APIError } from 'guilded-api-typings';
import EventEmitter from 'events';

const { version } = require('../package.json');

/**
 * The REST manager for the Guilded API.
 * @example new RESTManager({ version: 1, token: 'token' });
 */
export class RESTManager extends EventEmitter {
	/** The auth token for the REST API. */
	token?: string;
	/** The version of the REST API. */
	readonly version: number;
	/** The router for the REST API. */
	readonly router = new Router(this);

	/** @param options The options for the REST manager. */
	constructor(public readonly options: RESTOptions) {
		super();
		this.token = options.token;
		this.version = options.version;
	}

	/** The base URL for the REST API. */
	get baseURL(): `https://www.guilded.gg/api/v${number}/` {
		return `https://www.guilded.gg/api/v${this.version}/`;
	}

	/**
	 * Set the auth token for the REST API.
	 * @param token The auth token.
	 * @returns The REST manager.
	 * @example rest.setToken('token');
	 */
	setToken(token?: string) {
		this.token = token;
		return this;
	}

	/**
	 * Make a request to the REST API.
	 * @param path The path to the resource.
	 * @param method The HTTP method.
	 * @param options The options for the request.
	 * @param retries The number of retries.
	 * @returns The response from the REST API.
	 * @example rest.request('/channels/abc', 'GET');
	 */
	async fetch<R = any, B = any, P extends Record<string, any> = Record<string, any>>(
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
				'User-Agent': `@guildedts/rest@${version} Node.JS@${process.versions.node}`,
			},
			body: options.body ? JSON.stringify(options.body) : undefined,
		});
		const data = (await response.json().catch(() => undefined)) as APIError | R;
		if (response.ok) {
			this.emit('raw', data, response);
			return data as R;
		}
		if (response.status === 429 && retries <= (this.options?.maxRetries ?? 3)) {
			const retryAfter =
				Number(response.headers.get('Retry-After')) ??
				this.options.retryInterval ??
				30000 / 1000;
			await new Promise((resolve) => setTimeout(resolve, retryAfter * 1000));
			return this.fetch<R, B, P>(path, method, options, retries++);
		}
		const error = data as APIError;
		throw new GuildedAPIError(
			error.code,
			error.message,
			response.status,
			method,
			path,
			options.body,
			error.meta,
		);
	}

	/**
	 * Make a GET request to the REST API.
	 * @param path The path to the resource.
	 * @param params The query parameters for the request.
	 * @returns The response from the REST API.
	 * @example rest.get('/channels/abc');
	 */
	get<R = any, P extends Record<string, any> = Record<string, any>>(path: string, params?: P) {
		return this.fetch<R, any, P>(path, 'GET', { params });
	}

	/**
	 * Make a POST request to the REST API.
	 * @param path The path to the resource.
	 * @param body The body for the request.
	 * @returns The response from the REST API.
	 * @example rest.post('/channels', { name: 'Chat', type: 'chat' });
	 */
	post<R = any, B = any>(path: string, body?: B) {
		return this.fetch<R, B>(path, 'POST', { body });
	}

	/**
	 * Make a PATCH request to the REST API.
	 * @param path The path to the resource.
	 * @param body The body for the request.
	 * @returns The response from the REST API.
	 * @example rest.patch('/channels/abc', { name: 'Chat' });
	 */
	patch<R = any, B = any>(path: string, body?: B) {
		return this.fetch<R, B>(path, 'PATCH', { body });
	}

	/**
	 * Make a PUT request to the REST API.
	 * @param path The path to the resource.
	 * @param body The body for the request.
	 * @returns The response from the REST API.
	 * @example rest.put('/channels/abc/messages/abc', { content: 'Hello world!' });
	 */
	put<R = any, B = any>(path: string, body?: B) {
		return this.fetch<R, B>(path, 'PUT', { body });
	}

	/**
	 * Make a DELETE request to the REST API.
	 * @param path The path for the resource.
	 * @returns The response from the REST API.
	 * @example rest.delete('/channels/abc');
	 */
	delete<R>(path: string) {
		return this.fetch<R>(path, 'DELETE');
	}
}

export interface RESTManager {
	/** @ignore */
	on<Event extends keyof RESTManagerEvents>(
		event: Event,
		listener: (...args: RESTManagerEvents[Event]) => any,
	): this;
	/** @ignore */
	once<Event extends keyof RESTManagerEvents>(
		event: Event,
		listener: (...args: RESTManagerEvents[Event]) => any,
	): this;
	/** @ignore */
	off<Event extends keyof RESTManagerEvents>(
		event: Event,
		listener: (...args: RESTManagerEvents[Event]) => any,
	): this;
	/** @ignore */
	emit<Event extends keyof RESTManagerEvents>(
		event: Event,
		...args: RESTManagerEvents[Event]
	): boolean;
}

/** The REST manager events. */
export interface RESTManagerEvents {
	/** Emitted when data is received. */
	raw: [data: any, response: Response];
}

/** The options for the REST manager. */
export interface RESTOptions {
	/** The auth token for the REST API. */
	token?: string;
	/** The version of the REST API. */
	version: number;
	/** The interval to wait between retries. */
	retryInterval?: number;
	/** The maximum number of retry attempts. */
	maxRetries?: number;
}

/** The options for making a request to the REST API. */
export interface FetchOptions<B = any, P extends Record<string, any> = Record<string, any>> {
	/** The query parameters of the request. */
	params?: P;
	/** The body of the request. */
	body?: B;
}
