/** Represents an error that occurred while interacting with the Guilded API. */
export declare class GuildedAPIError extends Error {
	readonly code: string;
	readonly message: string;
	readonly status: number;
	readonly method: string;
	readonly path: string;
	readonly body?: any;
	/**
	 * @param code The error code.
	 * @param message The error message.
	 * @param status The status code.
	 * @param method The method used.
	 * @param path The path used.
	 * @param body The body used.
	 */
	constructor(
		code: string,
		message: string,
		status: number,
		method: string,
		path: string,
		body?: any,
	);
}
//# sourceMappingURL=GuildedAPIError.d.ts.map
