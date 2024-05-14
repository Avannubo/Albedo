import React, { Suspense } from 'react'
import Layout from "@/app/(admin)/admin/AdminLayout";
import List from '@/components/admin/products/product/comps/productList';
import { getCategoryDataForListProducts } from '@/lib/data';

export default async function page() {
    // console.log(getCategoryDataForListProducts);
    const list = await getCategoryDataForListProducts();
    console.log(List);
    return (
        <Layout>
            <Suspense fallback={<Loading />}>
                <h1>Product IDs</h1>
                <ul>
                    {list.map((category, index) => (
                        <div key={index} className="my-10">
                            <List category={category}/>
                        </div>
                    ))}
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

