import Image from 'next/image';
import Command from 'components/Command';
import ExternalLink from 'components/ExternalLink';

export default function Page() {
	return (
		<div className="space-y-5">
			<div className="text-center">
				<Image src="/banner.png" alt="Guilded.TS" width={1280} height={410} />
				<Command>npm install guilded.ts</Command>
			</div>
			<div className="space-y-3">
				<h1 className="text-4xl">About</h1>
				<p className="text-guilded-white text-lg">
					Guilded.TS is a feature rich, fast and efficient Guilded API wrapper. Its goal
					is to make it possible to use the Guilded API with ease. It is also highly
					inspired by{' '}
					<ExternalLink href="https://discord.js.org">discord.js</ExternalLink> to make it
					possible for users familier with it to create Guilded bots with as much ease as
					possible.
				</p>
			</div>
		</div>
	);
}
