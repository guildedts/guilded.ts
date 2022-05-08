<div align="center">
    <br />
    <a href="https://guildedts.js.org"><img src="https://guildedts.js.org/media/banner.jpg" width="500" alt="Guilded.TS"/></a>
    <h3><strong>A powerful NPM module that allows you to easily interact with the <a href="https://www.guilded.gg">Guilded</a> API.</strong></h3>
    <br />
    <div>
        <a href="https://www.npmjs.com/package/guilded.ts"><img src="https://img.shields.io/npm/v/guilded.ts" alt="Version" /></a>
        <a href="https://www.npmjs.com/package/guilded.ts"><img src="https://img.shields.io/npm/dt/guilded.ts" alt="Downloads" /></a>
        <a href="https://www.npmjs.com/package/guilded.ts"><img src="https://img.shields.io/npm/l/guilded.ts" alt="License: Apache-2.0">
    </div>
</div>

# Links

-   [GitHub](https://github.com/guildedts/guilded.ts)
-   [NPM](https://www.npmjs.com/package/guilded.ts)
-   [Guilded.TS Guilded Server](https://www.guilded.gg/guildedts)
-   [Documentation](https://guildedts.js.org)
-   [Guide](https://guide.guildedts.js.org)
-   [Guilded API Guilded server](https://www.guilded.gg/API-Official)

# Packages

-   `guilded.ts` ( [NPM](https://www.npmjs.com/package/guilded.ts) ) - The main package for interacting with the official [Guilded](https://www.guilded.gg) API.
-   `guilded-api-typings` ( [NPM](https://www.npmjs.com/package/guilded-api-typings) ) - Type definitions for the [Guilded](https://www.guilded.gg) API.
-   `@guildedts/builders` ( [NPM](https://www.npmjs.com/package/@guildedts/builders) ) - A set of builders for creating a [Guilded](https://www.guilded.gg) bot.
-   `@guildedts/rest` ( [NPM](https://www.npmjs.com/package/@guildedts/rest) ) - The REST API manager for Guilded.TS.
-   `@guildedts/ws` ( [NPM](https://www.npmjs.com/package/@guildedts/ws) ) The Websocket API manager for Guilded.TS.

# Installation

```
npm i guilded.ts
yarn add guilded.ts
pnpm add guilded.ts
```

# Example bot

```js
// ESM
import Client, { Embed } from 'guilded.ts';
// CommonJS
const { Client, Embed } = require('guilded.ts');

// Create a new client
const client = new Client();

// This event is emitted when your bot is connected to Guilded's Gateway API.
client.once('ready', () => console.log(`[READY] Logged in as ${client.user.name}.`));

// This event is emitted when a message is sent on Guilded.
client.on('messageCreate', (message) => {
    if (message.content?.toLowerCase() !== 'ping') return;

	const embed = new Embed()
        .setTitle('Pong!')
        .setDescription('This is the ping command!')
        .setColor('GREEN');

	message.reply({ content: 'Pong!', embeds: [embed] });
});

// Log into guilded
client.login('YOUR_BOT_TOKEN');
```

# Contributing

[Contribute to Guilded.TS.](https://github.com/guildedts/guilded.ts/tree/main/.github/CONTRIBUTING.md)

---

**Maintained by [Gamertike](https://www.gamertike.com). | Inspired by [discord.js](https://discord.js.org).**
