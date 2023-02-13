import Link from 'next/link';
import { HiOutlineExternalLink } from 'react-icons/hi';

export default function ExternalLink({
	children,
	href,
}: React.PropsWithChildren<{ href: string }>) {
	return (
		<Link
			href={href}
			target="_blank"
			rel="noreferrer"
			className="text-guilded-gilded inline-flex items-center space-x-1"
		>
			<span>{children}</span>
			<HiOutlineExternalLink className="h-5 w-5" />
		</Link>
	);
}
