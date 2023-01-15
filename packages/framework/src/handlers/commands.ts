import { Color, EmbedBuilder, inlineCode, Message, userMention, UserType } from 'guilded.ts';
import { Event } from '../structures/Event';

/**
 * The handler for commands
 */
export default class CommandHandler extends Event<'messageCreate'> {
	name = 'messageCreate' as const;

	/**
	 * The handler for the messageCreate event
	 * @param message The message that was created
	 */
	async execute(message: Message) {
		const creator = await message.fetchCreator();
		const prefix = this.getPrefix(message.channel.serverId);
		if (
			message.isCreator ||
			creator?.type === UserType.Bot ||
			!message.content?.startsWith(prefix)
		)
			return;
		const [commandName, ...args] = this.parseContent(prefix, message.content);
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
		command.setCooldown(message.creatorId!);
	}

	/**
	 * Get the command with the given name
	 * @param name The name of the command
	 * @returns The command
	 */
	getCommand(name: string) {
		return this.client.commands.find(
			(command) => command.name === name || command.aliases.includes(name),
		);
	}

	/**
	 * Get the prefix of the message
	 * @param serverId The ID of the server
	 * @returns The prefix
	 */
	getPrefix(serverId?: string) {
		return serverId
			? this.client.prefixes.get(serverId) || this.client.config.prefix
			: this.client.config.prefix;
	}

	/**
	 * Parse the content of the message
	 * @param prefix The prefix
	 * @param content The content of the message
	 * @returns The command name and arguments
	 */
	parseContent(prefix: string, content: string) {
		return content.slice(prefix.length).split(/\s+/);
	}

	/**
	 * Send a error message to the user
	 * @param message The message
	 * @param error The error message
	 */
	sendError(message: Message, error: string) {
		message.delete();
		message.channel.messages.create({
			embeds: [
				new EmbedBuilder()
					.setColor(Color.Red)
					.setTitle(userMention(message.creatorId!))
					.setDescription(error)
					.setFooter({ text: message.content! }),
			],
			isPrivate: true,
		});
	}
}
