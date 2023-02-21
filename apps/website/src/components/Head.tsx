import Head from 'next/head';

export default function CustomHead() {
	return (
		<Head>
			<title>Guilded.TS</title>
			<meta
				name="description"
				content="A feature rich NPM package for interacting with the Guilded API."
			/>
			<link rel="icon" href="/logo.png" />
			<meta content="minimum-scale=1, initial-scale=1, width=device-width" name="viewport" />
		</Head>
	);
}
