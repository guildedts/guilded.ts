import Client from 'guilded.ts';
import { token } from './config.json';

const client = new Client();

client.once('ready', () => console.log(`Logged in as ${client.user!.name}`));
client.on('disconnect', () => console.log('Disconnected from Guilded'));
client.on('messageCreate', (message) => {
	if (message.content === 'ping') message.reply('Pong!');
});

client.login(token);
