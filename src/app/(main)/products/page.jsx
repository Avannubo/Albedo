import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getCategories } from "@/lib/data";
import ProductItem from "@/components/products/productItem";
import AddToCart from '@/components/products/addToCart';
import Layout from "@/app/(main)/WebLayout";
export default async function page() {
    const data = await getCategories();
    const Categories = data.filter(category => category.isPublished === true);
    function GetProducts(categories) {
        let products = [];
        categories.forEach((category) => {
            if (category.products.length > 0) {
                products = products.concat(category.products);
            }
            if (category.subCategories) {
                products = products.concat(GetProducts(category.subCategories));
            }
        });
        return products;
    }
    const products = GetProducts(data);
    const last6 = products.slice(products.length - 4, products.length);
    return (
        <Layout>
            <hr className="h-1 mx-auto bg-gray-100 border-0 rounded dark:bg-gray-700" />
            <div className="flex justify-center my-4">
                <h1 className="text-2xl font-bold">Gama de productos</h1>
            </div>
            <div className="">
                <hr className="h-1 mx-auto bg-gray-100 border-0 rounded dark:bg-gray-700" />
                <div className='flex flex-row flex-wrap justify-center mt-2 '>
                    {Categories.map((category, index) => (
                        <Link key={index}
                            href={`/products/${category.url_Id}`}
                            className="block px-4 py-2 text-md text-gray-700 rounded-lg "
                        >
                            <Image
                                src={category.imagen}
                                alt="Vercel Logo"
                                className="self-center w-full h-[110px] rounded-lg"
                                width={100}
                                height={24}
                            />
                            <p className='text-center font-bold'>
                                {category.name.split(" ").length > 2
                                    ? category.name.split(" ")[0]
                                    : category.name}</p>
                            {/* <button className="self-center text-white w-full py-1.5 mt-2 rounded-md bg-[#304590] hover:bg-[#475caa]">Ver Más</button> */}
                        </Link>
                    ))}
                </div>
                {/* <div className="flex flex-row justify-between space-x-6 my-8">
                    <Link href="/products/020" className="flex flex-col w-auto ">
                        <Image
                            src="/assets/images/ADFSSM100/imagen.png"
                            alt="Vercel Logo"
                            className="self-center w-[110px] h-[130px] object-contain"
                            width={100}
                            height={24}
                            priority
                        />
                        <h2 className="text-slate-950 font-medium text-lg self-center">
                            Iluminación
                        </h2>
                    </Link>
                    <Link href="/products/011" className="flex flex-col w-auto ">
                        <Image
                            src="/assets/images/automatismos.jpg"
                            alt="Vercel Logo"
                            className="self-center w-[110px] h-[130px] object-contain"
                            width={100}
                            height={24}
                            priority
                        />
                        <h2 className="text-slate-950 font-medium text-lg self-center">
                            Automatismos
                        </h2>
                    </Link>
                    <Link href="/products/001" className="flex flex-col w-auto ">
                        <Image
                            src="/assets/images/controladores.jpg"
                            alt="Vercel Logo"
                            className="self-center w-[110px] h-[130px] object-contain"
                            width={100}
                            height={24}
                            priority
                        />
                        <h2 className="text-slate-950 font-medium text-lg self-center">
                            Controladores
                        </h2>
                    </Link>
                    <Link href="/products/021" className="flex flex-col w-auto ">
                        <Image
                            src="/assets/images/dupline.jpg"
                            alt="Vercel Logo"
                            className="self-center w-[110px] h-[130px] object-contain"
                            width={100}
                            height={24}
                            priority
                        />
                        <h2 className="text-slate-950 font-medium text-lg self-center">
                            Dupline
                        </h2>
                    </Link>
                    <Link href="/products/012" className="flex flex-col w-auto ">
                        <Image
                            src="/assets/images/gama_enocean.jpg"
                            alt="Vercel Logo"
                            className="self-center w-[110px] h-[130px] object-contain"
                            width={100}
                            height={24}
                            priority
                        />
                        <h2 className="text-slate-950 font-medium text-lg self-center">
                            Gama Enocean
                        </h2>
                    </Link>
                    <Link href="/products/017" className="flex flex-col w-auto ">
                        <Image
                            src="/assets/images/energia.jpg"
                            alt="Vercel Logo"
                            className="self-center w-[110px] h-[130px] object-contain"
                            width={100}
                            height={24}
                            priority
                        />
                        <h2 className="text-slate-950 font-medium text-lg self-center">
                            Energia
                        </h2>
                    </Link>
                    <Link href="/products/006" className="flex flex-col w-auto ">
                        <Image
                            src="/assets/images/protectores.jpg"
                            alt="Vercel Logo"
                            className="self-center w-[110px] h-[130px] object-contain"
                            width={100}
                            height={24}
                            priority
                        />
                        <h2 className="text-slate-950 font-medium text-lg self-center">
                            Protectores
                        </h2>
                    </Link>
                </div> */}
            </div>
            <div className="my-6">
                <hr className="h-1 mx-auto bg-gray-100 border-0 rounded  dark:bg-gray-700" />
                <div className="flex justify-center">
                    <h1 className="text-lg font-bold my-2">Nuevos productos</h1>
                </div>
                <hr className="h-1 mx-auto bg-gray-100 border-0 rounded  dark:bg-gray-700" />
                <div className="flex flex-row items-center justify-center space-x-4 mt-4 mb-8">
                    {last6.map((product) => (
                        <div className="w-[250px] flex flex-col p-2 rounded-lg box-shadow justify-between">
                            <Link href={product.fixedUrl} key={product.ALBEDOcodigo} >
                                <ProductItem product={product} /></Link>
                            <AddToCart producto={product} />
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
}
