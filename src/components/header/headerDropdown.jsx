'use client'
import React, { useState,useEffect  } from 'react'
import { getCategories } from '@/lib/data';

export default function Dropdown() {
    // const data = await getCategories();

    const [categories, setCategories] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
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

    return (
        <div className='w-full py-6 pb-8'>
            <div className="relative inline-block">
                <button
                    type="button"
                    className="px-4 py-2 text-white font-medium rounded-lg text-lg inline-flex items-center"
                    onClick={toggleDropdown}
                >
                    Products <svg class="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
                    </svg>
                </button>

                {isOpen && (
                    <div className="origin-top-right absolute left-0 mt-2 w-44 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                        <ul role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                            <li>
                                <a
                                    href="#"
                                    className="block px-4 py-2 text-sm text-gray-700 hover"
                                    onClick={closeDropdown}
                                >
                                    Option 1
                                </a>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    )
} 