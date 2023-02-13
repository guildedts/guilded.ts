import { HiOutlineExternalLink } from 'react-icons/hi';

export default function NavExternalLink({
	children,
	href,
	onClick,
}: React.PropsWithChildren<{
	href: string;
	onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}>) {
	return (
		<a
			href={href}
			target="_blank"
			rel="noreferrer"
			className="rounded-md hover:bg-guilded-grey-dark py-2 px-3 flex items-center space-x-2 transition ease-in-out duration-300"
			onClick={onClick}
		>
			<span>{children}</span>
			<HiOutlineExternalLink className="h-5 w-5" />
		</a>
	);
}
