import 'styles.css';
import Footer from 'components/Footer';
import Navbar from 'components/Navbar';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Guilded.TS',
	description: 'A feature rich NPM package for interacting with the Guilded API.',
	viewport: { width: 'device-width', initialScale: 1 },
	icons: '/logo.png',
};

export default function Layout({ children }: React.PropsWithChildren) {
	return (
		<html lang="en">
			<body className="flex flex-col h-screen">
				<Navbar />
				<main className="p-6 flex-grow max-w-5xl w-full mx-auto">{children}</main>
				<Footer />
			</body>
		</html>
	);
}
