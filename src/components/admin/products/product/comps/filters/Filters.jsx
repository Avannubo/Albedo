"use client"
import React, { useState, useEffect } from 'react';
import { getFiltersListProducts } from '@/lib/data';
import Restock from '@/components/admin/products/product/comps/Restock';
export default function Filters({ list }) {
    const [isPublishedFilter, setIsPublishedFilter] = useState(true);
    const [categoryFilter, setCategoryFilter] = useState("");

    useEffect(() => {
        // Auto-click the "Publicado" option on component load
        autoClickPublished();
    }, []);

    const onCategoryChange = async (value) => {
        setCategoryFilter(value);
        getFiltersListProducts(isPublishedFilter, value);
    };

    const onFilterChange = (value) => {
        setIsPublishedFilter(value === "true");
        getFiltersListProducts(value === "true", categoryFilter);
    };

    return (
        <div className="flex flex-row justify-end space-x-4 w-auto">
            <select
                value={isPublishedFilter.toString()}
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
