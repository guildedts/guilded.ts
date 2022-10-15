import { useState } from 'react';
import { HiOutlineMenu, HiOutlineX } from 'react-icons/hi';
import NavExternalLink from 'components/NavExternalLink';
import NavLink from 'components/NavLink';

const links = {
	'Guilded.TS': '/',
};
const externalLinks = {
	Documentation: '/docs',
	Guide: '/guide',
	GitHub: '/github',
	'Support Server': '/support',
};

export default function Navbar() {
	const [opened, setOpened] = useState(false);

	return (
		<header className="text-white sticky bg-guilded-grey-darkest p-3">
			<nav className="hidden max-w-7xl mx-auto space-x-3 md:flex">
				{Object.entries(links).map(([name, href], index) => (
					<NavLink key={index} href={href}>
						{name}
					</NavLink>
				))}
				{Object.entries(externalLinks).map(([name, href], index) => (
					<NavExternalLink key={index} href={href}>
						{name}
					</NavExternalLink>
				))}
			</nav>
			<nav className="container mx-auto block space-y-3 md:hidden">
				<button onClick={() => setOpened(!opened)} className="align-middle">
					{opened ? (
						<HiOutlineX className="h-6 w-6" />
					) : (
						<HiOutlineMenu className="h-6 w-6" />
					)}
				</button>
				<div className={`space-y-2 ${opened ? 'block' : 'hidden'}`}>
					{Object.entries(links).map(([name, href], index) => (
						<NavLink key={index} href={href} onClick={() => setOpened(!opened)}>
							{name}
						</NavLink>
					))}
					{Object.entries(externalLinks).map(([name, href], index) => (
						<NavExternalLink key={index} href={href} onClick={() => setOpened(!opened)}>
							{name}
						</NavExternalLink>
					))}
				</div>
			</nav>
		</header>
	);
}
