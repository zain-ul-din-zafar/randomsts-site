import { useEffect, useReducer, Fragment, useState, useCallback } from 'react';

import style from '@/styles/components/admin/Automation.module.css';
import type { DocumentData } from 'firebase/firestore';
import { addCodeSnippet } from './Automation';

interface InputReducerType {
    data: {
        fileName: string;
        sourceCode: string;
        terminalCode: string;
    };
    errors: {
        fileName: Array<{ error: boolean; message: string }>;
        sourceCode: Array<{ error: boolean; message: string }>;
        terminalCode: Array<{ error: boolean; message: string }>;
    };
}

const initialInput: InputReducerType = {
    data: {
        fileName: '',
        sourceCode: '',
        terminalCode: ''
    },
    errors: {
        fileName: [],
        sourceCode: [],
        terminalCode: []
    }
};

enum InputReducerActionTypes {
    FileName,
    SourceCode,
    TerminalCommand
}

function inputReducer(
    state: InputReducerType,
    action: { type: InputReducerActionTypes; payload: string }
) {
    switch (action.type) {
        case InputReducerActionTypes.FileName:
            return {
                ...state,
                data: { ...state.data, fileName: action.payload.trimStart() },
                errors: {
                    ...state.errors,
                    fileName: [
                        { error: action.payload.trim().length < 2, message: 'input is too short' },
                        {
                            error: action.payload.trim().length == 1500,
                            message: 'input is too long Limit: 1500'
                        }
                    ]
                }
            };
        case InputReducerActionTypes.SourceCode:
            return {
                ...state,
                data: { ...state.data, sourceCode: action.payload },
                errors: {
                    ...state.errors,
                    sourceCode: [
                        { error: action.payload.trim().length < 2, message: 'input is too short' },
                        {
                            error: action.payload.trim().length == 1500,
                            message: 'input is too long Limit: 1500'
                        }
                    ]
                }
            };
        case InputReducerActionTypes.TerminalCommand:
            return {
                ...state,
                data: { ...state.data, terminalCode: action.payload },
                errors: {
                    ...state.errors,
                    terminalCode: [
                        { error: action.payload.trim().length < 2, message: 'input is too short' },
                        {
                            error: action.payload.trim().length == 1500,
                            message: 'input is too long Limit: 1500'
                        }
                    ]
                }
            };
    }

    return initialInput;
}

export default function AutomationInput({
    codeSnippets
}: {
    codeSnippets: Array<DocumentData>;
}) {
    const [input, setInput] = useReducer(inputReducer, initialInput);
    const [canSubmit, setCanSubmit] = useState<{ validInput: boolean; isDuplicate: boolean }>({
        validInput: false,
        isDuplicate: false
    });

    const initPayload = useCallback(() => {
        for (let key in InputReducerActionTypes)
            setInput({
                type: InputReducerActionTypes[key as keyof typeof InputReducerActionTypes],
                payload: ''
            });
    }, []);

    useEffect(() => {
        initPayload();
    }, []);

    useEffect(() => {
        setCanSubmit({
            validInput:
                Object.values(input.errors).filter(
                    (err) => err.filter((metaData) => metaData.error).length > 0
                ).length == 0,
            isDuplicate:
                codeSnippets.filter(
                    (codeSnippet) =>
                        input.data.fileName.toLowerCase() == codeSnippet.fileName.toLowerCase()
                ).length > 0
        });
    }, [input, codeSnippets]);

    return (
        <>
            <div className={`${style.inputContainer}`}>
                <h1>File Name</h1>
                <input
                    placeholder="Add fileName"
                    value={input.data.fileName}
                    onChange={(e) =>
                        setInput({ type: InputReducerActionTypes.FileName, payload: e.target.value })
                    }
                />
                <h1>Source Code</h1>
                <textarea
                    placeholder="Add Source Code"
                    value={input.data.sourceCode}
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
                    value={input.data.terminalCode}
                    onChange={(e) =>
                        setInput({
                            type: InputReducerActionTypes.TerminalCommand,
                            payload: e.target.value
                        })
                    }
                />

                {/* error logs */}
                <div>
                    {(!canSubmit.validInput || canSubmit.isDuplicate) && <h5>Error Logs 📝</h5>}
                    {Object.entries(input.errors).map((err) => {
                        return err[1].map((errMetaData, key) => {
                            return (
                                <Fragment key={key}>
                                    {errMetaData.error && (
                                        <p key={key}>
                                            <b>❌ {err[0].toString()}:</b> {errMetaData.message}
                                        </p>
                                    )}
                                </Fragment>
                            );
                        });
                    })}
                    {/* checks duplicate */}
                    {canSubmit.isDuplicate && (
                        <p>
                            <b>❌ FileName already exists</b>
                        </p>
                    )}
                    {canSubmit.validInput && !canSubmit.isDuplicate && (
                        <p style={{ color: 'var(--green)' }}>✔ All Set.</p>
                    )}
                </div>

                <li>
                    <button
                        style={{
                            display:
                                !canSubmit.isDuplicate && canSubmit.validInput ? 'flex' : 'none'
                        }}
                        onClick={(e) => {
                            addCodeSnippet(input.data);
                            initPayload();
                        }}>
                        Upload
                    </button>
                </li>
            </div>
        </>
    );
}
