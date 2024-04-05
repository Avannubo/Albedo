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
    <div className="bg-slate-300 rounded-lg p-2 flex flex-row justify-between mb-2 mt-4 hover:shadow-md">
      <p className="h-auto  self-center">{category.url_Id} : {category.name}</p>
      <div className="space-x-4 flex flex-row">
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
            className="ml-14 flex flex-row justify-between bg-slate-200 rounded-lg p-2 mb-2 hover:shadow-md"
          >
            <p className="h-auto w-full self-center ">
              {product.url_Id} : {product.ALBEDOtitulo}
            </p>
            <div className="space-x-4 flex flex-row">
              
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

export default async function Page() {
  const data = await getCategories();
  // data.reverse();
  // console.log(data.reverse());
  return (
    <div className="ml-28">
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
