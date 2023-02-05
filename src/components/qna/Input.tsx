import style from '@/styles/components/qna/Input.module.css';
import { FiArrowUpRight } from 'react-icons/fi';

import type { ChangeEventHandler, MouseEventHandler, FocusEventHandler } from 'react';

export type InputProps = {
    value: string;
    onChange: ChangeEventHandler<HTMLTextAreaElement>;
    onPressEnter?: () => void;
    onClick?: MouseEventHandler<HTMLButtonElement>;
    onFocus?: FocusEventHandler<HTMLTextAreaElement>;
};

export default function Input(props: InputProps) {
    return (
        <div className={`${style.input}`}>
            <textarea
                value={props.value}
                onChange={props.onChange}
                onFocus={props.onFocus}
                onKeyDown={(e) => {
                    if (e.key == 'Enter' && !e.shiftKey && props.onPressEnter) {
                        e.currentTarget.blur();
                        props.onPressEnter();
                    }
                }}
            />
            <button onClick={props.onClick}>
                <FiArrowUpRight />
            </button>
        </div>
    );
}
