import { Dispatch, SetStateAction, createContext } from 'react';

export const aiInputContext = createContext<[string, Dispatch<SetStateAction<string>>] | null>(
    null
);
