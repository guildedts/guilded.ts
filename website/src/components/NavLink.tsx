import Link from 'next/link';
import { useRouter } from 'next/router';
import { MouseEventHandler, ReactNode } from 'react';

export default function NavLink({
	children,
	href,
	onClick,
}: {
	children: ReactNode;
	href: string;
	onClick?: MouseEventHandler<HTMLDivElement>;
}) {
	const { asPath } = useRouter();

	return (
		<div className="rounded-md overflow-hidden" onClick={onClick}>
			<div
				className={`text-white hover:bg-guilded-grey-dark py-2 px-3 text-sm font-semibold transition ease-in-out duration-300 ${
					(href === '/' ? asPath === href : asPath.startsWith(href)) &&
					'bg-guilded-grey-light border-b-4 border-guilded-gilded'
				}`}
			>
				<Link href={href}>{children}</Link>
			</div>
		</div>
	);
}
