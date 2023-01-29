'use client';

import Link from 'next/link';
import IconLinks from './IconLinks';

export default function Footer() {
	return (
		<footer className="flex flex-col items-center gap-3 leading-none bg-guilded-grey-dark p-5 border-t-4 border-guilded-gilded">
			<Link className="font-semibold" href="/">
				Guilded.TS
			</Link>
			<p>The feature rich Guilded API wrapper</p>
			<IconLinks />
		</footer>
	);
}
