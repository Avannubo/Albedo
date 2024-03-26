'use client';

import React, { useState, useEffect } from 'react';
import useProductId from '@/components/hooks/useProductId';
import { getCategories } from '@/lib/data';
import Image from 'next/image';
import Link from 'next/link';

export default function Page() {
  const productId = useProductId();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getCategories();
        const foundProduct = data.find(cat => cat.products.find(p => p.ALBEDOcodigo === productId));
        if (foundProduct) {
          setProduct(foundProduct.products.find(p => p.ALBEDOcodigo === productId));
          console.log(JSON.stringify(foundProduct));
        } else {
          console.error("Product not found for id:", productId);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }
    fetchData();
  }, [productId]);

  return (
    <div className='min-h-[50vh]'>
      {product && (

        <div className='flex flex-row justify-between my-10'>
          <div className='w-1/3'>
            <Image src={product.imagen} alt={product.ALBEDOtitulo} width={300} height={350} />
          </div>
          <div className='w-2/3'>
            <h1 className='font-extrabold text-2xl'>{product.ALBEDOtitulo}</h1>
            <p className='text-md'>{product.ALBEDOdescripcion}</p>
            <div>
              {/* {product.ALBEDOcuerpo} */}
              <p>
                Sistema de comunicación accesible que proporciona información sobre la localización del usuario, los objetos próximos y sus características, el espacio donde se ubican y los posibles recorridos a realizar.

                El Sistema se compone de: <br />

                • Un subsistema de gestión de contenidos (CMS por sus siglas en inglés).<br />
                • Balizas Bluetooth, beacons, para identificar ubicaciones y objetos. Pueden funcionar en el exterior, or su nivel de estanqueidad.<br />
                • Una aplicación web para a la gestión de balizas y usuarios.<br />
                • Una aplicación móvil de usuario en iOS y Android (audioguía).<br /><br />

                El Servicio Básico comprende:<br /><br />

                • 20 balizas Bluetooth con una garantía de dos años.<br />
                • Almacenamiento en la nube durante el primer año de servicio.<br />
                • Mantenimiento correctivo y adaptativo durante el primer año de servicio.<br />
                • Manual de instalación y uso.<br />

                El sistema de gestión de contenidos puede almacenar la información en diferentes idiomas, con lenguaje comprensivo según formación, edad y capacidades cognitivas, con audio descripción para personas con discapacidad visual, vídeo en lengua de signos y realidad aumentada. Cada entidad decide el nivel al que quiere llegar en función de los recursos dedicados a la creación del itinerario. Por supuesto, los contenidos siempre pueden ser actualizados.<br /><br />

                La aplicación móvil se descarga de Google Play o de Apple Store. La interfaz se adapta a las capacidades del usuario. Proporciona información de todos los elementos de la exposición con el formato más adecuado para el usuario. Da indicaciones de navegación de la visita y recomienda los posibles itinerarios.<br /><br />

                Nota: en el mantenimiento no se incluye el cambio de pilas de las balizas.<br /><br />
              </p>
            </div>
            <p className='text-xl font-medium'>Precio: {product.ALBEDOprecio}€</p>
          </div>
        </div>
      )}
    </div>
  );
}
