"use client"
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
// import { useRouter } from 'next/router';
import AddToCart from '@/components/products/addToCart'

export default function page() {
    // const router = useRouter();
    // const { categoryId } = router.query;
    const producto1 = {
        id: "dsfsdfds",
        nombre: "sdiohfisu",
        precio: "17€",
    };
    const producto2 = {
        id: "dsfsdfds",
        nombre: "sdiohfisu",
        precio: "17€",
    };
    const producto3 = {
        id: "dsfsdfds",
        nombre: "sdiohfisu",
        precio: "17€",
    };
    const producto4 = {
        id: "dsfsdfds",
        nombre: "sdiohfisu",
        precio: "17€",
    };
    return (
        <div>
            <hr className="h-1 mx-auto bg-gray-100 border-0 rounded dark:bg-gray-700" />
            <div className='flex justify-center my-4'>
                <h1 className='text-2xl font-bold'>
                    Gama de productos
                </h1>
            </div>
            <div className="">
                <hr className="h-1 mx-auto bg-gray-100 border-0 rounded dark:bg-gray-700" />
                <div className='flex flex-row justify-between space-x-6 my-8'>

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
                <div className="flex flex-row justify-evenly space-x-4 my-4">
                    {/* product 1 */}
                    <div className="flex flex-col justify-between w-[200px] space-y-2">
                        <Link href="/productos/indoorNav" className='flex flex-col justify-center'>
                            <h2 className="text-[#304590] font-bold self-center">
                                IndoorNavBasic
                            </h2>
                            <p className="text-md self-center">
                                <strong>Precio:</strong> 7.200,00€ +IVA{" "}
                            </p>
                            <Image
                                src="/images/home/imagen.small.png"
                                alt="Vercel Logo"
                                className="self-center w-[130px] h-[150px] object-cover"
                                width={100}
                                height={24}
                                priority
                            />
                            <p className="text-md text-justify">
                                Pack para crear y mantener su sisterma de guía accesible en su
                                museo o exposición. Con 20 balizas.
                            </p>
                        </Link>
                        <AddToCart producto={producto1} />
                    </div>
                    {/* product 2 */}
                    <div className="flex flex-col justify-between w-[200px] space-y-2">
                        <Link href="/productos/indoorNav" className='flex flex-col justify-center'>
                            <h2 className="text-[#304590] font-bold self-center">
                                ADPDR2P63L
                            </h2>
                            <p className="text-md self-center">
                                <strong>Precio:</strong> 259,00€ +IVA{" "}
                            </p>
                            <Image
                                src="/images/home/imagen.small7.png"
                                alt="Vercel Logo"
                                className="self-center w-[130px] h-[150px] object-cover"
                                width={100}
                                height={24}
                                priority
                            />
                            <p className="text-md text-justify">
                                Protector diferencial rearmable monofásico (2P), 63A, 30mA
                            </p>
                        </Link>

                        <AddToCart producto={producto2} />

                    </div>

                    {/* product 4 */}
                    <div className="flex flex-col justify-between w-[200px] space-y-2">

                        <Link href="/productos/indoorNav" className='flex flex-col justify-center'>
                            <h2 className="text-[#304590] font-bold self-center">
                                ADPI30W5V
                            </h2>
                            <p className="text-md self-center">
                                <strong>Precio:</strong> 66,60€ +IVA{" "}
                            </p>
                            <Image
                                src="/images/home/imagen.small3.png"
                                alt="Vercel Logo"
                                className="self-center w-[130px] h-[150px] object-cover"
                                width={100}
                                height={24}
                                priority
                            />
                            <p className="text-md text-justify">
                                <b className='font-bold'>Convertidor AC/DC,</b> con aislamiento, entrada universal AC y DC y
                                salida 5V, 30W
                            </p>
                        </Link>
                        <AddToCart producto={producto3} />

                    </div>
                    {/* product 5 */}
                    <div className="flex flex-col w-[200px] justify-between space-y-2">

                        <Link href="/productos/indoorNav" className='flex flex-col justify-center'>
                            <h2 className="text-[#304590] font-bold self-center">
                                ADFSSM100
                            </h2>
                            <p className="text-md self-center">
                                <strong>Precio:</strong> 67,00€ +IVA{" "}
                            </p>
                            <Image
                                src="/images/home/imagen.small4.png"
                                alt="Vercel Logo"
                                className="self-center w-[130px] h-[150px] object-cover"
                                width={100}
                                height={24}
                                priority
                            />
                            <p className="text-md text-justify">
                                <b className='font-bold'>Farola solar LED con sensor de movimiento.</b> Consume 100W y
                                produce un flujo luminoso de 2500 Lumens.
                            </p>
                        </Link>

                        <AddToCart producto={producto4} />

                    </div>
                </div>
            </div>
        </div>
    )
}
