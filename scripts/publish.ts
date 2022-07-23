import { execSync } from 'child_process';
import { rmSync } from 'fs';
import fetch from 'node-fetch';

if (!process.env.GUILDED_WEBHOOK_URL)
	throw new Error('Missing GUILDED_WEBHOOK_URL environment variable');

execSync('pnpm publish -r --ignore-scripts --report-summary', { stdio: 'inherit' });

const { publishedPackages }: PublishSummary = require('../pnpm-publish-summary.json');

console.log(process);

if (publishedPackages.length > 0) {
	execSync('pnpm changeset tag', { stdio: 'inherit' });
	const packages = publishedPackages.map(
		({ name, version }) =>
			`- [${name}@${version}](https://github.com/guildedts/guilded.ts/releases/tag/${name}@${version})`,
	);
	fetch(process.env.GUILDED_WEBHOOK_URL!, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ content: `@everyone New releases out now!\n\n${packages.join('\n')}` }),
	}).then((req) =>
		req.ok
			? console.log('Release webhook sent')
			: console.log('Failed to send release webhook'),
	);
}

rmSync('pnpm-publish-summary.json');

/** Represents a publish summary. */
interface PublishSummary {
	/** The packages that were published. */
	publishedPackages: Package[];
}

/** Represents a package that was published. */
interface Package {
	/** The name of the package. */
	name: string;
	/** The version of the package. */
	version: string;
}
