'use client'
import React, { useState, useEffect } from 'react'
import { getCategories } from '@/lib/data'; 

export default function Dropdown() {
    const [isOpen, setIsOpen] = useState(false);
    const [categories, setCategories] = useState([]);
    const [activeCategory, setActiveCategory] = useState(null);

    const handleCategoryHover = (index) => {
        setActiveCategory(index);
    };

    const handleCategoryLeave = () => {
        setActiveCategory(null);
    };
    useEffect(() => {
        async function fetchData() {
            try {
                const data = await getCategories();
                setCategories(data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        }
        fetchData();
    }, []);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const closeDropdown = () => {
        setIsOpen(false);
    };

    // const renderSubCategories = (subCategories) => {
    //     return (
            
    //     );
    // };

    const renderProducts = (products) => {
        return (
            <ul>
                {products.map((product, index) => (
                    <li key={index} className="hover:bg-gray-100 rounded-lg"> 
                        <a href="#" className="block px-4 py-2 text-md text-gray-700 hover" onClick={closeDropdown}>
                            {product.ALBEDOtitulo}
                        </a>
                    </li>
                ))}
            </ul>
        );
    };

    return (
        <div className='w-full py-6 pb-8'>
            <div className="relative inline-block">
                <button
                    type="button"
                    className="px-4 py-2 text-white font-medium rounded-lg text-sm inline-flex items-center"
                    onClick={toggleDropdown}
                >
                    Products <svg className="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                    </svg>
                </button>

                {isOpen && (
                    <div className="origin-top-left absolute left-0 mt-2 w-44 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <ul>
                        {categories.map((category, index) => (
                            <li key={index} className="relative">
                                <a
                                    href="#"
                                    className="block px-4 py-2 text-md text-gray-700 hover:bg-gray-100 rounded-lg"
                                    onMouseEnter={() => handleCategoryHover(index)}
                                    onMouseLeave={handleCategoryLeave}
                                >
                                    {category.name}
                                </a>
                                {activeCategory === index && category.subcategories && (
                                    <div className="absolute top-full left-0 mt-2 w-44 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                                        <ul>
                                            {category.subcategories.map((subCategory, subIndex) => (
                                                <li key={subIndex} className="px-4 py-2 text-md text-gray-700">
                                                    {subCategory.name}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
                )}
            </div>
        </div>
    );
}
