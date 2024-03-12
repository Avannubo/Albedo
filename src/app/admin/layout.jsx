import React from 'react';
import SideNav from '@/components/aside';
import AdminNav from '@/components/adminNav';

export default function layout({ children }) {
    return <section className='flex flex-col '>
        <div className='ml-36'>
            <AdminNav />
            <SideNav />
            <div>
                {children}
            </div>
        </div>
    </section>
}