import { execSync } from 'child_process';
import { rmSync } from 'fs';

const dev = process.argv.includes('--dev');
let versionCommand = 'pnpm changeset version';
if (dev) versionCommand += ' --snapshot dev';

execSync('pnpm changeset status --output changeset-status.json', { stdio: 'inherit' });
execSync(versionCommand, { stdio: 'inherit' });

const { releases } = require('../changeset-status.json');

if (dev)
	for (const { name } of releases) execSync(`pnpm nd -n *dev* -p ${name}`, { stdio: 'inherit' });

rmSync('changeset-status.json');
