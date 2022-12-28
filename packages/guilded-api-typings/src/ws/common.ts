/**
 * Not documented. The headers used while connecting to the Guilded WebSocket
 */
export interface WebSocketHeaders {
	/**
	 * The authorization for the WebSocket connection
	 */
	Authorization: string;
	/**
	 * The ID of the last message used for replaying events after a disconnect
	 */
	'guilded-last-message-id'?: string;
}

/**
 * Not documented. The WebSocket operation codes
 */
export enum WebSocketOpCode {
	/**
	 * Event frame
	 */
	Event,
	/**
	 * Ready frame
	 */
	Ready,
	/**
	 * Resume frame
	 */
	Resume,
	/**
	 * Error frame
	 */
	Error = 8,
	/**
	 * Ping frame
	 */
	Ping,
	/**
	 * Pong frame
	 */
	Pong,
}
