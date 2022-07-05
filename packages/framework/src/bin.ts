#!/usr/bin/env node

import { program } from 'commander';
import { Client } from './structures/Client';
import { Logger } from './structures/Logger';

const { version } = require('../package.json');

program.name('gts').version(version);

program
	.command('dev', { isDefault: true })
	.description('start the bot in development mode')
	.action(() => {
		Logger.wait('Starting in development mode...');
		new Client({ dev: true });
	});

program
	.command('start')
	.description('start the bot')
	.action(() => {
		Logger.wait('Starting...');
		new Client();
	});

program.parse(process.argv);
