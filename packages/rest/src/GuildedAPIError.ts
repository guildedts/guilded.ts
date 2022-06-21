/** Represents an error that occurred while interacting with the Guilded API. */
export class GuildedAPIError extends Error {
	/**
	 * @param code The code of the error.
	 * @param message The message of the error.
	 * @param status The status code of the error.
	 * @param method The method used to make the request.
	 * @param path The path used to make the request.
	 * @param body The body used to make the request.
	 * @param meta The meta data of the error.
	 */
	constructor(
		public readonly code: string,
		public readonly message: string,
		public readonly status: number,
		public readonly method: string,
		public readonly path: string,
		public readonly body?: any,
		public readonly meta?: any,
	) {
		super(message);
		this.name = `GuildedAPIError [${code}:${status}]`;
	}
}
