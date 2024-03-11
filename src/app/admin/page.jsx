import { getCategories } from "@/lib/data"

export default async function page() {
    const data = await getCategories();
    return <div>
        {data.map(category => {
            return <div key={category.id}>
                <p>{category.id} <br/></p>
                {/* {category.subCategories} */}

            </div>
        })
        }
    </div>;
}
