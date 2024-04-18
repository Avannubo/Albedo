import Image from 'next/image'
import React from 'react'
import Layout from "@/app/(main)/WebLayout";

export default function page() {
    return (
        <Layout>
            <hr className="h-1 mx-auto bg-gray-100 border-0 rounded dark:bg-gray-700" />
            <div className="flex justify-center my-4">
                <h1 className="text-2xl font-bold">Comprar en ALBEDO Design S.L.</h1>
            </div>
            <div className='text-xl space-y-4 mb-4'>
                <div className="flex justify-center my-4">
                    <h1 className="text-2xl font-bold">Realizar el pedido:</h1>
                </div>
                <p>
                    Para realizar un pedido en la Tienda de ALBEDO Design S.L. llámenos por teléfono (pregunte por el departamento de ventas) al número 93-221-09-24, de lunes a viernes de 9:00 h. a 14:30 h y de 16:00 a 18:00 o envíe un correo electrónico a indicando los productos que desee comprar. No olvide de rellenar todos sus datos incluido su código postal para que nuestro equipo de ventas pueda calcular los costes de envío más ajustados posibles. En el segundo caso, nuestro equipo de ventas se pondrá en contacto con Usted mediante un correo electrónico, para enviarle la factura proforma y el plazo de entrega del material solicitado.
                    <br /><br />
                    La Tienda de ALBEDO Design S.L. también le da la posibilidad de consultar cualquier duda sobre nuestros productos y/o su aplicación escribiendo un correo electrónico a . También puede hacerlo por teléfono, llamando al 93-221-09-24, de lunes a viernes de 9:00 h. a 14:30 h y de 16:00 a 18:00.
                    <br /><br />
                    Los pedidos se entregarán dentro de la España peninsular, Baleares y Canarias. No se entregarán en apartados postales.
                </p>
                <div className="flex justify-center my-4">
                    <h1 className="text-2xl font-bold">Realizar el pedido:</h1>
                    <h1 className="text-xl font-bold">Formas de pago:</h1>
                </div>
                <p>
                    Si Usted acepta la Factura Proforma del pedido mediante el envío de un correo electrónico a , deberá realizar una transferencia bancaria por el importe Total de la Factura Proforma, a favor de "ALBEDO Design S.L.". Esta transferencia deberá realizarse en un plazo máximo de 3 días hábiles desde que aceptó el pedido (en caso de no haber recibido confirmación de la transferencia transcurrido este plazo, se cancelará el pedido). En el concepto de la transferencia recuerde mencionar el número de la Factura Proforma aceptada.
<br />
                    Los datos de nuestra cuenta son:
<br />
                    Banco Banif<br />
                    CCC: 0086-5148-81-0010001457<br />
                    Código Internacional de Cuenta Bancaria (IBAN): IBAN ES96-0086-5148-81-0010001457<br />
                </p>
                <div className="flex justify-center my-4">
                    <h1 className="text-xl font-bold">Precios y disponibilidad de productos:</h1>
                </div>
                <p>
                    Los precios y la disponibilidad de los productos de la Tienda de ALBEDO Design S.L. son válidos salvo fin de existencias o error tipográfico. Los pedidos se atenderán por riguroso orden de recepción, de acuerdo al Artículo 9 de la Ley de Comercio Minorista.
                    <br />
                    El importe (sin impuestos) del pedido mínimo será de 120€. En el caso de importes inferiores al indicado, se podrá efectuar la compra igualmente, pero existirá un recargo por gastos de tramitación y manipulación de 25€.
                    <br />
                    En caso de finalizar las existencias de un producto solicitado, se avisará al cliente del posible nuevo precio y plazo de entrega del producto y se solicitará la aceptación por el cliente. Si el cliente no acepta el posible nuevo precio y el nuevo plazo de entrega se cancelará el pedido del cliente. Si no es posible contactar con el cliente en el plazo de 3 días, se dará automáticamente por cancelado el pedido.
                </p>
                <div className="flex justify-center my-4">
                    <h1 className="text-xl font-bold">Impuestos:</h1>
                </div>
                <p>
                    Los precios publicados en la Tienda de ALBEDO Design S.L. son sin impuestos (I.V.A.)
                </p>

                <div className="flex justify-center my-4">
                    <h1 className="text-xl font-bold">Gastos de envío:</h1>
                </div>
                <p>
                    Los gastos de envío se calculan en función de las dimensiones y peso del pedido. Por ejemplo como precios indicativos tendremos que para envíos de paquetes de menos de 5Kg de peso y de dimensiones normales estarán comprendidos entre 8,99€ y 14,99€ más I.V.A. en función del destino.
                </p>

                <div className="flex justify-center my-4">
                    <h1 className="text-2xl font-bold">Envío del producto:</h1>
                    <h1 className="text-xl font-bold">¿Cuándo y cómo recibirá sus pedidos?</h1>
                </div>
                <p>
                    Si tenemos los productos del pedido en existencia, usted recibirá el pedido en tan sólo 5 días hábiles después de que se haya cursado el pedido y realizado el pago por Transferencia Bancaria, mediante un servicio de mensajería.
                    <br />
                    El plazo de 5 días hábiles será efectivo en el caso de que el cliente se encuentre localizable en el lugar de entrega durante ese periodo.
                    <br />
                    El pedido será cancelado en cualquiera de los dos supuestos siguientes:
                    <br />
                    No se puede realizar la entrega cuando ésta se intente en dos ocasiones.
                    No ha sido posible contactar con el cliente en los 3 días hábiles posteriores al primer intento fallido de entrega.
                    <br />
                    En el caso de que el producto llegase en condiciones deterioradas o defectuosas, deberá reclamar al transportista inmediatamente, y además avisarnos de la No Conformidad de la Recepción para que podamos solucionar lo antes posible la entrega del producto en perfectas condiciones, por supuesto sin ningún cargo adicional para usted.
                </p>

                <div className="flex justify-center my-4">
                    <h1 className="text-2xl font-bold">Gastos de envío:</h1>
                </div>
                <p>
                    Cuando compra en la Tienda de ALBEDO Design S.L. puede sentirse tranquilo y seguro porque está comprando con la garantía de ALBEDO Design S.L.
                    <br />
                    Los productos adquiridos en ALBEDO Design S.L. siempre disponen de instrucciones de uso en Castellano y/o Inglés y un servicio técnico en España *. Para más información sobre garantías del fabricante de productos específicos, por favor diríjase a nuestro Servicio de Soporte mediante correo electrónico a la dirección . También puede llamarnos al teléfono 93-221-09-24, de lunes a viernes de 9:00 h. a 14:00 h.
                    <br />
                    * En el caso de requerirlo el producto                 </p>

                <div className="flex justify-center my-4">
                    <h1 className="text-2xl font-bold">Factura:</h1>
                </div>
                <p>
                    Guarde la factura como comprobante de su compra. En el caso de avería en el producto adquirido no derivada de una mala utilización, deberá presentarla junto a la garantía que incluye el producto en cualquiera de los servicios técnicos especificados por el fabricante.                 </p>

                <div className="flex justify-center my-4">
                    <h1 className="text-2xl font-bold">Devoluciones:</h1>
                </div>
                <p>
                    Los pedidos son en firme. Por tanto, ninguna devolución será aceptada sin previa autorización. Deberá solicitar un número de autorización de devolución ("RMA"), aplicando la posibilidad de devolución para los casos en que la mercancia sea defectuosa o en que la mercancia esté equivocada por un error nuestro. En ambos casos, puede solicitar que se le envíe la mercancia correcta o que le devolvamos el importe de la misma. En cualquier caso, antes de recibir la nueva mercancia o el importe, tendrá que devolvernos previamente la mercancia defectuosa o equivocada. El plazo para solicitar la devolución será de 7 días hábiles, a contar desde el día de recepción de la mercancía.
                    <br />
                    Para iniciar el proceso de devolución, escribanos un correo electrónico a indicando su Nombre, Dirección, Número de teléfono, DNI o NIF y el producto que desea devolver y la causa de la posible devolución. También puede llamarnos al 93-221-09-24, de lunes a viernes de 9:00 h. a 14:00 h. En el caso que sea de aplicación la devolución del producto, recibirá su RMA y nos pondremos en contacto para acordar el día de recogida del producto.
                    <br />
                    La recogida del producto será gestionada por ALBEDO Design S.L. y los gastos de transporte derivados de esta devolución serán asumidos por el cliente además de 10,00 € en concepto de Gastos Administrativos. Los gastos de transporte dependerán del peso y dimensiones del o de los productos que desee devolver. El reintegro del importe comprenderá solamente el PVP de los artículos incluidos en la devolución, quedando excluidos los costes de envío, así como los costes totales de devolución.
                    <br />
                    El reintegro de la compra se efectuará, en cualquier caso, a la recepción de los artículos en ALBEDO Design S.L. previa comprobación del estado de la mercancía, que debe estar sin usar y en su embalaje original, y se procederá al reintegro de su importe (costes de envíos y gastos administrativos no incluidos) mediante transferencia bancaria.
                    <br />
                    En el caso de que en una devolución el artículo no se encuentre en las condiciones mencionadas, será remitido al cliente, cobrándole además los portes correspondientes.
                    <br />
                    No se aceptarán devoluciones de aquellos productos "que, por su naturaleza, no puedan ser devueltos o son susceptibles de ser descargados o reproducidos con carácter inmediato para su uso permanente" (ley 47/2002, de 19 de diciembre, de Ordenación del Comercio Minorista art. 45).                                 </p>
                <div className="flex justify-center my-4">
                    <h1 className="text-2xl font-bold">Política de privacidad de datos:</h1>
                </div>
                <p>
                    En ALBEDO Design S.L. ponemos especial cuidado en la protección de sus datos personales. Conforme a lo dispuesto en el artículo 5 de la Ley Orgánica 15/1999, de 13 de diciembre, de Protección de Datos de Carácter Personal, le informamos que los datos que nos facilite voluntariamente a través de los formularios, vía correo electrónico o teléfono serán incorporados a un fichero automatizado de ALBEDO Design S.L.. El registro y tratamiento de estos datos tiene como finalidad la gestión de sus pedidos, así como la realización de estudios de marketing para ofrecerle, de forma segmentada y personalizada, información propia o de terceros, acerca de productos y servicios electrónicos.
                    <br />
                    En ALBEDO Design S.L. queremos garantizar que todas las comunicaciones comerciales que dirigimos a nuestros clientes cumplen la legislación vigente. Por ello le informamos que ALBEDO Design S.L. podrá enviarle comunicaciones comerciales de sus productos y servicios por correo electrónico o a través de otros medios electrónicos. Dichas comunicaciones comerciales podrán consistir en información que resulte interesante para Usted, como promociones, descuentos exclusivos, encuestas, etc. Si no deseara recibir dicha información, bastará con que nos lo indique, en cualquier momento, en la dirección
                    <br />
                    Según lo dispuesto en la Ley Orgánica de Protección de Datos de Carácter Personal (LO 15/1999), Usted puede ejercitar en todo momento sus derechos de acceso, rectificación, oposición y cancelación de los datos personales, dirigiéndose a                     </p>
            </div>
        </Layout>
    )
}
