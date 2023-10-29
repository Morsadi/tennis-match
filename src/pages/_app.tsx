import "bootstrap/dist/css/bootstrap.min.css";
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Dashboard from '../components/dashboard';

export default function App({ Component, pageProps }: AppProps) {

	return (
		<Dashboard>
			<Component {...pageProps} />
		</Dashboard>
	);
}
