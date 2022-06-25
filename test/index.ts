import Client from 'guilded.ts';
import { token } from './config.json';

const client = new Client();

client.once('ready', () => console.log(`Logged in as ${client.user!.name}`));
client.on('reconnect', () => console.log('Reconnected to Guilded'));
client.on('disconnect', () => console.log('Disconnected from Guilded'));
client.on('messageCreate', async (message) => {
	if (message.content === 'ping') await message.reply('Pong!');
	if (message.content === 'collect reaction') {
		const response = await message.reply('Collecting reaction...');
		const collector = response.createReactionCollector({
			filter: (reaction) => reaction.createdBy === message.createdBy,
			max: 2,
		});
		collector.on('collect', () => message.reply('Collected reaction!'));
	}
});

client.login(token);
