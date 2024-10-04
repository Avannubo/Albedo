'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { saveNewOrder, checkStock, getIBAN } from '@/lib/data';
import Image from 'next/image';

export default function ModalTransference({ isOpen, onClose, orderData, precioTotal }) {
    const [isCopied, setIsCopied] = useState(false);
    const [paymentConfirmed, setPaymentConfirmed] = useState(false);
    const [stockWarning, setStockWarning] = useState(null);
    const [cartItems, setCartItems] = useState([]);
    const [IBAN, setIban] = useState('');

    useEffect(() => {
        const storedCartItems = JSON.parse(localStorage.getItem("carrito"));
        if (storedCartItems) {
            setCartItems(storedCartItems);
        }
    }, []);


    useEffect(() => {
        async function fetchIBAN() {
            try {
                const { IBAN } = await getIBAN();
                setIban(IBAN);
            } catch (error) {
                console.error('Error fetching IBAN:', error);
                // Handle error fetching IBAN data if needed
            }
        }
        fetchIBAN();
    }, []);

    const copyAccountNumber = () => {
        const accountNumber = IBAN;
        console.log(IBAN);
        navigator.clipboard.writeText(accountNumber);
        setIsCopied(true);
        setTimeout(() => {
            setIsCopied(false);
        }, 4000);
    };

    const handleConfirmPayment = async () => {
        try {
            const stockCheck = await checkStock(orderData);
            console.log('Stock Check:', stockCheck); // Debugging statement
            if (!Array.isArray(stockCheck)) {
                throw new Error('Stock check did not return an array');
            }
            const lowStockProducts = stockCheck.filter(product => product.availableStock < product.quantity);
            if (lowStockProducts.length > 0) {
                setStockWarning(lowStockProducts);
                return;
            }
            saveNewOrder(orderData);
            //localStorage.clear();
            //setPaymentConfirmed(true);
        } catch (error) {
            console.error('Error during stock check:', error);
        }
    };

    const handleContinueWithUpdatedStock = () => {
        orderData.cartProducts.forEach(product => {
            const stockProduct = stockWarning.find(p => p.ALBEDOcodigo === product.ALBEDOcodigo);
            if (stockProduct) {
                product.quantity = stockProduct.availableStock;
            }

            if (stockProduct) {
                // Update the product's quantity to the available stock
                const newQuantity = stockProduct.availableStock;
                // Update the cart item using the existing updateCartItem function
                updateCartItem(product.ALBEDOcodigo, newQuantity);
            }
        });

        saveNewOrder(orderData);
        // localStorage.clear();
        // setPaymentConfirmed(true);
    };
    const updateCartItem = (id, newQuantity) => {
        // Ensure the new quantity is at least 1
        newQuantity = Math.max(1, newQuantity);

        const updatedCartItems = cartItems.map((product) => {
            if (product.ALBEDOcodigo === id) {
                return { ...product, quantity: newQuantity };
            }
            return product;
        });
        // console.log(product.ALBEDOstock);
        setCartItems(updatedCartItems);
        localStorage.setItem("carrito", JSON.stringify(updatedCartItems));
    };
    return isOpen ? (
        <div className="fixed inset-0 p-6 flex flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto font-[sans-serif]">
            {paymentConfirmed ? (
                <div className="w-[1000px] max-w-6xl bg-white shadow-lg rounded-md p-12 relative">
                    <div className='flex justify-center'>
                        <svg className='w-40 h-40' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g id="SVGRepo_iconCarrier">
                                <path opacity="0.4" d="M11.9998 14H12.9998C14.0998 14 14.9998 13.1 14.9998 12V2H5.99976C4.49976 2 3.18977 2.82999 2.50977 4.04999" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                <path d="M2 17C2 18.66 3.34 20 5 20H6C6 18.9 6.9 18 8 18C9.1 18 10 18.9 10 20H14C14 18.9 14.9 18 16 18C17.1 18 18 18.9 18 20H19C20.66 20 22 18.66 22 17V14H19C18.45 14 18 13.55 18 13V10C18 9.45 18.45 9 19 9H20.29L18.58 6.01001C18.22 5.39001 17.56 5 16.84 5H15V12C15 13.1 14.1 14 13 14H12" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                <path d="M8 22C9.10457 22 10 21.1046 10 20C10 18.8954 9.10457 18 8 18C6.89543 18 6 18.8954 6 20C6 21.1046 6.89543 22 8 22Z" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                <path d="M16 22C17.1046 22 18 21.1046 18 20C18 18.8954 17.1046 18 16 18C14.8954 18 14 18.8954 14 20C14 21.1046 14.8954 22 16 22Z" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                <path d="M22 12V14H19C18.45 14 18 13.55 18 13V10C18 9.45 18.45 9 19 9H20.29L22 12Z" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                <path d="M2 8H8" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                <path d="M2 11H6" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                <path d="M2 14H4" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> </g>
                        </svg>
                    </div>
                    <h1 className="text-3xl font-bold mb-3 text-center">Gracias por la compra!</h1>
                    <h3 className="text-xl font-bold mb-6 text-center">En breve le enviaremos confirmación y seguimiento de su pedido.</h3>
                    <div className='flex flex-row space-x-6 justify-center mt-2'>
                        <Link href="/" className='text-center self-center w-[150px] rounded-md bg-[#304590] py-1.5 px-4 font-medium text-blue-50 hover:bg-[#475caa]'>
                            Inicio
                        </Link>
                        <Link href="/products" className='text-center self-center w-[150px] rounded-md bg-[#304590] py-1.5 px-4 font-medium text-blue-50 hover:bg-[#475caa]' >
                            Tienda
                        </Link>
                    </div>
                </div>
            ) : (
                <div className="w-[1000px] max-w-6xl bg-white shadow-lg rounded-md p-12 relative">
                    <div className='flex flex-col'>
                        <div className='flex flex-row justify-end'>
                            <svg onClick={onClose} xmlns="http://www.w3.org/2000/svg" className="w-3.5 cursor-pointer shrink-0 fill-black hover:fill-red-500 float-right" viewBox="0 0 320.591 320.591">
                                <path d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z" data-original="#000000"></path>
                                <path d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922a30.34 30.34 0 0 1-21.492 8.702z" data-original="#000000"></path>
                            </svg>
                        </div>
                        {stockWarning && (
                            <div className="p-4 mb-4 mt-6 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
                                <p className="font-medium">Los siguientes productos tienen stock insuficiente:</p>
                                <ul className="mt-1.5 ml-4 list-disc list-inside">
                                    {stockWarning.map((product, index) => (
                                        <li key={index}>
                                            {product.ALBEDOtitulo} - Stock disponible: {product.availableStock}, Cantidad solicitada: {product.quantity}
                                        </li>
                                    ))}
                                </ul>
                                <button
                                    onClick={handleContinueWithUpdatedStock}
                                    className='text-center mt-4 whitespace-nowrap self-center w-auto rounded-md bg-[#304590] py-1.5 px-4 font-medium text-blue-50 hover:bg-[#475caa]'
                                >

                                    Actualizar Stock
                                </button>
                            </div>
                        )}
                        <h1 className="text-2xl font-bold mb-4 text-center">Transfiera la cantidad a la siguiente cuenta:</h1>
                        <div className="flex justify-center items-center mb-8">
                            <div className="p-4 bg-gray-100 rounded-lg">
                                <p className="text-xl font-mono">{IBAN}</p>
                                <button
                                    onClick={copyAccountNumber}
                                    className="text-center mt-2 w-full rounded-md bg-[#304590] py-1.5 px-4 font-medium text-blue-50 hover:bg-[#475caa]"
                                >
                                    {isCopied ? '¡Copiado!' : 'Copiar'}
                                </button>
                            </div>
                        </div>
                        <h3 className="text-xl font-bold mb-4 text-center">Detalles del Pedido:</h3>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead>
                                    <tr>
                                        <th className="px-6 py-3 bg-gray-50">Producto</th>
                                        <th className="px-6 py-3 bg-gray-50">Precio</th>
                                        <th className="px-6 py-3 bg-gray-50">Cantidad</th>
                                        <th className="px-6 py-3 bg-gray-50">Total</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {orderData.cartProducts.map((product, index) => (
                                        <tr key={index}>
                                            <td className="px-6 py-4 whitespace-nowrap text-center">{product.ALBEDOtitulo}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-center">{product.ALBEDOprecio.toFixed(2)}€</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-center">{product.quantity}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-center">{(product.ALBEDOprecio * product.quantity).toFixed(2)}€</td>
                                        </tr>
                                    ))}
                                </tbody>
                                    <tfoot> 
                                    <tr>
                                        <td colSpan="3" className="text-right   font-bold">Total con Iva:</td>
                                            <td className=" grow font-bold">{precioTotal}€</td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                        <div className="flex flex-row space-x-6 justify-center mt-8">
                            <button
                                onClick={handleConfirmPayment}
                                className='text-center self-center w-[150px] rounded-md bg-[#304590] py-1.5 px-4 font-medium text-blue-50 hover:bg-[#475caa]'
                            >
                                Confirmar Pago
                            </button>
                            <button
                                onClick={onClose}
                                className='text-center self-center w-[150px] rounded-md bg-gray-300 py-1.5 px-4 font-medium text-gray-800 hover:bg-gray-400'
                            >
                                    Cerrar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div >
    ) : null;
}
