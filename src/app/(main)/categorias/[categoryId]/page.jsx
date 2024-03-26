'use client'
import React, { useState, useEffect } from 'react';
import useCategoryId from '@/components/main/useCategoryId';
import { getCategoryById } from '@/lib/data';

export default function PageContent() {
    const categoryId = useCategoryId();
    const [category, setCategory] = useState(null); // Changed initial state to null

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await getCategoryById(categoryId);
                setCategory(data); // Fixed state setter function name
            } catch (error) {
                console.error("Error fetching category:", error); // Changed error message to singular
            }
        }
        fetchData();
    }, [categoryId]); // Added categoryId to dependency array

    return (
        <div>
            {categoryId}
            {category && <div>{category.id}</div>} {/* Added null check for category */}
        </div>
    );
}
