'use client'
import React, { useState, useEffect } from 'react';
import useCategoryId from '@/components/main/useCategoryId';
import { getCategories } from '@/lib/data';
import Image from 'next/image';
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
        <div>
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
                    <div>
                        {category.ALBEDOcuerpo}
                    </div>
                    {category.subCategories && category.subCategories.length > 0 && (
                        <div className='flex flex-row space-x-6'>
                            {category.subCategories.map((subCat, index) => (
                                <div key={index} className='flex flex-col justify-center'>
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

                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>

    );
}
