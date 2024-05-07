import Image from 'next/image'
import React from 'react'
import Layout from "@/app/(main)/WebLayout";

export default function page() {
    return (
        <Layout>
            <hr className="h-1 mx-auto bg-gray-100 border-0 rounded dark:bg-gray-700 mt-10" />
            <div className="flex justify-center my-4">
                <h1 className="text-2xl font-bold text-center">Rework</h1>
            </div>
            <div className='text-xl space-y-4 mb-4'>
                <p>
                    Con las máquinas Metcal PR-5000, nuestros operadores reparan BGA's , Memorias y otros componentes de alta densidad defectuosos. El procesoes el siguiente:
                    <br /> 
                    - se desuelda el componente <br />
                    - se hace un reballing del componente <br />
                    - se serigrafía la placa de circuito impreso (PCB) de nuevo <br />
                    - se vuelve a soldar. <br />
                </p>
                <div className='flex flex-col justify-center space-y-4'>
                    <Image
                        src="/assets/images/100000922.jpg"
                        alt="Vercel Logo"
                        className="self-center rounded-lg object-cover h-[300px] md:w-[500px] w-full"
                        width="1100"
                        height="250"
                        priority="true"
                    />
                    <p className='text-xl'> Contamos con cientos de pantallas y todos los tamaños de ballings existentes. </p>
                    <Image
                        src="/assets/images/100000923.jpg"
                        alt="Vercel Logo"
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
