"use client";
import React, { useState, useEffect } from 'react';
import { getFiltersListProducts } from '@/lib/data';

export default function Filters({ list }) {
    const [isPublishedFilter, setIsPublishedFilter] = useState(true);
    const [categoryFilter, setCategoryFilter] = useState("");

    const categoryOptions = isPublishedFilter
        ? list.filter(category => category.isPublished === true)
        : list.filter(category => category.isPublished === false);

    const onCategoryChange = async (value) => {
        setCategoryFilter(value);
        getFiltersListProducts(isPublishedFilter, value);
    };

    const onFilterChange = (value) => {
        setIsPublishedFilter(value === "true");
        getFiltersListProducts(value === "true", categoryFilter);
    };

    // useEffect(() => {
    //     // Set the filter to "Borrador" and then back to "Publicado" after a short delay
    //     const toggleOnce = () => {
    //         setIsPublishedFilter(false); // Change to "Borrador"
    //         getFiltersListProducts(false, categoryFilter); // Fetch products for "Borrador"

    //         setTimeout(() => {
    //             setIsPublishedFilter(true); // Change back to "Publicado"
    //             getFiltersListProducts(true, categoryFilter); // Fetch products for "Publicado"
    //         }, 1000); // Delay before switching back (2000 ms = 2 seconds)
    //     };

    //     toggleOnce();
    // }, []); // Empty dependency array ensures this runs only once on mount

    return (
        <div className="flex flex-row justify-end space-x-4 w-auto ">
            <select
                value={isPublishedFilter ? "" : isPublishedFilter.toString()}
                onChange={(e) => onFilterChange(e.target.value)}
                className="px-1.5 py-1 border-2 border-[#304590] rounded-lg focus:outline-none focus:border-[#304590]"
            >
                <option value="true">Publicado</option>
                <option value="false">Borrador</option>
            </select>

            <select
                value={categoryFilter}
                onChange={(e) => onCategoryChange(e.target.value)}
                className="w-[170px] px-1.5 py-1 border-2 border-[#304590] rounded-lg focus:outline-none focus:border-[#304590]"
            >
                <option value="">Todas</option>
                {categoryOptions.map((option, index) => (
                    <option key={index} value={option.name}>
                        {option.name.split(" ").length > 2 ? option.name.split(" ")[0] : option.name}
                    </option>
                ))}
            </select>
        </div>
    );
}
