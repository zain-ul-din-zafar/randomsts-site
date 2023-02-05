import style from '@/styles/components/NavBar.module.css';
import Link from 'next/link';
import { AppRoutes } from '@/helper/constants';

export default function NavBar() {
    return (
        <>
            <nav className={`${style.navbar}`}>
                <ul>
                    <li>
                        <Link href={AppRoutes.HOME}>
                            <h1>RandomsTS</h1>
                        </Link>
                    </li>
                    <li>
                        <Link href={AppRoutes.HOME}>Home</Link>
                    </li>
                    <li>
                        <Link href={AppRoutes.DOCS}>Docs</Link>
                    </li>
                    <li>
                        <a target={'_blank'} href={`${AppRoutes.GitHub}`} rel="noreferrer">
                            Github
                        </a>
                    </li>
                    <li>
                        <Link href={AppRoutes.QNA}>Sign In</Link>
                    </li>
                    <li>
                        <Link href={AppRoutes.QNA}>
                            <button className={`${style.btn}`}>Q&A</button>
                        </Link>
                    </li>
                </ul>
            </nav>
        </>
    );
}
