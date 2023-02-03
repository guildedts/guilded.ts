# Frequently asked Questions

## How do I ban a server member?

```ts{1}
member.ban();
```

## How do I unban a server member?

```ts{1}
server.bans.remove(user.id);
```

## How do I kick a server member?

```ts{1}
member.kick();
```

## How do I add a role to a server member?

```ts{1}
member.roles.assign(role.id);
```

## How do I check if a server member has a specific role?

```ts{1-4}
const roles = member.roles.fetch();
if (roles.some(role => role.id === 12345)) {
	// ...
}
```

## How do I mention a user in a message?

::: warning
Guilded currently does not support user mentions inside message content.
:::

```ts{1-3}
channel.messages.create({
	embeds: [new Embed().setDescription(`<@${user.id}>`)],
});
```

## How do i control whether a message is private and/or silent?

```ts{1-5}
channel.messages.create({
	embeds: [new Embed().setDescription(`<@${user.id}>`)],
	isPrivate: true,
	isSilent: true,
});
```

## How do I prompt a user for additional input?

```ts{1,3-8,10-11}
await message.reply('Please enter some input.');

const messages = await message.channel.awaitMessages({
	filter: (m) => message.createdBy === m.createdBy,
	time: 1000 * 60,
	max: 1,
});
const m = messages.first();

if (!m) return message.reply({ content: 'You did not enter any input!' });
m.reply({ content: `You've entered: ${m.content}` });
```

## How do I block a user from using my bot?

```ts{1,3}
const blockedUsers = ['id1', 'id2'];

if (blockedUsers.includes(message.createdBy)) return;
```

## How do I react to a message?

```ts{1}
message.reactions.add(12345);
```

## What is the difference between a user and a server member?

A user represents a global Guilded user, and a server member represents a Guilded user on a server. That means only server members can have roles and nicknames, for example, because all of these things are server-bound information that could be different on each server that the user is in.

## How do I check the bot's ping?

```ts{1,3-4}
message.reply({ content: `Websocket ping: ${client.ws.ping}ms.` });
// Or
const sentMessage = await message.reply({ content: 'Pinging...' });
sentMessage.editReply(`Roundtrip latency: ${sentMessage.createdAt.getTime() - message.createdAt.getTime()}ms`);
```
