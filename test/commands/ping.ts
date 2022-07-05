import { Message } from 'guilded.ts';
import { Command } from '@guildedts/framework';

export default class extends Command {
	public readonly description = 'Ping the bot.';

	public execute(message: Message) {
		const seconds = (Date.now() - message.createdTimestamp) / 1000;
		return message.reply(`Pong! It took me ${seconds} seconds to respond.`);
	}
}
