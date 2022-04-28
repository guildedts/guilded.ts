import Client, { Embed } from 'guilded.ts';
import { token } from './config.json';

const client = new Client();

client.once('ready', () => {
	console.log(`Ready > Logged in as ${client.user!.name}.`);
});

client.on('messageCreate', (message) => {
	if (message.content?.toLowerCase() !== 'ping') return;

	const embed = new Embed().setTitle('Pong!').setDescription('Message embed!').setColor('GREEN');

	message.reply({ embeds: [embed], isSilent: true });
});

client.login(token);
