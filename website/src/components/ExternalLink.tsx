import Link from 'next/link';
import { ReactNode } from 'react';
import { HiOutlineExternalLink } from 'react-icons/hi';

export default function ExternalLink({ children, href }: { children: ReactNode; href: string }) {
	return (
		<Link href={href}>
			<p className="text-guilded-gilded font-semibold cursor-pointer space-x-1 inline-flex items-center">
				<span>{children}</span>
				<HiOutlineExternalLink className="h-5 w-5" />
			</p>
		</Link>
	);
}
