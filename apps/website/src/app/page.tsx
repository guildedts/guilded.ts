import Image from 'next/image';
import Command from 'components/Command';
import ExternalLink from 'components/ExternalLink';

export default function Page() {
	return (
		<div className="space-y-5">
			<div className="text-center">
				<Image
					className="pointer-events-none"
					src="/banner.png"
					alt="Guilded.TS"
					width={1200}
					height={300}
				/>
				<Command>npm install guilded.ts</Command>
			</div>
			<div>
				<h1 className="text-4xl">About</h1>
				<p className="text-guilded-white text-lg">
					Guilded.TS is a feature rich, fast and efficient Guilded API wrapper. Its main
					goal is to be simple and easy to use. It is also inspired by{' '}
					<ExternalLink href="https://discord.js.org">discord.js</ExternalLink> to make it
					possible for users familier with it to create Guilded bots with as much ease as
					possible.
				</p>
			</div>
		</div>
	);
}
