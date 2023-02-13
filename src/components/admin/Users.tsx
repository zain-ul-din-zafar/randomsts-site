import style from '@/styles/components/admin/Users.module.css';
import { useState, useEffect } from 'react';
import { fireStore } from '@/lib/Firebase';
import { onSnapshot, collection } from 'firebase/firestore';
import { User } from 'firebase/auth';
import Image from 'next/image';

export default function Users() {
    const [users, setUsers] = useState<Array<User>>([]);

    useEffect(() => {
        const userColRef = collection(fireStore, 'users');
        const unSubscribe = onSnapshot(userColRef, (res) => {
            setUsers(res.docs.map((data) => data.data()) as Array<User>);
        });

        return () => unSubscribe();
    }, []);

    return (
        <>
            <div className={`${style.users}`}>
                <div className={`${style.head}`}>
                    <li>Users</li>
                    <li>Role</li>
                </div>
                {users.map((user, idx) => {
                    return (
                        <div key={idx} className={`${style.user}`}>
                            <li>
                                <Image
                                    src={user.photoURL ? user.photoURL : ''}
                                    alt="zain-ul-din"
                                    width={35}
                                    height={35}
                                    style={{ marginTop: '0.4rem', borderRadius: '0.2rem' }}
                                />
                                <h5>{user.displayName}</h5>
                                <select>
                                    <option>User</option>
                                    <option>Staff</option>
                                    <option>Admin</option>
                                </select>
                            </li>
                        </div>
                    );
                })}
            </div>
        </>
    );
}
