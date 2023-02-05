import style from '@/styles/components/qna/Chat.module.css';
import { AiFillHome } from 'react-icons/ai';
import Link from 'next/link';
import { AppRoutes } from '@/helper/constants';
import Message from './Message';

import { useContext } from 'react';
import { aiInputContext } from '@/hooks/AiInputContext';

export default function Chat() {
    const aiInput = useContext(aiInputContext);

    return (
        <>
            {/* logo */}
            <AILogo shouldRender={aiInput && aiInput[0].length == 0 ? true : false} />

            {/* back button */}
            <div className={`${style.btnContainer}`}>
                <Link href={AppRoutes.HOME}>
                    <button className={`${style.backBtn}`}>
                        <i>
                            <AiFillHome />
                        </i>{' '}
                        Go Home
                    </button>
                </Link>
            </div>

            {/* chat room */}
            <div className={`${style.chatContainer}`}>
                <div className={`${style.chat}`}>
                    {/* bind to user input */}
                    {aiInput && aiInput[0].length > 0 && (
                        <Message message={aiInput[0]} messageFrom="user" />
                    )}
                </div>
            </div>
        </>
    );
}

const AILogo = ({ shouldRender }: { shouldRender: boolean }) => {
    if (!shouldRender) return <div className={`${style.aiLogo}`}></div>;

    return (
        <>
            <div className={`${style.aiLogo}`}>
                <h1>RandomsTS AI</h1>
                <p>
                    {`AI may generate incorrect info. If unsure, `.toLocaleUpperCase()}
                    <a>ask here.</a>
                </p>
            </div>
        </>
    );
};
