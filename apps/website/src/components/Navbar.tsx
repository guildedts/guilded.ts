'use client';

import { useState } from 'react';
import NavLink from 'components/NavLink';
import NavExternalLink from 'components/NavExternalLink';
import { HiOutlineMenu, HiOutlineX } from 'react-icons/hi';

const Links = {
	'Guilded.TS': '/',
};
const ExternalLinks = {
	Documentation: '/docs',
	Guide: '/guide',
	GitHub: '/github',
	'Support Server': '/support',
};

export default function Navbar() {
	const [isOpened, setIsOpened] = useState(false);

	return (
		<header className="sticky bg-guilded-grey-darkest p-3">
			<nav className="hidden max-w-7xl mx-auto space-x-3 md:flex">
				{Object.entries(Links).map(([name, href], index) => (
					<NavLink key={index} href={href}>
						{name}
					</NavLink>
				))}
				{Object.entries(ExternalLinks).map(([name, href], index) => (
					<NavExternalLink key={index} href={href}>
						{name}
					</NavExternalLink>
				))}
			</nav>
			<nav className="container mx-auto block space-y-3 md:hidden">
				<button onClick={() => setIsOpened(!isOpened)} className="align-middle">
					{isOpened ? (
						<HiOutlineX className="h-6 w-6" />
					) : (
						<HiOutlineMenu className="h-6 w-6" />
					)}
				</button>
				<div className={`space-y-2 ${isOpened ? 'block' : 'hidden'}`}>
					{Object.entries(Links).map(([name, href], index) => (
						<NavLink key={index} href={href} onClick={() => setIsOpened(!isOpened)}>
							{name}
						</NavLink>
					))}
					{Object.entries(ExternalLinks).map(([name, href], index) => (
						<NavExternalLink
							key={index}
							href={href}
							onClick={() => setIsOpened(!isOpened)}
						>
							{name}
						</NavExternalLink>
					))}
				</div>
			</nav>
		</header>
	);
}
