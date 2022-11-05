import Link from 'next/link';
import { ReactNode } from 'react';
import { HiOutlineExternalLink } from 'react-icons/hi';

export default function ExternalLink({ children, href }: { children: ReactNode; href: string }) {
	return (
		<Link
			href={href}
			target="_blank"
			rel="noreferrer"
			className="text-guilded-gilded font-semibold inline-flex items-center space-x-1 hover:brightness-95"
		>
			<span>{children}</span>
			<HiOutlineExternalLink className="h-5 w-5" />
		</Link>
	);
}
