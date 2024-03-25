'use client'
import React, { useState, useEffect } from 'react'
import { getCategories } from '@/lib/data';

export default function Dropdown() {
    const [isOpen, setIsOpen] = useState(false);
    const [categories, setCategories] = useState([]);

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

    const SubCategory = ({ subCategory }) => {
        return (
            <li className="group relative">
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" onClick={closeDropdown}>
                    {subCategory.name}
                </a>
                {subCategory.products && (
                    <div className="absolute left-full top-0 mt-0 ml-4">
                        <Products products={subCategory.products} closeDropdown={closeDropdown} />
                    </div>
                )}
                {subCategory.subCategories && (
                    <div className="absolute left-full top-0 mt-0 ml-4">
                        <ul>
                            {subCategory.subCategories.map((subSubCategory, index) => (
                                <SubCategory key={index} subCategory={subSubCategory} />
                            ))}
                        </ul>
                    </div>
                )}
            </li>
        );
    };
    
    const Products = ({ products }) => {
        return (
            <ul>
                {products.map((product, index) => (
                    <li key={index} className="group">
                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" onClick={closeDropdown}>
                            {product.ALBEDOtitulo}
                        </a>
                    </li>
                ))}
            </ul>
        );
    };
    
    const DropdownMenu = ({ categories }) => {
        const renderCategories = (categories) => {
            return (
                <ul>
                    {categories.map((category, index) => (
                        <SubCategory key={index} subCategory={category} />
                    ))}
                </ul>
            );
        };
    
        return (
            <div className="w-full py-6 pb-8">
                <div className="relative inline-block">
                    <button
                        type="button"
                        className="px-4 py-2 text-white font-medium rounded-lg text-sm inline-flex items-center bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onClick={toggleDropdown}
                    >
                        Products
                        <svg className="w-3 h-3 ml-2" fill="none" viewBox="0 0 12 7" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1l5 5 5-5" />
                        </svg>
                    </button>
    
                    {isOpen && (
                        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                            {renderCategories(categories)}
                        </div>
                    )}
                </div>
            </div>
        );
    };

    return (
        <DropdownMenu categories={categories} />
    );
}
