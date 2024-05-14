"use client"
import React, { useState } from 'react';
import { getFiltersListProducts } from '@/lib/data'; 
export default function Filters({ list }) {
    const [isPublishedFilter, setIsPublishedFilter] = useState(true); // Default filter value
    const [categoryFilter, setCategoryFilter] = useState(''); // Default category filter value

    const categoryOptions = isPublishedFilter === true ? list.filter(category => category.isPublished === true) : list.filter(category => category.isPublished === false);

    const onCategoryChange = async (value) => {
        if (value === "") {
            setCategoryFilter(value);
            getFiltersListProducts(isPublishedFilter, '');
        } else {
            setCategoryFilter(value);
            getFiltersListProducts(isPublishedFilter, value);
        }
    };

    const onFilterChange = (value) => {
        setIsPublishedFilter(value === "true" ? true : false);
        getFiltersListProducts(value === "true", categoryFilter);
    };

    return (
        <div className="flex flex-row justify-end space-x-4 w-auto">
            <select
                value={isPublishedFilter === true ? "" : isPublishedFilter.toString()}
                onChange={(e) => onFilterChange(e.target.value)}
                className="px-1.5 py-1 border-2 border-[#304590] rounded-lg focus:outline-none focus:border-[#304590] "
            > 
                <option value="true">Publicado</option>
                <option value="false">Borrador</option>
            </select>
            <select
                value={categoryFilter}
                onChange={(e) => onCategoryChange(e.target.value)}
                className="w-[170px] px-1.5 py-1 border-2 border-[#304590] rounded-lg focus:outline-none focus:border-[#304590] "
            >
                <option value="">Todas</option>
                {categoryOptions.map((option, index) => (
                    <option key={index} value={option.name}>
                        {option.name.split(" ").length > 2 ? option.name.split(" ")[0] : option.name}
                    </option>
                ))}
            </select>
        </div>
    )
}
