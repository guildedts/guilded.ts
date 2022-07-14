<div align="center">
    <a href="https://guildedts.js.org">
        <img src="https://guildedts.js.org/media/banner.png" alt="Guilded.TS"/>
    </a>
    <div>
        <A href="https://guilded.gg/guildedts">
            <img src="https://shields.yoki-labs.xyz/shields/vanity/guildedts?style=for-the-badge" alt="Guilded server">
        </a>
        <a href="https://npmjs.com/guilded.ts">
            <img src="https://img.shields.io/npm/v/guilded.ts?style=for-the-badge" alt="Version" />
        </a>
        <a href="https://npmjs.com/guilded.ts">
            <img src="https://img.shields.io/npm/dt/guilded.ts?style=for-the-badge" alt="Downloads" />
        </a>
        <a href="https://github.com/guildedts/guilded.ts/blob/main/LICENSE">
            <img src="https://img.shields.io/github/license/guildedts/guilded.ts?style=for-the-badge" alt="License" />
        </a>
    </div>
</div>

# About

Guilded.TS is feature rich NPM package for interacting with the Guilded API.

# Links

-   [GitHub](https://github.com/guildedts/guilded.ts/tree/main/packages/guilded.ts)
-   [NPM](https://npmjs.com/guilded.ts)
-   [Documentation](https://guildedts.js.org/modules/guilded_ts)
-   [Guide](https://guide.guildedts.js.org)

# Packages

-   `guilded.ts` ([GitHub](https://github.com/guildedts/guilded.ts/tree/main/packages/guilded.ts) | [NPM](https://npmjs.com/guilded.ts)) - The main package for interacting with the [Guilded](https://www.guilded.gg) API.
-   `guilded-api-typings` ([GitHub](https://github.com/guildedts/guilded.ts/tree/main/packages/guilded-api-typings) | [NPM](https://npmjs.com/guilded-api-typings)) - Type definitions for the [Guilded](https://www.guilded.gg) API.
-   `@guildedts/framework` ([GitHub](https://github.com/guildedts/guilded.ts/tree/main/packages/framework) | [NPM](https://npmjs.com/@guildedts/framework)) - A framework for creating a [Guilded](https://www.guilded.gg) bot.
-   `@guildedts/builders` ([GitHub](https://github.com/guildedts/guilded.ts/tree/main/packages/builders) | [NPM](https://npmjs.com/@guildedts/builders)) - A set of builders for creating a [Guilded](https://www.guilded.gg) bot.
-   `@guildedts/rest` ([GitHub](https://github.com/guildedts/guilded.ts/tree/main/packages/rest) | [NPM](https://npmjs.com/@guildedts/rest)) - The REST API manager for Guilded.TS.
-   `@guildedts/ws` ([GitHub](https://github.com/guildedts/guilded.ts/tree/main/packages/ws) | [NPM](https://npmjs.com/@guildedts/ws)) - The Websocket API manager for Guilded.TS.

# Installation

-   `npm i guilded.ts`
-   `yarn add guilded.ts`
-   `pnpm add guilded.ts`

# Example usage

```js
import Client from 'guilded.ts';
// Or
const { Client } = require('guilded.ts');

const client = new Client();

client.once('ready', () => console.log(`Logged in as ${client.user!.name}`));
client.on('disconnect', () => console.log('Disconnected from Guilded'));
client.on('messageCreate', (message) => {
	if (message.content === 'ping') message.reply('Pong!');
});

client.login('BOT_TOKEN');
```

---

**Maintained by [Gamertike](https://gamertike.com) | [Contribute](https://github.com/guildedts/guilded.ts/tree/main/.github/CONTRIBUTING.md) | Inspired by [discord.js](https://discord.js.org)**
