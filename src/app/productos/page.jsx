import { getProducts } from "@/lib/data"
import Image from "next/image";

export default async function Page() {
    const products = await getProducts();

    return <section className="flex">
        {
            products.map(product => {
                const {
                    ALBEDOcodigo, ALBEDOtitulo, ALBEDOprecio, imagen
                } = product;

                return <article className=" flex flex-col ">
                    {ALBEDOcodigo}
                    <Image src={imagen}
                        alt={ALBEDOtitulo}
                        className="self-center"
                        width={200}
                        height={300}
                        priority
                    />
                    <div>
                        <h1>
                            {ALBEDOtitulo}
                        </h1>
                        <h3>
                            {ALBEDOprecio}
                        </h3> 
                    </div>

                </article>
            })
        }
    </section>
}