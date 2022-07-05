import Collection from '@discordjs/collection';
import { glob, IOptions } from 'glob';
import BaseClient, { ClientOptions as BaseClientOptions } from 'guilded.ts';
import { Command } from './Command';
import { Event } from './Event';
import CommandHandler from '../handlers/commands';
import joi from 'joi';
import { watch } from 'fs';
import { Logger } from './Logger';

/** The main hub for interacting with the Guilded API. */
export class Client extends BaseClient {
	/** The commands that belong to the client. */
	public readonly commands = new Collection<string, Command>();
	/** The config for the client. */
	public config!: ClientConfig;

	/** The glob pattern for configs. */
	private readonly configGlob = `**/gtsconfig.{js,ts,json}`;
	/** The glob pattern for command directories. */
	private readonly commandDirGlob = `**/commands`;
	/** The glob pattern for event directories. */
	private readonly eventDirGlob = `**/events`;
	/** The glob pattern for command files. */
	private readonly commandGlob = `${this.commandDirGlob}/**/*.{js,ts}`;
	/** The glob pattern for event files. */
	private readonly eventGlob = `${this.eventDirGlob}/**/*.{js,ts}`;
	/** The options for glob. */
	private readonly globOptions: IOptions = { ignore: ['node_modules/**', '**/*.d.ts'] };

	/** @param options The options for the client. */
	constructor(public readonly options: ClientOptions = {}) {
		super(options);
		this.init();
	}

	/** Initialize the client. */
	public async init() {
		await this.loadConfig();
		this.loadCommands();
		this.loadEvents();
		if (this.options.dev) this.devMode();
		this.login(this.config.token);
		this.on('ready', () => Logger.ready(`Logged in as ${this.user?.name}`));
		process.on('uncaughtException', console.log);
	}

	/** Handle dev mode. */
	private devMode() {
		let timeout: NodeJS.Timeout | undefined;
		const commandDirs = glob.sync(this.commandDirGlob, this.globOptions);
		const eventDirs = glob.sync(this.eventDirGlob, this.globOptions);
		for (const dirs of [commandDirs, eventDirs])
			for (const dir of dirs)
				watch(dir, { recursive: true }, () => {
					if (!timeout)
						dir.endsWith('commands') ? this.loadCommands() : this.loadEvents();
					timeout = setTimeout(() => (timeout = undefined), 1000);
				});
	}

	/** Load config. */
	private async loadConfig() {
		const startedTimestamp = Date.now();
		Logger.wait('Loading config...');
		const path = glob.sync(this.configGlob, this.globOptions)[0];
		if (!path) {
			Logger.error('No gtsconfig found');
			process.exit(1);
		}
		const file = this.import(path);
		try {
			this.config = await ClientConfigSchema.validateAsync(file.default ?? file);
		} catch (error: any) {
			Logger.error(`Invalid gtsconfig: ${error.message}`);
			process.exit(1);
		}
		Logger.event(`Loaded config from ${path} in ${Date.now() - startedTimestamp}ms`);
	}

	/** Load commands. */
	private loadCommands() {
		const startedTimestamp = Date.now();
		Logger.wait('Loading commands...');
		this.commands.clear();
		const paths = glob.sync(this.commandGlob, this.globOptions);
		for (const path of paths) {
			const command = this.createStructure<Command>(path);
			if (!command) continue;
			command.name = command.name ?? path.split('/').pop()!.split('.')[0];
			this.commands.set(command.name, command);
		}
		Logger.event(`Loaded ${paths.length} command files in ${Date.now() - startedTimestamp}ms`);
	}

	/** Load events. */
	private loadEvents() {
		const startedTimestamp = Date.now();
		Logger.wait('Loading events...');
		this.removeAllListeners();
		const paths = glob.sync(this.eventGlob, this.globOptions);
		for (const path of paths) {
			const event = this.createStructure<Event>(path);
			if (!event) continue;
			event.name = event.name ?? path.split('/').pop()!.split('.')[0];
			this[event.once ? 'once' : 'on'](event.name, event.execute.bind(event));
		}
		const commandHandler = new CommandHandler(this);
		this.on(commandHandler.name, commandHandler.execute.bind(commandHandler));
		Logger.event(`Loaded ${paths.length} event files in ${Date.now() - startedTimestamp}ms`);
	}

	/**
	 * Import a module.
	 * @param path The path to the module.
	 * @returns The module.
	 */
	private import(path: string) {
		path = `${process.cwd()}/${path}`;
		delete require.cache[require.resolve(path)];
		return require(path);
	}

	/**
	 * Create a structure from a file.
	 * @param path The path to the file.
	 * @returns The structure.
	 */
	private createStructure<Structure>(path: string): Structure | undefined {
		const file = this.import(path);
		return typeof file.default === 'function'
			? new file.default(this)
			: typeof file === 'function'
			? new file()
			: undefined;
	}
}

/** The options for the client. */
export interface ClientOptions extends BaseClientOptions {
	/** Whether to run the client in dev mode. */
	dev?: boolean;
}

/** The config for the client. */
export interface ClientConfig {
	/** The token for the client. */
	token: string;
	/** The default cooldown for commands. */
	commandCooldown: number;
	/** The default prefix for commands. */
	prefix: string;
}

/** The schema for the client config. */
export const ClientConfigSchema = joi
	.object<ClientConfig>({
		token: joi.string().required().description('The token for the client.'),
		commandCooldown: joi.number().default(0).description('The default cooldown for commands.'),
		prefix: joi.string().default('!').description('The default prefix for commands.'),
	})
	.required();
