"use client"
import { useState, useEffect } from 'react';
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getCategories } from "@/lib/data";
import ProductItem from "@/components/main/products/productItem";
import AddToCart from '@/components/main/products/addToCart';
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
    function findProductPath(categories, codeToFind, currentPath = '') {
        for (const category of categories) {
            const newPath = `${currentPath}/${category.url_Id}`;
            const product = category.products.find(product => product.ALBEDOcodigo === codeToFind);
            if (product) {
                return `${newPath}/${product.url_Id}`;
            }
            if (category.subCategories && category.subCategories.length > 0) {
                const foundInSubCategory = findProductPath(category.subCategories, codeToFind, newPath);
                if (foundInSubCategory) {
                    return foundInSubCategory;
                }
            }
        }
        return null;
    }
    const allPublishedProducts = GetPublishedProducts(data);
    const last4PublishedProducts = allPublishedProducts.slice(0, 12);
    return (
        <Layout>
            <hr className="h-1 mx-auto bg-gray-50 border-0 rounded dark:bg-gray-700 mt-10" />
            <div className="flex justify-center my-4">
                <h1 className="text-2xl font-bold">Gama de productos</h1>
            </div>
            <div className="min-h-[10vh]">
                <hr className="h-1 mx-auto my-4 bg-gray-50 border-0 rounded dark:bg-gray-700" />
                {isLoading ? (
                    // <div className="flex-col gap-4 w-full flex items-center justify-center">
                    //     <div className="w-20 h-20 border-8 text-[#304590] text-xl animate-spin border-gray-300 flex items-center justify-center border-t-[#304590] rounded-full">
                    //     </div>
                    // </div>
                    <div className='flex flex-row items-center justify-center space-x-4 mt-4 mb-8'>
                        <div className="w-[150px] h-[120px] mb-2 space-y-2 flex flex-col p-2 rounded-lg box-shadow justify-end bg-slate-50 animate-pulse">
                            <div className='rounded-lg grow h-full w-full bg-slate-200 animate-pulse'></div>
                            <div className='rounded-lg grow h-6 w-full bg-slate-200 animate-pulse'></div>
                        </div>
                        <div className="w-[150px] h-[120px] mb-2 space-y-2 flex flex-col p-2 rounded-lg box-shadow justify-end bg-slate-50 animate-pulse">
                            <div className='rounded-lg grow h-full w-full bg-slate-200 animate-pulse'></div>
                            <div className='rounded-lg grow h-6 w-full bg-slate-200 animate-pulse'></div>
                        </div>
                        <div className="w-[150px] h-[120px] mb-2 space-y-2 flex flex-col p-2 rounded-lg box-shadow justify-end bg-slate-50 animate-pulse">
                            <div className='rounded-lg grow h-full w-full bg-slate-200 animate-pulse'></div>
                            <div className='rounded-lg grow h-6 w-full bg-slate-200 animate-pulse'></div>
                        </div>
                        <div className="w-[150px] h-[120px] mb-2 space-y-2 flex flex-col p-2 rounded-lg box-shadow justify-end bg-slate-50 animate-pulse">
                            <div className='rounded-lg grow h-full w-full bg-slate-200 animate-pulse'></div>
                            <div className='rounded-lg grow h-6 w-full bg-slate-200 animate-pulse'></div>
                        </div>
                        <div className="w-[150px] h-[120px] mb-2 space-y-2 flex flex-col p-2 rounded-lg box-shadow justify-end bg-slate-50 animate-pulse">
                            <div className='rounded-lg grow h-full w-full bg-slate-200 animate-pulse'></div>
                            <div className='rounded-lg grow h-6 w-full bg-slate-200 animate-pulse'></div>
                        </div>
                        <div className="w-[150px] h-[120px] mb-2 space-y-2 flex flex-col p-2 rounded-lg box-shadow justify-end bg-slate-50 animate-pulse">
                            <div className='rounded-lg grow h-full w-full bg-slate-200 animate-pulse'></div>
                            <div className='rounded-lg grow h-6 w-full bg-slate-200 animate-pulse'></div>
                        </div>
                        <div className="w-[150px] h-[120px] mb-2 space-y-2 flex flex-col p-2 rounded-lg box-shadow justify-end bg-slate-50 animate-pulse">
                            <div className='rounded-lg grow h-full w-full bg-slate-200 animate-pulse'></div>
                            <div className='rounded-lg grow h-6 w-full bg-slate-200 animate-pulse'></div>
                        </div>
                    </div>
                ) : (
                    data && data.length > 0 ? (
                        <div className='flex flex-row flex-wrap space-x-1 md:space-x-4  justify-center  mt-2 '>
                            {data.slice(1).map((category, index) => (
                                <Link key={index} href={`/products/${category.url_Id}`} className=" mb-4 p-2 box-shadow text-md text-gray-700 rounded-lg ">
                                    <img
                                        src={category.imagens[0]}
                                        alt="Image"
                                        className="self-center w-[135px] h-[100px] object-contain rounded-lg"
                                        width={500} height={400} />
                                    <p className='text-center font-semibold text-md'>
                                        {category.name.split(" ").length > 2 ? category.name.split(" ")[0] : category.name}
                                    </p>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className='flex flex-row flex-wrap items-center justify-center space-x-4 mt-4 mb-8'>
                            <div className="w-[150px] h-[120px] mb-2 space-y-2 flex flex-col p-2 rounded-lg box-shadow justify-end bg-slate-50 animate-pulse">
                                <div className='rounded-lg grow h-full w-full bg-slate-200 animate-pulse'></div>
                                <div className='rounded-lg grow h-6 w-full bg-slate-200 animate-pulse'></div>
                            </div>
                            <div className="w-[150px] h-[120px] mb-2 space-y-2 flex flex-col p-2 rounded-lg box-shadow justify-end bg-slate-50 animate-pulse">
                                <div className='rounded-lg grow h-full w-full bg-slate-200 animate-pulse'></div>
                                <div className='rounded-lg grow h-6 w-full bg-slate-200 animate-pulse'></div>
                            </div>
                            <div className="w-[150px] h-[120px] mb-2 space-y-2 flex flex-col p-2 rounded-lg box-shadow justify-end bg-slate-50 animate-pulse">
                                <div className='rounded-lg grow h-full w-full bg-slate-200 animate-pulse'></div>
                                <div className='rounded-lg grow h-6 w-full bg-slate-200 animate-pulse'></div>
                            </div>
                            <div className="w-[150px] h-[120px] mb-2 space-y-2 flex flex-col p-2 rounded-lg box-shadow justify-end bg-slate-50 animate-pulse">
                                <div className='rounded-lg grow h-full w-full bg-slate-200 animate-pulse'></div>
                                <div className='rounded-lg grow h-6 w-full bg-slate-200 animate-pulse'></div>
                            </div>
                            <div className="w-[150px] h-[120px] mb-2 space-y-2 flex flex-col p-2 rounded-lg box-shadow justify-end bg-slate-50 animate-pulse">
                                <div className='rounded-lg grow h-full w-full bg-slate-200 animate-pulse'></div>
                                <div className='rounded-lg grow h-6 w-full bg-slate-200 animate-pulse'></div>
                            </div>
                            <div className="w-[150px] h-[120px] mb-2 space-y-2 flex flex-col p-2 rounded-lg box-shadow justify-end bg-slate-50 animate-pulse">
                                <div className='rounded-lg grow h-full w-full bg-slate-200 animate-pulse'></div>
                                <div className='rounded-lg grow h-6 w-full bg-slate-200 animate-pulse'></div>
                            </div>
                            <div className="w-[150px] h-[120px] mb-2 space-y-2 flex flex-col p-2 rounded-lg box-shadow justify-end bg-slate-50 animate-pulse">
                                <div className='rounded-lg grow h-full w-full bg-slate-200 animate-pulse'></div>
                                <div className='rounded-lg grow h-6 w-full bg-slate-200 animate-pulse'></div>
                            </div>
                        </div>
                    )
                )}
            </div>
            <div className="min-h-[30vh]">
                <hr className="h-1 mx-auto bg-gray-50 border-0 rounded  dark:bg-gray-700" />
                <div className="flex justify-center">
                    <h1 className="text-lg font-bold my-2">Nuevos productos</h1>
                </div>
                <hr className="h-1 mx-auto bg-gray-50 border-0 rounded  dark:bg-gray-700" />
                {isLoading ? (
                    <div className='flex flex-row flex-wrap items-center justify-center space-x-4 mt-4 mb-8'>
                        <div className="w-[250px] h-[275px] mb-2 flex flex-col p-2 rounded-lg box-shadow justify-between bg-slate-50 animate-pulse">
                            <div className='h-auto flex flex-col justify-between cursor-pointer space-y-2'>
                                <div className='rounded-lg h-8 w-12 self-center bg-slate-200 animate-pulse'></div>
                                <div className='rounded-lg h-8 w-28 self-center bg-slate-200 animate-pulse'></div>
                                <div className='rounded-lg h-[140px] w-[235px] bg-slate-200 animate-pulse'></div>
                                <div className='flex flex-row justify-between space-x-4 '>
                                    <div className='rounded-lg h-8 w-8 self-center bg-slate-200 animate-pulse'></div>
                                    <div className='rounded-lg h-8 grow self-center bg-slate-200 animate-pulse'></div>
                                </div>
                            </div>
                        </div>
                        <div className="w-[250px] h-[275px] mb-2 flex flex-col p-2 rounded-lg box-shadow justify-between bg-slate-50 animate-pulse">
                            <div className='h-auto flex flex-col justify-between cursor-pointer space-y-2'>
                                <div className='rounded-lg h-8 w-12 self-center bg-slate-200 animate-pulse'></div>
                                <div className='rounded-lg h-8 w-28 self-center bg-slate-200 animate-pulse'></div>
                                <div className='rounded-lg h-[140px] w-[235px] bg-slate-200 animate-pulse'></div>
                                <div className='flex flex-row justify-between space-x-4 '>
                                    <div className='rounded-lg h-8 w-8 self-center bg-slate-200 animate-pulse'></div>
                                    <div className='rounded-lg h-8 grow self-center bg-slate-200 animate-pulse'></div>
                                </div>
                            </div>
                        </div>
                        <div className="w-[250px] h-[275px] mb-2 flex flex-col p-2 rounded-lg box-shadow justify-between bg-slate-50 animate-pulse">
                            <div className='h-auto flex flex-col justify-between cursor-pointer space-y-2'>
                                <div className='rounded-lg h-8 w-12 self-center bg-slate-200 animate-pulse'></div>
                                <div className='rounded-lg h-8 w-28 self-center bg-slate-200 animate-pulse'></div>
                                <div className='rounded-lg h-[140px] w-[235px] bg-slate-200 animate-pulse'></div>
                                <div className='flex flex-row justify-between space-x-4 '>
                                    <div className='rounded-lg h-8 w-8 self-center bg-slate-200 animate-pulse'></div>
                                    <div className='rounded-lg h-8 grow self-center bg-slate-200 animate-pulse'></div>
                                </div>
                            </div>
                        </div>
                        <div className="w-[250px] h-[275px] mb-2 flex flex-col p-2 rounded-lg box-shadow justify-between bg-slate-50 animate-pulse">
                            <div className='h-auto flex flex-col justify-between cursor-pointer space-y-2'>
                                <div className='rounded-lg h-8 w-12 self-center bg-slate-200 animate-pulse'></div>
                                <div className='rounded-lg h-8 w-28 self-center bg-slate-200 animate-pulse'></div>
                                <div className='rounded-lg h-[140px] w-[235px] bg-slate-200 animate-pulse'></div>
                                <div className='flex flex-row justify-between space-x-4 '>
                                    <div className='rounded-lg h-8 w-8 self-center bg-slate-200 animate-pulse'></div>
                                    <div className='rounded-lg h-8 grow self-center bg-slate-200 animate-pulse'></div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    last4PublishedProducts.length && last4PublishedProducts.length > 0 ? (
                        <div className="flex flex-row flex-wrap items-center justify-center ">
                            {last4PublishedProducts
                                .filter(product => product.isPublished)
                                .map((product) => (
                                    <div key={product.ALBEDOcodigo} className="lg:w-[250px] flex flex-col p-2 m-4  rounded-lg box-shadow justify-between">
                                        <Link href={`products${findProductPath(data, product.ALBEDOcodigo)}`}>
                                            <ProductItem product={product} /></Link>
                                        <AddToCart producto={product} />
                                    </div>
                                ))}
                        </div>
                    ) : (
                                <div className='grid grid-cols-4 items-center justify-center space-x-4 mt-4 mb-8'>
                            {Array.from({ length: 8 }).map((_, index) => (
                                <div key={index} className="w-[250px] h-[275px] mb-2 flex flex-col p-2 rounded-lg box-shadow justify-between bg-slate-50 animate-pulse">
                                    <div className='h-auto flex flex-col justify-between cursor-pointer space-y-2'>
                                        <div className='rounded-lg h-8 w-12 self-center bg-slate-200 animate-pulse'></div>
                                        <div className='rounded-lg h-8 w-28 self-center bg-slate-200 animate-pulse'></div>
                                        <div className='rounded-lg h-[140px] w-[235px] bg-slate-200 animate-pulse'></div>
                                        <div className='flex flex-row justify-between space-x-4'>
                                            <div className='rounded-lg h-8 w-8 self-center bg-slate-200 animate-pulse'></div>
                                            <div className='rounded-lg h-8 grow self-center bg-slate-200 animate-pulse'></div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )
                )}
            </div>
        </Layout>
    );
}
