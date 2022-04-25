import Client from 'guilded.ts';
import { token } from './config.json';

const client = new Client();

client.once('ready', () => {
	console.log(`Ready > Logged in as ${client.user!.name}.`);
});

client.on('messageCreate', (message) => {
    if (message.content !== 'ping') return;
    
	message.channel.send('pong');
});

client.login(token);
