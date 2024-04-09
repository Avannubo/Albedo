'use client'
import React, { useState, useEffect } from 'react';
import useCategoryId from '@/hooks/useCategoryId';
import { getCategories } from '@/lib/data';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function PageContent() {
    const categoryId = useCategoryId();
    const [category, setCategory] = useState(null);
    const [subCategory, setSubCategory] = useState(null);
    const [product, setProduct] = useState(null);
    useEffect(() => {
        async function fetchData() {
            try {
                const data = await getCategories();
                console.log(categoryId); 
                    const foundCategory = data.find(cat => cat.url_Id === categoryId[0].toString());
                    if (foundCategory) {
                        const subcatIds = foundCategory.subCategories[0].url_Id;
                        console.log(subcatIds);
                        setCategory(foundCategory);
                    } 
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        }
        fetchData();
    }, [categoryId]);
    return (
        <div className='min-h-[50vh]'>
            <hr className="h-1 mx-auto bg-gray-100 border-0 rounded dark:bg-gray-700" />
            {category && (
                <div className='py-4'>
                    <div className='flex justify-center my-4'>
                        <h1 className='text-2xl font-bold'>
                            {category.name}
                        </h1>
                    </div>
                    <div className='flex justify-center my-4'>
                        <h1 className='text-lg font-normal'>
                            {category.ALBEDOdescripcion}
                        </h1>
                    </div>
                    <div className='flex justify-center my-2'>
                        {category.ALBEDOcuerpo}
                    </div>
                    {category.subCategories && category.subCategories.length > 0 && (
                        <div>
                            <hr className="h-1 mx-auto bg-gray-100 border-0 rounded dark:bg-gray-700" />
                            <div className=' flex justify-center my-2'>
                                <p className='text-lg font-bold'>Sub-Gamas</p>
                            </div>
                            <hr className="h-1 mx-auto bg-gray-100 border-0 rounded dark:bg-gray-700" />
                            <div className='flex flex-row flex-wrap justify-center '>
                                {category.subCategories.map((subCat, index) => (
                                    <Link href={`/products/${categoryId}/${subCat.url_Id}`} key={index} className=''>
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
                    {category.products && category.products.length > 0 && (
                        <div>
                            <hr className="h-1 mx-auto bg-gray-100 border-0 rounded dark:bg-gray-700" />
                            <div className=' flex justify-center my-2'>
                                <p className='text-lg font-bold'>Productos</p>
                            </div>
                            <hr className="h-1 mx-auto bg-gray-100 border-0 rounded dark:bg-gray-700" />
                            <div className='flex flex-row justify-center space-x-6'>
                                {category.products.map((product, index) => (
                                    <Link href={`/products/${categoryId}/${product.url_Id}`}
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
                                            {product.ALBEDOtitulo}</p>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>

    );
}
