import { Message } from 'guilded.ts';
import { Command } from '@guildedts/framework';

export default class extends Command {
	description = 'Ping the bot.';

	execute(message: Message) {
		const seconds = (Date.now() - message.createdAt.getTime()) / 1000;
		message.reply({ content: `Pong! It took me ${seconds} seconds to respond.` });
	}
}
