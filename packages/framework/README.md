<div align="center">
    <a href="https://guildedts.js.org">
        <img src="https://guildedts.js.org/media/banner.png" alt="Guilded.TS"/>
    </a>
    <div>
        <A href="https://guilded.gg/guildedts">
            <img src="https://shields.yoki-labs.xyz/shields/vanity/guildedts?style=for-the-badge" alt="Guilded server">
        </a>
        <a href="https://npmjs.com/@guildedts/framework">
            <img src="https://img.shields.io/npm/v/@guildedts/framework?style=for-the-badge" alt="Version" />
        </a>
        <a href="https://npmjs.com/@guildedts/framework">
            <img src="https://img.shields.io/npm/dt/@guildedts/framework?style=for-the-badge" alt="Downloads" />
        </a>
        <a href="https://github.com/guildedts/guilded.ts/blob/main/LICENSE">
            <img src="https://img.shields.io/github/license/guildedts/guilded.ts?style=for-the-badge" alt="License" />
        </a>
    </div>
</div>

# About

@guildedts/framework is a powerful framework for creating a Guilded bot.

# Links

-   [GitHub](https://github.com/guildedts/guilded.ts/tree/main/packages/framework)
-   [NPM](https://npmjs.com/@guildedts/framework)
-   [Documentation](https://guildedts.js.org/modules/_guildedts_framework)
-   [Guide](https://guide.guildedts.js.org)

# Installation

-   `npm i @guildedts/framework guilded.ts`
-   `yarn add @guildedts/framework guilded.ts`
-   `pnpm add @guildedts/framework guilded.ts`

# Example usage

`commands/echo.js`:

```js
import { Command, StringArgument } from '@guildedts/framework';
// Or
const { Command, StringArgument } = require('@guildedts/framework');

class Echo extends Command {
	description = 'Echo a message.';
	arguments = [
		class extends StringArgument {
			name = 'content';
			description = 'The content to echo.';
		},
	];

	execute(message, { content }) {
		return message.reply(content);
	}
}

export default Echo;
// Or
module.exports = Echo;
```

Start the bot:

```sh
# Start the bot
gts start
# Start the bot in development mode
gts dev
```

---

**Maintained by [Gamertike](https://gamertike.com) | [Contribute](https://github.com/guildedts/guilded.ts/tree/main/.github/CONTRIBUTING.md)**
