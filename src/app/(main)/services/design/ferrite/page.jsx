import Image from 'next/image'
import React from 'react'
import Layout from "@/app/(main)/WebLayout";

export default function page() {
    return (
        <Layout> <hr className="h-1 mx-auto bg-gray-100 border-0 rounded dark:bg-gray-700 mt-10" />
            <div className="flex justify-center my-4">
                <h1 className="text-2xl font-bold text-center">Servicios. Diseños basados en ferrita</h1>
            </div>
            <div className='flex flex-row justify-start'>

            </div>
            <div className='text-justify text-xl mb-4'>
                <Image
                    src="/images/ferrite.jpg" 
                    alt="Vercel Logo"
                    className="float-start rounded-lg m-2"
                    width="400"
                    height="200"
                    priority="true"
                />
                <p className='text-justify'>
                    Es frecuente la necesidad de usar componentes de ferrita en un diseño a nivel de componente cuando en éste se efectúa un trasvase de energía (fuentes de alimentación, convertidor DC-DC, cargadores de baterías) o cuando se requiere proporcionar aislamiento entre varias secciones de un circuito (convertidores, transformadores de baja frecuencia o de RF) o cuando se requiere el uso de ferritas para obtener inductancias óptimas en un diseño crítico (filtros de altas prestaciones). Si su experiencia en el dimensionado de componentes de ferrita no le permita ajustar el diseño a sus necesidades, nosotros podemos ayudarle. Nuestra gama de servicios incluye la selección del material (grado) de la ferrita a utilizar en función de los requerimientos (potencia, rango de frecuencias, saturación, margen de temperatura), la selección de los componentes adicionales (carretes, hilo, ajustadores, aislamiento), hasta el diseño completo del elemento magnético y del circuito anexo (circuitos de potencia, filtros, etc...).
                </p>
                <br /> <br />
                <p className='text-justify'>
                    Tenemos gran experiencia en el uso del material ferrita. Algunos ejemplos de diseños realizados son los siguientes:<br />

                    Multitud de convertidores DC-DC, con o sin aislamiento. De hecho, fuimos los primeros diseñadores de convertidores DC-DC encapsulados con diseño estrictamente nacional.<br />
                    Filtros fijos o sintonizables, ecualizadores variables, recuperadores de reloj de banda amplia sintonizables, todos ellos en rangos de frecuencia ultra-anchos (desde KHz a GHz).

                </p>
                <br /> <br />
                <p className='text-justify'>

                    Consultenos en cualquier caso. Su diseño mejorará con nuestro asesoramiento.

                </p>
                <br />
            </div>
        </Layout>
    )
}
