import { Collection } from '@discordjs/collection';
import { inlineCode, Message } from 'guilded.ts';
import { ArgumentConstructor } from './arguments/Argument';
import { Client } from './Client';

/**
 * Represents a command
 * @example
 * class Ping extends Command {
 *     name = 'ping';
 *
 *     execute(message: Message) {
 *         message.reply('Pong!');
 *     }
 * }
 */
export abstract class Command {
	/**
	 * The name of the command
	 */
	name!: string;
	/**
	 * The aliases of the command
	 */
	aliases: string[] = [];
	/**
	 * The description of the command
	 */
	description?: string;
	/**
	 * The arguments of the command
	 */
	arguments: ArgumentConstructor[] = [];
	/**
	 * The cooldown of the command
	 */
	cooldown!: number;

	/**
	 * The cooldowns of the command
	 */
	readonly cooldowns = new Collection<string, number>();

	/**
	 * @param client The client
	 */
	constructor(public readonly client: Client) {
		this.cooldown = this.cooldown ?? client.config.commandCooldown;
	}

	/**
	 * Get the usage of the command
	 * @param serverId The ID of the server
	 * @returns The usage of the command
	 */
	getUsage(serverId?: string) {
		const prefix = serverId
			? this.client.prefixes.get(serverId) || this.client.config.prefix
			: this.client.config.prefix;
		return `${prefix}${this.name} ${this.arguments
			.map((arg) => new arg(this).usage)
			.join(' ')}`;
	}

	/**
	 * The execute method of the command
	 * @param message The message that triggered the command
	 * @param args The arguments
	 */
	abstract execute(message: Message, args: Record<string, unknown>): unknown;

	/**
	 * Validate the command
	 * @param message The message that triggered the command
	 * @param args The arguments
	 * @returns The validated arguments
	 */
	async validate(message: Message, args: string[]): Promise<Record<string, unknown>> {
		const cooldown = this.cooldowns.get(message.createdBy);
		const now = Date.now();
		if (cooldown && now < cooldown)
			throw new Error(
				`You must wait ${(cooldown - now) / 1000} seconds before using the ${inlineCode(
					this.name,
				)} command again`,
			);
		else return this.validateArguments(args);
	}

	/**
	 * Validate the command arguments
	 * @param args The arguments to validate
	 * @returns The validated arguments
	 */
	async validateArguments(args: string[]) {
		const mappedArgs: Record<string, unknown> = {};
		for (const [index, argument] of this.arguments
			.map((Argument) => new Argument(this))
			.entries())
			mappedArgs[argument.name] = await argument.validate(
				!this.arguments[index + 1] ? args.splice(index).join(' ') : args[index],
			);
		return mappedArgs;
	}

	/**
	 * Set a cooldown for a user
	 * @param userId The ID of the user
	 */
	public setCooldown(userId: string) {
		if (this.cooldown > 0) this.cooldowns.set(userId, Date.now() + this.cooldown);
	}
}

/**
 * The constructor for a command
 */
export type CommandConstructor = new (client: Client) => Command;
