'use client'

import React, { useState, useEffect } from 'react';
import useCategoryId from '@/components/hooks/useCategoryId';
import { getCategories } from '@/lib/data';
import Image from 'next/image';
import Link from 'next/link';


export default function page() {
  const categoryId = useCategoryId();
  const [product, setProduct] = useState(null);
  useEffect(() => {
    async function fetchData() {
        try {
            const data = await getCategories();
            const foundProduct = data.find(cat => cat.products.ALBEDOcodigo === categoryId);
            if (foundProduct) {
              setProduct(foundProduct);
                console.log(JSON.stringify(foundProduct))
            } else {
                console.error("Category not found for id:", categoryId);
            }
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    }
    fetchData();
}, [categoryId]);

  return (
    <div>product page</div>
  )
}
