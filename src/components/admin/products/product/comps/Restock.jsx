"use client"
import React, { useState, useEffect, useRef } from 'react';
import { getRefillStockProducts } from '@/lib/data'; // Adjust import path as per your project structure
import EditProduct from "@/components/admin/products/product/actions/edit";

export default function Restock() {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [refillProducts, setRefillProducts] = useState([]);
    const dropdownRef = useRef(null);

    useEffect(() => {
        fetchRefillProducts();
        const intervalId = setInterval(fetchRefillProducts, 3000);
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            clearInterval(intervalId);
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const fetchRefillProducts = async () => {
        try {
            const products = await getRefillStockProducts(); // Assuming getRefillStockProducts returns an array of products
            setRefillProducts(products);
        } catch (error) {
            console.error("Error fetching refill products:", error);
        }
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setDropdownOpen(false);
        }
    };

    return (
        <div className="relative">
            <button
                className="px-1.5 h-full py-1 border-2 border-[#304590] rounded-lg focus:outline-none focus:border-[#304590]"
                onClick={toggleDropdown}
            >
                Rellenar Stock
            </button>
            {dropdownOpen && (
                <div ref={dropdownRef} className="origin-top-right absolute right-0 mt-2 w-58 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                        <div className="flex flex-col space-y-2 p-2">
                            {refillProducts && refillProducts.length > 0 ? (
                                refillProducts.map((product, index) => (
                                    <div key={index} className="p-2 bg-slate-100 rounded-lg flex flex-row justify-between space-x-6">
                                        <div className='flex flex-row space-x-4'>
                                            <p className="h-auto w-full self-center whitespace-nowrap">
                                                {product.ALBEDOtitulo}
                                            </p>
                                        </div>
                                        <div className="space-x-4 flex flex-row justify-center items-center">
                                            <EditProduct product={product} />
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="h-auto w-full self-center whitespace-nowrap">
                                    Está todo rellenado.
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
