/**
 * Sleep the thread for the given number of milliseconds.
 * @param ms The number of milliseconds to sleep.
 */
export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
