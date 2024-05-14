import React, { Suspense } from 'react'
import Layout from "@/app/(admin)/admin/AdminLayout";
// import List from '@/components/admin/products/product/comps/productList';
import { getCategoryDataForListProducts } from '@/lib/data';
import Delete from "@/components/admin/products/category/delete";
import AddSubCategory from "@/components/admin/products/subcategory/add";
import AddNewProduct from "@/components/admin/products/product/actions/add";
import EditProduct from "@/components/admin/products/product/actions/edit";
import EditCatedory from "@/components/admin/products/category/edit";
import Duplicate from '@/components/admin/products/product/actions/duplicate';
import AddNewCategory from "@/components/admin/products/category/add";

export default async function page() {
    // console.log(getCategoryDataForListProducts);
    const list = await getCategoryDataForListProducts();
    console.log(List);
    return (
        <Layout>
            <Suspense fallback={<Loading />}>
                <div className="flex flex-row">
                    <h1 className="font-semibold text-4xl">Productos</h1>
                    <AddNewCategory/>
                </div>
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
function List({category}) {
    return <div  className="space-y-2 w-full">
        <div className="border bg-slate-50 rounded-lg p-2 flex flex-row justify-between mb-2 mt-4">
            <p className="h-auto  self-center">{category.url_Id} : {category.name}</p>
            <div className="space-x-4 flex flex-row justify-center items-center"> 
                {/* <EditCatedory categoryId={category} /> */}
                <Delete category={category} product={"none"} />
                <p className={`flex justify-center px-2 py-1 rounded-full w-[100px]  ${category.isPublished ? 'select-none font-medium text-green-500' : 'select-none font-medium text-red-500'}`}>
                    {category.isPublished ? "Publicado" : "Oculto"}
                </p>
            </div>
        </div>
        {category.products && category.products.length > 0 && (
            <div>
                {category.products.map((product, index) => (//.reverse()
                    <div key={index} className="ml-14 flex flex-row justify-between border bg-slate-50 rounded-lg p-2 mb-1"
                    >
                        <p className="h-auto w-full self-center ">
                            {product.url_Id} : {product.ALBEDOtitulo}
                        </p>
                        <div className="space-x-4 flex flex-row justify-center items-center"> 
                            {/* <EditProduct category={category} product={product} /> */}

                            <Duplicate category={category} product={product} />
                            <Delete category={"none"} product={product} />
                            <p className={`flex justify-center  px-2 py-1 rounded-full w-[100px] ${product.isPublished ? 'select-none font-medium  text-green-500' : 'select-none font-medium text-red-500'}`}>
                                {product.isPublished ? "Publicado" : "Oculto"}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        )}
        {category.subCategories &&
            category.subCategories.length > 0 &&
            category.subCategories.map((subCategory, index) => (//reverse()
                <div key={index} className="ml-14">
                    <List category={subCategory} />
                </div>
            ))}
    </div>
}
function Loading() {
    <div className="flex-col gap-4 w-full flex items-center justify-center">
        <div className="w-20 h-20 border-8 text-[#304590] text-xl animate-spin border-gray-300 flex items-center justify-center border-t-[#304590] rounded-full"></div>
    </div>
}
