import Image from 'next/image'
import React from 'react'
import Layout from "@/app/(main)/WebLayout";

export default function page() {
  return (
    <Layout> <hr className="h-1 mx-auto bg-gray-100 border-0 rounded dark:bg-gray-700" />
      <div className="flex justify-center my-4">
        <h1 className="text-2xl font-bold">Servicios. Sistemas de baja y ultra-baja potencia</h1>
      </div>
      <div className='flex flex-row justify-center'>
        <Image
          src="/images/LowPower.jpg"
          alt="Vercel Logo"
          className="self-center rounded-lg"
          width="100"
          height="50"
          priority="true"
        />
      </div>

      <div className='text-justify text-xl mb-4'>
        <p >
          Si uno de los puntos claves en su estrategia de producto está basada en el uso de sistemas, con o sin microprocesador, que deban funcionar con unos requerimientos estrictos en cuanto a la potencia eléctrica consumida, nosotros podemos ayudarle. La gama de servicios cubre desde la asesoría sobre la arquitectura óptima a utilizar, la selección de los módulos o componentes a usar (en el caso de que decida no diseñar partiendo de la base, hasta el diseño e implementación completa hasta el nivel de prototipo o preserie del sistema completo.
          <br /><br />
          Nuestra experiencia en el tema está avalada por diseños críticos en cuanto a la potencia disipada. Algunos ejemplos de diseños realizados son los siguientes:
          <br /><br />
          Equipo tipo PDA con ultra-bajo consumo en standby (consumo por debajo de la corriente de fuga de la batería de ion-litio utilizada). Arranque en caliente en menos de un segundo.<br />
          Sistema basado en DSP con secciones de hardware activables por software para minimizar el consumo en función del uso real del sistema en cada momento.<br />
          Sensores alimentados por pilas con duración de varios años con una sola pila, comunicados por RF, basados en un protocolo complejo con ciclo de trabajo reducido a la mínima expresión...<br />
          <br /><br />
          Por supuesto, su necesidad no tiene porqué estar incluida en la lista anterior. En cualquier caso, no dude en consultar qué podemos hacer por usted. </p>
      </div>
    </Layout>
  )
}
