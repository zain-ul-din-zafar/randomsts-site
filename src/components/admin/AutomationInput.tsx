import { useReducer } from 'react';
import style from '@/styles/components/admin/Automation.module.css';

interface InputReducerType {
    data: {
        title: string;
        sourceCode: string;
        terminalCode: string;
    };
    errors: {
        title: boolean;
        sourceCode: boolean;
        terminalCode: boolean;
    };
}

const initialInput: InputReducerType = {
    data: {
        title: '',
        sourceCode: '',
        terminalCode: ''
    },
    errors: {
        title: false,
        sourceCode: false,
        terminalCode: false
    }
};

enum InputReducerActionTypes {
    Title,
    SourceCode,
    TerminalCommand
}

function inputReducer(
    state: InputReducerType,
    action: { type: InputReducerActionTypes; payload: string }
) {
    switch (action.type) {
        case InputReducerActionTypes.Title:
            return {
                ...state,
                data: { ...state.data, title: action.payload },
                errors: { ...state.errors, title: false }
            };
        case InputReducerActionTypes.SourceCode:
            return {
                ...state,
                data: { ...state.data, sourceCode: action.payload },
                errors: { ...state.errors, sourceCode: false }
            };
        case InputReducerActionTypes.TerminalCommand:
            return {
                ...state,
                data: { ...state.data, terminalCode: action.payload },
                errors: { ...state.errors, terminalCode: false }
            };
    }

    return initialInput;
}

export default function AutomationInput() {
    const [input, setInput] = useReducer(inputReducer, initialInput);

    console.log(input);

    return (
        <>
            <div className={`${style.inputContainer}`}>
                <h1>Title</h1>
                <input
                    placeholder="Add Title"
                    onChange={(e) =>
                        setInput({ type: InputReducerActionTypes.Title, payload: e.target.value })
                    }
                />
                <h1>Source Code</h1>
                <textarea
                    placeholder="Add Source Code"
                    onChange={(e) =>
                        setInput({
                            type: InputReducerActionTypes.SourceCode,
                            payload: e.target.value
                        })
                    }
                />
                <h1>Terminal Command</h1>
                <textarea
                    placeholder="Add Terminal Command"
                    onChange={(e) =>
                        setInput({
                            type: InputReducerActionTypes.TerminalCommand,
                            payload: e.target.value
                        })
                    }
                />

                {/* error logs */}
                <div>
                    <h5>Error Logs 📝</h5>
                    <p>❌ Title already exists</p>
                </div>

                <li>
                    <button>Save</button>
                    <button>Delete</button>
                </li>
            </div>
        </>
    );
}
