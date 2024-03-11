import { getCategories } from "@/lib/data";

export default async function Page() {
    const data = await getCategories();
    return (
        <div>
            <h1>Products</h1>
            {data.map(category => (
                <div key={category.id} className="p-2">
                    <p className="h-auto w-[400px] bg-slate-200 rounded-lg m-4 p-2">{category.id}</p>
                    {category.subCategories.map(subCategory => (
                        <div key={subCategory.id} className="h-auto w-[400px] bg-purple-200 rounded-lg ml-20 m-4 p-2">
                            <p>{subCategory.id}</p>
                        </div>
                    ))}
                    <div></div>


                </div>
            ))}
        </div>
    );
}
