import { Collection } from '@discordjs/collection';
import glob, { Options } from 'fast-glob';
import BaseClient, { ClientOptions as BaseClientOptions } from 'guilded.ts';
import { Command } from './Command';
import { Event } from './Event';
import CommandHandler from '../handlers/commands';
import joi from 'joi';
import { watch } from 'fs';
import { Logger } from './Logger';
import { parse as parseYaml } from 'yaml';
import { readFile } from 'fs/promises';
import { basename, extname } from 'path';

/**
 * The main hub for interacting with the Guilded API
 * @example
 * // Start the client
 * new Client();
 * // Start the client in development mode
 * new Client({ dev: true });
 */
export class Client extends BaseClient {
	/**
	 * The commands
	 */
	readonly commands = new Collection<string, Command>();
	/**
	 * The prefixes per server
	 */
	readonly prefixes = new Collection<string, string>();
	/**
	 * The client configuration
	 */
	config!: ClientConfig;

	/**
	 * @param options The options for the client
	 */
	constructor(public readonly options: ClientOptions = {}) {
		super(options);
		this.init();
	}

	/**
	 * Initialize the client
	 */
	async init() {
		await this.loadConfig();
		await this.loadCommands();
		await this.loadEvents();
		if (this.options.dev) this.devMode();
		await this.login(this.config.token);
		Logger.ready(`Logged in as ${this.user?.name}`);
		process.on('uncaughtException', console.log);
	}

	/**
	 * Handle development mode
	 */
	private async devMode() {
		let timeout: NodeJS.Timeout | undefined;
		const commandDirs = await glob('**/commands', { ...GlobOptions, onlyDirectories: true });
		const eventDirs = await glob('**/events', { ...GlobOptions, onlyDirectories: true });
		for (const dirs of [commandDirs, eventDirs])
			for (const dir of dirs)
				watch(dir, { recursive: true }, () => {
					if (!timeout)
						dir.endsWith('commands') ? this.loadCommands() : this.loadEvents();
					timeout = setTimeout(() => (timeout = undefined), 1000);
				});
	}

	/**
	 * Load config
	 */
	private async loadConfig() {
		const startedTimestamp = Date.now();
		Logger.wait('Loading config...');
		const path = (await glob('**/gtsconfig.{js,ts,json,yml,yaml}', GlobOptions))[0];
		if (!path) {
			Logger.error('No gtsconfig found');
			process.exit(1);
		}
		const file = await this.import(path);
		try {
			this.config = await ClientConfigSchema.validateAsync(file.default ?? file);
		} catch (error: any) {
			Logger.error(`Invalid gtsconfig: ${error.message}`);
			process.exit(1);
		}
		Logger.event(`Loaded config from ${path} in ${Date.now() - startedTimestamp}ms`);
	}

	/**
	 * Load commands
	 */
	private async loadCommands() {
		const startedTimestamp = Date.now();
		Logger.wait('Loading commands...');
		this.commands.clear();
		const paths = await glob('**/commands/**/*.{js,ts}', GlobOptions);
		let loadedCommands = 0;
		for (const path of paths) {
			const command = await this.createStructure<Command>(path);
			if (!command) continue;
			loadedCommands++;
			command.name = command.name ?? basename(path, extname(path));
			this.commands.set(command.name, command);
		}
		Logger.event(`Loaded ${loadedCommands} commands in ${Date.now() - startedTimestamp}ms`);
	}

	/**
	 * Load events
	 */
	private async loadEvents() {
		const startedTimestamp = Date.now();
		Logger.wait('Loading events...');
		this.removeAllListeners();
		const paths = await glob('**/commands/**/*.{js,ts}', GlobOptions);
		let loadedEvents = 0;
		for (const path of paths) {
			const event = await this.createStructure<Event>(path);
			if (!event) continue;
			loadedEvents++;
			event.name = event.name ?? basename(path, extname(path));
			this[event.once ? 'once' : 'on'](event.name, event.execute.bind(event));
		}
		const commandHandler = new CommandHandler(this);
		this.on(commandHandler.name, commandHandler.execute.bind(commandHandler));
		Logger.event(`Loaded ${loadedEvents} events in ${Date.now() - startedTimestamp}ms`);
	}

	/**
	 * Import a module
	 * @param path The path to the module
	 * @returns The module
	 */
	private async import(path: string) {
		path = `${process.cwd()}/${path}`;
		if (['.yml', '.yaml'].some((ext) => path.endsWith(ext))) {
			const raw = await readFile(path, 'utf8');
			return parseYaml(raw);
		}
		delete require.cache[require.resolve(path)];
		return require(path);
	}

	/**
	 * Create a structure from a file
	 * @param path The path to the file
	 * @returns The structure
	 */
	private async createStructure<Structure>(path: string): Promise<Structure | undefined> {
		const file = await this.import(path);
		return typeof file.default === 'function'
			? new file.default(this)
			: typeof file === 'function'
			? new file()
			: undefined;
	}
}

const GlobOptions: Options = {
	ignore: ['**/node_modules', '**/*.d.ts'],
};

/**
 * The options for the client
 */
export interface ClientOptions extends BaseClientOptions {
	/**
	 * Whether to run the client in development mode
	 */
	dev?: boolean;
}

/**
 * The config for the client
 */
export interface ClientConfig {
	/**
	 * The authorization token to use
	 */
	token: string;
	/**
	 * The default cooldown for commands
	 */
	commandCooldown?: number;
	/**
	 * The default prefix for commands
	 */
	prefix: string;
}

/**
 * The schema for the client config
 */
export const ClientConfigSchema = joi
	.object<ClientConfig>({
		token: joi.string().required().description('The token for the client.'),
		commandCooldown: joi.number().default(0).description('The default cooldown for commands.'),
		prefix: joi.string().required().description('The default prefix for commands.'),
	})
	.required()
	.unknown(true);
