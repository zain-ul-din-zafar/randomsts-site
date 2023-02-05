import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import NavBar from '@/components/NavBar';
import { useRouter } from 'next/router';
import { preservedRenderRoutes } from '@/helper/constants';

export default function App({ Component, pageProps }: AppProps) {
    const router = useRouter();
    return (
        <>
            {!preservedRenderRoutes.includes(router.pathname) && <NavBar />}
            <Component {...pageProps} />;
        </>
    );
}
