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
import Layout from "@/app/(admin)/admin/AdminLayout";
const Category = ({ category }) => (
  <div key={category.id} className="space-y-2 w-full">
    <div className="border bg-slate-50 rounded-lg p-2 flex flex-row justify-between mb-2 mt-4">
      <p className="h-auto  self-center">{category.url_Id} : {category.name}</p>
      <div className="space-x-4 flex flex-row justify-center items-center">
        {/* <p>{category.isPublished ? "Publicado" : "Oculto"}</p> */}
        <AddNewProduct categoryId={category} />
        {/* addSubCat svg */}
        <AddSubCategory categoryId={category} />
        {/* edit svg */}
        <EditCatedory categoryId={category} />
        {/* delete svg */}
        <Delete categoryId={category} productId={"none"} />
        <p className={`flex justify-center px-2 py-1 rounded-full w-[100px]  ${category.isPublished ? 'select-none font-medium text-green-600' : 'select-none font-medium text-red-600'}`}>
          {category.isPublished ? "Publicado" : "Oculto"}
        </p>
      </div>
    </div>
    {category.products && category.products.length > 0 && (
      <div>
        {category.products.reverse().map((product) => (
          <div
            key={product.ALBEDOcodigo}
            className="ml-14 flex flex-row justify-between border bg-slate-50 rounded-lg p-2 mb-1"
          >
            <p className="h-auto w-full self-center ">
              {product.url_Id} : {product.ALBEDOtitulo}
            </p>
            <div className="space-x-4 flex flex-row justify-center items-center">
              <EditProduct productId={product.ALBEDOcodigo} />
              <Delete categoryId={"none"} productId={product} />
              <p className={`flex justify-center  px-2 py-1 rounded-full w-[100px] ${product.isPublished ? 'select-none font-medium  text-green-600' : 'select-none font-medium text-red-600'}`}>
                {product.isPublished ? "Publicado" : "Oculto"}
              </p>
            </div>
          </div>
        ))}
      </div>
    )}
    {category.subCategories &&
      category.subCategories.length > 0 &&
      category.subCategories.map((subCategory) => (//reverse()
        <div key={subCategory.id} className="ml-14">
          <Category category={subCategory} />
        </div>
      ))}
  </div>
);
export default function Page() {
  const [isPublishedFilter, setIsPublishedFilter] = useState(true);
  const [fetchedFilters, setfetchedFilters] = useState([]);
  
  const [categoryFilter, setCategoryFilter] = useState('');
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    fetchData();
  }, [isPublishedFilter, categoryFilter]); // Fetch data on component mount
  const fetchData = async () => { 
    const fetchedCategories = await getCategories();
    let filteredData = fetchedCategories;
    if (isPublishedFilter !== null) {
      filteredData = filteredData.filter(category => category.isPublished === isPublishedFilter);
    }
    if (categoryFilter !== '') {
      filteredData = filteredData.filter(category => category.name === categoryFilter);
    }
    setfetchedFilters(fetchedCategories)
    setCategories(filteredData);
  };
  // const getCategoryNames = () => {
  //   return categories.map(category => category.name);
  // };
  return (
    <Layout>
      <div className="flex flex-row justify-between mb-8">
        <div className="flex flex-row">
          <h1 className="font-semibold text-4xl">Productos</h1>
          <AddNewCategoryModal />
        </div>
        <div className="flex flex-row space-x-4">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-1 border-2 border-blue-100 rounded-lg focus:outline-none focus:border-[#304590]"
          >
            <option value="">All Categories</option>
            {fetchedFilters.map((name, index) => (
              <option key={index} value={name.name}>{name.name.split(" ").length > 2
                ? name.name.split(" ")[0]
                : name.name}</option>
            ))}
          </select>
          <select
            value={isPublishedFilter}
            onChange={(e) => setIsPublishedFilter(e.target.value === 'true' ? true : false)}
            className="px-3 py-1 border-2 border-blue-100 rounded-lg focus:outline-none focus:border-[#304590] "
          >
            <option value={true}>Publicado</option>
            <option value={false}>Borrador</option>
          </select>
        </div>
      </div>
      {categories.map((category) => (
        <div key={category.id} className="mt-6">
          <Category category={category} />
        </div>
      ))}
      <Modal />
    </Layout>
  );
}
