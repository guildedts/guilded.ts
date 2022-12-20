/** @type {import('next').NextConfig} */
module.exports = {
	reactStrictMode: true,
	swcMinify: true,
	experimental: {
		appDir: true,
	},
	async redirects() {
		return [
			{
				source: '/docs',
				destination: 'https://docs.guildedts.js.org',
				permanent: false,
			},
			{
				source: '/guide',
				destination: 'https://guide.guildedts.js.org',
				permanent: false,
			},
			{
				source: '/github',
				destination: 'https://github.com/guildedts/guilded.ts',
				permanent: false,
			},
			{
				source: '/support',
				destination: 'https://guilded.gg/guildedts',
				permanent: false,
			},
		];
	},
};
