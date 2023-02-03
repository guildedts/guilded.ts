# Event handling

Guilded.TS takes advantage of Node.js' [event emitter](https://nodejs.org/api/events.html#class-eventemitter), making it possible to handle events whenever they occur. Your [main file](./main-file.md) already does some event handling with the `ready` event which is emitted **only once** whenever the client is ready to use.

::: tip
`client.once` should only be used on events such as `ready` as it should only run once. Consider using `client.on` on events such as `messageCreate` as you want to handle them more than once.
:::

Another common event used is `messageCreate` which is emitted whenever a message is created inside a chat channel. We can use this event to create a simple command system.

```ts{1,3-14}
const prefix = '!';

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
```
