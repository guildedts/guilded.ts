'use client';

import { useState } from 'react';
import { HiOutlineClipboardCopy, HiOutlineClipboardCheck } from 'react-icons/hi';

export default function Command({ children }: { children: string }) {
	const [copied, setCopied] = useState(false);

	function handleCopy() {
		navigator.clipboard.writeText(children);
		setCopied(true);
		setTimeout(() => setCopied(false), 1000);
	}

	return (
		<code
			className="text-lg space-x-2 inline-flex w-fit shadow-lg py-4 px-5 cursor-pointer items-center"
			onClick={handleCopy}
		>
			<span>{children}</span>
			{copied ? (
				<HiOutlineClipboardCheck
					title="Copied!"
					size={21}
					className="text-guilded-gilded"
				/>
			) : (
				<HiOutlineClipboardCopy title="Copy" size={21} />
			)}
		</code>
	);
}
