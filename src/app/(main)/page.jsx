"use client"
import { useState, useEffect } from 'react';
import Image from "next/image";
import { getCategories } from "@/lib/data";
import ProductItem from "@/components/main/products/productItem";
import AddToCart from '@/components/main/products/addToCart';
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
  function findProductPath(categories, codeToFind, currentPath = '') {
    for (const category of categories) {
      const newPath = `${currentPath}/${category.url_Id}`;
      const product = category.products.find(product => product.ALBEDOcodigo === codeToFind);
      if (product) {
        return `${newPath}/${product.url_Id}`;
      }
      if (category.subCategories && category.subCategories.length > 0) {
        const foundInSubCategory = findProductPath(category.subCategories, codeToFind, newPath);
        if (foundInSubCategory) {
          return foundInSubCategory;
        }
      }
    }
    return null;
  }

  const allPublishedProducts = GetPublishedProducts(data);
  const last4PublishedProducts = allPublishedProducts.slice(0, 4); //PublishedProducts.slice(-4);


  return (
    <Layout>
      <div className="mt-10">
        <hr className="h-1 mx-auto bg-gray-100 border-0 rounded dark:bg-gray-700" />
        <p className="lg:lg:text-xl md:text-lg text-md  text-md my-4">
          <strong>ALBEDO Design</strong> es un grupo de empresas donde
          encontrará productos domóticos propios y de terceros, así como
          servicios integrales al servicio de la industria electrónica.
        </p>
        <hr className="h-1 mx-auto bg-gray-100 border-0 rounded  dark:bg-gray-700" />
      </div>
      <div className="bg-[#304590] rounded-xl p-3 flex justify-center">
        <h1 className="lg:lg:text-xl md:text-lg text-md  text-md font-bold text-white ">
          TIENDA DE PRODUCTOS DOMÓTICOS
        </h1>
      </div>
      <div className="">
        <p className="lg:lg:text-xl md:text-lg text-md  text-md ">
          Si desea <strong>comprar cualquiera de nuestros productos</strong>, entre en <a href="#">nuestra tienda</a>:
        </p>
        <div className="flex justify-center my-4">
          <Image
            src="/assets/images/home/facebook_portada.png"
            alt="Image"
            className="self-center"
            width={400}
            height={240}
            priority="true"
          />
        </div>
        <div>
          <hr className="h-1 mx-auto bg-gray-100 border-0 rounded  dark:bg-gray-700" />
          <div className="flex justify-center">
            <h1 className="lg:text-2xl md:text-xl text-md font-bold my-2">Nuevos productos</h1>
          </div>
          <hr className="h-1 mx-auto bg-gray-100 border-0 rounded  dark:bg-gray-700" />
          {isLoading ? (
            <div className='flex flex-wrap flex-row items-center justify-center space-x-4 mt-4 mb-8'>
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
            last4PublishedProducts.length && last4PublishedProducts.length > 0 ? (
              <div className="flex flex-row flex-wrap items-center justify-center ">
                {last4PublishedProducts.map((product) => (
                  <div key={product.ALBEDOcodigo} className="w-full xs:w-[200px] sm:w-[240px] md:w-[230px] lg:w-[250px] flex flex-col p-2 m-4  rounded-lg box-shadow justify-between">
                    <Link href={`products${findProductPath(data, product.ALBEDOcodigo)}`}>
                      <ProductItem product={product} /></Link>
                    <AddToCart producto={product} />
                  </div>
                ))}
              </div>
            ) : (
              <div className='flex flex-wrap flex-row items-center justify-center space-x-4 mt-4 mb-8'>
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
            )
          )}
        </div>
        <div>
          <hr className="h-1 mx-auto bg-gray-100 border-0 rounded  dark:bg-gray-700" />
          <div className="bg-[#304590] rounded-xl p-3 flex justify-center">
            <h1 className="lg:text-xl md:text-lg text-md font-bold text-white ">
              SERVICIOS DE DISEÑO Y FABRICACIÓN
            </h1>
          </div>
          <div className="my-4">
            <p className="lg:text-xl md:text-lg text-md">
              <strong>Somos un equipo multidisciplinar</strong>, y nos ponemos a
              su disposición para acompañarle en sus proyectos electrónicos.{" "}
              <br />
              <br />
              Estaremos a su lado en todos los procesos para llevar su idea a
              una realidad... Desde el <a href="">diseño</a> , y el{" "}
              <a href="">prototipado</a> a la <a href="">fabricación</a> .{" "}
            </p>
            <div className="flex flex-row flex-wrap justify-center my-4">
              <Image
                src="/assets/images/home/diseño1.png"
                alt="Image"
                className="rounded-lg m-2 w-full h-[200px] md:w-[250px] lg:h-auto object-cover"
                width={500}
                height={24}
                priority="true"
              />
              <Image
                src="/assets/images/home/diseño2.png"
                alt="Image"
                className="rounded-lg m-2 w-full h-[200px] md:w-[250px] lg:h-auto object-cover"
                width={600}
                height={24}
                priority="true"
              />
            </div>
          </div>
        </div>
      </div>
    </Layout >
  );
}
