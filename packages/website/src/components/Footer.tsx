import Link from 'next/link';

export default function Footer() {
	return (
		<footer className="text-white bg-guilded-grey-dark text-center p-5">
			<p className="font-semibold">
				<Link href="/">Guilded.TS</Link>
			</p>
			<p>The feature rich Guilded API wrapper</p>
		</footer>
	);
}
