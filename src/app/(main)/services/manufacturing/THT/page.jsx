import Image from 'next/image'
import React from 'react'
import Layout from "@/app/(main)/WebLayout";

export default function page() {
    return (
        <Layout>
            <hr className="h-1 mx-auto bg-gray-100 border-0 rounded dark:bg-gray-700 mt-10" />
            <div className="flex justify-center my-4">
                <h1 className="text-2xl font-bold text-center">Montaje THT</h1>
            </div>
            <div className='text-xl space-y-4 mb-4'>
                <p className='text-justify'>
                    Nuestros profesionales están especializados en montaje THT para garantizar la mejor calidad en los procesos de soldadura manual. Este tipo de montaje es definido en la fase de prototipado por la ingeniería de diseño. Alguno de nuestros profesionales llevan más de 30 años trabajando con nosotros.
                </p>
                <div className='flex flex-row justify-center'>
                    <Image
                        src="/assets/images/100000919.jpg"
                        alt="Image"
                        className="self-center rounded-lg object-cover h-[300px] md:w-[500px] w-full"
                        width="1100"
                        height="250"
                        priority="true"
                    />
                </div>
            </div>
        </Layout>
    )
}
