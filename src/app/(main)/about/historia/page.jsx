import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Layout from "@/app/(main)/WebLayout";

export default function page() {
    return (
        <Layout>
            <hr className="h-1 mx-auto bg-gray-100 border-0 rounded dark:bg-gray-700 mt-10" />
            <div className="flex justify-center my-4">
                <h1 className="text-3xl font-bold text-center">Historia de la empresa</h1>
            </div>
            <div className='text-xl space-y-4 mb-4'>

                <p className='text-justify'>
                    <Image
                        src="/assets/images/100000926.jpg"
                        alt="Vercel Logo"
                        className="float-left rounded-lg mr-4"
                        width="130"
                        height="50"
                        priority="true"
                    />
                    Albedo Design SL nace a principios de 2004 e inicia sus actividades en Junio de 2004. A pesar de su corta edad, en la empresa se acumulan más de 40 años de experiencia en el sector electrónico profesional.
                    <br />Dicha experiencia procede de la larga trayectoria profesional de algunos de los socios fundadores de Albedo Design S.L.: <b className='font-bold'>Juan Beneyto</b>  y <b className='font-bold'>Juan Luis Montore</b> (<Link className='text-[#304590]' href="/mas">más información...</Link>).
                    <br /> <br />
                    Ambos son ingenieros de Telecomunicación de consolidada reputación profesional en el sector electrónico español. Ambos fueron socios fundadores de ICT Electronics SA, dirigiendo con exito la empresa durante 18 años.
                    <Image
                        src="/assets/images/100000927.jpg"
                        alt="Vercel Logo"
                        className="float-right rounded-lg ml-4"
                        width="170"
                        height="50"
                        priority="true"
                    /> ICT pasó posteriormente a telecom2 formar parte del grupo Trend Communications bajo la denominación Trend Communications SL. <br />
                    ICT electronics fue durante largos años lider mundial en el sector de la Instrumentación para Telecomunicaciones.
                    <br />
                    Fundadores también de las empresas <b className='font-bold'>Conecta 2000 SA</b> , uno de los primeros ISP (proveedores de servicios Internet) de España y de   <b className='font-bold'>Silmon Technologies SL</b>, fabricante de instrumentación para PCs en formato tarjeta. En ambos casos, las empresas fueron creadas en un momento crucial para la demanda del servicio o producto ofertado.
                    <br /> <br />
                    Pero, como la historia se escribe a medida que transcurre el tiempo, esperamos llenar nuevas páginas con interesantes proyectos que les iremos revelando. Sigan visitándonos...</p>
                <div className="flex justify-center my-4">
                    <h1 className="text-2xl font-bold">Cambios</h1>
                </div>
                <p><b className='font-bold'>2005</b> : Se crea el <b className='font-bold'>Grupo ALBEDO</b> , al iniciar su actividad la nueva división Inmobiliaria, <Link className='font-bold text-[#304590]' href="https://www.promociones.albedo.biz/">ALBEDO Promociones</Link>  que actuará de forma paralela a la división de Domótica, Automatización y Multimedia.</p>
                <p><b className='font-bold'>2006</b> : Creamos la nueva división, <Link className='font-bold text-[#304590]' href="https://www.instruments.albedo.biz/">ALBEDO instruments</Link>, dedicada a la comercialización de instrumentos de medida para el mercado español.</p>
                <p><b className='font-bold'>2008</b> : En colaboración con un antiguo colaborador de la época de ICT electronics, Pepe Caballero, iniciamos las actividades de la división cuya misión es la asesoría, consultorio, formación y, en general cualquier actividad relacionada con el mundo de las Telecomunicaciones profesionales, <Link className='font-bold text-[#304590]' href="https://www.albedotelecom.com/">ALBEDO Telecom</Link> .</p>
            </div>
        </Layout>
    )
}
