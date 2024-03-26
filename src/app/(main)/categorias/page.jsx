import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getCategories } from "@/lib/data";
import ProductItem from "@/components/products/productItem";

export default async function page() {
  const data = await getCategories();

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
  const last6 = products.slice(0, 4);
  return (
    <div>
      <hr className="h-1 mx-auto bg-gray-100 border-0 rounded dark:bg-gray-700" />
      <div className="flex justify-center my-4">
        <h1 className="text-2xl font-bold">Gama de productos</h1>
      </div>
      <div className="">
        <hr className="h-1 mx-auto bg-gray-100 border-0 rounded dark:bg-gray-700" />
        <div className="flex flex-row justify-between space-x-6 my-8">
          {/* cat1 */}
          <Link href="/categorias" className="flex flex-col w-auto ">
            <Image
              src="/images/ADFSSM100/imagen.png"
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

          {/* cat1 */}
          <Link href="/" className="flex flex-col w-auto ">
            <Image
              src="/images/automatismos.jpg"
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
          {/* cat1 */}
          <Link href="/" className="flex flex-col w-auto ">
            <Image
              src="/images/controladores.jpg"
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
          {/* cat1 */}
          <Link href="/" className="flex flex-col w-auto ">
            <Image
              src="/images/dupline.jpg"
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
          {/* cat1 */}
          <Link href="/" className="flex flex-col w-auto ">
            <Image
              src="/images/gama_enocean.jpg"
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
          {/* cat1 */}
          <Link href="/" className="flex flex-col w-auto ">
            <Image
              src="/images/energia.jpg"
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
          {/* cat1 */}
          <Link href="/" className="flex flex-col w-auto ">
            <Image
              src="/images/protectores.jpg"
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
        </div>
      </div>
      <div className="my-12">
        <hr className="h-1 mx-auto bg-gray-100 border-0 rounded  dark:bg-gray-700" />
        <div className="flex justify-center">
          <h1 className="text-lg font-bold my-2">Nuevos productos</h1>
        </div>
        <hr className="h-1 mx-auto bg-gray-100 border-0 rounded  dark:bg-gray-700" />
        <div className="flex flex-row items-center justify-center space-x-4 mt-4 mb-8">
          {last6.map((product) => (
            <ProductItem key={product.ALBEDOcodigo} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
