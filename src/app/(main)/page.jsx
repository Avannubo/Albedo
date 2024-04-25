"use client"
import { useState, useEffect } from 'react';
import Image from "next/image";
import { getCategories } from "@/lib/data";
import ProductItem from "@/components/products/productItem";
import AddToCart from '@/components/products/addToCart';
import Layout from "@/app/(main)/WebLayout";
import Link from "next/link";
export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState();
  // const data = await getCategories();
  const fetchData = async () => {
    setIsLoading(true);
    const fetchedCategories = await getCategories();
    setData(fetchedCategories)
    setIsLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, []);
  function GetPublishedProducts(categories) {
    let products = [];
    if (categories && categories.length > 0) {
      categories.forEach((category) => {
        if (category.isPublished && category.products && category.products.length > 0) {
          products = products.concat(category.products);
        }
        if (category.subCategories) {
          products = products.concat(GetPublishedProducts(category.subCategories));
        }
      });
    }
    return products;
  }
  const allPublishedProducts = GetPublishedProducts(data);
  const last4PublishedProducts = allPublishedProducts.slice(-4);
  return (
    <Layout>
      <div className="">
        <hr className="h-1 mx-auto bg-gray-100 border-0 rounded dark:bg-gray-700" />
        <p className="text-xl my-4">
          <strong>ALBEDO Design</strong> es un grupo de empresas donde
          encontrará productos domóticos propios y de terceros, así como
          servicios integrales al servicio de la industria electrónica.
        </p>
        <hr className="h-1 mx-auto bg-gray-100 border-0 rounded  dark:bg-gray-700" />
      </div>
      <div className="bg-[#304590] rounded-xl p-3 flex justify-center">
        <h1 className="text-xl font-bold text-white ">
          TIENDA DE PRODUCTOS DOMÓTICOS
        </h1>
      </div>
      <div className="">
        <p className="text-xl ">
          Si desea <strong>comprar cualquiera de nuestros productos</strong>, entre en <a href="#">nuestra tienda</a>:
        </p>
        <div className="flex justify-center my-4">
          <Image
            src="/images/home/facebook_portada.png"
            alt="Vercel Logo"
            className="self-center"
            width={400}
            height={24}
            priority
          />
        </div>
        <div>
          <hr className="h-1 mx-auto bg-gray-100 border-0 rounded  dark:bg-gray-700" />
          <div className="flex justify-center">
            <h1 className="text-xl font-bold my-2">Nuevos productos</h1>
          </div>
          <hr className="h-1 mx-auto bg-gray-100 border-0 rounded  dark:bg-gray-700" />
          {isLoading ? (
            <div className='flex flex-row items-center justify-center space-x-4 mt-4 mb-8'>
              <div className="w-[250px] h-[275px] flex flex-col p-2 rounded-lg box-shadow justify-between bg-slate-50 animate-pulse">
                <div className='h-auto flex flex-col justify-between cursor-pointer space-y-2'>
                  <div className='rounded-lg h-8 w-12 self-center bg-slate-200 animate-pulse'></div>
                  <div className='rounded-lg h-8 w-28 self-center bg-slate-200 animate-pulse'></div>
                  <div className='rounded-lg h-[140px] w-[235px] bg-slate-200 animate-pulse'></div>
                  <div className='flex flex-row justify-between space-x-4 '>
                    <div className='rounded-lg h-8 w-8 self-center bg-slate-200 animate-pulse'></div>
                    <div className='rounded-lg h-8 grow self-center bg-slate-200 animate-pulse'></div>
                  </div>
                </div>
              </div>
              <div className="w-[250px] h-[275px] flex flex-col p-2 rounded-lg box-shadow justify-between bg-slate-50 animate-pulse">
                <div className='h-auto flex flex-col justify-between cursor-pointer space-y-2'>
                  <div className='rounded-lg h-8 w-12 self-center bg-slate-200 animate-pulse'></div>
                  <div className='rounded-lg h-8 w-28 self-center bg-slate-200 animate-pulse'></div>
                  <div className='rounded-lg h-[140px] w-[235px] bg-slate-200 animate-pulse'></div>
                  <div className='flex flex-row justify-between space-x-4 '>
                    <div className='rounded-lg h-8 w-8 self-center bg-slate-200 animate-pulse'></div>
                    <div className='rounded-lg h-8 grow self-center bg-slate-200 animate-pulse'></div>
                  </div>
                </div>
              </div>
              <div className="w-[250px] h-[275px] flex flex-col p-2 rounded-lg box-shadow justify-between bg-slate-50 animate-pulse">
                <div className='h-auto flex flex-col justify-between cursor-pointer space-y-2'>
                  <div className='rounded-lg h-8 w-12 self-center bg-slate-200 animate-pulse'></div>
                  <div className='rounded-lg h-8 w-28 self-center bg-slate-200 animate-pulse'></div>
                  <div className='rounded-lg h-[140px] w-[235px] bg-slate-200 animate-pulse'></div>
                  <div className='flex flex-row justify-between space-x-4 '>
                    <div className='rounded-lg h-8 w-8 self-center bg-slate-200 animate-pulse'></div>
                    <div className='rounded-lg h-8 grow self-center bg-slate-200 animate-pulse'></div>
                  </div>
                </div>
              </div>
              <div className="w-[250px] h-[275px] flex flex-col p-2 rounded-lg box-shadow justify-between bg-slate-50 animate-pulse">
                <div className='h-auto flex flex-col justify-between cursor-pointer space-y-2'>
                  <div className='rounded-lg h-8 w-12 self-center bg-slate-200 animate-pulse'></div>
                  <div className='rounded-lg h-8 w-28 self-center bg-slate-200 animate-pulse'></div>
                  <div className='rounded-lg h-[140px] w-[235px] bg-slate-200 animate-pulse'></div>
                  <div className='flex flex-row justify-between space-x-4 '>
                    <div className='rounded-lg h-8 w-8 self-center bg-slate-200 animate-pulse'></div>
                    <div className='rounded-lg h-8 grow self-center bg-slate-200 animate-pulse'></div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-row items-center justify-center space-x-4 mt-4 mb-8">
              {last4PublishedProducts.map((product) => (
                <div key={product.ALBEDOcodigo} className="w-[250px] flex flex-col p-2 rounded-lg box-shadow justify-between">
                  <Link href={product.fixedUrl}  >
                    <ProductItem product={product} /></Link>
                  <AddToCart producto={product} />
                </div>
              ))}
            </div>)}
        </div>
        <div>
          <hr className="h-1 mx-auto bg-gray-100 border-0 rounded  dark:bg-gray-700" />
          <div className="bg-[#304590] rounded-xl p-3 flex justify-center">
            <h1 className="text-xl font-bold text-white ">
              SERVICIOS DE DISEÑO Y FABRICACIÓN
            </h1>
          </div>
          <div className="my-4">
            <p className="text-xl">
              <strong>Somos un equipo multidisciplinar</strong>, y nos ponemos a
              su disposición para acompañarle en sus proyectos electrónicos.{" "}
              <br />
              <br />
              Estaremos a su lado en todos los procesos para llevar su idea a
              una realidad... Desde el <a href="">diseño</a> , y el{" "}
              <a href="">prototipado</a> a la <a href="">fabricación</a> .{" "}
            </p>
            <div className="flex flex-row justify-center space-x-4 my-4">
              <Image
                src="/images/home/diseño1.png"
                alt="Vercel Logo"
                className=""
                width={300}
                height={24}
                priority
              />
              <Image
                src="/images/home/diseño2.png"
                alt="Vercel Logo"
                className=""
                width={200}
                height={24}
                priority
              />
            </div>
          </div>
        </div>
      </div>
      <div></div>
    </Layout>
  );
}
