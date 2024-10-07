'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { saveNewOrder, getIBAN, processPaymentTPV } from '@/lib/data';
import CryptoJS from 'crypto-js'; // Ensure you have this library available

export default function ModalTPV({ isOpen, onClose, orderData, precioTotal }) {
    const [cartItems, setCartItems] = useState([]);
    const [isProcessingPayment, setIsProcessingPayment] = useState(false); // State for loading
    const [paymentStatus, setPaymentStatus] = useState(null); // State for payment status (OK/KO)

    useEffect(() => {
        const storedCartItems = JSON.parse(localStorage.getItem("carrito"));
        if (storedCartItems) {
            setCartItems(storedCartItems);
        }
    }, []);

    // Function to calculate the signature
    const calcularFirma = () => {
        let merchantOrder = "123456789"; // Replace with actual order number
        let data = {
            "DS_MERCHANT_AMOUNT": "145", // Example amount
            "DS_MERCHANT_CURRENCY": "978",
            "DS_MERCHANT_CVV2": "123",
            "DS_MERCHANT_EXPIRYDATE": "1512",
            "DS_MERCHANT_MERCHANTCODE": "999008881",
            "DS_MERCHANT_ORDER": merchantOrder,
            "DS_MERCHANT_PAN": "1111111111111117",
            "DS_MERCHANT_TERMINAL": "1",
            "DS_MERCHANT_TRANSACTIONTYPE": "0"
        };

        let encodedParameters = stringBase64Encode(JSON.stringify(data));
        let encodedSignature = "sq7HjrUOBfKmC576ILgskD5srU870gJ7"; // Test signature key
        let encodedSignatureDES = des_encrypt(merchantOrder, base64Decode(encodedSignature));
        let encodedDsSignature = CryptoJS.HmacSHA256(encodedParameters, base64Decode(encodedSignatureDES));
        let dsSignature = CryptoJS.enc.Base64.stringify(encodedDsSignature);

        // Populate form fields with calculated values
        document.forms["pago"].datos.value = JSON.stringify(data);
        document.forms["pago"].Ds_MerchantParameters.value = encodedParameters;
        document.forms["pago"].Ds_Signature.value = dsSignature;
    };

    // Helper functions for encryption
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

    // Handle the payment process
    const handlePaymentProcess = () => {
        setIsProcessingPayment(true);

        try {
            calcularFirma(); // Calculate signature and populate form

            // After calculating the signature, submit the form
            document.forms["pago"].submit();
        } catch (error) {
            setPaymentStatus('KO');
            console.error("Error processing payment:", error);
        }
    };

    return isOpen ? (
        <div className="fixed inset-0 p-6 flex flex-wrap justify-center items-center w-full h-full z-[999] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto font-[sans-serif]">
            <div className="z-[1000]">
                {isProcessingPayment ? (
                    <div className="bg-white p-4 rounded shadow-lg text-center">
                        <h2 className="text-2xl font-bold">Pago en proceso...</h2>
                        <p className="text-lg mt-2">Por favor, espera mientras procesamos tu pago.</p>
                        <div className="loader mt-4"></div> {/* CSS loader animation */}
                    </div>
                ) : paymentStatus === 'OK' ? (
                    <div className="bg-white p-4 rounded shadow-lg text-center">
                        <h2 className="text-2xl font-bold text-green-500">Pago exitoso</h2>
                        <p className="text-lg mt-2">¡Tu pago ha sido completado con éxito!</p>
                        <Link href="/order-summary" className="mt-4 inline-block text-blue-600 hover:underline">
                            Ver resumen del pedido
                        </Link>
                    </div>
                ) : paymentStatus === 'KO' ? (
                    <div className="bg-white p-4 rounded shadow-lg text-center">
                        <h2 className="text-2xl font-bold text-red-500">Error en el pago</h2>
                        <p className="text-lg mt-2">Hubo un problema al procesar tu pago. Inténtalo de nuevo.</p>
                        <div className="flex flex-row justify-center space-x-4">
                            <button onClick={handlePaymentProcess} className="mt-4 bg-[#304590] hover:bg-[#475caa] text-white px-4 py-2 rounded">
                                Reintentar pago
                            </button>
                            <button onClick={onClose} className="mt-4 bg-gray-500 hover:bg-gray-400 text-white px-4 py-2 rounded">
                                Cancelar
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
                            <button
                                onClick={handlePaymentProcess}
                                className="bg-[#304590] hover:bg-[#475caa] text-white px-4 py-2 rounded h-[38px]"
                            >
                                Confirmar Pago
                            </button>
                            <button onClick={onClose} className="bg-gray-500 hover:bg-gray-400 text-white px-4 py-2 rounded h-[38px]">
                                Cancelar
                            </button>
                        </div>
                    </div>
                )}

                {/* Hidden form for payment submission */}
                <form className="hidden" name="pago" action="https://sis-t.redsys.es:25443/sis/realizarPago" method="POST">
                    Datos en claro:
                    <textarea name="datos" cols="80" rows="5"></textarea><br />
                    Datos en Base64:
                    <textarea name="Ds_MerchantParameters" cols="80" rows="5"></textarea><br />
                    Firma calculada:
                    <input type="text" name="Ds_Signature" value="" size="100" /><br />
                    Versión Firma:
                    <input type="text" name="Ds_SignatureVersion" value="HMAC_SHA256_V1" /><br />
                    <input type="submit" value="Probar contra test" style={{ display: 'none' }} />
                </form>
            </div>
        </div>
    ) : null;
}
