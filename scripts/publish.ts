import { execSync } from 'child_process';
import { rmSync } from 'fs';

const dev = process.argv.includes('--dev');
let publishCommand = 'pnpm publish -r --ignore-scripts --report-summary';
if (dev) publishCommand += ' --tag dev --ignore-git-checks';

execSync(publishCommand, { stdio: 'inherit' });

const { publishedPackages } = require('../pnpm-publish-summary.json');

if (publishedPackages.length > 0 && !dev) execSync('pnpm changeset tag', { stdio: 'inherit' });

rmSync('pnpm-publish-summary.json');
