import Image from 'next/image'
import React from 'react'
import Layout from "@/app/(main)/WebLayout";

export default function page() {
    return (
        <Layout>
            <hr className="h-1 mx-auto bg-gray-100 border-0 rounded dark:bg-gray-700" />
            <div className="flex justify-center my-4">
                <h1 className="text-2xl font-bold">Verificación óptica</h1>
            </div>
            <div className='text-xl space-y-4 mb-4'>
                <p>
                    Es un proceso imprescindible para asegurar la calidad de los procesos involucrados en el montaje de las placas (pasta de soldadura, componentes bien colocados, etc.).
                </p>
                <div className='flex flex-col space-y-4'>
                    <h2 className='font-bold text-2xl  self-center'>SPI</h2>
                    <p> Contamos con una máquina SPI de ultima generación, capaz de ver si la pasta de soldadura esta en su sitio. En caso de que no sea así, descartaría la PCB y obligaría a la serigrafía automáticamente a mover sus ejes para ajustar la pantalla. </p>
                    <h2 className='font-bold text-2xl self-center'>AOI 3D</h2>
                    <p> Nuestra máquina AOI 3D de ultima generación, es capaz de detectar defectos y/o faltas en los componentes, soldaduras defectuosas, polaridad errónea del componente e incluso los valores de estos. Todos los productos fabricados en ALBEDO, pasan a ser revisados por ésta. </p>
                    <h2 className='font-bold text-2xl self-center'>Inspección visual</h2>
                    <p> Para controlar todo el proceso de fabricación, contamos con especialistas en la inspección visual, mediante microscopio. </p>
                </div>
                <div className='flex flex-col justify-center space-y-4'>
                    <Image
                        src="/assets/images/200000033.jpg"
                        alt="Vercel Logo"
                        className="self-center rounded-lg"
                        width="1100"
                        height="250"
                        priority
                    />
                    <div className="flex justify-center my-4">
                        <h1 className="text-2xl font-bold">Estación de trabajo de Rayos X (XRay WorkStation)</h1>

                    </div>

                    <Image
                        src="/assets/images/200000066.jpg"
                        alt="Vercel Logo"
                        className="self-center rounded-lg"
                        width="1100"
                        height="250"
                        priority
                    />
                    <p>
                        En aquellas placas con dispositivos de altísima densidad de conexiones y aquellos cuyos pins quedan ocultos para una inspección visual directa (BGA, QFN, LGA) disponemos de una estación de trabajo por rayos X que permite controlar y certificar el proceso de soldadura de dichos componentes.
<br /> <br />
                        En las imagenes que veran a continuación se puede apreciar el detalle de una bola en un BGA correcta respecto a una defectuosa
                    </p>
                    <Image
                        src="/assets/images/200000099.jpg"
                        alt="Vercel Logo"
                        className="self-center rounded-lg"
                        width="1100"
                        height="250"
                        priority
                    />
                    <Image
                        src="/assets/images/200000132.jpg"
                        alt="Vercel Logo"
                        className="self-center rounded-lg"
                        width="1100"
                        height="250"
                        priority
                    />
                </div>
            </div>
        </Layout>
    )
}
