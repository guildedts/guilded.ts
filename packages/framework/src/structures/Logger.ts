import chalk from 'chalk';

/**
 * A custom logger
 */
export const Logger = {
	/**
	 * Log a ready message
	 * @param message The message
	 */
	ready(message: string) {
		console.log(`${chalk.green('ready')} - ${message}`);
	},

	/**
	 * Log a wait message
	 * @param message The message
	 */
	wait(message: string) {
		console.log(`${chalk.blue('wait')}  - ${message}`);
	},

	/**
	 * Log an event message
	 * @param message The message
	 */
	event(message: string) {
		console.log(`${chalk.yellow('event')} - ${message}`);
	},

	/**
	 * Log an error message
	 * @param message The message
	 */
	error(message: string) {
		console.log(`${chalk.red('error')} - ${message}`);
	},
};
