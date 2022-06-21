/** Represents a error that occurred while interacting with the Guilded REST API. */
export interface APIError {
    /** The code of the error. */
    code: string;
    /** The message of the error. */
    message: string;
    /** The meta data of the error. */
    meta?: any;
}
