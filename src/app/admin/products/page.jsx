import { getCategories } from "@/lib/data";

export default async function Page() {
    const data = await getCategories();

    return (
        <div className="">
            {data.map((category) => (
                <Category key={category.id} category={category} />
            ))}
        </div>
    );
}

const Category = ({ category }) => (
    <div key={category.id} className="space-y-2 w-full">
        <div className="">
            <p className="h-auto bg-red-200 rounded-lg p-2 ">{category.id}</p>
        </div>
        {category.subCategories &&
            category.subCategories.length > 0 &&
            category.subCategories.map((subCategory) => (
                <div key={subCategory.id} className="ml-12">
                    <Category  category={subCategory} />
                </div>
            ))}
        {category.products && category.products.length > 0 && (
            <div>
                {category.products.map((product) => (
                    <div key={product.ALBEDOcodigo} className="ml-12">
                        <p  className="h-auto w-full bg-green-200 rounded-lg p-2 mb-2">
                            {product.ALBEDOtitulo}
                        </p>
                    </div>

                ))}
            </div>
        )}
    </div>
);
