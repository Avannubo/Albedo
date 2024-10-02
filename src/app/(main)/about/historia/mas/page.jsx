import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Layout from "@/app/(main)/WebLayout";

export default function page() {
    return (
        <Layout>
            <hr className="h-1 mx-auto bg-gray-100 border-0 rounded dark:bg-gray-700 mt-10" />
            <div className="flex justify-center my-4">
                <h1 className="text-3xl font-bold text-center">Historia de Grupo ALBEDO, ICT Electronics y ALBEDO Telecom</h1>
            </div>
            <div className='text-xl space-y-4 mb-4'>

                <p className='text-justify'></p>

                <Image
                    src="/assets/images/mas1.jpg"
                    alt="Image"
                    className="float-left rounded-lg mr-4"
                    width="130"
                    height="100"
                    priority="true"
                />
                En el origen de todo está la empresa ICT Electronics SA, creada en el año 1981 y que inició sus actividades en el año 1982. Algunos de sus socios fundadores, Juan Beneyto y Juan Luis Montore. fueron, a su vez, los creadores de ALBEDO Design, en 2004. ICT fue transferida a un empresa de capital británico en el año 2000.

                <br />
                <br />

                Desde su creación, ICT electronics SA (ICT) paso por los estadios de consultoría, empresa de instrumentación, empresa mixta de instrumentación y de sistemas de alimentación (convertidores DC/DC), para acabar finalmente como empresa dedicada integralmente a la instrumentación para Telecomunicaciones.


                <Image
                    src="/assets/images/mas2.jpg"
                    alt="Image"
                    className="float-right rounded-lg ml-4"
                    width="170"
                    height="50"
                    priority="true"
                />
                ICT electronics tuvo desde un buen principio una vocación internacional que la llevo a obtener un porcentaje elevadísimo de sus ventas de la exportación. Además, esa vocación internacional hizo que se crearán la filial en Argentina y la filial en India, país este último donde se produjo un gran crecimiento de las ventas y una consolidación del proyecto de empresa.
                <br />
                <br />
                Fue larga la lista de productos y servicios ofrecidos, pero hay algunos que destacan especialmente:
                <div className='flex flex-row justify-start space-x-2'>
                    <Image
                        src="/assets/images/mas3.jpg"
                        alt="Image"
                        className="float-right rounded-lg ml-4"
                        width="170"
                        height="50"
                        priority="true"
                    />
                    <Image
                        src="/assets/images/mas4.jpg"
                        alt="Image"
                        className="float-right rounded-lg ml-4"
                        width="170"
                        height="50"
                        priority="true"
                    />
                    <Image
                        src="/assets/images/mas5.jpg"
                        alt="Image"
                        className="float-right rounded-lg ml-4"
                        width="170"
                        height="50"
                        priority="true"
                    />
                </div>
                <br />
                <br />

                El equipo <b> ICT 2040</b>  (a la izquierda) fue un gran éxito de ventas en todo el mundo y proporcionó a<b>
                    ICT</b>  una reputación de empresa puntera, capaz de generar equipos adaptados a las necesidades del cliente (la batería del ICT2040 y la correcta gestión de la energía permitía el uso continuado del equipo durante más de 8 horas) y de alta calidad (la tasa de equipos averiados del parque de equipos implantados fue realmente baja).
                <br />
                <br />

                <b>Flexacom</b> (en el centro) fue un equipo presentado en primicia en el Telecom de Ginebra del 1995 y fue todo una revolución en el campo de los equipos de medida SDH/PDH/ATM. Fue el <b>primer equipo del mundo capaz de medir y generar jitter</b> en el reloj de recepción y transmisión respectivamente<b>de forma digital</b>. Además, sentó las bases para la futura gama de equipos que consolidó definitivamente a <b>ICT</b> como uno de los "players" más importantes en el mundo en el campo de los "testers" de mano: la gama <b>Victoria</b> (a la derecha).
                <br />
                <br />

                Pero volvamos a la nueva etapa... Después de la etapa <b>ICT</b>, y una vez creado <b>ALBEDO Design</b>, la empresa creció a través de la incorporación de nuevas divisiones. Esto llevo a la creación del Grupo ALBEDO. Y, por último, se creo la división de Telecomunicaciones, <Link href="https://www.albedotelecom.com" className='text-[#304587]'>ALBEDO Telecom</Link>.
                <br />
                <br />

                <Link href="https://www.albedotelecom.com" className='text-[#304587]'>ALBEDO Telecom</Link> es una empresa joven, pero el bagaje acumulado es impresionante. Vamos a plasmar en este nuevo proyecto toda la experiencia y todo el conocimiento del que disponemos y vamos a aplicar las mismas máximas que hicieron de ICT un referente en el mercado: innovación, compromiso y calidad.

                <br />

            </div>
        </Layout>
    )
}
