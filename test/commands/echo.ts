import { Message } from 'guilded.ts';
import { Command, StringArgument } from '@guildedts/framework';

export default class extends Command {
	description = 'Echo a message.';
	arguments = [
		class extends StringArgument {
			name = 'content';
			description = 'The content to echo.';
		},
	];

	execute(message: Message, { content }: { content: string }) {
		message.reply({ content });
	}
}
