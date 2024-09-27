"use client";
import React, { useState } from 'react';
import { getFiltersListProducts } from '@/lib/data';

export default function Filters({ list }) {
    const [categoryFilter, setCategoryFilter] = useState("");

    const onCategoryChange = async (value) => {
        setCategoryFilter(value);
        getFiltersListProducts(value);
    };

    return (
        <div className="flex flex-row justify-end space-x-4 w-auto">
            <select
                value={categoryFilter}
                onChange={(e) => onCategoryChange(e.target.value)}
                className="w-[170px] px-1.5 py-1 border-2 border-[#304590] rounded-lg focus:outline-none focus:border-[#304590]"
            >
                <option value="">Todas</option>
                {list.map((option, index) => (
                    <option key={index} value={option.name}>
                        {option.name.split(" ").length > 2 ? option.name.split(" ")[0] : option.name}
                    </option>
                ))}
            </select>
        </div>
    );
}
