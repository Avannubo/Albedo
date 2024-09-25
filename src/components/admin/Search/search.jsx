"use client";
import React, { useState, useEffect } from "react";
import { getProducts, getCategories } from "@/lib/data";
import EditProduct from "@/components/admin/products/product/actions/edit";
import Delete from "@/components/admin/products/category/delete";

export default function Search() {
    const [searchTerm, setSearchTerm] = useState("");
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        async function fetchData() {
            try {
                const fetchedCategories = await getCategories();
                const productList = [];

                const loopRecursive = (categories) => {
                    for (const category of categories) {
                        for (const product of category.products) {
                            productList.push(product);
                        }
                        if (category.subCategories && category.subCategories.length > 0) {
                            loopRecursive(category.subCategories);
                        }
                    }
                };

                loopRecursive(fetchedCategories);

                setProducts(productList);
                setFilteredProducts(productList); // Initial load shows all featured products
                setLoading(false); // Data fetching is complete
            } catch (error) {
                console.error("Error fetching categories:", error);
                setLoading(false); // Ensure loading state is updated on error
            }
        }

        fetchData();
    }, []);

    // Handle search input changes to filter products by name
    useEffect(() => {
        const filtered = products.filter(product =>
            product.ALBEDOcodigo.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredProducts(filtered);
    }, [searchTerm, products]);

    if (loading) {
        return <Loading />;
    }

    return (
        <>
            <div className="m-2">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border p-2 rounded w-full"
                    placeholder="Buscar productos..."
                />
                
            </div>

            {/* Display filtered products */}
            <ul>
                <div className="flex flex-col space-y-2 p-2">
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map((product) => (
                            <div
                                key={product.id} // Use product.id for key
                                className="flex flex-row justify-between border rounded-lg p-2 bg-slate-50"
                            >
                                <div className="flex flex-row space-x-4">
                                    <p className="h-auto self-center whitespace-nowrap">
                                        {product.ALBEDOcodigo}</p>
                                    <p className="h-autoself-center whitespace-nowrap">
                                        ({product.ALBEDOtitulo})</p>
                                    {/* <div className="flex flex-row h-auto w-full self-center whitespace-nowrap space-x-2">
                                        <div className="flex flex-row h-auto w-full">
                                            
                                        </div>
                                    </div> */}
                                </div>
                                <div className="space-x-4 flex flex-row justify-center items-center">
                                    <EditProduct product={product} />
                                    <Delete product={product} />
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
