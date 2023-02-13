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
		<code className="text-lg space-x-3 inline-flex w-fit shadow-lg py-2 px-3">
			<span>{children}</span>
			<button onClick={handleCopy}>
				{copied ? (
					<HiOutlineClipboardCheck className="text-green-600" />
				) : (
					<HiOutlineClipboardCopy />
				)}
			</button>
		</code>
	);
}
