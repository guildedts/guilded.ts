import { execSync } from 'child_process';
import { rmSync } from 'fs';

execSync('pnpm publish -r --ignore-scripts --report-summary', { stdio: 'inherit' });

const { publishedPackages }: PublishSummary = require('../pnpm-publish-summary.json');

console.log(process);

if (publishedPackages.length > 0) execSync('pnpm changeset tag', { stdio: 'inherit' });

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
