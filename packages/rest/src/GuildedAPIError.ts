/** Represents an error that occurred while interacting with the Guilded API. */
export class GuildedAPIError extends Error {
	/**
	 * @param code The error code.
	 * @param message The error message.
	 * @param status The status code.
	 * @param method The method used.
	 * @param path The path used.
	 * @param body The body used.
	 */
	constructor(
		public readonly code: string,
		public readonly message: string,
		public readonly status: number,
		public readonly method: string,
		public readonly path: string,
		public readonly body?: any,
	) {
		super(message);
		this.name = `GuildedAPIError [${code}:${status}]`;
	}
}
