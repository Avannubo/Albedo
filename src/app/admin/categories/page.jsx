import { getCategories } from "@/lib/data";
import Modal from '@/components/admin/categories/deleteModal'; 
import Link from "next/link";
import Delete from "@/components/admin/categories/delete";
import AddSubCategory from "@/components/admin/categories/addsubcategory/add";
import AddNewCategoryModal from '@/components/admin/categories/addnewcategory/add';
import AddNewProduct from "@/components/admin/categories/addnewproduct/add";
import EditProduct from "@/components/admin/categories/editData/edit";

const Category = ({ category }) => (
  <div key={category.id} className="space-y-2 w-full"> 
    <div className="bg-slate-300 rounded-lg p-2 flex flex-row justify-between mb-2">
      <p className="h-auto ">{category.name}</p>
      <div className="space-x-4 flex flex-row"> 
        <AddNewProduct categoryId={category}/> 
        <AddSubCategory categoryId={category}/>
        <EditProduct categoryId={category} productId={"none"}/>
        {/* <Link href={`/admin/categories/${category.id}`} className=" rounded-md hover:bg-yellow-300 cursor-pointer">
          
        </Link> */}
        {/* delete svg */}
        <Delete categoryId={category} productId={"none"} /> 
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
              <EditProduct categoryId={"none"} productId={category}/> 
              <Delete categoryId={"none"} productId={product} />  
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

