'use client';
import React, { useState, useEffect } from 'react';
import useCategoryId from '@/hooks/useCategoryId';
import { getDataByUrlId } from '@/lib/data';
import Image from 'next/image';
import Link from 'next/link';
import AddToCart from '@/components/main/products/addToCart';
import ProductItem from "@/components/main/products/productItem";
import DOMPurify from 'dompurify'; // Import DOMPurify for HTML sanitization
import Layout from "@/app/(main)/WebLayout";
import QuillTextDisplay from '@/components/admin/products/QuillTextDisplay'
import QuillEditor from '@/components/admin/products/QuillEditor';
// Function to sanitize HTML
const sanitizeHTML = (html) => {
    if (!html) return ''; // Return empty string if html is null or undefined
    return DOMPurify.sanitize(html); // Sanitize html using DOMPurify
};
export default function PageContent() {
    const slugArrayHook = useCategoryId();
    // console.log(slugArrayHook.slice(0, -1));
    const [pageData, setPageData] = useState(null);
    const [productData, setProductData] = useState(null);
    const [loading, setLoading] = useState(true); // State for loading status
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [relatedProducts, setRelatedProducts] = useState(0);
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
                        setRelatedProducts(data.products);
                        const foundProduct = data.products.find(prod => prod.url_Id === productId.toString());
                        if (foundProduct) {
                            setProductData(foundProduct);
                            // Filter out the current product from relatedProducts
                            setRelatedProducts(prevRelatedProducts => {
                                let filteredProducts = prevRelatedProducts.filter(product => product.url_Id !== foundProduct.url_Id);
                                // Randomize the array if it has more than 4 elements
                                if (filteredProducts.length > 4) {
                                    filteredProducts = filteredProducts.sort(() => Math.random() - 0.5).slice(0, 4);
                                }
                                return filteredProducts;
                            });
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
            <>{loading ? (
                <> 
                </>
            ) : (
                productData && (
                    <div className='grow'>
                        <div className='flex flex-col md:flex-row justify-between my-10'>
                            <div className='md:w-1/3 md:mr-6 sm:mr-3'>
                                <div className='md:top-18 w-full md:sticky flex flex-col sm:flex-row md:flex-col sm:space-x-2 md:space-x-0'>
                                    <div className='flex flex-col w-full'>
                                        {productData.imagens.map((image, index) => (
                                            <img
                                                key={index}
                                                className={`md:h-[400px] sm:h-[270px] h-[300px] md:w-[550px] object-contain rounded-lg ${index !== currentImageIndex ? 'hidden' : ''}`}
                                                src={image}
                                                alt={`Image ${index + 1}`}
                                                width={1000}
                                                height={1050}
                                            />
                                        ))}
                                        <div className="flex flex-row items-start mt-2">
                                            <div className="flex space-x-4 overflow-x-auto w-full">
                                                {productData.imagens.map((image, index) => (
                                                    <div
                                                        key={index}
                                                        onClick={() => setCurrentImageIndex(index)}
                                                        className={`flex-shrink-0 h-auto w-[85px] border-2 border-transparent text-center cursor-pointer ${index === currentImageIndex ? 'border-gray-900' : ''}`}
                                                    >
                                                        <img
                                                            className="rounded-lg w-[80px] h-[80px] object-contain"
                                                            src={image}
                                                            alt={`Thumbnail ${index + 1}`}
                                                            width={80}
                                                            height={80}
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <div className='my-4 sm:my-0 w-full'>
                                        <h1 className='md:hidden font-extrabold text-2xl'>{productData.ALBEDOtitulo}</h1>
                                        <p className='text-xl font-medium mt-2'><b>Precio: </b>{productData.ALBEDOprecio}€</p>
                                        <div className='md:hidden sm:flex hidden' dangerouslySetInnerHTML={{ __html: sanitizeHTML(productData.ALBEDOdescripcion) }} />
                                        <div className='mt-4 w-full'>
                                            <AddToCart producto={productData} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='md:w-2/3 mt-0 sm:mt-4 md:mt-0'>

                                <h1 className='font-extrabold text-2xl mt-4 md:mt-0 pl-[15px] hidden md:flex'>{productData.ALBEDOtitulo}</h1>
                                    <QuillTextDisplay value={productData.ALBEDOdescripcion} />
                                    {/* <QuillEditor value={productData.ALBEDOdescripcion}  /> */}
                                {/* {productData.ALBEDOdescripcion && <div className='pl-[15px] hidden md:flex md:flex-col' dangerouslySetInnerHTML={{ __html: sanitizeHTML(productData.ALBEDOdescripcion) }} />} */}
                                {productData.archivos.length > 0 && (
                                    <div className='flex flex-col md:pl-[15px]'>
                                        <p className='font-semibold'>Más información / Hoja de características del {productData.ALBEDOtitulo}</p>
                                        {productData.archivos.map((archivo, index) => (
                                            <a key={index}
                                                target='_blank'
                                                rel='noopener noreferrer'
                                                href={`/${archivo}`}
                                                className='font-semibold text-[#304590]'>
                                                {archivo.substring(archivo.lastIndexOf('/') + 1)}
                                            </a>
                                        ))}
                                    </div>
                                )}
                            </div>
                            </div>
                                <h1 className='font-extrabold text-xl mt-4 md:mt-0 pl-[15px] hidden md:flex'>Más Información:</h1>
                            
                            <QuillTextDisplay value={productData.ALBEDOcuerpo} />
                            {/* <QuillEditor value={productData.ALBEDOcuerpo}  /> */}

                        {relatedProducts.length > 1 && (
                            <div className='flex flex-col my-2'>
                                <h1 className='md:font-extrabold font-semibold text-xl mt-4 md:mt-0'>Productos relacionados que pueden ser de su interés:</h1>
                                <div className={"flex flex-row flex-wrap items-start justify-start"}>
                                    {relatedProducts
                                        .filter(product => product.isPublished)
                                        .map((product) => (
                                            <div key={product.ALBEDOcodigo} className="lg:w-[270px] md:w-[300px] md:h-[330px] justify-between w-full m-2 p-2 rounded-md box-shadow">
                                                <Link href={`/products/${slugArrayHook.slice(0, -1).join("/")}/${product.url_Id}`}>
                                                    <ProductItem product={product} />
                                                </Link>
                                                <AddToCart producto={product} />
                                            </div>
                                        ))}
                                </div>
                            </div>
                        )}
                    </div>
                )
            )}
                {loading ? (
                    <>
                        {/* Skeleton for page data */}
                        <div className='flex justify-center mb-6 mt-12'>
                            <div className='w-[200px] rounded-sm bg-gray-300 h-8 animate-pulse'></div>
                        </div>
                        <div className='flex justify-center mb-2'>
                            <div className='w-[250px] rounded-sm bg-gray-300 h-8 animate-pulse'></div>
                        </div>
                        <div className='flex justify-center mb-2'>
                            <div className='w-[480px] rounded-sm bg-gray-300 h-8 animate-pulse'></div>
                        </div>
                        <div className='flex justify-center mb-2'>
                            <div className='w-[450px] rounded-sm bg-gray-300 h-8 animate-pulse'></div>
                        </div>
                        <div className='flex justify-center mb-2'>
                            <div className='w-[550px] rounded-sm bg-gray-300 h-8 animate-pulse'></div>
                        </div>

                        <div className='flex flex-row flex-wrap items-center justify-center space-x-4 mt-4 mb-8'>
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
                    </>
                ) : (pageData && (
                    <div className='min-h-[50vh]'>
                        <hr className="h-1 mx-auto bg-gray-100 border-0 rounded dark:bg-gray-700" />
                        <div className='py-4'>
                            <div className='flex justify-center my-4'>
                                <h1 className='text-2xl font-bold text-center'>{pageData.name}</h1>
                            </div>
                            {pageData.ALBEDOdescripcion && (
                                <div className='flex justify-center my-4 text-center'>
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
                                        {pageData.subCategories
                                            .filter(subCat => subCat.isPublished)
                                            .map((subCat, index) => (
                                                <Link href={`/products/${slugArrayHook.join("/")}/${subCat.url_Id}`} key={index} className='lg:w-[250px] md:w-[300px] w-full flex flex-col justify-between m-2  p-2 rounded-md box-shadow'>
                                                    <img src={subCat.imagens[0]} alt={subCat.name} className="self-center h-[150px] sm:h-[200px]  md:h-[150px] w-full object-contain rounded-lg" width={500} height={500} />
                                                    <p className='text-center font-bold'>{subCat.name}</p>
                                                    <button className="self-center text-white w-full py-1.5 mt-2 rounded-md bg-[#304590] hover:bg-[#475caa]">Ver Más</button>
                                                </Link>
                                            ))
                                        }
                                    </div>
                                </>
                            )}

                            {pageData.products && pageData.products.length > 0 ? (
                                <>
                                    <hr className="h-1 mt-2 mx-auto bg-gray-100 border-0 rounded dark:bg-gray-700" />
                                    <div className='flex justify-center my-2'>
                                        <p className='text-lg font-bold'>Productos</p>
                                    </div>
                                    <hr className="h-1 mb-2 mx-auto bg-gray-100 border-0 rounded dark:bg-gray-700" />
                                    <div className='flex flex-row flex-wrap justify-center space-x-4'>
                                        {pageData.products
                                            .filter(product => product.isPublished)
                                            .map((product) => (
                                                <div className='flex flex-col lg:w-[270px] md:w-[300px] md:h-[330px] justify-between w-full m-2 mb-4 p-2 rounded-md box-shadow' key={product.ALBEDOcodigo}>
                                                    <Link href={`/products/${slugArrayHook.join("/")}/${product.url_Id}`} className='mb-1'>
                                                        <ProductItem product={product} />
                                                    </Link>
                                                    <AddToCart producto={product} />
                                                </div>
                                            ))}
                                    </div>
                                </>
                            ) : (<></>)}
                        </div>
                    </div>
                ))}


            </>
        </Layout>
    );

}