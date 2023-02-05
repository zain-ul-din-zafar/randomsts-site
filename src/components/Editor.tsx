"client side";
import SyntaxHighlighter from 'react-syntax-highlighter';
import Typewriter from 'typewriter-effect';
import { rainbow } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import style from '@/styles/components/Editor.module.css';
import React, { useState, useEffect } from 'react';

import { useTypeWrite } from '@/hooks/UseTypeWrite';

const code = `// basic routing
class Route extends Routes 
{
    public async get (req, res) 
    {
        
    }
}
`
const typeSpeed = 30;

export default function Editor ()
{

    const [text, setText] = useTypeWrite ({
        text: code,
        speed: 40,
        onCompleteDelay: 2000,
        onComplete: ()=>{
            console.log ("Hey...");
        }
    });
    
    return (
        <>
            <div className={`${style.editor}`}>
                <h1>PlayGround</h1>
                <EditorHeader />
                <SyntaxHighlighter 
                    language="typescript"
                    showLineNumbers = {true}
                    wrapLines={true}
                    style={rainbow}
                    wrapLongLines={true} 
                > 
                    {text} 
                </SyntaxHighlighter>
            </div>
        </>
    )
}

const EditorHeader  = () => {
    return (
        <>
            <div>    
                <span>
                    Index.ts
                </span>
                <span className='opacity-normal'>
                    DataBase.ts
                </span>
            </div>
        </>
    )
}
