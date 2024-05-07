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
const Category = ({ category, fetchData }) => (

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
        <p className={`flex justify-center px-2 py-1 rounded-full w-[100px]  ${category.isPublished ? 'select-none font-medium text-green-500' : 'select-none font-medium text-red-500'}`}>
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
              <EditProduct  productId={product} />
              <Delete categoryId={"none"} productId={product} />
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
      category.subCategories.map((subCategory) => (//reverse()
        <div key={subCategory.id} className="ml-14">
          <Category category={subCategory} />
        </div>
      ))}
  </div>
);
export default function Page() {
  const [isPublishedFilter, setIsPublishedFilter] = useState(true); // null represents "All"
  const [categoryFilter, setCategoryFilter] = useState('');
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, [isPublishedFilter, categoryFilter]); // Fetch data on filter change
  const fetchData = async () => {
    setIsLoading(true);
    const fetchedCategories = await getCategories();
    let filteredData = fetchedCategories;
    if (isPublishedFilter !== null) {
      filteredData = filteredData.filter(category => category.isPublished === isPublishedFilter);
    }
    setFilters(filteredData)
    if (categoryFilter !== '') {
      filteredData = filteredData.filter(category => category.name === categoryFilter);
    }
    setCategories(filteredData);
    setIsLoading(false);
  };
  const getCategoryNames = () => {
    return filters.map(category => category.name);
  };
  return (
    <Layout>
      <div className="flex flex-row justify-between mb-8">
        <div className="flex flex-row">
          <h1 className="font-semibold text-4xl">Productos</h1>
          <AddNewCategoryModal />
        </div>
        <div className="flex flex-row space-x-4">
          <select
            value={isPublishedFilter === true ? "" : isPublishedFilter}
            onChange={(e) => setIsPublishedFilter(e.target.value === "" ? true : e.target.value === 'true')}
            className="px-3 py-1 border-2 border-[#304590] rounded-lg focus:outline-none focus:border-[#304590] "
          >
            {/* <option value="">Todos</option> */}
            <option value={true}>Publicado</option>
            <option value={false}>Borrador</option>
          </select>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-1 border-2 border-[#304590] rounded-lg focus:outline-none focus:border-[#304590]"
          >
            <option value="">Todas las categorias</option>
            {getCategoryNames().map((categoryName, index) => (
              <option key={index} value={categoryName}>
                {categoryName.split(" ").length > 2 ? categoryName.split(" ")[0] : categoryName}
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
        categories.map((category) => (
          <div key={category.id} className="mt-10">
            <Category category={category} fetchData={fetchData} />
          </div>
        ))
      )}
      <Modal />
    </Layout>
  );
}
