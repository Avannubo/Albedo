"use client"
import React, { useState } from 'react';
export default function Filters({ list }) {
    const [isPublishedFilter, setIsPublishedFilter] = useState(true); // Default filter value
    const [categoryFilter, setCategoryFilter] = useState(''); // Default category filter value
    const filteredCategories = list.filter(category => {
        if (isPublishedFilter !== null && category.isPublished !== isPublishedFilter) {
            return false;
        }
        if (categoryFilter && category.name !== categoryFilter) {
            return false;
        }
        return true;
    });
    const categoryOptions = isPublishedFilter === true ? list.filter(category => category.isPublished === true) : list.filter(category => category.isPublished === false);
    const onCategoryChange = (value) => {
        setCategoryFilter(value);
    };
    console.log(filteredCategories);
    return (
        <div className="flex flex-row space-x-4">
            <select
                value={isPublishedFilter === true ? "" : isPublishedFilter}
                onChange={(e) => setIsPublishedFilter(e.target.value === "" ? true : e.target.value === 'true')}
                className="px-1.5 py-1 border-2 border-[#304590] rounded-lg focus:outline-none focus:border-[#304590] "
            >
                <option value={true}>Publicado</option>
                <option value={false}>Borrador</option>
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
