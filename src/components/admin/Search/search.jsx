"use client"; // This marks the component as a Client Component
import React, { Suspense, useEffect, useState } from 'react';
import { searchFilter } from '@/lib/data';
import EditProduct from "@/components/admin/products/product/actions/edit";
import Delete from "@/components/admin/products/category/delete";
import Search from '../products/product/comps/filters/search';

export default function Page() {
    const [searchData, setSearchData] = useState({ searchTerm: "", searchBy: "name" });
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(false); // State to track loading

    // Function to compare arrays of products
    const isEqual = (newProducts, currentProducts) => {
        return JSON.stringify(newProducts) === JSON.stringify(currentProducts);
    };

    // Fetch and filter products
    const searchFilterProducts = async (searchTerm, searchBy) => {
        setLoading(true); // Set loading to true
        const products = await searchFilter(searchTerm, searchBy);

        // Update the filteredProducts state only if the data has changed
        if (!isEqual(products, filteredProducts)) {
            setFilteredProducts(products);
        }

        setLoading(false); // Set loading to false
    };

    const handleSearchChange = (searchTerm, searchBy) => {
        setSearchData({ searchTerm, searchBy });
    };

    // Fetch initial products on mount and when searchData changes
    useEffect(() => {
        searchFilterProducts(searchData.searchTerm, searchData.searchBy);
    }, [searchData]);

    return (
        <>
            <div className="m-2 flex flex-row justify-evenly">
                <Search onSearchChange={handleSearchChange} />
                <button
                onClick={() => searchFilterProducts(searchData.searchTerm, searchData.searchBy)}
                className="whitespace-nowrap m-2 p-2 bg-[#304587] hover:bg-[#475caa] text-white rounded-md"
            >
                    <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M9.5 19.75C9.91421 19.75 10.25 19.4142 10.25 19C10.25 18.5858 9.91421 18.25 9.5 18.25V19.75ZM11 5V5.75C11.3033 5.75 11.5768 5.56727 11.6929 5.28701C11.809 5.00676 11.7448 4.68417 11.5303 4.46967L11 5ZM9.53033 2.46967C9.23744 2.17678 8.76256 2.17678 8.46967 2.46967C8.17678 2.76256 8.17678 3.23744 8.46967 3.53033L9.53033 2.46967ZM1.25 12C1.25 12.4142 1.58579 12.75 2 12.75C2.41421 12.75 2.75 12.4142 2.75 12H1.25ZM3.86991 15.5709C3.63293 15.2312 3.16541 15.1479 2.82569 15.3849C2.48596 15.6219 2.40267 16.0894 2.63965 16.4291L3.86991 15.5709ZM9.5 18.25H9.00028V19.75H9.5V18.25ZM9 5.75H11V4.25H9V5.75ZM11.5303 4.46967L9.53033 2.46967L8.46967 3.53033L10.4697 5.53033L11.5303 4.46967ZM2.75 12C2.75 8.54822 5.54822 5.75 9 5.75V4.25C4.71979 4.25 1.25 7.71979 1.25 12H2.75ZM2.63965 16.4291C4.03893 18.435 6.36604 19.75 9.00028 19.75V18.25C6.87703 18.25 5.00068 17.1919 3.86991 15.5709L2.63965 16.4291Z" fill="#FFFFFF"></path> <path d="M13 19V18.25C12.6967 18.25 12.4232 18.4327 12.3071 18.713C12.191 18.9932 12.2552 19.3158 12.4697 19.5303L13 19ZM14.4697 21.5303C14.7626 21.8232 15.2374 21.8232 15.5303 21.5303C15.8232 21.2374 15.8232 20.7626 15.5303 20.4697L14.4697 21.5303ZM14.5 4.25C14.0858 4.25 13.75 4.58579 13.75 5C13.75 5.41421 14.0858 5.75 14.5 5.75V4.25ZM22.75 12C22.75 11.5858 22.4142 11.25 22 11.25C21.5858 11.25 21.25 11.5858 21.25 12H22.75ZM20.1302 8.42907C20.3671 8.76881 20.8347 8.85211 21.1744 8.61514C21.5141 8.37817 21.5974 7.91066 21.3604 7.57093L20.1302 8.42907ZM15 18.25H13V19.75H15V18.25ZM12.4697 19.5303L14.4697 21.5303L15.5303 20.4697L13.5303 18.4697L12.4697 19.5303ZM14.5 5.75H15V4.25H14.5V5.75ZM21.25 12C21.25 15.4518 18.4518 18.25 15 18.25V19.75C19.2802 19.75 22.75 16.2802 22.75 12H21.25ZM21.3604 7.57093C19.9613 5.56497 17.6342 4.25 15 4.25V5.75C17.1232 5.75 18.9995 6.80806 20.1302 8.42907L21.3604 7.57093Z" fill="#FFFFFF"></path> </g></svg>
            </button>
            </div>
            
            <div className='flex flex-row justify-end '>

            
                </div>
            <Suspense fallback={<Loading />}>
                <ul>
                    <div className="flex flex-col space-y-2 p-2">
                        {loading ? ( // Show loading indicator while fetching
                            <Loading />
                        ) : (
                            filteredProducts.length > 0 ? (
                                filteredProducts.map((product, i) => (
                                    <div
                                        key={i}
                                        className="flex flex-row justify-between border rounded-lg p-2 bg-slate-50"
                                    >
                                        <div className="flex flex-row space-x-4">
                                            <p className="h-auto self-center whitespace-nowrap">
                                                {product.url_Id}
                                            </p>
                                            <p className="h-auto self-center whitespace-nowrap">
                                                {product.ALBEDOtitulo}
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
                            )
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
