import chalk from 'chalk';

/** Represents a logger for the client. */
export class Logger {
	/**
	 * Log ready message.
	 * @example Logger.ready('Ready!');
	 */
	static ready(text: string) {
		console.log(`${chalk.green('ready')} - ${text}`);
	}

	/**
	 * Log wait message.
	 * @example Logger.wait('Loading...');
	 */
	static wait(text: string) {
		console.log(`${chalk.blue('wait')}  - ${text}`);
	}

	/**
	 * Log event message.
	 * @example Logger.event('Done!');
	 */
	static event(text: string) {
		console.log(`${chalk.yellow('event')} - ${text}`);
	}

	/**
	 * Log error message.
	 * @example Logger.error('Error!');
	 */
	static error(text: string) {
		console.log(`${chalk.red('error')} - ${text}`);
	}
}
