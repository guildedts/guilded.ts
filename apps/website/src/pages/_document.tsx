import { Html, Main, Head, NextScript } from 'next/document';
import { default as CustomHead } from 'components/Head';

export default function Document() {
	return (
		<Html>
			<Head>
				<CustomHead />
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
