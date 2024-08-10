'client side';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { rainbow } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import style from '@/styles/components/Editor.module.css';
import React from 'react';
import { BsTerminal } from 'react-icons/bs';
import { useTypeWrite } from '@/hooks/UseTypeWrite';

const code = `import Router from '@randoms/code';

@Router.init([])
class TodoRoute extends Router {
    private todos: string[] = ["code", "rest", "repeat"];

    public async get(req, res) {
        res.send({ todos: this.todos });
    }

    public async post(req, res) {
        const newTodo = req.body.todo;
        if (newTodo) {
            this.todos.push(newTodo);
            res.status(201).send({ message: 'Todo added successfully', todos: this.todos });
        } else {
            res.status(400).send({ message: 'Todo is required' });
        }
    }

    public async delete(req, res) {
        const index = this.todos.indexOf(req.body.todo);
        if (index > -1) {
            this.todos.splice(index, 1);
            res.send({ message: 'Todo deleted successfully', todos: this.todos });
        } else {
            res.status(404).send({ message: 'Todo not found' });
        }
    }

    public async update(req, res) {
        const { oldTodo, newTodo } = req.body;
        const index = this.todos.indexOf(oldTodo);
        if (index > -1 && newTodo) {
            this.todos[index] = newTodo;
            res.send({ message: 'Todo updated successfully', todos: this.todos });
        } else {
            res.status(400).send({ message: 'Invalid request' });
        }
    }
}

export default new TodoRoute();

`;
const typeSpeed = 30;

export default function Editor() {
    const [text, setText] = useTypeWrite({
        text: code,
        speed: 40,
        onCompleteDelay: 2000,
        onComplete: () => {
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
                <EditorFooter />
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
$  hello world`;

const EditorFooter = () => {
    const [text, setText] = useTypeWrite({
        text: terminalOutPut,
        speed: 43,
        onCompleteDelay: 1000,
        onComplete: () => {
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
