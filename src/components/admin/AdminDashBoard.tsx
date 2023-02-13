import style from '@/styles/components/admin/AdminDashBoard.module.css';
import { useState } from 'react';
import Users from './Users';
import Automation from './Automation';

import { IconType } from 'react-icons';
import { FiSettings } from 'react-icons/fi';
import { MdAdminPanelSettings, MdAnimation } from 'react-icons/md';
import { SlDocs } from 'react-icons/sl';

interface AdminRoute {
    route: string;
    icon: IconType;
    component: React.ReactNode;
}

const adminRouts: Array<AdminRoute> = [
    { route: 'Docs', icon: SlDocs, component: <Users key={0} /> },
    { route: 'Admin', icon: MdAdminPanelSettings, component: <Users key={1} /> },
    { route: 'Automation', icon: MdAnimation, component: <Automation key={2} /> },
    { route: 'Settings', icon: FiSettings, component: <Users key={3} /> }
];

export default function AdminDashBoard() {
    const [currRoute, setRoute] = useState(1);

    return (
        <>
            <div className={`${style.dashboard}`}>
                <h1>Admin Panel</h1>
                <Navbar onClick={(idx) => setRoute(idx)} />
                {adminRouts.map(({ component }, idx) => idx == currRoute && component)}
            </div>
        </>
    );
}

export function Navbar({ onClick }: { onClick: (idx: number) => void }) {
    return (
        <>
            <div className={`${style.navbar}`}>
                {adminRouts.map((route, idx) => {
                    return (
                        <li key={idx} onClick={(e) => onClick(idx)}>
                            {route.route}{' '}
                            <i style={{ fontSize: '1rem', marginTop: 30, textAlign: 'center' }}>
                                <route.icon />
                            </i>
                        </li>
                    );
                })}
            </div>
        </>
    );
}
