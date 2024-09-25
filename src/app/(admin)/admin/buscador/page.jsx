import React, { Suspense } from 'react';
import { getSearchedProducts, getCategories } from '@/lib/data';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import Layout from "@/app/(admin)/admin/AdminLayout";
import Search from '@/components/admin/Search/search';
export default async function Page() {
    const cookieStore = cookies();
    const token = cookieStore.has('token');
    if (!token) {
        redirect('/admin');
    }
    return (
        <Layout>
            <h1 className="font-semibold text-4xl mb-2">Buscador de Productos</h1>
            <p className='mb-8'>
                Escribe el ID del producto para filtrar automáticamente
            </p>
            <Search />
        </Layout>
    );
}

