import { Embed, inlineCode, Message, userMention } from 'guilded.ts';
import { Event } from '../structures/Event';

/** The handler for commands. */
export default class CommandHandler extends Event<'messageCreate'> {
	name: 'messageCreate' = 'messageCreate';

	/**
	 * The handler for the messageCreate event.
	 * @param message The message that was created.
	 * @example commandHandler.execute(message);
	 */
	async execute(message: Message) {
		if (
			message.createdBy === this.client.user?.id ||
			!message.content?.startsWith(this.client.config.prefix)
		)
			return;
		const [commandName, ...args] = this.parseContent(message.content);
		const command = this.getCommand(commandName);
		if (!command) return;
		let mappedArgs: Record<string, unknown>;
		let err: string | undefined;
		try {
			mappedArgs = await command.validate(message, args);
		} catch (error: any) {
			err = error.message;
		}
		if (err) return this.sendError(message, err);
		try {
			await command.execute(message, mappedArgs!);
		} catch (error: any) {
			console.error(error);
			err = `An error occurred while executing the command: ${inlineCode(error.message)}`;
		}
		if (err) return this.sendError(message, err);
		command.setCooldown(message.createdBy);
	}

	/**
	 * Get the command with the given name.
	 * @param name The name of the command.
	 * @returns The command.
	 * @example commandHandler.getCommand('ping');
	 */
	getCommand(name: string) {
		return this.client.commands.find(
			(command) => command.name === name || command.aliases.includes(name),
		);
	}

	/**
	 * Parse the content of the message.
	 * @param content The content of the message.
	 * @returns The command name and arguments.
	 * @example commandHandler.parseContent('!echo hello'); // ['echo', 'hello']
	 */
	parseContent(content: string) {
		return content.slice(this.client.config.prefix.length).split(/\s+/);
	}

	/**
	 * Send a error message to the user.
	 * @param message The message that triggered the command.
	 * @param error The error message.
	 * @example commandHandler.sendError(message, 'Invalid arguments');
	 */
	sendError(message: Message, error: string) {
		message.delete();
		message.channel.send({
			embeds: [
				new Embed()
					.setColor('RED')
					.setTitle(userMention(message.createdBy))
					.setDescription(error)
					.setFooter(message.content),
			],
			isPrivate: true,
		});
	}
}
