import Client, { Embed } from 'guilded.ts';
import { token } from './config.json';

const client = new Client();

client.once('ready', async () => {
	console.log(`Logged in as ${client.user!.name}.`);
});
client.on('disconnect', () => console.log('Disconnected.'));

client.on('messageCreate', async (message) => {
	if (message.content !== '!ping') return;
	const embed = new Embed()
		.setTitle('Pong!')
		.setColor('GREEN')
		.addField('Websocket ping', `${client.ws.ping}ms`)
		.addField('Response time', `${Date.now() - message.createdTimestamp}ms`)
		.setFooter(client.user!.name);
	await message.reply({ embeds: [embed] });
});

client.login(token);
