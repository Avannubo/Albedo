import Image from 'next/image'
import React from 'react'
import Layout from "@/app/(main)/WebLayout";

export default function page() {
    return (
        <Layout>
            <hr className="h-1 mx-auto bg-gray-100 border-0 rounded dark:bg-gray-700" />
            <div className="flex justify-center my-4">
                <h1 className="text-2xl font-bold">Test eléctrico</h1>
            </div>
            <div className='text-xl space-y-4 mb-4'>
                <p>
                Este proceso suele ser definido por el diseñador del equipo. Podemos realizarlo para ustedes, si se requiere.
<br /> <br />
Ocasionalmente, puede necesitarse un utillaje que nosotros mismos somos capaces de realizar, ya sea por mecanizado o aplicando otras soluciones. Disponemos de todo tipo de instrumental para su uso en esta tarea (fuentes, osciloscopios, generadores de onda, analizadores de espectro, etc...). 
                </p>
                <div className='flex flex-col justify-center space-y-4'>
                    <Image
                        src="/assets/images/100000924.jpg"
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
