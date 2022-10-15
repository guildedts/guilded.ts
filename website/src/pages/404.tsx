import Head from 'next/head';

export default function NotFound() {
	return (
		<>
			<Head>
				<title>Guilded.TS | 404</title>
			</Head>
			<div className="text-white text-5xl h-full flex items-center text-center">
				<p>Page Not Found</p>
			</div>
		</>
	);
}
