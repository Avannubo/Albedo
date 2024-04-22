'use client';
import React, { useState, useEffect } from 'react';
import useCategoryId from '@/hooks/useCategoryId';
import { getDataByUrlId } from '@/lib/data';
import Image from 'next/image';
import Link from 'next/link';
import AddToCart from '@/components/products/addToCart';
import ProductItem from "@/components/products/productItem";
import DOMPurify from 'dompurify'; // Import DOMPurify for HTML sanitization
import Layout from "@/app/(main)/WebLayout";

export default function PageContent() {
    const slugArrayHook = useCategoryId();
    const [sanitizedHTML, setSanitizedHTML] = useState('');
    const [pageData, setPageData] = useState(null);
    const [productData, setProductData] = useState(null);
    const [productSanitizedHTML, setSanitizedHTMLForProduct] = useState('');
    const [loading, setLoading] = useState(true); // State for loading status

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            try {
                if (slugArrayHook && slugArrayHook.length > 0) {
                    const productId = slugArrayHook[slugArrayHook.length - 1];
                    const data = await getDataByUrlId(slugArrayHook);
                    if (data.subCategory) {
                        setPageData(data.subCategory);
                    }
                    if (data.products && !data.subCategory) {
                        const foundProduct = data.products.find(prod => prod.url_Id === productId.toString());
                        if (foundProduct) {
                            setProductData(foundProduct);
                        }
                    }
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
            setLoading(false);

        }
        fetchData();
    }, [slugArrayHook]);

    useEffect(() => {
        function sanitizeAndSetHTML(data, setterFunction) {
            if (data) {
                const cleanHTML = DOMPurify.sanitize(data);
                setterFunction(cleanHTML);
            }
        }

        if (pageData && pageData.ALBEDOcuerpo) {
            sanitizeAndSetHTML(pageData.ALBEDOcuerpo, setSanitizedHTML);
        }

        if (productData && productData.ALBEDOcuerpo) {
            sanitizeAndSetHTML(productData.ALBEDOcuerpo, setSanitizedHTMLForProduct);
        }
    }, [pageData, productData]);
    return (
        <Layout>
            {loading && (
                <div className="flex-col gap-4 w-full flex items-center justify-center">
                    <div className="w-20 h-20 border-8 text-[#304590] text-xl animate-spin border-gray-300 flex items-center justify-center border-t-[#304590] rounded-full">
                    </div>
                </div>
            )}
            {pageData && (
                <div className='min-h-[50vh]'>
                    <hr className="h-1 mx-auto bg-gray-100 border-0 rounded dark:bg-gray-700" />
                    <div className='py-4'>
                        <div className='flex justify-center my-4'>
                            <h1 className='text-2xl font-bold'>
                                {pageData.name}
                            </h1>
                        </div>
                        <div className='flex justify-center my-4'>
                            <h1 className='text-lg font-normal'>
                                {pageData.ALBEDOdescripcion}
                            </h1>
                        </div>
                        <div className='flex flex-col text-center justify-center my-2' dangerouslySetInnerHTML={{ __html: sanitizedHTML }} />
                        {pageData.subCategories && pageData.subCategories.length > 0 && (
                            <div>
                                <hr className="h-1 mx-auto bg-gray-100 border-0 rounded dark:bg-gray-700" />
                                <div className='flex justify-center my-2'>
                                    <p className='text-lg font-bold'>Sub-Gamas</p>
                                </div>
                                <hr className="h-1 mx-auto bg-gray-100 border-0 rounded dark:bg-gray-700" />
                                <div className='flex flex-row flex-wrap justify-center mt-2'>
                                    {pageData.subCategories.map((subCat, index) => (
                                        <Link href={`/products/${slugArrayHook.join("/")}/${subCat.url_Id}`} key={index} className='w-[250px] flex flex-col justify-between m-2  p-2 rounded-md box-shadow'>
                                            <Image
                                                src={subCat.imagen}
                                                alt="Vercel Logo"
                                                className="self-center w-full h-[170px] rounded-lg"
                                                width={100}
                                                height={24}
                                            />
                                            <p className='text-center font-bold'>
                                                {subCat.name}</p>
                                            <button className="self-center text-white w-full py-1.5 mt-2 rounded-md bg-[#304590] hover:bg-[#475caa]">Ver Más</button>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                        {pageData.products && pageData.products.length > 0 && (
                            <div>
                                <hr className="h-1 mx-auto bg-gray-100 border-0 rounded dark:bg-gray-700" />
                                <div className='flex justify-center my-2'>
                                    <p className='text-lg font-bold'>Productos</p>
                                </div>
                                <hr className="h-1 mx-auto bg-gray-100 border-0 rounded dark:bg-gray-700" />
                                <div className='flex flex-row flex-wrap justify-center space-x-4'>
                                    {pageData.products.map((product) => (
                                        <div className='flex flex-col justify-between w-[250px] m-2  p-2 rounded-md box-shadow' key={product.ALBEDOcodigo}>
                                            <Link href={`/products/${slugArrayHook.join("/")}/${product.url_Id}`}>
                                                <ProductItem product={product} />
                                            </Link>
                                            <AddToCart producto={product} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
            {productData && (
                <div className='min-h-[30vh]'>
                    <div className='flex flex-row justify-between my-10'>
                        <div className='w-1/3'>
                            <Image className='rounded-lg' src={productData.imagen} alt={productData.ALBEDOtitulo} width={300} height={350} />
                        </div>
                        <div className='w-2/3'>
                            <h1 className='font-extrabold text-2xl'>{productData.ALBEDOtitulo}</h1>
                            <p className='text-md'>{productData.ALBEDOdescripcion}</p>
                            <div className='flex flex-col text-start my-2' dangerouslySetInnerHTML={{ __html: productSanitizedHTML }} />
                            <p className='text-xl font-medium'>Precio: {productData.ALBEDOprecio}€</p>
                            <div className='mt-4 w-[250px]'>
                                <AddToCart producto={productData} />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </Layout>
    );

}
