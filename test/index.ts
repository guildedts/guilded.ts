import Client from 'guilded.ts';
import { token } from './config.json';

const client = new Client();

client.once('ready', () => console.log(`Logged in as ${client.user!.name}.`));
client.on('disconnect', () => console.log('Disconnected.'));

client.on('messageCreate', async (message) => {
	if (message.content !== '!echo') return;
	await message.reply({ content: 'What should I echo?', isPrivate: true });
	const collector = message.channel.createMessageCollector({
		filter: (msg) => msg.authorId === message.authorId,
		max: 1,
		time: 30000,
	});
	collector.on('collect', (msg) => message.channel.send(msg.content!));
});

client.login(token);
