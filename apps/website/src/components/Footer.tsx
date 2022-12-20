'use client';

import Link from 'next/link';

export default function Footer() {
	return (
		<footer className="bg-guilded-grey-dark text-center p-5">
			<Link className="font-semibold" href="/">
				Guilded.TS
			</Link>
			<p>The feature rich Guilded API wrapper</p>
		</footer>
	);
}
