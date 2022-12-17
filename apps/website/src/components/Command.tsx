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
		<code className="text-guilded-white bg-guilded-grey-dark text-lg rounded-md py-3 px-4 space-x-3 flex mx-auto w-fit">
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
