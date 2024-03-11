import { getCategories } from "@/lib/data"
import Image from "next/image";

export default async function Page() {
    const data = await getCategories();

    // return <section className="flex">
    //     {
    //         data.map(obj => {
               
    //             return <article className=" flex flex-col ">
    //                 {ALBEDOcodigo}
    //                 <Image src={imagen}
    //                     alt={ALBEDOtitulo}
    //                     className="self-center"
    //                     width={200}
    //                     height={300}
    //                     priority
    //                 />
    //                 <div>
    //                     <h1>
    //                         {ALBEDOtitulo}
    //                     </h1>
    //                     <h3>
    //                         {ALBEDOprecio}
    //                     </h3> 
    //                 </div>

    //             </article>
    //         })
    //     }
    // </section>
}