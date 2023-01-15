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
		const server = await message.channel.fetchServer();
		const member = await server.members.fetch(message.creatorId!);
		await member.setXp(amount);
		message.reply({ content: `Set your XP to ${amount}.` });
	}
}
