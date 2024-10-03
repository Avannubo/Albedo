import React, { Suspense } from 'react';
import { getFeaturedProducts } from '@/lib/data';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers'
import EditProduct from "@/components/admin/products/product/actions/edit";
import Delete from "@/components/admin/products/category/delete";
import Layout from "@/app/(admin)/admin/AdminLayout";
export default async function page() {
    const filteredList = await getFeaturedProducts();
    const cookieStore = cookies()
    const token = cookieStore.has('token');
    if (!token) {
        redirect('/admin');
    }
    return (
        <Layout>
            <h1 className="font-semibold text-4xl mb-2">Productos Destacados</h1>
            <p className='mb-8'>
                Aquí puedes modificar productos Destacados.
            </p>
            <Suspense fallback={<Loading />}>
                <ul>
                    <div className="flex flex-col space-y-2 p-2">
                        {filteredList && filteredList.length > 0 ? (
                            filteredList.reverse().map((product, index) => (
                                <div
                                    key={index}
                                    className={`flex flex-row justify-between border rounded-lg p-2 bg-slate-50`}
                                >
                                    <div className='flex flex-row space-x-4'>
                                        <p className="h-auto w-full self-center whitespace-nowrap">
                                            {product.url_Id} : {product.ALBEDOtitulo}
                                        </p>
                                        <div className=" flex flex-row h-auto w-full self-center whitespace-nowrap space-x-2">
                                            <div className='flex flex-row h-auto w-full'>
                                                <svg width="28px" height="28px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M6.5 6.3C6.5 5.30589 7.30589 4.5 8.3 4.5H14.7C15.6941 4.5 16.5 5.30589 16.5 6.3V11.5H8.3C7.30589 11.5 6.5 10.6941 6.5 9.7V6.3Z" stroke="#44403C"></path> <path d="M4.5 13.3C4.5 12.3059 5.30589 11.5 6.3 11.5H12.5V19.5H6.3C5.30589 19.5 4.5 18.6941 4.5 17.7V13.3Z" stroke="#44403C"></path> <path d="M12.5 11.5H18.7C19.6941 11.5 20.5 12.3059 20.5 13.3V17.7C20.5 18.6941 19.6941 19.5 18.7 19.5H12.5V11.5Z" stroke="#44403C"></path> <path d="M16.5 11.5V14.5" stroke="#44403C" strokeLinecap="round"></path> <path d="M8.5 11.5V14.5" stroke="#44403C" strokeLinecap="round"></path> <path d="M11.5 4.5V7.5" stroke="#44403C" strokeLinecap="round"></path> </g></svg>
                                                {product.ALBEDOstock}
                                            </div>
                                            <p>/</p>
                                            <div className='flex flex-row h-auto w-full'>
                                                <svg width="28px" height="28px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M5 8H13" stroke="#44403C" strokeLinecap="round"></path> <path d="M5 12H11" stroke="#44403C" strokeLinecap="round"></path> <path d="M5 16H9" stroke="#44403C" strokeLinecap="round"></path> <path d="M19 18L22 15M19 18L16 15M19 18L19 6" stroke="#44403C"></path> </g></svg>
                                                {product.ALBEDOstock_minimo}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-x-4 flex flex-row justify-center items-center">
                                        <EditProduct product={product} />
                                        {/* <Delete category={"none"} product={product} /> */}
                                        <p className={`flex justify-center px-2 py-1 rounded-full w-[100px] ${product.isPublished ? 'select-none font-medium text-green-500' : 'select-none font-medium text-red-500'}`}>
                                            {product.isPublished ? "Publicado" : "Oculto"}
                                        </p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className='flex flex-col justify-center w-full h-[50vh]'>
                                <div className=' flex flex-col items-center justify-center'>
                                    <div>
                                        <h1 className="h-auto w-full text-lg text-center whitespace-nowrap">
                                            No hay productos Destacados.
                                        </h1>
                                    </div>
                                    <svg width="256px" height="256px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                                        <g id="SVGRepo_iconCarrier">
                                            <path d="M6.5 6.3C6.5 5.30589 7.30589 4.5 8.3 4.5H14.7C15.6941 4.5 16.5 5.30589 16.5 6.3V11.5H8.3C7.30589 11.5 6.5 10.6941 6.5 9.7V6.3Z" stroke="#33363F"></path>
                                            <path d="M4.5 13.3C4.5 12.3059 5.30589 11.5 6.3 11.5H12.5V19.5H6.3C5.30589 19.5 4.5 18.6941 4.5 17.7V13.3Z" stroke="#33363F"></path>
                                            <path d="M12.5 11.5H18.7C19.6941 11.5 20.5 12.3059 20.5 13.3V17.7C20.5 18.6941 19.6941 19.5 18.7 19.5H12.5V11.5Z" stroke="#33363F"></path>
                                            <path d="M16.5 11.5V14.5" stroke="#33363F" strokeLinecap="round"></path>
                                            <path d="M8.5 11.5V14.5" stroke="#33363F" strokeLinecap="round"></path>
                                            <path d="M11.5 4.5V7.5" stroke="#33363F" strokeLinecap="round"></path>
                                        </g></svg>
                                </div>
                            </div>
                        )}
                    </div>
                </ul>
            </Suspense>
        </Layout >
    )
}
function Loading() {
    <div className="flex-col gap-4 w-full flex items-center justify-center">
        <div className="w-20 h-20 border-8 text-[#304590] text-xl animate-spin border-gray-300 flex items-center justify-center border-t-[#304590] rounded-full"></div>
    </div>
}
