import Image from 'next/image'
import React from 'react'

export default function page() {
    return (
        <div> <hr className="h-1 mx-auto bg-gray-100 border-0 rounded dark:bg-gray-700" />
            <div className="flex justify-center my-4">
                <h1 className="text-2xl font-bold">Servicios. Módulos de Radio Frecuencia (RF)</h1>
            </div>
            <div className='flex flex-row justify-center'>
                 <Image
                        src="/images/rf.png"
                        alt="Vercel Logo"
                        className="self-center rounded-lg"
                        width="100"
                        height="50"
                        priority
                    />
            </div>
           
            <div className='text-justify text-xl mb-4'>
                <p >
                Aunque los describamos como módulos de RF, nuestra experiencia va más allá de lo que podríamos describir como "sistema basado en RF". Somos auténticos especialistas en el diseño de circuitería analógica de altísimas prestaciones (bajo nivel de ruido, alta sensibilidad, sensibilidad a interferencias propias (entorno hostil) o externas. 
                </p><br />
                <p>Plantéenos su problema y le propondremos una solución. Resuelva sus problemas rápidamente. Garantizado. </p>
            </div>
        </div>
    )
}
