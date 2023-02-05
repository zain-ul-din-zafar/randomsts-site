import style from '@/styles/components/Hero.module.css';
import Link from 'next/link';
import { AppRoutes } from '@/helper/constants';

export default function Hero() {
    return (
        <>
            <div className={`${style.hero}`}>
                <h1>RandomsTS</h1>
                <p>
                    RandomsTS is a free and open-source framework for building restful APIS using
                    typescript and class-based object-oriented programming.
                </p>

                <div className={`${style.btns}`}>
                    <span className={`${style.btn}`}>
                        <pre>$ npx create-randomsts-app</pre>
                    </span>
                    <Link href={AppRoutes.DOCS}>
                        <span className={`${style.btn}`}>
                            <pre>Documentation</pre>
                        </span>
                    </Link>
                </div>
            </div>
        </>
    );
}
