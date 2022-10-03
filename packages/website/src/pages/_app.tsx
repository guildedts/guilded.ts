import '../styles.css';
import { AppProps } from 'next/app';
import Head from 'next/head';

export default function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<title>Guilded.TS</title>
				<meta
					name="description"
					content="A feature rich NPM package for interacting with the Guilded API."
				/>
				<link rel="icon" href="/logo.jpg" />
			</Head>
			<Component {...pageProps} />;
		</>
	);
}
