import React, { Suspense } from 'react';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
// Admin Pages Layout
import Layout from "@/app/(admin)/admin/AdminLayout";
// Server Action
import { getCategoryDataForListProducts, getListProductsFiltered } from '@/lib/data';
// Components
import Delete from "@/components/admin/products/category/delete";
import AddSubCategory from "@/components/admin/products/subcategory/add";
import AddNewProduct from "@/components/admin/products/product/actions/add";
import EditProduct from "@/components/admin/products/product/actions/edit";
import EditCatedory from "@/components/admin/products/category/edit";
import Duplicate from '@/components/admin/products/product/actions/duplicate';
import AddNewCategory from "@/components/admin/products/category/add";
import Filters from '@/components/admin/products/product/comps/filters/Filters';

// import Filters from '@/components/admin/products/product/comps/filters/Filters';

export default async function page() {
    const cookieStore = cookies();
    const token = cookieStore.has('token');
    if (!token) {
        redirect('/admin');
    }
    let list = await getCategoryDataForListProducts();
    list = list.filter(category => category.isPublished === false);

    const filteredList = await getListProductsFiltered();

    return (
        <>
            <Layout>
                <div className="flex flex-row justify-between mb-8">
                    <div className="flex flex-row">
                        <h1 className="font-semibold text-4xl">Productos Ocultos</h1>
                        {/* AddNewCategory component can be enabled here if needed */}
                    </div>
                    <div className="flex flex-row space-x-4">
                        <Suspense fallback={<Loading />}>
                            {/* Filters component will handle the category selection */}
                            <Filters list={list} />
                        </Suspense>
                    </div>
                </div>
                <ul>
                    {filteredList
                        .filter(category => category.isPublished == false)
                        .map((category, index) => (
                            <div key={index} className="my-10">
                                <Suspense fallback={<Loading />}>
                                    <List category={category} list={list} />
                                </Suspense>
                            </div>
                        ))}
                </ul>
            </Layout>
        </>
    );
}

function List({ category, list }) {
    return (
        <div className="space-y-2 w-full">
            <div className="border bg-slate-50 rounded-lg p-2 flex flex-row justify-between mb-2 mt-4">
                <p className="h-auto self-center">{category.url_Id} : {category.name}</p>
                <div className="space-x-4 flex flex-row justify-center items-center">
                    <AddNewProduct categoryId={category} />
                    <AddSubCategory categoryId={category} />
                    <EditCatedory categoryId={category} list={list} />
                    <Delete category={category} product={"none"} />
                    <p className={`flex justify-center px-2 py-1 rounded-full w-[100px] ${category.isPublished ? 'select-none font-medium text-green-500' : 'select-none font-medium text-red-500'}`}>
                        {category.isPublished ? "Publicado" : "Oculto"}
                    </p>
                </div>
            </div>

            {category.products && category.products.length > 0 && (
                <>
                    {category.products.map((product, index) => (
                        <div key={index} className="ml-14 flex flex-row justify-between border rounded-lg p-2 mb-1">
                            <div className='flex flex-row space-x-4'>
                                <p className="h-auto w-full self-center whitespace-nowrap">
                                    {product.url_Id} : {product.ALBEDOtitulo}
                                </p>
                                <div className="flex flex-row h-auto w-full self-center whitespace-nowrap space-x-2">
                                    <div className='flex flex-row h-auto w-full'>
                                        <svg width="28px" height="28px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.5 6.3C6.5 5.30589 7.30589 4.5 8.3 4.5H14.7C15.6941 4.5 16.5 5.30589 16.5 6.3V11.5H8.3C7.30589 11.5 6.5 10.6941 6.5 9.7V6.3Z" stroke="#44403C"></path> <path d="M4.5 13.3C4.5 12.3059 5.30589 11.5 6.3 11.5H12.5V19.5H6.3C5.30589 19.5 4.5 18.6941 4.5 17.7V13.3Z" stroke="#44403C"></path> <path d="M12.5 11.5H18.7C19.6941 11.5 20.5 12.3059 20.5 13.3V17.7C20.5 18.6941 19.6941 19.5 18.7 19.5H12.5V11.5Z" stroke="#44403C"></path></svg>
                                        {product.ALBEDOstock}
                                    </div>
                                    <p>/</p>
                                    <div className='flex flex-row h-auto w-full'>
                                        <svg width="28px" height="28px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 8H13" stroke="#44403C" strokeLinecap="round"></path> <path d="M5 12H11" stroke="#44403C" strokeLinecap="round"></path> <path d="M5 16H9" stroke="#44403C" strokeLinecap="round"></path> <path d="M19 18L22 15M19 18L16 15M19 18L19 6" stroke="#44403C"></path></svg>
                                        {product.ALBEDOstock_minimo}
                                    </div>
                                </div>
                            </div>
                            <div className="space-x-4 flex flex-row justify-center items-center">
                                <Duplicate category={category} product={product} />
                                <EditProduct category={category} product={product} />
                                <Delete category={"none"} product={product} />
                                <p className={`flex justify-center px-2 py-1 rounded-full w-[100px] ${product.isPublished ? 'select-none font-medium text-green-500' : 'select-none font-medium text-red-500'}`}>
                                    {product.isPublished ? "Publicado" : "Oculto"}
                                </p>
                            </div>
                        </div>
                    ))}
                </>
            )}

            {category.subCategories && category.subCategories.length > 0 && (
                <div className="ml-14">
                    {category.subCategories.map((subCategory, index) => (
                        <List key={index} category={subCategory} />
                    ))}
                </div>
            )}
        </div>
    );
}

// function Filters({ categories }) {
//     return (
//         <form method="GET" action="/admin/products">
//             <select name="category" className="border rounded px-4 py-2">
//                 <option value="">Select Category</option>
//                 {categories
//                     .filter(category => category.isPublished)
//                     .map((category) => (
//                     <option key={category.url_Id} value={category.url_Id}>
//                         {category.name}
//                     </option>
//                 ))}
//             </select> 
//         </form>
//     );
// }

function Loading() {
    return (
        <div className="flex-col gap-4 w-full flex items-center justify-center">
            <div className="w-20 h-20 border-8 text-[#304590] text-xl animate-spin border-gray-300 flex items-center justify-center border-t-[#304590] rounded-full"></div>
        </div>
    );
}
