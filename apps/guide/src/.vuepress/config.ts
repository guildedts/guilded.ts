import { defaultTheme, defineUserConfig, Theme } from 'vuepress-vite';
import { searchPlugin } from '@vuepress/plugin-search';

export default defineUserConfig({
	lang: 'en-US',
	title: 'Guilded.TS Guide',
	description: 'A Guide for creating a Guilded.TS bot.',
	plugins: [searchPlugin({ locales: { '/': { placeholder: 'Search' } } })],
	head: [['link', { rel: 'icon', href: 'https://guildedts.js.org/logo.jpg' }]],
	theme: defaultTheme({
		navbar: [
			{ text: 'Website', link: 'https://guildedts.js.org' },
			{ text: 'Documentation', link: 'https://guildedts.js.org/docs' },
		],
		sidebar: [
			{
				text: 'Creating Your Bot',
				children: [
					'/',
					'/creating-your-bot/',
					'/creating-your-bot/main-file.md',
					'/creating-your-bot/event-handling.md',
				],
			},
			{
				text: 'Popular Topics',
				children: ['/popular-topics/'],
			},
		],
		sidebarDepth: 3,
		docsRepo: 'guildedts/guilded.ts',
		docsDir: 'apps/guide/src',
		logo: 'https://guildedts.js.org/logo.png',
		repo: 'guildedts/guilded.ts',
		editLinkText: 'Edit this page on GitHub',
		contributors: false,
	}),
});
