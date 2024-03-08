import { getProducts } from "@/lib/data"

export default async function Page() {
    const products = await getProducts();

    return <section className="space-y-4">
        {
            products.map(product => {
                const {
                    ALBEDOtitulo
                } = product; 

                return <article>
                    { ALBEDOtitulo }
                </article>
            })
        }
    </section>
}