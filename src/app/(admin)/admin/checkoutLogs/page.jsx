import React, { Suspense } from 'react';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { getAllOrderLogs } from '@/lib/data';
export default async function Page() { 
    const cookieStore = cookies();
        const token = cookieStore.has('token');
        if (!token) {
            redirect('/admin');
        }
    let list = await getAllOrderLogs(); 
    return (
        <div>
            <pre>{JSON.stringify(list, null, 2)}</pre>
        </div>
    );
} 