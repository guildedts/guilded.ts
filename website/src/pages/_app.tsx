import 'styles.css';
import { AppProps } from 'next/app';
import Head from 'next/head';
import Navbar from 'components/Navbar';
import Footer from 'components/Footer';

export default function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<title>Guilded.TS</title>
				<meta
					name="description"
					content="A feature rich NPM package for interacting with the Guilded API."
				/>
				<link rel="icon" href="/logo.png" />
			</Head>
			<div className="flex flex-col h-screen">
				<Navbar />
				<main className="p-4 max-w-5xl mx-auto flex-grow">
					<Component {...pageProps} />
				</main>
				<Footer />
			</div>
		</>
	);
}
