import Image from 'next/image'
import React from 'react'
import Layout from "@/app/(main)/WebLayout";

export default function page() {
    return (
        <Layout>
            <hr className="h-1 mx-auto bg-gray-100 border-0 rounded dark:bg-gray-700 mt-10" />
            <div className="flex justify-center my-4">
                <h1 className="text-2xl font-bold">Montaje SMD</h1>
            </div>
            <div className='text-xl space-y-4'>
                <p>
                    En ALBEDO disponemos de 2 líneas de montaje SMD. Con una capacidad de inserción de más de 75.000 componentes/hora.
                    <br />
                    Cada una de las líneas de montaje cuenta con 1 serigrafía, 3 Pick&Place y horno. Con sus correspondientes conveyors, cargadores y descargadores.
                    <br />
                    Montamos componentes desde 0402 hasta QFPs, QFNs, BGAs, uBGAs, LGAs, CSPs, POPs.
                </p>
                <div className='flex flex-row justify-center'>
                    <Image
                        src="/assets/images/100000918.jpg"
                        alt="Image"
                        className="self-center rounded-lg object-cover h-[300px] md:w-[500px] w-full"
                        width="1100"
                        height="250"
                        priority="true"
                    />
                </div>
                <div className='flex flex-col md:flex-row space-x-6 '>
                    <div className='mb-4'><p className='text-center'><b className='font-bold text-xl'>Línea 1</b> <br />
                        Cargador/Descargador PCB's <br />
                        SPI <br />
                        Serigrafía <br />
                        IPULSE M7-3L, con 24 cabezales <br />
                        2 IPULSE M4, 3 cabezales, una con cargador para 20 matrix <br />
                        1 Horno refusión Heller de 7 zonas Lead free <br />
                        AOI 3D. <br />
                    </p></div>
                    <div className='mb-4'><p className='text-center'><b className='font-bold text-xl'>Línea 2</b> <br />

                        Cargador/Descargador PCB's <br />
                        Serigrafía <br />
                        1 IPULSE M2, 6 cabezales <br />
                        2 IPULSE M4, 3 cabezales, una con cargador para 20 matrix <br />
                        1 IPULSE M1 PLUS, 6 boquillas <br />
                        1 Horno Electrovert Omniflo de 10 zonas <br />
                    </p></div>
                    <div className='mb-4'><p className='text-center'><b className='font-bold text-xl'>Maquinaría adicional</b> <br />

                        1 Horno Electrovert Omniflo de 7 zonas <br />
                        1 estación de trabajo XRAY <br />
                        2 máquinas para rework Metcal model APR-5000 <br />
                        2 armarios anti-humedad <br />
                        1 cámara de Faraday <br />
                        2 cámaras climáticas <br />
                    </p></div>
                </div>
                <div className='flex justify-center mb-4'>
                    <video autoPlay loop muted className='w-full h-[300px] rounded-lg'>
                        <source src="/assets/videos/VIDEO-SMD-2.mp4" type="video/mp4" />
                    </video>
                </div>
            </div>
        </Layout>
    )
}
