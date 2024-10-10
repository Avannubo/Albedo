'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import CryptoJS from 'crypto-js'; 
import { saveNewOrder, checkStock } from '@/lib/data';

export default function ModalTPV({ isOpen, onClose, orderData, precioTotal }) {
    const [cartItems, setCartItems] = useState([]);
    const [isProcessingPayment, setIsProcessingPayment] = useState(false);
    const [paymentStatus, setPaymentStatus] = useState(null);
    // const router = useRouter();  // Next.js router
    useEffect(() => {

        if (paymentStatus === 'OK') {
            saveNewOrder(orderData);
            localStorage.clear(); 
        }



        const storedCartItems = JSON.parse(localStorage.getItem("carrito"));
        if (storedCartItems) {
            setCartItems(storedCartItems);
        }
        // Check for status in URL parameters (OK or KO)
        const params = new URLSearchParams(window.location.search);
        const status = params.get('status');
        if (status) {
            setPaymentStatus(status);
        }
    }, []);
    const calcularFirma = () => {
        let cleanPrecioTotal = (precioTotal * 100).toString(); // Convert to cents and string
        let merchantOrder = orderData.orderId;
        // Create data object for the payment request
        let data = {
            "DS_MERCHANT_AMOUNT": cleanPrecioTotal,
            "DS_MERCHANT_CURRENCY": "978",
            "DS_MERCHANT_MERCHANTCODE": "362134496",
            "DS_MERCHANT_ORDER": merchantOrder,
            "DS_MERCHANT_TERMINAL": "1",
            "DS_MERCHANT_TRANSACTIONTYPE": "0",
            "DS_MERCHANT_URLOK": "http://localhost:3000/checkout?status=OK",  // Redirect on success
            "DS_MERCHANT_URLKO": "http://localhost:3000/checkout?status=KO",  // Redirect on failure
        };
        console.log('Payment Data:', data);
        // Encode parameters and calculate signature
        let encodedParameters = stringBase64Encode(JSON.stringify(data));
        let encodedSignature = "sq7HjrUOBfKmC576ILgskD5srU870gJ7";
        let encodedSignatureDES = des_encrypt(merchantOrder, base64Decode(encodedSignature));
        let encodedDsSignature = CryptoJS.HmacSHA256(encodedParameters, base64Decode(encodedSignatureDES));
        let dsSignature = CryptoJS.enc.Base64.stringify(encodedDsSignature);
        // Populate form fields
        document.forms["pago"].datos.value = JSON.stringify(data);
        document.forms["pago"].Ds_MerchantParameters.value = encodedParameters;
        document.forms["pago"].Ds_Signature.value = dsSignature;
        console.log('Encoded Parameters:', encodedParameters);
        console.log('DS Signature:', dsSignature);
    };
    const stringBase64Encode = (input) => {
        let utf8Input = CryptoJS.enc.Utf8.parse(input);
        return CryptoJS.enc.Base64.stringify(utf8Input);
    };
    const base64Decode = (input) => {
        return CryptoJS.enc.Base64.parse(input);
    };
    const des_encrypt = (message, key) => {
        let ivArray = [0, 0, 0, 0, 0, 0, 0, 0];
        let IV = ivArray.map(item => String.fromCharCode(item)).join("");
        let encode_str = CryptoJS.TripleDES.encrypt(message, key, {
            iv: CryptoJS.enc.Utf8.parse(IV),
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.ZeroPadding
        });
        return encode_str.toString();
    };
    const handlePaymentProcess = () => {
        setIsProcessingPayment(true);
        try {
            calcularFirma();
            document.forms["pago"].submit();
            
        } catch (error) {
            setPaymentStatus('KO');
            console.error("Error processing payment:", error);
        }
    };
    const handleCloseModal = () => {
        onClose();
        setPaymentStatus(null);
        // Clear the URL parameters after closing the modal
        // router.push('/checkout', undefined, { shallow: true });
    };
    return isOpen || paymentStatus ? (
        <div className="fixed inset-0 p-6 flex flex-wrap justify-center items-center w-full h-full z-[999] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto font-[sans-serif]">
            <div className="z-[1000]">
                {isProcessingPayment ? (
                    <div className="bg-white p-4 rounded shadow-lg text-center">
                        <h2 className="text-2xl font-bold">Pago en proceso...</h2>
                        <p className="text-lg mt-2">Por favor, espera mientras procesamos tu pago.</p>
                        <div className="loader mt-4"></div>
                    </div>
                ) : paymentStatus === 'OK' ? (
                    <div className="bg-white p-4 rounded shadow-lg text-center">
                        <h2 className="text-2xl font-bold text-green-500">¡Pago realizado!</h2>
                        <p className="text-lg mt-2">¡Tu pago ha sido completado con éxito!</p>
                        {/* <Link href="/" className="mt-4 inline-block text-blue-600 hover:underline">
                            Ver resumen del pedido
                        </Link> */}
                            <h2 className="text-2xl mt-4 font-bold">Resumen del Pedido</h2>
                        <div className="">
                            <table className="w-full table-auto border-collapse">
                                <thead>
                                    <tr className="text-left border">
                                        <th className="px-4 py-2 border">Producto</th>
                                        <th className="px-4 py-2 border">Cantidad</th>
                                        <th className="px-4 py-2 border">Precio</th>
                                        <th className="px-4 py-2 border">Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cartItems.map((product) => (
                                        <tr key={product.ALBEDOcodigo} className="text-left">
                                            <td className="px-4 py-2 border">{product.ALBEDOtitulo}</td>
                                            <td className="px-4 py-2 border">{product.ALBEDOprecio.toFixed(2)}€</td>
                                            <td className="px-4 py-2 border">{product.quantity}</td>
                                            <td className="px-4 py-2 border">{(product.ALBEDOprecio * product.quantity).toFixed(2)}€</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <p className="mt-4 text-right font-bold border p-1">Total con IVA*: {precioTotal}€</p>
                            <div className='flex flex-row justify-center space-x-4'>
                                <Link href="/" className="mt-4 bg-[#304590] hover:bg-[#475caa] text-white px-4 py-2 rounded">
                                    Inicio
                                </Link>
                                <Link href="/products" className="mt-4 bg-[#304590] hover:bg-[#475caa] text-white px-4 py-2 rounded">
                                    Tienda
                                </Link>
                                <Link href="/about/contacto" className="mt-4 bg-[#304590] hover:bg-[#475caa] text-white px-4 py-2 rounded">
                                    Contacto
                                </Link>
</div>
                    </div>
                ) : paymentStatus === 'KO' ? (
                    <div className="bg-white p-4 rounded shadow-lg text-center">
                        <h2 className="text-2xl font-bold text-red-500">Error en el pago</h2>
                        <p className="text-lg mt-2">Hubo un problema al procesar tu pago. Inténtalo de nuevo.</p>
                        <div className="flex flex-row justify-center space-x-4">
                            <button onClick={handlePaymentProcess} className="mt-4 bg-[#304590] hover:bg-[#475caa] text-white px-4 py-2 rounded">
                                Reintentar pago
                            </button>
                            <button onClick={handleCloseModal} className="mt-4 bg-gray-500 hover:bg-gray-400 text-white px-4 py-2 rounded">
                                Cerrar
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="bg-white px-12 py-6 rounded shadow-lg">
                        <h2 className="text-2xl font-bold">Resumen del Pedido</h2>
                        <div className="mt-4">
                            <table className="w-full table-auto border-collapse">
                                <thead>
                                    <tr className="text-left">
                                        <th className="px-4 py-2">Producto</th>
                                        <th className="px-4 py-2">Cantidad</th>
                                        <th className="px-4 py-2">Precio</th>
                                        <th className="px-4 py-2">Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cartItems.map((product) => (
                                        <tr key={product.ALBEDOcodigo} className="text-left">
                                            <td className="px-4 py-2">{product.ALBEDOtitulo}</td>
                                            <td className="px-4 py-2">{product.ALBEDOprecio.toFixed(2)}€</td>
                                            <td className="px-4 py-2">{product.quantity}</td>
                                            <td className="px-4 py-2">{(product.ALBEDOprecio * product.quantity).toFixed(2)}€</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <p className="mt-4 text-right font-bold">Total con IVA*: {precioTotal}€</p>
                        <div className="flex flex-row justify-center space-x-4 mt-4">
                            <button onClick={handlePaymentProcess} className="bg-[#304590] hover:bg-[#475caa] text-white px-4 py-2 rounded h-[38px]">
                                Confirmar Pago
                            </button>
                            <button onClick={handleCloseModal} className="bg-gray-500 hover:bg-gray-400 text-white px-4 py-2 rounded h-[38px]">
                                Cancelar
                            </button>
                        </div>
                    </div>
                )}
                {/* Hidden form for payment submission target="_blank" */}
                <form className="hidden" name="pago" action="https://sis-t.redsys.es:25443/sis/realizarPago" method="POST" >
                    Datos en claro:
                    <textarea name="datos" cols="80" rows="5"></textarea><br />
                    Datos en Base64:
                    <textarea name="Ds_MerchantParameters" cols="80" rows="5"></textarea><br />
                    Firma calculada:
                    <input type="text" name="Ds_Signature" value="" size="100" /><br />
                    Versión Firma:
                    <input type="text" name="Ds_SignatureVersion" value="HMAC_SHA256_V1" /><br />
                    <input type="submit" value="Probar contra test" />
                </form>
            </div>
        </div>
    ) : null;
}
