import style from '@/styles/components/NavBar.module.css';
import Link from 'next/link';
import { AppRoutes } from '@/helper/constants';
import { BsGithub } from 'react-icons/bs';
import Image from 'next/image';

import { auth, signUpWithGithub } from '@/lib/Firebase';
import { userAuthContext } from '@/hooks/UserAuthContext';
import { useContext } from 'react';

export default function NavBar() {
    const user = useContext(userAuthContext);

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
                        {user ? (
                            <Image
                                src={user.photoURL ? user.photoURL : ''}
                                alt="zain-ul-din"
                                width={35}
                                height={35}
                                style={{ marginTop: '0.4rem', borderRadius: '0.2rem' }}
                            />
                        ) : (
                            <a
                                onClick={(e) => {
                                    signUpWithGithub();
                                }}>
                                Sign In <BsGithub />
                            </a>
                        )}
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
