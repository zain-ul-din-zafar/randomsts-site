import Head from 'next/head';
import Hero from '@/components/Hero';
import Editor from '@/components/Editor';
import {useAuthState} from 'react-firebase-hooks/auth';
import { auth } from '@/lib/Firebase';

export default function Home() {
    
    return (
        <>
            <Head>
                <title>Home</title>
            </Head>
            <Hero />
            <Editor />
        </>
    );
}
