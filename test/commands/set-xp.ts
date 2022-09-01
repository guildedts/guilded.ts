import { Message } from 'guilded.ts';
import { Command, NumberArgument } from '@guildedts/framework';

export default class extends Command {
	description = 'Set your own XP.';
	arguments = [
		class extends NumberArgument {
			name = 'amount';
			description = 'The total amount of XP to set.';
			min = -1000000000;
			max = 1000000000;
		},
	];

	async execute(message: Message, { amount }: { amount: number }) {
		const member = await message.fetchAuthor();
		await member.setXp(amount);
		message.reply(`Set your XP to ${amount}.`);
	}
}
