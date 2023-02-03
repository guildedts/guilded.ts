# Configuration files

Now that [you have your bot token](../#managing-a-bot), we can now create a config file to keep your token safe.

::: tip
This is recommended and is a good practice for sensitive information.
:::

## Using a `config.json` file

Using a `config.json` file is a common way of keeping sensitive information safe. Create a `config.json` file in your project root and paste in your token. You can access your token inside other files by importing the file.

:::: code-group
::: code-group-item config.json

```json{1-3}
{
    "token": "your-token"
}
```

:::
::: code-group-item Usage

```ts{1,3}
import { token } from './config.json';

console.log(token);
```

:::
::::

## Using environment variables

Environment variables are another common way of hiding sensitive information. To add environment variables, add them before running `node index.js`.

:::: code-group
::: code-group-item Command Line

```sh:no-line-numbers{1}
GUILDED_TOKEN=your-token node index.js
```

:::
::: code-group-item Usage

```js{1}
console.log(process.env.GUILDED_TOKEN);
```

:::
::::

::: tip
It is recommended to [use `.env`](#using-dotenv) instead.
:::

## Using dotenv

A better solution to using environment variables would be by using a `.env` file. This spares you from having to paste your token every time you run your bot. Each line in a `.env` file should be a `KEY=value` pair.

The [`dotenv` package](https://npmjs.org/dotenv) can be used to load your `.env` file. Once installed, import the package to load your `.env` file.

:::: code-group
::: code-group-item NPM

```sh:no-line-numbers{1}
npm install dotenv
```

:::
::: code-group-item Yarn

```sh:no-line-numbers{1}
yarn add dotenv
```

:::
::: code-group-item PNPM

```sh:no-line-numbers{1}
pnpm add dotenv
```

:::
::::

:::: code-group
::: code-group-item .env

```sh{1}
GUILDED_TOKEN=your-token
```

:::
::: code-group-item Usage

```ts{1,3}
import 'dotenv/config';

console.log(process.env.GUILDED_TOKEN);
```

:::
::::

## Git and `.gitignore`

It is important to ignore files and folders that are not needed or have sensitive information like your bot token. If you are committing your progress to a platform like [GitHub](https://github.com), create a `.gitignore` file in your project root and add the following inside:

```{1-3}
node_modules
config.json
.env
```

::: tip
You should never commit the `node_modules` folder to your repository as you can generate this folder by installing your dependencies from the `package.json` and lcok file.

Check out the [Git documentation for `.gitignore`](https://git-scm.com/docs/gitignore) for more information!
:::
