import { useState, useEffect, Dispatch, SetStateAction } from 'react';

export type Options = {
    speed: number;
    text: string;
    onCompleteDelay: number;
    onComplete?: () => void;
};

export function useTypeWrite(options: Options): [string, Dispatch<SetStateAction<string>>] {
    const [idx, setIdx] = useState(0);
    const [text, setText] = useState('');
    const [timeOutState, setTimeOutState] = useState(false);

    useEffect(() => {
        const typeWriter = setInterval(() => {
            if (idx == options.text.length) {
                if (!timeOutState) return;
                setTimeOutState(false);
                setTimeout(() => {
                    options?.onComplete?.call(undefined);
                    setIdx(0);
                    setText('');
                }, options.onCompleteDelay);
            } else {
                setTimeOutState(true);
                setIdx((prevIdx) => prevIdx + 1);
                setText((prevText) => prevText + options.text[idx]);
            }
        }, options.speed);

        return () => {
            clearInterval(typeWriter);
        };
    }, [options, idx, text, timeOutState]);

    return [text, setText];
}
