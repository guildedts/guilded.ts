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
		<div
			className={`text-white rounded-md hover:bg-guilded-grey-dark py-2 px-3 text-sm font-semibold ${
				(href === '/' ? asPath === href : asPath.startsWith(href))
					? 'bg-guilded-grey-light'
					: null
			}`}
			onClick={onClick}
		>
			<Link href={href}>{children}</Link>
		</div>
	);
}
