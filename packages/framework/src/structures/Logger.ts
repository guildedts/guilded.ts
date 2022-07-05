import chalk from 'chalk';

/** Represents a logger for the client. */
export class Logger {
	/** Log ready message. */
	public static ready(text: string) {
		console.log(`${chalk.green('ready')} - ${text}`);
	}

	/** Log wait message. */
	public static wait(text: string) {
		console.log(`${chalk.blue('wait')}  - ${text}`);
	}

	/** Log event message. */
	public static event(text: string) {
		console.log(`${chalk.yellow('event')} - ${text}`);
	}

	/** Log error message. */
	public static error(text: string) {
		console.log(`${chalk.red('error')} - ${text}`);
	}
}
