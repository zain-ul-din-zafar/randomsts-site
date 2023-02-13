import { useReducer } from 'react';
import style from '@/styles/components/admin/Automation.module.css';
import Input from './AutomationInput';

const dummyData: Array<string> = ['docs', 'new work', 'routes code example'];

export default function Automation() {
    return (
        <>
            <div className={`${style.automation}`}>
                {dummyData.map((title, key) => {
                    return <Container text={title} key={key} />;
                })}
            </div>
            <Input />
        </>
    );
}

const Container = ({ text }: { text: string }) => {
    return (
        <>
            <div className={`${style.container}`}>
                <p>{text}</p>
            </div>
        </>
    );
};
