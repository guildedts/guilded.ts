import 'styles.css';
import Footer from 'components/Footer';
import Navbar from 'components/Navbar';

export default function Layout({ children }: React.PropsWithChildren) {
	return (
		<html lang="en">
			<body>
				<div className="flex flex-col h-screen">
					<Navbar />
					<main className="p-6 flex-grow max-w-3xl w-full mx-auto">{children}</main>
					<Footer />
				</div>
			</body>
		</html>
	);
}
