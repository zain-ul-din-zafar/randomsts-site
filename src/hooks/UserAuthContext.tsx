import { createContext } from 'react';
import type { User } from 'firebase/auth';

export const userAuthContext = createContext<User | null>(null);
