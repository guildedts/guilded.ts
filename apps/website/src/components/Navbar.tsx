import { useState } from 'react';
import { HiOutlineMenu, HiOutlineX } from 'react-icons/hi';

import NavLink from 'components/NavLink';
import NavExternalLink from 'components/NavExternalLink';
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
		<header className="sticky bg-guilded-grey-dark p-3 shadow-xl border-t-4 border-guilded-gilded border-b border-b-border">
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
			<nav className="max-w-3xl mx-auto block space-y-3 md:hidden">
				<div className="flex justify-between h-10">
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
