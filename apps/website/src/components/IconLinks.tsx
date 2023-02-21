import { SiGithub, SiGuilded, SiNpm } from 'react-icons/si';
import { IconType } from 'react-icons';
import Link from 'next/link';

const Links: Record<string, [href: string, Icon: IconType]> = {
	NPM: ['/npm', SiNpm],
	GitHub: ['/github', SiGithub],
	'Support Server': ['/support', SiGuilded],
};

export default function IconLinks() {
	return (
		<div className="flex items-center space-x-3 text-2xl">
			{Object.entries(Links).map(([name, [href, Icon]], index) => (
				<Link
					key={index}
					href={href}
					title={name}
					target="_blank"
					rel="noreferrer"
					className="text-white hover:scale-110 transition ease-in-out"
				>
					<Icon />
				</Link>
			))}
		</div>
	);
}
