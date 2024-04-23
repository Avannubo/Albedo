"use client"
import { useState, useEffect } from 'react';
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getCategories } from "@/lib/data";
import ProductItem from "@/components/products/productItem";
import AddToCart from '@/components/products/addToCart';
import Layout from "@/app/(main)/WebLayout";

export default function page() {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([]);

    const fetchData = async () => {
        setIsLoading(true);
        const fetchedCategories = await getCategories();
        const Categories = fetchedCategories.filter(category => category.isPublished === true);
        setData(Categories || []);
        setIsLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    function GetPublishedProducts(categories) {
        let products = [];
        if (categories && categories.length > 0) {
            categories.forEach((category) => {
                if (category.isPublished && category.products && category.products.length > 0) {
                    products = products.concat(category.products);
                }
                if (category.subCategories) {
                    products = products.concat(GetPublishedProducts(category.subCategories));
                }
            });
        }
        return products;
    }

    const allPublishedProducts = GetPublishedProducts(data);
    const last4PublishedProducts = allPublishedProducts.slice(-4);

    return (
        <Layout>
            <hr className="h-1 mx-auto bg-gray-100 border-0 rounded dark:bg-gray-700" />
            <div className="flex justify-center my-4">
                <h1 className="text-2xl font-bold">Gama de productos</h1>
            </div>
            <div className="min-h-[10vh]">
                <hr className="h-1 mx-auto bg-gray-100 border-0 rounded dark:bg-gray-700" />
                {isLoading ? (
                    <div className="flex-col gap-4 w-full flex items-center justify-center">
                        <div className="w-20 h-20 border-8 text-[#304590] text-xl animate-spin border-gray-300 flex items-center justify-center border-t-[#304590] rounded-full">
                        </div>
                    </div>
                ) : (
                    <div className='flex flex-row flex-wrap space-x-6  justify-center mt-2 '>
                        {data.map((category, index) => (
                            <Link key={index} href={`/products/${category.url_Id}`} className="block mb-4 text-md text-gray-700 rounded-lg ">
                                <Image src={category.imagen} alt="Vercel Logo" className="self-center w-[135px] h-[100px] rounded-lg" width={100} height={24} />
                                <p className='text-center font-semibold text-md'>
                                    {category.name.split(" ").length > 2 ? category.name.split(" ")[0] : category.name}
                                </p>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
            <div className="my-6 min-h-[30vh]">
                <hr className="h-1 mx-auto bg-gray-100 border-0 rounded  dark:bg-gray-700" />
                <div className="flex justify-center">
                    <h1 className="text-lg font-bold my-2">Nuevos productos</h1>
                </div>
                <hr className="h-1 mx-auto bg-gray-100 border-0 rounded  dark:bg-gray-700" />

                {isLoading ? (
                    <div className="flex-col gap-4 w-full flex items-center justify-center">
                        <div className="w-20 h-20 border-8 text-[#304590] text-xl animate-spin border-gray-300 flex items-center justify-center border-t-[#304590] rounded-full">
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-row items-center justify-center space-x-4 mt-4 mb-8">
                            {last4PublishedProducts.map((product) => (
                            <div className="w-[250px] flex flex-col p-2 rounded-lg box-shadow justify-between" key={product.ALBEDOcodigo}>
                                <Link href={product.fixedUrl}>
                                    <ProductItem product={product} />
                                </Link>
                                <AddToCart producto={product} />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </Layout>
    );
}
