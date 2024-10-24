import Image from 'next/image'
import React from 'react'
import Layout from "@/app/(main)/WebLayout";
export default function page() {
    return (
        <Layout>
            <hr className="h-1 mx-auto bg-gray-100 border-0 rounded dark:bg-gray-700 mt-10" />
            <div className="flex justify-start my-4">
                <h1 className="text-4xl font-bold text-start">Política de Cookies</h1>
            </div>
            <div className='text-xl space-y-4 mb-4'> 
                <div className="flex justify-start my-4 text-2xl ">
                    <h1 className="">¿Qué son las cookies?</h1>
                </div>
                <p className='text-justify'>
                    Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo (ordenador, tableta, teléfono móvil, etc.) cuando visitas un sitio web. Se utilizan para recordar tus preferencias, mejorar la experiencia del usuario o recopilar datos de navegación con diversos fines, como el análisis del uso del sitio o la personalización de contenido.
                </p>
                <div className="flex justify-start my-4 text-2xl ">
                    <h1 className="">¿Por qué no usamos cookies?</h1>
                </div>
                <p className='text-justify'>
                    En www.albedo.biz, hemos diseñado nuestro sitio de manera que no sea necesario el uso de cookies. No recopilamos ni almacenamos información que pueda identificar a los usuarios y no utilizamos servicios de terceros que requieran cookies. </p>
                <div className="flex justify-start my-4 text-2xl ">
                    <h1 className="">Cambios en la Política de Cookies</h1>
                </div>
                <p className='text-justify'>
                    Si en el futuro decidimos implementar cookies o cualquier tecnología de rastreo en nuestro sitio web, actualizaremos esta política y solicitaremos el consentimiento correspondiente a los usuarios.
                </p>
            </div>
        </Layout>
    )
}
