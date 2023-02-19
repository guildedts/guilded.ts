import Image from 'next/image';

import Command from 'components/Command';
import ExternalLink from 'components/ExternalLink';
import Syntax from 'components/Syntax';

const codeString = `import Client from "guilded.ts";

const client = new Client({ token: "your-super-secret-token" });

client.once("ready", () => console.log("Logged in!"));

client.on("messageCreate", (message) => {
	if (message.content === "!ping") {
		return message.reply("Pong!")
	}
});

client.login();`;

export default function Page() {
	return (
		<div className="space-y-10">
			<div className="text-center">
				<Image
					src="/banner.png"
					alt="Guilded.TS"
					width={1200}
					height={300}
					priority
					draggable={false}
				/>
				<Command>npm install guilded.ts</Command>
			</div>
			<div className="space-y-5">
				<h1 className="text-3xl font-bold">About</h1>
				<p className="text-guilded-white text-lg">
					Guilded.TS is a feature rich, fast and efficient Guilded API wrapper. Its main
					goal is to be simple and easy to use. It is also inspired by{' '}
					<ExternalLink href="https://discord.js.org">discord.js</ExternalLink> to make it
					possible for users familiar with it to create Guilded bots with as much ease as
					possible.
				</p>
			</div>
			<Syntax code={codeString} />
		</div>
	);
}
