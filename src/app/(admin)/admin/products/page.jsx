"use client"
import { useState, useEffect } from 'react';
import { getCategories } from "@/lib/data";
import Modal from "@/components/admin/products/category/deleteModal";
import Delete from "@/components/admin/products/category/delete";
import AddSubCategory from "@/components/admin/products/subcategory/add";
import AddNewCategoryModal from "@/components/admin/products/category/add";
import AddNewProduct from "@/components/admin/products/product/add";
import EditProduct from "@/components/admin/products/product/edit";
import EditCatedory from "@/components/admin/products/category/edit";
import Duplicate from '@/components/admin/products/product/duplicate';
import Layout from "@/app/(admin)/admin/AdminLayout";
const Category = ({ category, refetchData }) => (
  <div key={category.id} className="space-y-2 w-full">
    <div className="border bg-slate-50 rounded-lg p-2 flex flex-row justify-between mb-2 mt-4">
      <p className="h-auto  self-center">{category.url_Id} : {category.name}</p>
      <div className="space-x-4 flex flex-row justify-center items-center">
        {/* <p>{category.isPublished ? "Publicado" : "Oculto"}</p> */}
        <AddNewProduct categoryId={category} refetchData={refetchData} />
        {/* addSubCat svg */}
        <AddSubCategory categoryId={category} refetchData={refetchData} />
        {/* edit svg */}
        <EditCatedory categoryId={category} refetchData={refetchData} />
        {/* delete svg */}
        <Delete category={category} product={"none"} refetchData={refetchData} />
        <p className={`flex justify-center px-2 py-1 rounded-full w-[100px]  ${category.isPublished ? 'select-none font-medium text-green-500' : 'select-none font-medium text-red-500'}`}>
          {category.isPublished ? "Publicado" : "Oculto"}
        </p>
      </div>
    </div>
    {category.products && category.products.length > 0 && (
      <div>
        {category.products.map((product, index) => (//.reverse()
          <div key={index} className="ml-14 flex flex-row justify-between border bg-slate-50 rounded-lg p-2 mb-1"
          >
            <p className="h-auto w-full self-center ">
              {product.url_Id} : {product.ALBEDOtitulo}
            </p>
            <div className="space-x-4 flex flex-row justify-center items-center">
              <Duplicate category={category} product={product} refetchData={refetchData} />
              <EditProduct category={category}  product={product} refetchData={refetchData} />
              <Delete category={"none"} product={product} refetchData={refetchData} />
              <p className={`flex justify-center  px-2 py-1 rounded-full w-[100px] ${product.isPublished ? 'select-none font-medium  text-green-500' : 'select-none font-medium text-red-500'}`}>
                {product.isPublished ? "Publicado" : "Oculto"}
              </p>
            </div>
          </div>
        ))}
      </div>
    )}
    {category.subCategories &&
      category.subCategories.length > 0 &&
      category.subCategories.map((subCategory, index) => (//reverse()
        <div key={index} className="ml-14">
          <Category category={subCategory} refetchData={refetchData} />
        </div>
      ))}
  </div>
);
export default function Page() {
  const [isPublishedFilter, setIsPublishedFilter] = useState(true); // null represents "All"
  const [categoryFilter, setCategoryFilter] = useState('');
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    fetchData();
  }, []); // Fetch data only once on component mount
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const fetchedCategories = await getCategories();
      setCategories(fetchedCategories);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setIsLoading(false);
    }
  };
  const refetchData = async () => {
    setIsLoading(true);
    fetchData();
  }
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
        <div className="flex flex-row space-x-4">
          <select
            value={isPublishedFilter === true ? "" : isPublishedFilter}
            onChange={(e) => {
              setIsPublishedFilter(e.target.value === "" ? true : e.target.value === 'true');
              setCategoryFilter(''); // Reset category filter when isPublishedFilter changes
            }}
            className="px-1.5 py-1 border-2 border-[#304590] rounded-lg focus:outline-none focus:border-[#304590] "
          >
            <option value={true}>Publicado</option>
            <option value={false}>Borrador</option>
          </select>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-1.5 py-1 border-2 border-[#304590] rounded-lg focus:outline-none focus:border-[#304590]"
          >
            <option value="">Todas las categorias</option>
            {categoryOptions.map((category, index) => (
              <option key={index} value={category.name}>
                {category.name.split(" ").length > 2 ? category.name.split(" ")[0] : category.name}
              </option>
            ))}
          </select>
        </div>
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
              <Category category={category} refetchData={refetchData} />
            </div>
          ))
        ) : (
          <div className="flex-col gap-4 w-full flex items-center justify-center">
            <div className="w-20 h-20 border-8 text-[#304590] text-xl animate-spin border-gray-300 flex items-center justify-center border-t-[#304590] rounded-full">
            </div>
          </div>
        )
      )}
      <Modal />
    </Layout>
  );
}
