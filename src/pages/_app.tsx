import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import NavBar from '@/components/NavBar';
import { useRouter } from 'next/router';
import { preservedRenderRoutes } from '@/helper/constants';

import { useFirebaseAuth } from '@/hooks/UseFirebaseAuth';
import { userAuthContext } from '@/hooks/UserAuthContext';

export default function App({ Component, pageProps }: AppProps) {
    const router = useRouter();
    const user = useFirebaseAuth();

    return (
        <>
            <userAuthContext.Provider value={user}>
                {!preservedRenderRoutes.includes(router.pathname) && <NavBar />}
                <Component {...pageProps} />;
            </userAuthContext.Provider>
        </>
    );
}
