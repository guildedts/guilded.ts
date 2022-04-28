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
-   [Guilded API Guilded server](https://www.guilded.gg/API-Official)
-   [Documentation](https://guildedts.js.org)

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
import Client from 'guilded.ts';
// CommonJS
const { Client } = require('guilded.ts');

// Create a new client
const client = new Client();

// This event is emitted when your bot is connected to Guilded's Gateway API.
client.once('ready', () => console.log(`[READY] Logged in as ${client.user.name}.`));

// This event is emitted when a message is sent on Guilded.
client.on('messageCreate', (message) => {
	if (message.author?.isBot) return;

	if (message.content === '!ping') message.channel.send('Pong!');
});

// Log into guilded
client.login('YOUR_BOT_TOKEN');
```

# Contributing

Contributing helps us maintain Guilded.TS. All contributions are greatly appreciated.

<<<<<<< HEAD
We utilize [Yarn](https://yarnpkg.com) and [Turbo](https://turborepo.org) to manage our Monorepo. If you want to contribute we highly recommend knowing the basics of these two.
=======
We utilize [Yarn](https://yarnpkg.com) and [Turbo](https://turborepo.org) to manage our Monorepo. If you want to contribute, we highly recommend knowing the basics of these two.
>>>>>>> dfcc0e3b44107b5f2ac626e21d9eb7265de8d1c1

## Getting started

To get started, run the following scripts:

```
# Install all dependencies
yarn install
# Build all local packages
yarn build
```

## Committing your changes

After you have made your desired changes, make sure you run the following script before committing your changes:

```
# Prepare your code
# Runs prettier along with eslint
yarn prepare
```

---

**Maintained by [Gamertike](https://www.gamertike.com). | Inspired by [discord.js](https://discord.js.org).**
