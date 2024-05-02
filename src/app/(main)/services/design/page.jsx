import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Layout from "@/app/(main)/WebLayout";
export default function page() {
    return (
        <Layout>
            <hr className="h-1 mx-auto bg-gray-100 border-0 rounded dark:bg-gray-700 mt-6" />
            <div className="flex justify-center my-4">
                <h1 className="text-2xl font-bold md:text-start text-center self-center">Diseñamos y producimos sus productos electrónicos
                </h1>
            </div>
            <div className='flex flex-row space-x-4 mb-6'>
                <div className='hidden md:flex'>
                    <Image
                        src="/images/remote_metro_iso.jpg"
                        alt="Vercel Logo"
                        className="float-right rounded-lg h-[300px] "
                        width="400"
                        height="350"
                        priority="true"
                    />
                </div>
                <div>
                    <p className='text-lg text-justify pb-2'>
                        En ALBEDO Design, tenemos ingenieros altamente cualificados, para crear cualquier tipo de equipo y/o producto electrónico. Nuestra especialidad son los proyectos de IOT, aunque cabe recalcar que también hemos desarrollado en el pasado equipos en sectores muy variados (electromedicina, instrumentación, energía).
                    </p>
                    <p className='text-lg text-justify pb-2'>
                        Actuámos con la máxima confidencialidad durante el proyecto y cubrimos para el cliente todas las fases del diseño, tanto hardware como firmware o software.
                    </p>
                    <p className='text-lg text-justify pb-2'>
                        Somos especialistas en diseño electrónico, con especial capacidad en los siguientes campos:
                    </p>
                </div>
                <div className='hidden md:flex'>
                    <Image
                        src="/images/remote_green_imagen2.jpg"
                        alt="Vercel Logo"
                        className="float-left rounded-lg h-[300px] "
                        width="400"
                        height="450"
                        priority="true"
                    />
                </div>
            </div>
            <div className='flex flex-col items-start space-y-4 mb-4'>
                <div className='flex flex-col justify-center md:flex-row space-x-2'>
                    <Link className='self-center' href="/services/design/rf">
                        <Image
                            src="/images/rf.png"
                            alt="Vercel Logo"
                            className="self-center rounded-lg w-[80px] h-[80px]"
                            width="100"
                            height="50"
                            priority="true"
                        />
                    </Link>
                    <div className='flex flex-col md:flex-row text-xl md:text-start text-center self-center'>
                        <Link href="/services/design/rf" className='text-[#304590] font-bold md:text-start text-center self-center'>Módulos de Radio Frecuencia (RF):
                        </Link> Diseño de subsistemas de RF de bajo nivel de ruido y alta sensibilidad.
                    </div>
                </div>
                <div className='flex flex-col justify-center md:flex-row space-x-2'>
                    <Link className='self-center' href="/services/design/ferrite">
                        <Image
                            src="/images/ferrite.jpg"
                            alt="Vercel Logo"
                            className="self-center rounded-lg w-[80px] h-[80px]"
                            width="100"
                            height="50"
                            priority="true"
                        />
                    </Link>
                    <div className='flex flex-col justify-center md:flex-row text-xl md:text-start text-center self-center'>
                        <Link href="/services/design/ferrite" className='text-[#304590] font-bold md:text-start text-center self-center'>Ferritas:
                        </Link>  Diseños en los que los componentes de ferrita sean elementos centrales: fuentes de alimentación, sensores, baluns, transformadores.
                    </div>
                </div>
                <div className='flex flex-col justify-center md:flex-row space-x-2'>
                    <Link href="/services/design/low_power" className='self-center flex flex-row space-x-2'>
                        <Image
                            src="/images/LowPower.jpg"
                            alt="Vercel Logo"
                            className="self-center rounded-lg w-[80px] h-[80px]"
                            width="100"
                            height="50"
                            priority="true"
                        />

                    </Link>
                    <div className='flex flex-col justify-center md:flex-row text-xl md:text-start text-center self-center'>
                        <Link href="/services/design/low_power" className='text-[#304590] font-bold md:text-start text-center self-center'>Equipos de baja y ultra-baja potencia:
                        </Link>  Sistemas electrónicos óptimos en en uso de la potencia disponible.
                    </div>
                </div>
            </div>
        </Layout>
    )
}
