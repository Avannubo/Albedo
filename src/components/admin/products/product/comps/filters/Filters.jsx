"use client"
import React, { useState } from 'react';
import { getFiltersListProducts } from '@/lib/data';

export default function Filters({ list }) {
    const [isPublishedFilter, setIsPublishedFilter] = useState(true);
    const [categoryFilter, setCategoryFilter] = useState("");
    const [refillStock, setRefillStock] = useState(false);

    const categoryOptions = isPublishedFilter === true
        ? list.filter(category => category.isPublished === true)
        : list.filter(category => category.isPublished === false);

    const onCategoryChange = async (value) => {
        setCategoryFilter(value);
        getFiltersListProducts(isPublishedFilter, value, refillStock);
    };

    const handleInputChangeRefillStock = (event) => {
        setRefillStock(event.target.checked);
    };

    const onFilterChange = (value) => {
        setIsPublishedFilter(value === "true");
         getFiltersListProducts(value === "true", categoryFilter, refillStock);
    };

    return (
        <div className="flex flex-row justify-end space-x-4 w-auto">
            <div className='flex justify-start'>
                <label className="inline-flex items-center cursor-pointer">
                    <input
                        onChange={handleInputChangeRefillStock}
                        type="checkbox"
                        checked={refillStock}
                        className="sr-only peer"
                    />
                    <div className="self-center relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#304590]"></div>
                </label>
                <span className="mx-3 text-lg self-center font-medium text-gray-900 dark:text-gray-300">Rellenar Stock</span>
            </div>

            <select
                value={isPublishedFilter === true ? "" : isPublishedFilter.toString()}
                onChange={(e) => onFilterChange(e.target.value)}
                disabled={refillStock} // Disable if refillStock is true
                className="px-1.5 py-1 border-2 border-[#304590] rounded-lg focus:outline-none focus:border-[#304590]"
            >
                <option value="true">Publicado</option>
                <option value="false">Borrador</option>
            </select>

            <select
                value={categoryFilter}
                onChange={(e) => onCategoryChange(e.target.value)}
                disabled={refillStock} // Disable if refillStock is true
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
