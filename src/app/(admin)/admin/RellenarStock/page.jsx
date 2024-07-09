import React, { Suspense } from 'react';
import { getRefillStockProducts } from '@/lib/data';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers'
import EditProduct from "@/components/admin/products/product/actions/edit";
//Admin Pages Layout
import Layout from "@/app/(admin)/admin/AdminLayout";
export default async function page() {
    const filteredList = await getRefillStockProducts();
    const cookieStore = cookies()
    const token = cookieStore.has('token');
    if (!token) {
        redirect('/admin');
    }
    console.log(filteredList);
    return (
        <>
            <Layout>
                <h1 className="font-semibold text-4xl">Reponer Stock</h1>
                <p className=''>
                    Aquí puedes añadir a productos agotados.
                </p>
                <Suspense fallback={<Loading />}>
                    <ul>
                        <div className="flex flex-col space-y-2 p-2">
                            {filteredList && filteredList.length > 0 ? (
                                filteredList.map((product, index) => (
                                    <div key={index} className="p-2 bg-slate-100 rounded-lg flex flex-row justify-between space-x-6">
                                        <div className='flex flex-row space-x-4'>
                                            <p className="h-auto w-full self-center whitespace-nowrap">
                                                {product.ALBEDOtitulo}
                                            </p>
                                        </div>
                                        <div className="space-x-4 flex flex-row justify-center items-center">
                                            <EditProduct product={product} />
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className='flex flex-col justify-center w-full h-[50vh]'>
                                    <div className=' flex flex-col items-center justify-center'>
                                        <div>
                                            <h1 className="h-auto w-full text-lg text-center whitespace-nowrap">
                                                Está todo rellenado.
                                            </h1>
                                            
                                        </div>
                                        <svg width="256px" height="256px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                            <g id="SVGRepo_iconCarrier">
                                                <path d="M6.5 6.3C6.5 5.30589 7.30589 4.5 8.3 4.5H14.7C15.6941 4.5 16.5 5.30589 16.5 6.3V11.5H8.3C7.30589 11.5 6.5 10.6941 6.5 9.7V6.3Z" stroke="#33363F"></path>
                                                <path d="M4.5 13.3C4.5 12.3059 5.30589 11.5 6.3 11.5H12.5V19.5H6.3C5.30589 19.5 4.5 18.6941 4.5 17.7V13.3Z" stroke="#33363F"></path>
                                                <path d="M12.5 11.5H18.7C19.6941 11.5 20.5 12.3059 20.5 13.3V17.7C20.5 18.6941 19.6941 19.5 18.7 19.5H12.5V11.5Z" stroke="#33363F"></path>
                                                <path d="M16.5 11.5V14.5" stroke="#33363F" stroke-linecap="round"></path>
                                                <path d="M8.5 11.5V14.5" stroke="#33363F" stroke-linecap="round"></path>
                                                <path d="M11.5 4.5V7.5" stroke="#33363F" stroke-linecap="round"></path>
                                            </g></svg>
                                    </div>
                                </div>
                            )}
                        </div>
                    </ul>
                </Suspense>
            </Layout >
        </>
    )
}
function Loading() {
    <div className="flex-col gap-4 w-full flex items-center justify-center">
        <div className="w-20 h-20 border-8 text-[#304590] text-xl animate-spin border-gray-300 flex items-center justify-center border-t-[#304590] rounded-full"></div>
    </div>
}
