import { Message } from 'guilded.ts';
import { Command, StringArgument } from '@guildedts/framework';

export default class extends Command {
	public readonly description = 'Echo a message.';
	public readonly arguments = [
		class extends StringArgument {
			public readonly name = 'content';
			public readonly description = 'The content to echo.';
		},
	];

	public execute(message: Message, { content }: { content: string }) {
		return message.reply(content);
	}
}
