import { getCategories } from "@/lib/data";
import Modal from "@/components/admin/categories/category/deleteModal";
import Delete from "@/components/admin/categories/category/delete";
import AddSubCategory from "@/components/admin/categories/subcategory/add";
import AddNewCategoryModal from "@/components/admin/categories/category/add";
import AddNewProduct from "@/components/admin/categories/product/add";
import EditProduct from "@/components/admin/categories/product/edit";
import EditCatedory from "@/components/admin/categories/category/edit";

const Category = ({ category }) => (
  <div key={category.id} className="space-y-2 w-full">
    <div className="bg-slate-300 rounded-lg p-2 flex flex-row justify-between mb-2 mt-4">
      <p className="h-auto ">{category.name}</p>
      <div className="space-x-4 flex flex-row"> 
        {/* NewProduct svg */}
        <AddNewProduct categoryId={category}/> 
        {/* addSubCat svg */}
        <AddSubCategory categoryId={category}/>
        {/* edit svg */}
        <EditCatedory categoryId={category}/> 
        {/* delete svg */}
        <Delete categoryId={category} productId={"none"} />
      </div>
    </div>
    {category.products && category.products.length > 0 && (
      <div>
        {category.products.reverse().map((product) => (
          <div
            key={product.ALBEDOcodigo}
            className="ml-14 flex flex-row justify-between bg-slate-200 rounded-lg p-2 mb-2"
          >
            <p className="h-auto w-full  ">
              {product.ALBEDOcodigo} : {product.ALBEDOtitulo}
            </p>
            <div className="space-x-4 flex flex-row">
              <EditProduct productId={product.ALBEDOcodigo}/> 
              <Delete categoryId={"none"} productId={product} />  
            </div>
          </div>
        ))}
      </div>
    )}
    {category.subCategories &&
      category.subCategories.length > 0 &&
      category.subCategories.reverse().map((subCategory) => (
        <div key={subCategory.id} className="ml-14">
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
        <h1 className="font-semibold text-4xl">Productos</h1>
        <AddNewCategoryModal />
      </div>

      {data.reverse().map((category) => (
        <div key={category.id} className="mt-6">
          <Category category={category} />
        </div>
      ))}
      <Modal />
    </div>
  );
}