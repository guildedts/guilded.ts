/** @type {import('next').NextConfig} */
module.exports = {
	reactStrictMode: true,
	swcMinify: true,
	async redirects() {
		return [
			{
				source: '/docs',
				destination: 'https://docs.guildedts.js.org',
				permanent: true,
			},
			{
				source: '/guide',
				destination: 'https://guide.guildedts.js.org',
				permanent: true,
			},
			{
				source: '/github',
				destination: 'https://github.com/guildedts/guilded.ts',
				permanent: true,
			},
			{
				source: '/support',
				destination: 'https://guilded.gg/guildedts',
				permanent: true,
			},
		];
	},
};
