'use client';

import { useState } from 'react';
import NavLink from 'components/NavLink';
import NavExternalLink from 'components/NavExternalLink';
import { HiOutlineMenu, HiOutlineX } from 'react-icons/hi';
import IconLinks from './IconLinks';

const Links: Record<string, string> = {
	'Guilded.TS': '/',
};
const ExternalLinks: Record<string, string> = {
	Documentation: '/docs',
	Guide: '/guide',
};

export default function Navbar() {
	const [isOpened, setIsOpened] = useState(false);

	return (
		<header className="sticky bg-guilded-grey-darkest p-3 shadow-xl border-b-4 border-guilded-gilded">
			<nav className="hidden max-w-7xl mx-auto justify-between md:flex">
				<div className="flex space-x-3">
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
				</div>
				<IconLinks />
			</nav>
			<nav className="max-w-xl mx-auto block space-y-3 md:hidden">
				<div className="flex justify-between">
					<button onClick={() => setIsOpened(!isOpened)} className="align-middle">
						{isOpened ? (
							<HiOutlineX className="h-6 w-6" />
						) : (
							<HiOutlineMenu className="h-6 w-6" />
						)}
					</button>
					<IconLinks />
				</div>
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
