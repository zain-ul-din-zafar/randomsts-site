import Input from '@/components/qna/Input';
import Chat from '@/components/qna/Chat';
import { aiInputContext } from '@/hooks/AiInputContext';
import { useState } from 'react';

export default function QNA() {
    const [aiInput, setAiInput] = useState<string>('');

    return (
        <>
            <aiInputContext.Provider value={[aiInput, setAiInput]}>
                <Chat />
                <Input
                    value={aiInput}
                    onChange={(e) => setAiInput(e.target.value)}
                    onPressEnter={() => {
                        setAiInput('');
                    }}
                    onClick={(e) => setAiInput('')}
                    onFocus={(e) => {
                        window.scrollTo(0, document.body.scrollHeight);
                    }}
                />
            </aiInputContext.Provider>
        </>
    );
}
