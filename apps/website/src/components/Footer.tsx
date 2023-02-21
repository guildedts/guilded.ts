import Link from 'next/link';

import IconLinks from './IconLinks';

export default function Footer() {
	return (
		<footer className="flex flex-col items-center gap-6 leading-none bg-guilded-grey-dark border-t border-t-border p-8">
			<div className="flex flex-col items-center gap-2">
				<Link className="font-semibold" href="/">
					Guilded.TS
				</Link>
				<p>The feature rich Guilded API wrapper</p>
			</div>
			<IconLinks />
		</footer>
	);
}
