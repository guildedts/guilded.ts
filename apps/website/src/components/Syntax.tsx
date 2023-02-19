import { useState } from 'react';
import { HiOutlineClipboardCopy, HiOutlineClipboardCheck } from 'react-icons/hi';

import SyntaxHighlighter from 'react-syntax-highlighter/dist/cjs/prism-light';
import ts from 'react-syntax-highlighter/dist/cjs/languages/prism/typescript';
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

SyntaxHighlighter.registerLanguage('typescript', ts);

export default function Syntax({ code }: { code: string }) {
	const [copied, setCopied] = useState(false);

	function handleCopy() {
		navigator.clipboard.writeText(code);
		setCopied(true);
		setTimeout(() => setCopied(false), 1000);
	}

	return (
		<div className="shadow-lg relative">
			<button
				className="absolute top-3 right-3 bg-guilded-grey-light hover:bg-guilded-grey-lightest p-1.5 rounded-md transition ease-in-out"
				onClick={handleCopy}
			>
				{copied ? (
					<HiOutlineClipboardCheck
						title="Copied!"
						size={22}
						className="text-guilded-gilded"
					/>
				) : (
					<HiOutlineClipboardCopy title="Copy" size={22} />
				)}
			</button>
			<SyntaxHighlighter language="typescript" style={oneDark}>
				{code}
			</SyntaxHighlighter>
		</div>
	);
}
