import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Layout from "@/app/(main)/WebLayout";

export default function page() {
    return (
        <Layout>
            <hr className="h-1 mx-auto bg-gray-100 border-0 rounded dark:bg-gray-700 mt-6" />
            <div className="flex justify-center my-4">
                <h1 className="text-2xl font-bold text-center">Diseñamos y producimos sus productos electrónicos</h1>
            </div>
            <div className=''>
                <p className='text-lg text-justify '>
                    En ALBEDO diseñamos y producimos los equipos electrónicos que requiera, bajo sus especificaciones. Nuestro Departamente de I+D generan el diseño del producto, pudiendo pre-calificar el producto en las normas relativas al marcaje CE (EMC, ESD, seguridad, susceptibilidad) pues disponemos en nuestras instalaciones de las cámaras de Faraday, instrumentos y útiles para ello. Si, además requiere que dicho productos se produzca, ajuste y, opcionalmente se expida, nuestro Departamento de Producción está a su disposición.
                </p>
            </div>
            <div className="flex justify-center my-4">
                <h1 className="text-xl font-bold text-center">Diseño de productos electrónicos</h1>
            </div>
            <Link href="/services/design" className='flex justify-center'>
                <Image
                    src="/images/servicio_diseño_01.jpg"
                    alt="Vercel Logo"
                    className="self-center rounded-lg"
                    width={1100}
                    height={700}
                    priority="true"
                />
            </Link>

            <div className="flex justify-center my-4 mt-2">
                <h1 className="text-xl font-bold text-center">Fabricación de prototipos, preseries y series</h1>
            </div>
            <Link href='/services/manufacturing/' className='flex justify-center my-5'>
                <Image
                    src="/images/servicio_fabricacion_01.jpg"
                    alt="Vercel Logo"
                    className="self-center rounded-lg"
                    width={1100}
                    height={700}
                    priority="true"
                />
            </Link>
        </Layout>
    )
}
