import Client from 'guilded.ts';
import { token } from './config.json';

const client = new Client();

client.once('ready', async () => console.log(`Logged in as ${client.user!.name}.`));
client.on('disconnect', () => console.log('Disconnected.'));

client.on('messageCreate', console.log);
client.on('messageEdit', console.log);
client.on('messageDelete', console.log);
client.on('memberAdd', console.log);
client.on('memberRemove', console.log);
client.on('memberBan', console.log);
client.on('memberUnban', console.log);
client.on('memberEdit', console.log);
client.on('serverRolesEdit', console.log);
client.on('channelCreate', console.log);
client.on('channelEdit', console.log);
client.on('channelDelete', console.log);
client.on('webhookCreate', console.log);
client.on('webhookEdit', console.log);
client.on('webhookCreate', console.log);
client.on('webhookEdit', console.log);
client.on('docCreate', console.log);
client.on('docEdit', console.log);
client.on('docDelete', console.log);
client.on('listItemCreate', console.log);
client.on('listItemEdit', console.log);
client.on('listItemDelete', console.log);
client.on('listItemComplete', console.log);
client.on('listItemUncomplete', console.log);

client.login(token);
