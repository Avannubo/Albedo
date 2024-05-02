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
import QuillTextDisplay from '@/components/admin/products/QuillTextDisplay'
// Function to sanitize HTML
const sanitizeHTML = (html) => {
    if (!html) return ''; // Return empty string if html is null or undefined
    return DOMPurify.sanitize(html); // Sanitize html using DOMPurify
};
export default function PageContent() {
    const slugArrayHook = useCategoryId();
    const [pageData, setPageData] = useState(null);
    const [productData, setProductData] = useState(null);
    const [loading, setLoading] = useState(true); // State for loading status
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Function to handle switching to the previous image
    const prevImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? productData.imagens.length - 1 : prevIndex - 1));
    };

    // Function to handle switching to the next image
    const nextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex === productData.imagens.length - 1 ? 0 : prevIndex + 1));
    };
    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            try {
                if (slugArrayHook && slugArrayHook.length > 0) {
                    const productId = slugArrayHook[slugArrayHook.length - 1];
                    const data = await getDataByUrlId(slugArrayHook);
                    if (data.subCategory) {
                        setPageData(data.subCategory);
                    } else if (data.products) {
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
    return (
        <Layout>
            {loading ? (
                <div className='glex grow min-h-[57vh]'>
                    <div className="flex-col gap-4 w-full flex items-center justify-center">
                        <div className="w-20 h-20 border-8 text-[#304590] text-xl animate-spin border-gray-300 flex items-center justify-center border-t-[#304590] rounded-full">
                        </div>
                    </div>
                </div>
            ) : (
                <>
                    {pageData && (
                        <div className='min-h-[50vh]'>
                            <hr className="h-1 mx-auto bg-gray-100 border-0 rounded dark:bg-gray-700" />
                            <div className='py-4'>
                                <div className='flex justify-center my-4'>
                                    <h1 className='text-2xl font-bold text-center'>{pageData.name}</h1>
                                </div>
                                {pageData.ALBEDOdescripcion && (
                                    <div className='flex justify-center my-4 text-center'>
                                        {/* <h1 className='text-lg font-normal'> {pageData.ALBEDOdescripcion}</h1> */}
                                        <div dangerouslySetInnerHTML={{ __html: sanitizeHTML(pageData?.ALBEDOdescripcion) }} />
                                    </div>
                                )}
                                <div className='flex flex-col text-center justify-center my-2' dangerouslySetInnerHTML={{ __html: sanitizeHTML(pageData?.ALBEDOcuerpo) }} />
                                {pageData.subCategories && pageData.subCategories.length > 0 && (
                                    <>
                                        <hr className="h-1 mx-auto bg-gray-100 border-0 rounded dark:bg-gray-700" />
                                        <div className='flex justify-center my-2'>
                                            <p className='text-lg font-bold'>Sub-Gamas</p>
                                        </div>
                                        <hr className="h-1 mx-auto bg-gray-100 border-0 rounded dark:bg-gray-700" />
                                        <div className='flex flex-row flex-wrap justify-center mt-2'>
                                            {pageData.subCategories.map((subCat, index) => (
                                                <Link href={`/products/${slugArrayHook.join("/")}/${subCat.url_Id}`} key={index} className='lg:w-[250px] md:w-[300px] w-full flex flex-col justify-between m-2  p-2 rounded-md box-shadow'>
                                                    <Image src={subCat.imagens[0]} alt="Vercel Logo" className="self-center w-full h-[170px] rounded-lg" width={100} height={24} />
                                                    <p className='text-center font-bold'>{subCat.name}</p>
                                                    <button className="self-center text-white w-full py-1.5 mt-2 rounded-md bg-[#304590] hover:bg-[#475caa]">Ver Más</button>
                                                </Link>
                                            ))}
                                        </div>
                                    </>
                                )}
                                {pageData.products && pageData.products.length > 0 && (
                                    <>
                                        <hr className="h-1 mt-2 mx-auto bg-gray-100 border-0 rounded dark:bg-gray-700" />
                                        <div className='flex justify-center my-2'>
                                            <p className='text-lg font-bold'>Productos</p>
                                        </div>
                                        <hr className="h-1 mb-2 mx-auto bg-gray-100 border-0 rounded dark:bg-gray-700" />
                                        <div className='flex flex-row flex-wrap justify-center space-x-4'>
                                            {pageData.products.map((product) => (
                                                <div className='flex flex-col justify-between lg:w-[270px] md:w-[300px] w-full m-2 p-2 rounded-md box-shadow' key={product.ALBEDOcodigo}>
                                                    <Link href={`/products/${slugArrayHook.join("/")}/${product.url_Id}`} className='mb-1'>
                                                        <ProductItem product={product} />
                                                    </Link>
                                                    <AddToCart producto={product} />
                                                </div>
                                            ))}
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    )}
                    {productData && (
                        <div className='grow'>
                            <div className='flex flex-col md:flex-row  justify-between my-10'>
                                    <div className='md:w-1/3  md:mr-6 sm:mr-3'>
                                    <div className='md:top-28 md:sticky flex flex-col sm:flex-row md:flex-col  sm:space-x-2 md:space-x-0'>
                                        {/* <Image className='rounded-lg w-full m-0 sm:mr-4 sm:mb-4' src={productData.imagens[0]} alt={productData.ALBEDOtitulo} width={300} height={350} /> */}

                                        {/* Map over each image in productData.imagens */}
                                        <div className='flex flex-col'>
                                            {productData.imagens.map((image, index) => (
                                                <Image
                                                    key={index} // Make sure to provide a unique key for each image
                                                    className={`md:h-[400px] sm:h-[270px] h-[300px] md:w-[550px] object-cover rounded-lg ${index !== currentImageIndex ? 'hidden' : ''}`}
                                                    src={image}
                                                    alt={`Image ${index + 1}`} // Alt text can be dynamic if needed
                                                    width={4000}
                                                    height={5050}
                                                />
                                            ))}

                                            <div className="flex flex-row items-start mt-2 ">
                                                {/* Thumbnails of all images for navigation */}
                                                {productData.imagens.map((image, index) => (
                                                    <div key={index} onClick={() => setCurrentImageIndex(index)} className={`space-x-4 h-auto w-auto overflow-hidden  border-2 border-transparent text-center cursor-pointer ${index === currentImageIndex ? 'border-gray-900' : ''}`}>
                                                        <Image
                                                            className="rounded-lg w-[100px] h-auto mr-1"
                                                            src={image}
                                                            alt={`Thumbnail ${index + 1}`}
                                                            width={1000}
                                                            height={1000}
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <div className='my-4 sm:my-0 w-full'>
                                            <h1 className='md:hidden font-extrabold text-2xl'>{productData.ALBEDOtitulo}</h1>
                                            <p className='text-xl font-medium mt-2'><b>Precio: </b>{productData.ALBEDOprecio}€</p>
                                            <div className='md:hidden sm:flex hidden' dangerouslySetInnerHTML={{ __html: sanitizeHTML(productData.ALBEDOdescripcion) }} />
                                            <div className='mt-4 w-[250px]'>
                                                <AddToCart producto={productData} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='md:w-2/3 mt-0 sm:mt-4 md:mt-0'>
                                    <h1 className='font-extrabold text-2xl mt-4 md:mt-0 pl-[15px] hidden md:flex'>{productData.ALBEDOtitulo}</h1>
                                    {productData.ALBEDOdescripcion &&
                                        <div className='pl-[15px] hidden md:flex' dangerouslySetInnerHTML={{ __html: sanitizeHTML(productData.ALBEDOdescripcion) }} />}
                                    <QuillTextDisplay value={productData.ALBEDOcuerpo} />
                                    {
                                        productData.archivos && (
                                            <div className='flex flex-col md:pl-[15px]'>
                                                <p className='font-semibold'>Más información / Hoja de características del {productData.ALBEDOtitulo}</p>
                                                {productData.archivos.map((archivo, index) => (
                                                    <Link key={index} target='__blank' href={`http://localhost:3000/${archivo}`} className='font-semibold text-[#304590]'>
                                                        {archivo.substring(archivo.lastIndexOf('/') + 1)}
                                                    </Link>
                                                ))}
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    )}
                </>
            )
            }
        </Layout >
    );
}