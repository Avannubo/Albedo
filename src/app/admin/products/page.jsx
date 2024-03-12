import { getCategories } from "@/lib/data"; 
export default async function page(){
 const data = await getCategories(); 

//    console.log(data);
   return (
       <div>
           <h1>Categories y Products</h1>
           {data.map(category => (
               <div key={category.id} className="p-2">
                   <p className="h-auto w-[400px] bg-slate-200 rounded-lg m-4 p-2">{category.id}</p>
                   {category.subCategories.map(subCategory => (
                       <div key={subCategory.id} className="h-auto w-[400px] bg-purple-200 rounded-lg ml-20 m-4 p-2">
                           <p>{subCategory.id}</p>  
                       </div>
                   ))}
                   {category.products.map(product => (
                       <div key={product.ALBEDOcodigo} className="h-auto w-[400px] bg-orange-200 rounded-lg ml-20 m-4 p-2">
                           <p>{product.ALBEDOcodigo}</p>
                       </div>
                   ))}
               </div>
           ))}
       </div>
   );
}