import Footer from 'components/Footer';
import Navbar from 'components/Navbar';
import CustomHead from 'components/Head';

export default function Layout({ children }: React.PropsWithChildren) {
	return (
		<div className="flex flex-col h-screen">
			<CustomHead />
			<Navbar />
			<main className="p-6 flex-grow max-w-3xl w-full mx-auto">{children}</main>
			<Footer />
		</div>
	);
}
