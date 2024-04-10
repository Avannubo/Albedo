'use client'
import React, { useState, useEffect } from 'react';
import useCategoryId from '@/hooks/useCategoryId';
import { getDataByUrlId } from '@/lib/data';
import Image from 'next/image';
import Link from 'next/link';
import AddToCart from '@/components/products/addToCart';
import ProductItem from "@/components/products/productItem";



export default function PageContent() {
    const slugArrayHook = useCategoryId();
    const [pageData, setPageData] = useState(null);
    const [productData, setproductData] = useState(null);
    function formateSlugArray(slugArrayHook) {
        if (!Array.isArray(slugArrayHook) || slugArrayHook.length === 0) {
            return "";
        }
        return slugArrayHook.join("/");
    }
    useEffect(() => {
        async function fetchData() {
            try {
                if (slugArrayHook && slugArrayHook.length > 0) {
                    const productId = slugArrayHook[slugArrayHook.length - 1];
                    const data = await getDataByUrlId(slugArrayHook);
                    // console.log(JSON.stringify(data.products[0].ALBEDOprecio));
                    if (data.products) {
                        // If the data contains products, find the product with the matching URL ID
                        console.log("------------------------------");

                        for (let i = 0; i < data.products.length; i++) {
                            const element = data.products[i];
                            console.log(element.ALBEDOcodigo,element.url_Id);
                            
                        }
                        console.log("------------------------------");
                        const foundProduct = data.products.find(prod => prod.url_Id === productId.toString());
                        if (foundProduct) {
                            // If the product is found, update the product data
                            console.log(foundProduct.ALBEDOcodigo);
                            setproductData(foundProduct);
                        }
                        setPageData(data.products);

                    }
                    setPageData(data);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        fetchData();
    }, [slugArrayHook]);




    if (pageData && !productData) {
        return <div className='min-h-[50vh]'>
            <hr className="h-1 mx-auto bg-gray-100 border-0 rounded dark:bg-gray-700" />
            {pageData && (
                <div className='py-4'>
                    <div className='flex justify-center my-4'>
                        <h1 className='text-2xl font-bold'>
                            {pageData.name}
                        </h1>
                    </div>
                    <div className='flex justify-center my-4'>
                        <h1 className='text-lg font-normal'>
                            {pageData.ALBEDOdescripcion}
                        </h1>
                    </div>
                    <div className='flex justify-center my-2'>
                        {pageData.ALBEDOcuerpo}
                    </div>
                    {pageData.subCategories && pageData.subCategories.length > 0 && (
                        <div>
                            <hr className="h-1 mx-auto bg-gray-100 border-0 rounded dark:bg-gray-700" />
                            <div className=' flex justify-center my-2'>
                                <p className='text-lg font-bold'>Sub-Gamas</p>
                            </div>
                            <hr className="h-1 mx-auto bg-gray-100 border-0 rounded dark:bg-gray-700" />
                            <div className='flex flex-row flex-wrap justify-center '>
                                {pageData.subCategories.map((subCat, index) => (
                                    <Link href={`/products/${formateSlugArray(slugArrayHook)}/${subCat.url_Id}`} key={index} className=''>
                                        <div className='w-[250px] flex flex-col justify-center m-2'>
                                            <Image
                                                src={subCat.imagen}
                                                alt="Vercel Logo"
                                                className="self-center w-full h-[170px]"
                                                width={100}
                                                height={24}
                                            />
                                            <p className='self-center font-bold'>
                                                {subCat.name}</p>
                                            <button className="self-center text-white w-full py-1.5 mt-2 rounded-md bg-[#304590] hover:bg-[#475caa]">Ver Más</button>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                    {pageData.products && pageData.products.length > 0 && (
                        <div>
                            <hr className="h-1 mx-auto bg-gray-100 border-0 rounded dark:bg-gray-700" />
                            <div className=' flex justify-center my-2'>
                                <p className='text-lg font-bold'>Productos</p>
                            </div>
                            <hr className="h-1 mx-auto bg-gray-100 border-0 rounded dark:bg-gray-700" />
                            <div className='flex flex-row flex-wrap justify-center space-x-4'>
                                {pageData.products.map((product) => (
                                    <Link href={`/products/${formateSlugArray(slugArrayHook)}/${product.url_Id}`}
                                        key={product.ALBEDOcodigo} className='flex flex-col justify-center m-4'>
                                        <ProductItem product={product} />
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    }
    else if (productData) {
        return <div className='min-h-[50vh]'>
            {productData && (
                <div className='flex flex-row justify-between my-10'>
                    <div className='w-1/3'>
                        <Image src={productData.imagen} alt={productData.ALBEDOtitulo} width={300} height={350} />
                    </div>
                    <div className='w-2/3'>
                        <h1 className='font-extrabold text-2xl'>{productData.ALBEDOtitulo}</h1>
                        <p className='text-md'>{productData.ALBEDOdescripcion}</p>
                        <div>
                            <p>{productData.ALBEDOcuerpo}</p>

                            {/* <p>
                                Sistema de comunicación accesible que proporciona información sobre la localización del usuario, los objetos próximos y sus características, el espacio donde se ubican y los posibles recorridos a realizar.
                                El Sistema se compone de: <br />
                                • Un subsistema de gestión de contenidos (CMS por sus siglas en inglés).<br />
                                • Balizas Bluetooth, beacons, para identificar ubicaciones y objetos. Pueden funcionar en el exterior, or su nivel de estanqueidad.<br />
                                • Una aplicación web para a la gestión de balizas y usuarios.<br />
                                • Una aplicación móvil de usuario en iOS y Android (audioguía).<br /><br />
                                El Servicio Básico comprende:<br /><br />
                                • 20 balizas Bluetooth con una garantía de dos años.<br />
                                • Almacenamiento en la nube durante el primer año de servicio.<br />
                                • Mantenimiento correctivo y adaptativo durante el primer año de servicio.<br />
                                • Manual de instalación y uso.<br />
                                El sistema de gestión de contenidos puede almacenar la información en diferentes idiomas, con lenguaje comprensivo según formación, edad y capacidades cognitivas, con audio descripción para personas con discapacidad visual, vídeo en lengua de signos y realidad aumentada. Cada entidad decide el nivel al que quiere llegar en función de los recursos dedicados a la creación del itinerario. Por supuesto, los contenidos siempre pueden ser actualizados.<br /><br />
                                La aplicación móvil se descarga de Google Play o de Apple Store. La interfaz se adapta a las capacidades del usuario. Proporciona información de todos los elementos de la exposición con el formato más adecuado para el usuario. Da indicaciones de navegación de la visita y recomienda los posibles itinerarios.<br /><br />
                                Nota: en el mantenimiento no se incluye el cambio de pilas de las balizas.<br /><br />
                            </p> */}
                        </div>
                        <p className='text-xl font-medium'>Precio: {productData.ALBEDOprecio}€</p>
                        <div className='mt-4 w-[250px]'>
                            <AddToCart producto={productData} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    }
}
