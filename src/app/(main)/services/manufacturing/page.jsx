import Image from 'next/image'
import React from 'react'

export default function page() {
    return (
        <div>
            <div> <hr className="h-1 mx-auto bg-gray-100 border-0 rounded dark:bg-gray-700" />
                <div className="flex justify-center my-4">
                    <h1 className="text-2xl font-bold">Fábrica de productos electrónicos</h1>
                </div>
                <div className='flex flex-row justify-center'>
                    <Image
                        src="/images/100000033.jpg"
                        alt="Vercel Logo"
                        className="self-center rounded-lg"
                        width="1200"
                        height="250"
                        priority
                    />
                </div>

                <div className='text-justify text-xl mb-4'>
                    <p className='my-2'>Disponemos de amplias instalaciones destinadas a la producción de equipos electrónicos con tecnología SMD.
                    </p><Image
                        src="/images/100000908.jpg"
                        alt="Vercel Logo"
                        className="float-left rounded-lg m-2"
                        width="150"
                        height="200"
                        priority
                    />
                    <p>Toda la maquinaria es propia (Serigrafía, Pick & Place, horno, cámaras de secado, camaras de burn-in), por lo que no dependemos de proveedores externos en todo el proceso productivo. <br />
                        <br />
                        El control sobre todo el proceso es absoluto. Podemos garantizar por tanto la absoluta calidad del producto fabricado. </p><br />
                    <Image
                        src="/images/100000916.jpg"
                        alt="Vercel Logo"
                        className="float-right rounded-lg m-2"
                        width="150"
                        height="200"
                        priority
                    />
                    <p>Disponemos de todos los elementos necesarios "in house" para la pre-certificación del producto (ESD, EMI conducida y radiada, Hipot, continuidad de tierra).
                        <br /><br />
                        El proceso de certificación se simplifica y se abarata pues se puede saber a priori si el equipo cumple con los requisitos para obtener su certificación y su marcaje CE. </p>
                </div>
                <div className='flex flex-row justify-center'>
                    <Image
                        src="/images/100000132.jpg"
                        alt="Vercel Logo"
                        className="self-center rounded-lg"
                        width="1200"
                        height="250"
                        priority
                    />
                </div>
                <div className='text-justify text-xl mb-4'>
                    <p className='my-2'>
                        Nuestras instalaciones:
                    </p>
                    <div className='flex flex-col'>
                        <div className='flex flex-row justify-center'>
                            <Image
                                src="/images/100000910.jpg"
                                alt="Vercel Logo"
                                className="float-left rounded-lg m-2"
                                width="350"
                                height="200"
                                priority
                            />
                            <Image
                                src="/images/100000911.jpg"
                                alt="Vercel Logo"
                                className="float-left rounded-lg m-2"
                                width="350"
                                height="200"
                                priority
                            />
                        </div>
                        <div className='flex flex-row justify-center'><Image
                            src="/images/100000912.jpg"
                            alt="Vercel Logo"
                            className="float-left rounded-lg m-2"
                            width="350"
                            height="200"
                            priority
                        />
                            <Image
                                src="/images/100000913.jpg"
                                alt="Vercel Logo"
                                className="float-left rounded-lg m-2"
                                width="350"
                                height="200"
                                priority
                            /></div>
                    </div>
                </div>

            </div>
        </div>
    )
}
