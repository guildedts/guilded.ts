import { GuildedAPIError } from '.';
import fetch, { Response } from 'node-fetch';
import { Router } from './routers/Router';
import { RESTError, RESTMethod, RESTStatusCode } from 'guilded-api-typings';
import EventEmitter from 'events';

const { version } = require('../package.json');

/**
 * The manager for the Guilded REST API
 */
export class RESTManager extends EventEmitter {
	/**
	 * The authorization token to use in requests
	 */
	token?: string;
	/**
	 * The version of the REST API to use
	 */
	readonly version?: number;
	/**
	 * The base URL to use in requests
	 */
	readonly proxyUrl?: string;
	/**
	 * The router for the REST API
	 */
	readonly router: Router;

	/**
	 * @param options The options for the REST manager
	 */
	constructor(public readonly options: RESTOptions) {
		super();
		this.token = options.token;
		this.proxyUrl = options.proxyUrl;
		if (!this.proxyUrl) this.version = options.version;
		this.router = new Router(this);
	}

	/**
	 * The base URL to use in requests
	 */
	get baseURL() {
		return this.proxyUrl ? this.proxyUrl : `https://www.guilded.gg/api/v${this.version}/`;
	}

	/**
	 * Set the authorization token to use in requests
	 * @param token The authorization token to use in requests
	 * @returns The REST manager
	 */
	setToken(token?: string) {
		this.token = token;
		return this;
	}

	/**
	 * Make a request to the REST API
	 * @param path The path to the resource
	 * @param method The HTTP method to use
	 * @param options The options for the request
	 * @param retries The number of retries
	 * @returns The response body from the REST API
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
				searchParams.append(
					key,
					value instanceof Date ? value.toISOString() : String(value),
				);
		const response = await fetch(
			`${this.baseURL}${path}${searchParams ? `?${searchParams}` : ''}`,
			{
				method,
				headers: {
					'Content-Type': 'application/json',
					...(this.token ? { Authorization: `Bearer ${this.token}` } : {}),
					'User-Agent': `@guildedts/rest@${version} Node.JS@${process.versions.node}`,
				},
				body: options.body ? JSON.stringify(options.body) : undefined,
			},
		);
		const data = (await response.json().catch(() => undefined)) as RESTError | R;
		if (response.ok) {
			this.emit('raw', data, response);
			return data as R;
		}
		if (
			response.status === RESTStatusCode.TooManyRequests &&
			retries <= (this.options?.maxRetries ?? 3)
		) {
			const retryAfter =
				(Number(response.headers.get('Retry-After')) || this.options.retryInterval) ??
				30_000 / 1000;
			await new Promise((resolve) => setTimeout(resolve, retryAfter * 1000));
			return this.fetch<R, B, P>(path, method, options, retries++);
		}
		const error = data as RESTError;
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
	 * Make a `GET` request to the REST API
	 * @param path The path to the resource
	 * @param options The options for the request
	 * @returns The response body from the REST API
	 */
	get<R = any, P extends Record<string, any> = Record<string, any>>(path: string, params?: P) {
		return this.fetch<R, any, P>(path, RESTMethod.Get, { params });
	}

	/**
	 * Make a `POST` request to the REST API
	 * @param path The path to the resource
	 * @param body The body of the request
	 * @returns The response body from the REST API
	 */
	post<R = any, B = any>(path: string, body?: B) {
		return this.fetch<R, B>(path, RESTMethod.Post, { body });
	}

	/**
	 * Make a `PATCH` request to the REST API
	 * @param path The path to the resource
	 * @param body The body of the request
	 * @returns The response body from the REST API
	 */
	patch<R = any, B = any>(path: string, body?: B) {
		return this.fetch<R, B>(path, RESTMethod.Patch, { body });
	}

	/**
	 * Make a `PUT` request to the REST API
	 * @param path The path to the resource
	 * @param body The body of the request
	 * @returns The response body from the REST API
	 */
	put<R = any, B = any>(path: string, body?: B) {
		return this.fetch<R, B>(path, RESTMethod.Put, { body });
	}

	/**
	 * Make a `DELETE` request to the REST API
	 * @param path The path for the resource
	 * @returns The response body from the REST API
	 */
	delete<R>(path: string) {
		return this.fetch<R>(path, RESTMethod.Delete);
	}
}

export interface RESTManager {
	on<Event extends keyof RESTManagerEvents>(
		event: Event,
		listener: (...args: RESTManagerEvents[Event]) => any,
	): this;
	once<Event extends keyof RESTManagerEvents>(
		event: Event,
		listener: (...args: RESTManagerEvents[Event]) => any,
	): this;
	off<Event extends keyof RESTManagerEvents>(
		event: Event,
		listener: (...args: RESTManagerEvents[Event]) => any,
	): this;
	emit<Event extends keyof RESTManagerEvents>(
		event: Event,
		...args: RESTManagerEvents[Event]
	): boolean;
}

/**
 * The REST manager events
 */
export interface RESTManagerEvents {
	/**
	 * Emitted whenever data is received
	 */
	raw: [data: unknown, response: Response];
}

/**
 * The options for the REST manager
 */
export interface RESTOptions {
	/**
	 * The authorization token to use in requests
	 */
	token?: string;
	/**
	 * The version of the REST API to use
	 *
	 * @default 1
	 */
	version?: number;
	/**
	 * The base URL to use in requests
	 */
	proxyUrl?: string;
	/**
	 * The interval to wait between request retries
	 *
	 * @default 30_000
	 */
	retryInterval?: number;
	/**
	 * The maximum amount of retry attempts
	 *
	 * @default 3
	 */
	maxRetries?: number;
}

/**
 * The options for making a request to the REST API
 */
export interface FetchOptions<B = any, P extends Record<string, any> = Record<string, any>> {
	/**
	 * The query parameters for the request
	 *
	 * @default {}
	 */
	params?: P;
	/**
	 * The body of the request
	 */
	body?: B;
}
