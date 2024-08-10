'client side';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { rainbow } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import style from '@/styles/components/Editor.module.css';
import React, { useState } from 'react';
import { BsTerminal } from 'react-icons/bs';
import { useTypeWrite } from '@/hooks/UseTypeWrite';

const code = `import Router from '@randoms/code';

@Router.init([])
class DefaultRoute extends Router {
    
    public async get(req, res) {
        res.send('hello there'));
    }
}

export default new TodoRoute();

`;
const typeSpeed = 30;

export default function Editor() {
    const [showFooter, setShowFooter] = useState(false);
    const [text, setText] = useTypeWrite({
        text: code,
        speed: 40,
        onCompleteDelay: 5000,
        onComplete: () => {
            setShowFooter(true)
            console.log('Hey...');
        }
    });

    

    return (
        <>
            <div className={`${style.editor}`}>
                <h1>PlayGround</h1>
                <EditorHeader />
                <SyntaxHighlighter
                    language="typescript"
                    showLineNumbers={true}
                    wrapLines={true}
                    style={rainbow}
                    wrapLongLines={true}>
                    {text}
                </SyntaxHighlighter>
                {showFooter && <EditorFooter onRun={() => setShowFooter(false)} />}
            </div>
        </>
    );
}

import { SiTypescript } from 'react-icons/si';

const EditorHeader = () => {
    return (
        <>
            <div className={`${style.head}`}>
                <span>
                    <SiTypescript style={{ paddingTop: '0.3rem' }} /> Index.ts
                </span>
                <span className="opacity-normal">
                    <SiTypescript style={{ paddingTop: '0.3rem' }} /> DataBase.ts
                </span>
            </div>
        </>
    );
};

const terminalOutPut = `  curl https://localhost:8000 
$  hello there`;

const EditorFooter = ({ onRun }: { onRun: ()=> void } ) => {
    const [text, setText] = useTypeWrite({
        text: terminalOutPut,
        speed: 35,
        onCompleteDelay: 2000,
        onComplete: () => {
            onRun();
            console.log('Hey...');
        }
    });

    return (
        <>
            <div className={`${style.footer}`}>
                <div>
                    <span>
                        <BsTerminal style={{ marginTop: '0.1rem' }} />
                    </span>
                    <pre>Terminal</pre>
                </div>
                <SyntaxHighlighter
                    language="terminal"
                    wrapLines={true}
                    style={rainbow}
                    wrapLongLines={true}
                    className={`${style.codeHighlighter}`}>
                    {`$` + text}
                </SyntaxHighlighter>
            </div>
        </>
    );
};
