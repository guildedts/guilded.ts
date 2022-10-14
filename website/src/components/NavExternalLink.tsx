import Link from 'next/link';
import { ReactNode } from 'react';
import { HiOutlineExternalLink } from 'react-icons/hi';

export default function NavExternalLink({ children, href }: { children: ReactNode; href: string }) {
	return (
		<div className="text-white rounded-md hover:bg-guilded-grey-dark py-2 px-3 text-sm font-semibold cursor-pointer">
			<Link href={href}>
				<div className="space-x-2 inline-flex items-center">
					<span>{children}</span>
					<HiOutlineExternalLink className="h-5 w-5" />
				</div>
			</Link>
		</div>
	);
}
