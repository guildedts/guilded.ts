import Link from 'next/link';

export default function NavLink({
	children,
	href,
	onClick,
}: React.PropsWithChildren<{
	href: string;
	onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}>) {
	return (
		<Link
			href={href}
			className="block hover:bg-guilded-grey-dark py-2 px-3 rounded-md transition ease-in-out duration-300"
			onClick={onClick}
		>
			{children}
		</Link>
	);
}
