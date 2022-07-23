import { execSync } from 'child_process';
import { rmSync } from 'fs';

execSync('pnpm publish -r --ignore-scripts --report-summary', { stdio: 'inherit' });

const { publishedPackages } = require('../pnpm-publish-summary.json');

if(publishedPackages.length > 0) execSync('pnpm changeset tag', { stdio: 'inherit' });

rmSync('pnpm-publish-summary.json');
