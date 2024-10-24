import Image from 'next/image'
import React from 'react'
import Layout from "@/app/(main)/WebLayout";
export default function page() {
    return (
        <Layout>
            <hr className="h-1 mx-auto bg-gray-100 border-0 rounded dark:bg-gray-700 mt-10" />
            <div className="flex justify-start ">
                <h2 className='text-4xl font-bold mb-2'>
                    Términos y Condiciones
                </h2> 
            </div>
            <div className='text-xl space-y-4 mb-4'>
                <div className='text-justify'>
                    <p>Titular: ALBEDO Design S.L.</p>
                    <p>Domicilio social: CALLE JOAN D AUSTRIA, 112. 08018, BARCELONA, ESPAÑA.</p>
                    <p>CIF/NIF: B63441489</p>
                    <p>E-mail: adsl@albedo.biz</p>
                </div>
                <div className="flex my-2">
                    <h2 className="text-2xl font-bold">OBJETO</h2>
                </div>
                <p className='text-justify'>
                    Mediante el presente texto ponemos a disposición de todos los usuarios y clientes las condiciones de uso y registro que son de aplicación a nuestra plataforma de venta online albedo.biz, quedando reflejados en éste todos los derechos y obligaciones que asisten a las partes.<br></br>
                    Todos los usuarios que visitan o acceden a nuestra plataforma y/o que utilizan alguno de los servicios que ponemos a disposición, aceptan las condiciones de uso y la política de privacidad, así como las diferentes modificaciones y/o textos legales adicionales que sean incluidas en el futuro. En caso de no estar de acuerdo con alguna de las condiciones, puedes darte de baja del servicio en cualquier momento o en caso de no ser usuario registrado, abandonar la plataforma.
                    Junto a las presentes condiciones, cada uno de los servicios prestados puede quedar regulado por condiciones de uso y registro de carácter particular, siendo obligatorio en todo caso que el usuario acepte las mismas expresamente antes de su utilización y/o contratación.
                </p>
                <div className="flex flex-col my-2">
                    <h2 className="text-2xl font-bold">CONTRATACIÓN ELECTRÓNICA</h2>
                </div>
                <h3 className="text-xl font-bold mt-2">INFORMACIÓN PREVIA APLICABLE A LA CONTRATACIÓN ELECTRÓNICA</h3>
                <p className='text-justify'>
                    De conformidad con lo establecido en  la Ley 34/2002 de servicios de la sociedad de la información y de comercio electrónico, los contratos celebrados por vía electrónica producirán todos los efectos previstos por el ordenamiento jurídico, siempre que concurra el consentimiento de ambas partes y éste pueda ser acreditado.<br></br>
                    A estos efectos, se entenderá que el seguimiento de todas las fases del proceso de registro y en su caso, el abono de la cantidad económica correspondiente implica necesariamente la prestación del consentimiento expreso requerido para la contratación.<br></br>
                    Las condiciones de contratación indicadas a continuación son de aplicación directa a la contratación de todos los productos puestos a disposición a través del portal web albedo.biz, salvo que expresamente se disponga lo contrario.
                </p>
                <h3 className="text-xl font-bold mt-2">PROCEDIMIENTO DE CONTRATACIÓN</h3>
                <p className='text-justify'>
                    El procedimiento de contratación de los productos se lleva a cabo de forma completamente electrónica a través de nuestra plataforma, sin que exista en ningún momento presencia física de las partes y/o transacción física externa. Cualquier persona con acceso a Internet puede llevar a cabo la contratación.
                    Las fases del procedimiento de contratación son visibles para los usuarios a lo largo de todo el procedimiento de contratación. Pueden diferenciarse 3 fases:<br></br>
                    - Identificación del usuario.<br></br>
                    - Selección del servicio y forma de pago.<br></br>
                    - Confirmación del servicio.<br></br>
                    El usuario únicamente debe seleccionar el producto que desea adquirir y pulsar el botón de compra dispuesto al efecto. De esta forma, dará comienzo el procedimiento de contratación que seguirá siempre los pasos anteriormente indicados para todos los servicios disponibles.<br></br>
                    Una vez seleccionado el producto, la cantidad, los impuestos aplicables, el precio total y el medio de pago, la plataforma mostrará al usuario un resumen de la contratación realizada, junto a las condiciones de contratación aplicables, que en todo caso deberán ser expresamente aceptadas por el usuario para poder seguir el proceso de contratación.<br></br>
                    Una vez marcada la casilla de aceptación de las condiciones de contratación, en caso de haber seleccionado como forma de pago alguno de los medios electrónicos, el usuario será directamente redireccionado a la plataforma de pago externa correspondiente para realizar el pago, sin que albedo.biz tenga posibilidad de acceder en ningún momento a los datos de tarjetas de crédito y/o sistemas de pago del usuario.<br></br>
                    La seguridad del procedimiento de pago se encuentra garantizada por parte de la entidad financiera. Una vez finalizada la contratación del servicio o producto, se mostrará una pantalla resumen de la contratación realizada. En caso de haberse seleccionado el pago mediante tarjeta de crédito, éste se llevará a cabo a través de la TPV del banco, plataforma completamente ajena e independiente del prestador.<br></br>
                    En el plazo máximo de 24 horas, el contratante del servicio recibirá un correo electrónico en el que se mostrará toda la información relativa al pedido. Este documento es la confirmación de que la contratación se ha realizado con éxito, siendo válida como medio de acreditación para cualquier tipo de reclamación, siempre y cuando se adjunte el justificante del pago correspondiente.<br></br>
                    El prestador informa al usuario de que todas las contrataciones realizadas quedarán registradas en un fichero para el control y gestión de contrataciones, en el que quedarán reflejados junto a la información de los servicios contratados, información adicional para garantizar la seguridad y evidencia de la correcta realización del procedimiento.
                </p>
                <h3 className="text-xl font-bold mt-2">Devoluciones:</h3>
                <p className='text-justify'>
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
                    No se aceptarán devoluciones de aquellos productos "que, por su naturaleza, no puedan ser devueltos o son susceptibles de ser descargados o reproducidos con carácter inmediato para su uso permanente" (ley 47/2002, de 19 de diciembre, de Ordenación del Comercio Minorista art. 45).
                </p>
                <h3 className="text-xl font-bold mt-2">CANCELACIONES</h3>
                <p className='text-justify'>
                    Impuestos:  Nuestro productos no incluyen el IVA aplicable<br />
                    Costes de envío: Todos nuestros productos incluyen el coste de envío para envíos ordinarios dentro del período inicialmente programado.<br />
                    Plazo de envío: 3-14 dias laborables para envíos nacionales, 10-25 días para envíos internacionales. En ocasiones los pedidos pueden sufrir algún retraso, rogamos tengan paciencia. En todo caso facilitaremos un número de seguimiento de su pedido. En caso de no recibir su producto, rogamos lo pongan en conocimiento del departamento de atención al cliente.
                </p>
                <h3 className="text-xl font-bold mt-2">IMPUESTOS, COSTES Y PLAZO DE ENVÍO</h3>
                <p className='text-justify'>
                    El cliente o usuario podrá cancelar su pedido, siempre y cuando éste no esté ya en reparto . En tal caso, deberá ponerse en contacto con el PROPIETARIO a través del correo electrónico o de los canales de Atención al Cliente, comunicando sus datos identificativos y número de referencia del pedido. En caso de cancelaciones se procederá a la devolución de los importes abonados previamente por el usuario o cliente, a través del mismo medio empleado para la transacción inicial.
                </p>
                <h3 className="text-xl font-bold mt-2">GARANTÍAS Y RESPONSABILIDADES</h3>
                <p className='text-justify'>
                    Estamos profundamente comprometidos con que nuestros servicios funcionen correctamente y conforme a las condiciones acordadas con nuestros usuarios. No obstante, en ocasiones es posible que se produzcan, especialmente por la intervención de terceros mal intencionados, situaciones que pudieran provocar responsabilidades.<br />
                    En este sentido, a continuación os indicamos aquellas situaciones en las que no nos hacemos responsables de las actuaciones de los usuarios, asumiendo éstos todas las responsabilidades derivadas:<br />
                    En caso de que aparezca publicada en la plataforma información que no hubiera sido alojada por nuestra parte o que en su caso hubiera sido publicada por un tercero ajeno a la organización.<br />
                    En caso de que la plataforma no se encuentre operativa por razones técnicas imputables a terceros o causas imprevisibles y/o de fuerza mayor.<br />
                    En caso de que el usuario almacene o cualquier tercero, difunda, publique o distribuya en la plataforma cualquier tipo de material difamatorio, injurioso, discriminatorio, que incite a la violencia o que vaya contra la moral, el orden público, los derechos fundamentales, las libertas públicas, el honor, la intimidad o la imagen de terceros.<br />
                    En caso de que el usuario o cualquier tercero utilice la plataforma para introducir datos, virus, código malicioso, hardware o cualquier otro instrumento o dispositivo electrónico o físico, y se causen daños a los sistemas de otros usuarios.<br />
                    En ocasiones los productos mostrados en la web  pueden sufrir cambios  respecto al original debido a  la fotografía o calibración de la pantalla.<br />
                </p>
                <h3 className="text-xl font-bold mt-2">CONFIDENCIALIDAD Y PROTECCIÓN DE DATOS</h3>
                <p className='text-justify'>
                    De conformidad con lo dispuesto por el Reglamento (UE) 2016/679 del Parlamento Europeo y del Consejo, de 27 de abril de 2016, relativo a la protección de las personas físicas en lo que respecta al tratamiento de datos personales y a la libre circulación de estos, todos los datos de carácter personal facilitados durante la utilización de la plataforma y durante la prestación de los servicios serán tratados de conformidad con lo dispuesto en la Política de Privacidad, que todo usuario debe aceptar expresamente y de forma previa para poder registrarse.<br />
                    Todo usuario que acepte las presentes condiciones de uso, aceptan de forma informada, expresa e inequívoca nuestra Política de Privacidad, asistiéndole en este sentido los derechos de acceso, rectificación, cancelación y oposición respecto a sus datos de carácter personal, pudiendo ejercerlos según se informa en la mencionada Política de Privacidad.
                </p>
                <h3 className="text-xl font-bold mt-2">SERVICIO DE ATENCIÓN AL CLIENTE</h3>
                <div className='text-justify'>
                    <p>Mañanas de Lunes - Viernes de 08:00 a  14:00</p>
                    <p>Teléfono: 932210924</p>
                    <p>Email: adsl@albedo.biz</p>
                </div>
                <h3 className="text-xl font-bold mt-2">RESOLUCIÓN EXTRAJUDICIAL DE CONFLICTOS</h3>
                <p className='text-justify'>
                    Asimismo, en los términos que se recogen en el artículo 14 del Reglamento UE 524/2013, sobre resolución de litigios en materia de consumo, se proporciona un enlace directo a la plataforma de resolución de litigios en línea: https://ec.europa.eu/consumers/odr/main/index.cfm
                </p>
                <h3 className="text-xl font-bold mt-2">LEY APLICABLE Y JURISDICCIÓN
                </h3>
                <p className='text-justify'>
                    Para cualquier controversia o conflicto que pudiera surgir, derivado de estos términos o condiciones, resultará de aplicación la Ley Española. La resolución de los conflictos judiciales se someterá a la competencia de los Juzgados y Tribunales del domicilio del usuario o cliente.
                </p>
            </div>
        </Layout>
    )
}
