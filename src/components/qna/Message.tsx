import React from 'react';
import style from '@/styles/components/qna/Message.module.css';
import Image from 'next/image';

export type MessageProps = {
    messageFrom: 'bot' | 'user';
    message: string;
};

export default function Message(props: MessageProps) {
    return (
        <>
            <div
                className={`${style.message} ${
                    props.messageFrom == 'bot' ? style.botColor : style.userColor
                }`}
            >
                <span>
                    <Image alt="Zain-ul-din" src={'/images/avatar.png'} width={40} height={40} />
                </span>
                <div>
                    <MessageRenderer message={props.message} />
                </div>
            </div>
        </>
    );
}

const MessageRenderer = ({ message }: { message: string }) => {
    const chunks = message.split('\n');

    return (
        <p>
            {chunks.map((chunk, key) => {
                return (
                    <React.Fragment key={key}>
                        {chunk}
                        {key == chunks.length - 1 && <Cursor />}
                        <br />
                    </React.Fragment>
                );
            })}
        </p>
    );
};

const Cursor = () => {
    return <span className="cursor"></span>;
};
