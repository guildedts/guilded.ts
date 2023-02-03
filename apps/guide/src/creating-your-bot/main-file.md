# Creating the main file

::: tip
This page assumes that you've already created a [configuration file](./README.md). We're going to be using the `config.json` approach, however feel free to use another approach.
:::

Inside the project root, create a new file. We recommend calling this file `index.ts`, but the choice is entirely up to you.

::: tip
If you're not using TypeScript use the `.js` extension instead of `.ts`.
:::

Here is the minimum code you need to log into Guilded with your bot:

```ts{1-2,4,6,8}
import Client from 'guilded.ts';
import { token } from './config.json';

const client = new Client({ token });

client.once('ready', () => console.log(`Logged in as ${client.user?.name}!`));

client.login();
```

You can now test your bot. If you see "Logged in as your-bot-name!" after a few seconds, you're good to go!
