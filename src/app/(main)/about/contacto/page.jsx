import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Layout from "@/app/(main)/WebLayout";
export default function page() {
  return (
    <Layout>
      <hr className="h-1 mx-auto bg-gray-100 border-0 rounded dark:bg-gray-700 mt-10" />
      <div className='flex flex-col sm:flex-row sm:mt-4'>
        <div className='text-xl space-y-4 sm:mb-4'>
          <div className="flex justify-center my-4">
            <h1 className="text-2xl font-bold">Formas de contactar con ALBEDO</h1>
          </div>
          <p>
            1.- Por correo-electrónico. Es el método preferido pues nos permite atenderle aún cuando estemos ausentes. <br /> Las direcciones son:
            <br />
            <Link className='text-bold hover:text-[#304590]' href="mailto:ventas@albedo.biz">ventas@albedo.biz</Link>: para comprar nuestros productos <br />
            <Link className='text-bold hover:text-[#304590]' href="mailto:soporte@albedo.biz">soporte@albedo.biz</Link>: para resolver cualquier duda técnica</p>
          <p>2.- Por correo: nuestra dirección postal es: Joan d'Àustria, 112, 08018, Barcelona, España.
            <br /> <br />
            3.- Por teléfono: 93 221 09 24, de 9:00 a 14:00 y de 16:00 a 18:30, de lunes a viernes.
            <br /> <br />
            4.- Para visitar nuestra central, le incluimos el enlace a nuestra ubicación en Google Maps. Para verla, pulse el mapa. </p>

        </div>
        <div className='flex flex-col space-y-4 mb-6 sm:mb-2'>
          <Image
            src="/assets/images/100000925.jpg"
            alt="Vercel Logo"
            className="hidden sm:flex  float-right rounded-lg"
            width="350"
            height="80"
            priority="true" />
          <div className='w-full flex justify-center'>
            <div id="g-mapdisplay" ><iframe src="https://www.google.com/maps/embed/v1/place?q=ALBEDO+Design+SL,+Carrer+de+Joan+d'Àustria,+Barcelona,+España&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8"></iframe>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
