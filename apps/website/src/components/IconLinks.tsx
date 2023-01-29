import { SiGithub, SiGuilded } from 'react-icons/si';
import { IconType } from 'react-icons';

const Links: Record<string, [href: string, Icon: IconType]> = {
	GitHub: ['/github', SiGithub],
	'Support Server': ['/support', SiGuilded],
};

export default function IconLinks() {
	return (
		<div className="flex items-center space-x-3 text-2xl">
			{Object.entries(Links).map(([name, [href, Icon]], index) => (
				<a
					key={index}
					href={href}
					target="_blank"
					rel="noreferrer"
					className="text-white hover:scale-110 transition ease-in-out"
				>
					<Icon title={name} />
				</a>
			))}
		</div>
	);
}
