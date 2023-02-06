import { useEffect, useState } from 'react';
import { auth } from '@/lib/Firebase';
import { setPersistence, browserSessionPersistence, User } from 'firebase/auth';

export function useFirebaseAuth() {
    const [user, setUser] = useState<User | null>(null);
    
    useEffect(() => {
        setPersistence(auth, browserSessionPersistence)
            .then(() => {
                const unSubscribe = auth.onAuthStateChanged((user) => {
                    // console.log (user);
                    setUser(user ? user : null);
                });
                return () => unSubscribe();
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return user;
}
