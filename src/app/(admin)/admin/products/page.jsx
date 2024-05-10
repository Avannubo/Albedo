"use client"
import React, { useState, useEffect } from 'react';
import { getCategories } from "@/lib/data";
import AddNewCategoryModal from "@/components/admin/products/category/add";
import Layout from "@/app/(admin)/admin/AdminLayout";
import List from '@/components/admin/products/product/comps/productList';
import FilterSection from '@/components/admin/products/product/comps/filters/FilterSection';

export default function Page() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isPublishedFilter, setIsPublishedFilter] = useState(true); // Default filter value
  const [categoryFilter, setCategoryFilter] = useState(''); // Default category filter value

  useEffect(() => {
    fetchData();
  }, []); // Fetch data only once on component mount

  const fetchData = async () => {
    setIsLoading(true);
    const fetchedCategories = await getCategories();
    setCategories(fetchedCategories);
    setIsLoading(false);

    // Set default filter values based on fetched data
    // For example, you can set the first category as the default category filter
    if (fetchedCategories.length > 0) {
      setCategoryFilter(fetchedCategories[0].name);
    }
  };

  const refetchData = async () => {
    setIsLoading(true);
    fetchData();
  }

  // Define filteredCategories based on current state and filter logic
  const filteredCategories = categories.filter(category => {
    if (isPublishedFilter !== null && category.isPublished !== isPublishedFilter) {
      return false;
    }
    if (categoryFilter && category.name !== categoryFilter) {
      return false;
    }
    return true;
  });
  const categoryOptions = isPublishedFilter === true ? categories.filter(category => category.isPublished === true) : categories.filter(category => category.isPublished === false);
  return (
    <Layout>
      <div className="flex flex-row justify-between mb-8">
        <div className="flex flex-row">
          <h1 className="font-semibold text-4xl">Productos</h1>
          <AddNewCategoryModal refetchData={refetchData} />
        </div>
        <FilterSection
          isPublishedFilter={isPublishedFilter}
          categoryFilter={categoryFilter}
          onPublishedChange={setIsPublishedFilter}
          onCategoryChange={setCategoryFilter}
          categoryOptions={categoryOptions}
        />
      </div>
      {isLoading ? (
        <div className="flex-col gap-4 w-full flex items-center justify-center">
          <div className="w-20 h-20 border-8 text-[#304590] text-xl animate-spin border-gray-300 flex items-center justify-center border-t-[#304590] rounded-full">
          </div>
        </div>
      ) : (
        filteredCategories.length > 0 ? (
          filteredCategories.map((category, index) => (
            <div key={index} className="my-10">
              <List category={category} refetchData={refetchData} />
            </div>
          ))
        ) : (
          <div className="flex-col gap-4 w-full flex items-center justify-center">
            <div className="w-20 h-20 border-8 text-[#304590] text-xl animate-spin border-gray-300 flex items-center justify-center border-t-[#304590] rounded-full">
            </div>
          </div>
        )
      )}
    </Layout>
  );
}
