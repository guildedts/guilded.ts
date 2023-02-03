import Client from 'guilded.ts';
import { token } from './config.json';

const client = new Client({ token });

const prefix = '!';

client.once('ready', () => console.log(`Logged in as ${client.user?.name}!`));

client.on('messageCreate', async (message) => {
	if (!message.content?.startsWith(prefix)) return;
	const [commandName, ...args] = message.content.slice(prefix.length).split(/\s+/);
	switch (commandName) {
		case 'ping':
			message.reply({ content: 'Pong!' });
			break;
		case 'echo':
			message.reply({ content: args.join(' ') });
			break;
	}
});

client.login();
