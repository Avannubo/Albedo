import { getCategories } from "@/lib/data";
import Modal from '@/components/admin/categories/deleteModal'; 
import Link from "next/link";
import Delete from "@/components/admin/categories/delete";
import AddSubCategory from "@/components/admin/categories/addsubcategory/add";
import AddNewCategoryModal from '@/components/admin/categories/addnewcategory/add';
import AddNewProduct from "@/components/admin/categories/addnewproduct/add";

const Category = ({ category }) => (
  <div key={category.id} className="space-y-2 w-full"> 
    <div className="bg-slate-300 rounded-lg p-2 flex flex-row justify-between mb-2">
      <p className="h-auto ">{category.name}</p>
      <div className="space-x-4 flex flex-row"> 
        <AddNewProduct categoryId={category}/> 
        <AddSubCategory categoryId={category}/>
        <Link href={`/admin/categories/${category.id}`} className=" rounded-md hover:bg-yellow-300 cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
          </svg>
        </Link>
        {/* delete svg */}
        <Delete categoryId={category} productId={null} /> 
      </div>
    </div> 
    {category.products && category.products.length > 0 && (
      <div>
        {category.products.map((product) => (
          <div key={product.ALBEDOcodigo} className="ml-14 flex flex-row justify-between bg-slate-200 rounded-lg p-2 mb-2">
            <p className="h-auto w-full  ">
              {product.ALBEDOcodigo} : {product.ALBEDOtitulo}
            </p>
            <div className="space-x-4 flex flex-row">
              <div className=" rounded-md hover:bg-yellow-300 cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                </svg>
              </div> 
              <Delete categoryId={null} productId={product} />  
            </div>
          </div>
        ))}
      </div>
    )}
    {category.subCategories &&
      category.subCategories.length > 0 &&
      category.subCategories.map((subCategory) => (
        <div key={subCategory.id} className="ml-14 ">
          <Category category={subCategory} />
        </div>
      ))} 
  </div>
);

export default async function Page() {
  const data = await getCategories();
  return (
    <div className="">
      <div className="flex mb-8">
        <h1 className="font-semibold text-4xl">Categorias</h1>
        <AddNewCategoryModal />
      </div>
      
      {data.map((category) => (
        <Category key={category.id} category={category} />
      ))}
      <Modal />
      
    </div>
    
  );
}  

