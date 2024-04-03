'use client'
import React, { useState, useEffect } from 'react';
import useCategoryId from '@/hooks/useCategoryId';
import { getCategories } from '@/lib/data';
import Image from 'next/image';
import Link from 'next/link';


export default function PageContent() {
    const categoryId = useCategoryId();
    const [category, setCategory] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await getCategories();
                const foundCategory = data.find(cat => cat.id === categoryId);
                if (foundCategory) {
                    setCategory(foundCategory);
                    console.log(JSON.stringify(foundCategory))
                } else {
                    console.error("Category not found for id:", categoryId);
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

                            <div className='flex flex-row justify-center space-x-6'>

                                {category.subCategories.map((subCat, index) => (
                                    <Link href="#" key={index} className='flex flex-col justify-center'>
                                        {/*  */}
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
                                    <Link href={`/productos/${product.ALBEDOcodigo}`}
                                        key={index} className='flex flex-col justify-center'>
                                        {/*  */}
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
