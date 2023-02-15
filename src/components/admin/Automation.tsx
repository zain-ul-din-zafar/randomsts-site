import { fireStore } from '@/lib/Firebase';
import { useState, useEffect } from 'react';
import { collection, onSnapshot, addDoc, deleteDoc, doc } from 'firebase/firestore';
import type { DocumentData } from 'firebase/firestore';
import style from '@/styles/components/admin/Automation.module.css';
import Input from './AutomationInput';


const codeSnippetsCol = collection(fireStore, 'code_snippets');

export function addCodeSnippet(data: any) {
    addDoc(codeSnippetsCol, data);
}

export default function Automation() {
    const [codeSnippets, setCodeSnippets] = useState<Array<DocumentData>>([]);

    useEffect(() => {
        const unSubscribe = onSnapshot(codeSnippetsCol, (data) => {
            const resData = data.docs.map((data) => data);
            setCodeSnippets(resData);
        });
        return () => unSubscribe();
    }, []);

    return (
        <>
            <div className={`${style.automation}`}>
                {codeSnippets.map((data, key) => {
                    return <Container text={data.data().title} key={data.id} docId = {data.id} />;
                })}
            </div>
            <Input codeSnippets={codeSnippets.map((data) => data.data())} />
        </>
    );
}

import { AiOutlineDelete } from 'react-icons/ai';

const Container = ({ text, docId }: { text: string, docId: string }) => {
    
    return (
        <>
            <div className={`${style.container}`}>
                <p>{text}</p>
                <button onClick={()=>{
                    const currDoc = doc (codeSnippetsCol, docId);
                    deleteDoc (currDoc);
                }}>
                    <AiOutlineDelete />
                </button>
            </div>
        </>
    );
};
