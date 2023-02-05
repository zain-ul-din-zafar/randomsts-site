import Head from 'next/head';
import Hero from '@/components/Hero';
import Editor from '@/components/Editor';

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
