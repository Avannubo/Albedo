import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Layout from "@/app/(main)/WebLayout";

export default function page() {
    return (
        <Layout>
            <hr className="h-1 mx-auto bg-gray-100 border-0 rounded dark:bg-gray-700" />
            <div className="flex justify-center my-4">
                <h1 className="text-3xl font-bold self-center">Preguntas Frecuentes (FAQ)</h1>
            </div>
            <hr className="h-1 mx-auto bg-gray-100 border-0 rounded dark:bg-gray-700" />

            <div className='flex flex-col'>
                <div className="flex justify-center my-4">

                    <h1 className="text-xl font-bold">¿Cómo puedo comprar sus productos?</h1>
                </div>
                <div className='text-xl space-y-4 mb-4'>
                    <p className='text-justify'>
                        En la página correspondiente a cada producto hay una referencia al precio del mismo. Al lado encontrará un enlace a un formulario de consulta con el que podrá hacer la consulta sobre los productos que le interesan por correo electrónico y le enviaremos una oferta con el precio de los productos que haya escogido. Puede consultar sobre una gama de forma genérica (si es que tiene alguna duda de tipo general) o bien sobre uno o varios productos en particular. Para ello, rellene el apartado de comentarios con el número de unidades que desea de cada tipo. Introduzca su código postal para que podamos calcular adecuadamente los portes.
                        <br /> <br />
                        También encontrará un enlace para obtener un presupuesto para UNA unidad del producto en cuestión. Obtendrá el precio total de la compra de ese producto: precio unitario + IVA + portes. Recuerde que los portes que figurarán serán los máximos que se corresponden al destino más lejano y al mayor peso y volumen de nuestros productos.
                        <br /> <br />
                        Vea también nuestras <Link href="/condiciones">condiciones de compra</Link> como información de interés.                 </p>
                    <hr className="h-1 mx-auto bg-gray-100 border-0 rounded dark:bg-gray-700" />
                    <div className="flex justify-center my-4">
                        <h1 className="text-xl font-bold self-center">¿Cómo puedo comprar sus productos?</h1>
                    </div>
                    <p className='text-justify'>
                        Nuestro horario de atención al público es de 9:00 a 14:30 y de 16:00 a 18:30 de lunes a viernes, excepto en la temporada de verano, dentro de la cual el horario es de 9:00 a 14:30.
                        <br /> <br />
                        Dicho periodo no empieza en ninguna fecha prefijada, pero es anunciado en la página principal de nuestro portal.
                    </p>
                </div>
            </div>

        </Layout>
    )
}
