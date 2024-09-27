import React, { Suspense } from 'react'
import { getSearchedProducts, getCategories, searchFilterList } from '@/lib/data';
import EditProduct from "@/components/admin/products/product/actions/edit";
import Delete from "@/components/admin/products/category/delete";
import Search from '../products/product/comps/filters/search';
export default async function Page() {

    const filteredProducts = await searchFilterList();

    return (
        <>
            <div className="m-2">
                <Search />
            </div>
            <Suspense fallback={<Loading />}>
                <ul>
                    <div className="flex flex-col space-y-2 p-2">
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map((product, i) => (
                                <div
                                    key={i}
                                    className="flex flex-row justify-between border rounded-lg p-2 bg-slate-50"
                                >
                                    <div className="flex flex-row space-x-4">
                                        <p className="h-auto self-center whitespace-nowrap">
                                            {product.ALBEDOcodigo}
                                        </p>
                                        <p className="h-auto self-center whitespace-nowrap">
                                            ({product.ALBEDOtitulo})
                                        </p>
                                    </div>
                                    <div className="space-x-4 flex flex-row justify-center items-center">
                                        <EditProduct product={product} />
                                        <Delete product={product} />
                                        <p className={`flex justify-center px-2 py-1 rounded-full w-[100px] ${product.isPublished ? 'select-none font-medium text-green-500' : 'select-none font-medium text-red-500'}`}>
                                            {product.isPublished ? "Publicado" : "Oculto"}
                                        </p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="flex flex-col justify-center w-full h-[50vh]">
                                <div className="flex flex-col items-center justify-center">
                                    <h1 className="h-auto w-full text-lg text-center whitespace-nowrap">
                                        No hay productos.
                                    </h1>
                                </div>
                            </div>
                        )}
                    </div>
                </ul>
            </Suspense>

        </>
    );
}

function Loading() {
    return (
        <div className="flex-col gap-4 w-full flex items-center justify-center">
            <div className="w-20 h-20 border-8 text-[#304590] text-xl animate-spin border-gray-300 flex items-center justify-center border-t-[#304590] rounded-full"></div>
        </div>
    );
}
