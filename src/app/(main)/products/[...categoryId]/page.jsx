'use client'
import React, { useState, useEffect } from 'react';
import useCategoryId from '@/hooks/useCategoryId';
import { getDataByUrlId } from '@/lib/data';
import Image from 'next/image';
import Link from 'next/link';
// import { useRouter } from 'next/router';

export default function PageContent() {
    // const router = useRouter();
    // const { slug } = router.query;
    // console.log(slug); 
    const slugArrayHook = useCategoryId();
    const [pageData, setPageData] = useState(null);

    function formateSlugArray(slugArrayHook) {
        if (!Array.isArray(slugArrayHook) || slugArrayHook.length === 0) {
            return ""; // Return empty string if slugArrayHook is not valid
        }

        // Join the slugArrayHook elements into a string with '/' as the delimiter
        return slugArrayHook.join("/");
    }
    useEffect(() => {
        async function fetchData() {
            try {
                const data = await getDataByUrlId(slugArrayHook);
                console.log(data);
                // const foundCategory = data.find(cat => cat.url_Id === slugArrayHook[0].toString());
                // if (foundCategory) {
                // const subcatIds = foundCategory.subCategories[0].url_Id;
                // console.log(subcatIds);
                setPageData(data);
                // } 
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        fetchData();
    }, [slugArrayHook]);

    if (pageData) {
        return <div className='min-h-[50vh]'>
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
                    <div className='flex justify-center my-2'>
                        {pageData.ALBEDOcuerpo}
                    </div>
                    {pageData.subCategories && pageData.subCategories.length > 0 && (
                        <div>
                            <hr className="h-1 mx-auto bg-gray-100 border-0 rounded dark:bg-gray-700" />
                            <div className=' flex justify-center my-2'>
                                <p className='text-lg font-bold'>Sub-Gamas</p>
                            </div>
                            <hr className="h-1 mx-auto bg-gray-100 border-0 rounded dark:bg-gray-700" />
                            <div className='flex flex-row flex-wrap justify-center '>
                                {pageData.subCategories.map((subCat, index) => (
                                    <Link href={`/products/${formateSlugArray(slugArrayHook)}/${subCat.url_Id}`} key={index} className=''>
                                        <div className='w-[250px] flex flex-col justify-center'>
                                            <Image
                                                src={subCat.urlImagen}
                                                alt="Vercel Logo"
                                                className="self-center w-[150px] h-[170px] object-contain"
                                                width={100}
                                                height={24}
                                                priority
                                            />
                                            <p className='self-center font-bold'>
                                                {subCat.name}</p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                    {pageData.products && pageData.products.length > 0 && (
                        <div>
                            <hr className="h-1 mx-auto bg-gray-100 border-0 rounded dark:bg-gray-700" />
                            <div className=' flex justify-center my-2'>
                                <p className='text-lg font-bold'>Productos</p>
                            </div>
                            <hr className="h-1 mx-auto bg-gray-100 border-0 rounded dark:bg-gray-700" />
                            <div className='flex flex-row justify-center space-x-6'>
                                {pageData.products.map((product, index) => (
                                    <Link href={`/products/${formateSlugArray(slugArrayHook)}/${product.url_Id}`}
                                        key={index} className='flex flex-col justify-center'>
                                        <Image
                                            src={product.imagen}
                                            alt="Vercel Logo"
                                            className="self-center w-[150px] h-[170px] object-contain"
                                            width={100}
                                            height={24}
                                            priority
                                        />
                                        <p className='self-center font-bold'>
                                            {product.ALBEDOcodigo}</p>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    }
}
