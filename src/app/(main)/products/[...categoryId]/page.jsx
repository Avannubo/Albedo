'use client'
import React, { useState, useEffect } from 'react';
import useCategoryId from '@/hooks/useCategoryId';
import { getDataByUrlId } from '@/lib/data';
import Image from 'next/image';
import Link from 'next/link';
import AddToCart from '@/components/products/addToCart';
import ProductItem from "@/components/products/productItem";
import DOMPurify from 'dompurify'; // Import DOMPurify for HTML sanitization
export default function PageContent() {
    const slugArrayHook = useCategoryId();
    const [sanitizedHTML, setSanitizedHTML] = useState('');
    const [pageData, setPageData] = useState(null);
    const [productData, setproductData] = useState(null);
    const [productSanitizedHTML, setSanitizedHTMLForProduct] = useState(null);
    function formateSlugArray(slugArrayHook) {
        if (!Array.isArray(slugArrayHook) || slugArrayHook.length === 0) {
            return "";
        }
        return slugArrayHook.join("/");
    }
    useEffect(() => {
        async function fetchData() {
            try {
                if (slugArrayHook && slugArrayHook.length > 0) {
                    const productId = slugArrayHook[slugArrayHook.length - 1];
                    const data = await getDataByUrlId(slugArrayHook);
                    if (data.subCategory) {
                        // If the data contains a subcategory, set the page data to the subcategory
                        setPageData(data.subCategory);
                    }
                    if (data.products && !data.subCategory) {
                        // If the data contains products, find and set the product data
                        const foundProduct = data.products.find(prod => prod.url_Id === productId.toString());
                        if (foundProduct) {
                            setproductData(foundProduct);
                        }
                    }
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        fetchData();
    }, [slugArrayHook]);
    useEffect(() => {
        if (pageData && pageData.ALBEDOcuerpo) {
            // const cleanHTML = DOMPurify.sanitize(pageData.ALBEDOcuerpo);
            // setSanitizedHTML(cleanHTML);
            sanitizeAndSetHTML(pageData.ALBEDOcuerpo, setSanitizedHTML);

        }
        if (productData && productData.ALBEDOcuerpo) {
            // const cleanHTML = DOMPurify.sanitize(productData.ALBEDOcuerpo);
            // setSanitizedHTML(cleanHTML);
            sanitizeAndSetHTML(productData.ALBEDOcuerpo, setSanitizedHTMLForProduct);
        }
    }, [pageData]);
    function sanitizeAndSetHTML(data, setterFunction) {
        if (data) {
            const cleanHTML = DOMPurify.sanitize(data);
            setterFunction(cleanHTML);
        }
    }
    if (pageData && !productData) {
        return (
            <div className='min-h-[50vh]'>
                <hr className="h-1 mx-auto bg-gray-100 border-0 rounded dark:bg-gray-700" />
                {pageData && (
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
                        {/* Render sanitized HTML here */}
                        {pageData.subCategories && pageData.subCategories.length > 0 && (
                            <div>
                                <hr className="h-1 mx-auto bg-gray-100 border-0 rounded dark:bg-gray-700" />
                                <div className='flex justify-center my-2'>
                                    <p className='text-lg font-bold'>Sub-Gamas</p>
                                </div>
                                <hr className="h-1 mx-auto bg-gray-100 border-0 rounded dark:bg-gray-700" />
                                <div className='flex flex-row flex-wrap justify-center mt-2'>
                                    {pageData.subCategories.map((subCat, index) => (
                                        <Link href={`/products/${formateSlugArray(slugArrayHook)}/${subCat.url_Id}`} key={index} className='w-[250px] flex flex-col justify-between m-2  p-2 rounded-md box-shadow'>
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
                                        <div className='flex flex-col justify-between w-[250px] m-2  p-2 rounded-md box-shadow'>
                                            <Link href={`/products/${formateSlugArray(slugArrayHook)}/${product.url_Id}`}
                                                key={product.ALBEDOcodigo} className='mb-2'>
                                                <ProductItem product={product} />
                                            </Link>
                                            <AddToCart producto={product} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        );
    } else if (productData) {
        return (
            <div className='min-h-[30vh]'>
                {productData && (
                    <div className='flex flex-row justify-between my-10'>
                        <div className='w-1/3'>
                            <Image src={productData.imagen} alt={productData.ALBEDOtitulo} width={300} height={350} />
                        </div>
                        <div className='w-2/3'>
                            <h1 className='font-extrabold text-2xl'>{productData.ALBEDOtitulo}</h1>
                            <p className='text-md'>{productData.ALBEDOdescripcion}</p>
                            
                            <div className='flex flex-col text-center justify-center my-2' dangerouslySetInnerHTML={{ __html: productSanitizedHTML }} />

                            <p className='text-xl font-medium'>Precio: {productData.ALBEDOprecio}€</p>
                            <div className='mt-4 w-[250px]'>
                                <AddToCart producto={productData} />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}
