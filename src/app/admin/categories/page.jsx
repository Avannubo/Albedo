import { getCategories } from "@/lib/data";
import Modal from '@/components/admin/categories/deleteModal'; 
import Link from "next/link";
import Delete from "@/components/admin/categories/delete";
import AddCategory from "@/components/admin/categories/addsubcategory/addCategory";

const Category = ({ category }) => (
  <div key={category.id} className="space-y-2 w-full"> 
    <div className="bg-slate-300 rounded-lg p-2 flex flex-row justify-between mb-2">
      <p className="h-auto ">{category.name}</p>
      <div className="space-x-4 flex flex-row">
        
        <div className="rounded-md hover:bg-green-300 cursor-pointer ">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </div>

        <AddCategory categoryId={category}/>
        <Link href={`/admin/categories/${category.id}`} className=" rounded-md hover:bg-yellow-300 cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
          </svg>
        </Link>
        {/* delete svg */}
        <Delete categoryId={category} /> 
      </div>
    </div>
    {/* <div className="relative ">
      <svg className="absolute left-3 -top-2.5" fill="#0080c0" width="46px" height="46px" viewBox="0 0 256 256" id="Flat" xmlns="http://www.w3.org/2000/svg" stroke="#0080c0"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M210.82825,178.82861h-.00013l-48,48a3.99992,3.99992,0,0,1-5.65625-5.65722L198.34277,180H64a4.0002,4.0002,0,0,1-4-4V32a4,4,0,0,1,8,0V172H198.34277l-41.1709-41.17139a3.99992,3.99992,0,0,1,5.65625-5.65722l48,48h.00013a4.02834,4.02834,0,0,1,.49841.61035c.06543.09814.11047.20434.1665.30664a3.97146,3.97146,0,0,1,.20093.38183,3.91958,3.91958,0,0,1,.126.406c.03345.11377.07751.22266.10083.34033a4.01026,4.01026,0,0,1,0,1.5669c-.02332.11767-.06738.22656-.10083.34033a3.90157,3.90157,0,0,1-.126.406,3.94471,3.94471,0,0,1-.20093.38183c-.0559.1023-.10095.2085-.1665.30664A4.02834,4.02834,0,0,1,210.82825,178.82861Z"></path> </g></svg>
    </div> */}
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
              {/* <div className=" rounded-md hover:bg-red-300 cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>
              </div> */}

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
        <button  className="rounded-lg ml-4 p-2 bg-blue-300 hover:bg-blue-400 self-center">Añadir Category</button>
      </div>
      
      {data.map((category) => (
        <Category key={category.id} category={category} />
      ))}
      <Modal />
    </div>
    
  );
}  

