'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { saveNewOrder, checkStock, getIBAN } from '@/lib/data';
import Image from 'next/image';

export default function ModalTransference({ isOpen, onClose, orderData, precioTotal }) {
    const [isCopied, setIsCopied] = useState(false);
    const [paymentConfirmed, setPaymentConfirmed] = useState(false);
    const [stockWarning, setStockWarning] = useState(null);
    const [outOfStock, setOutOfStock] = useState(false); // New state for out-of-stock status
    const [cartItems, setCartItems] = useState([]);
    const [IBAN, setIban] = useState('');

    useEffect(() => {
        const storedCartItems = JSON.parse(localStorage.getItem("carrito"));
        if (storedCartItems) {
            setCartItems(storedCartItems);
        }
    }, []);

    useEffect(() => {
        // Function to check stock as soon as the component is loaded or when orderData changes
        const checkStockOnLoad = async () => {
            try {
                const stockCheck = await checkStock(orderData);

                // Check if any product has a stock lower than its quantity
                const lowStockProducts = stockCheck.filter(product => product.availableStock < product.quantity);
                if (lowStockProducts.length > 0) {
                    setStockWarning(lowStockProducts);
                }
            } catch (error) {
                console.error('Error during stock check:', error);
            }
        };

        // Only run stock check when the orderData is available
        if (orderData) {
            checkStockOnLoad();
        }
    }, [orderData]);


    useEffect(() => {

        async function fetchIBAN() {
            try {
                const { IBAN } = await getIBAN();
                setIban(IBAN);
            } catch (error) {
                console.error('Error fetching IBAN:', error);
            }
        }
        fetchIBAN();
    }, []);

    const hasStockAvailable = async () => {
        const stockCheck = await checkStock(orderData);
        if (!Array.isArray(stockCheck)) {
            throw new Error('Stock check did not return an array');
        }

        // Filter out products that are out of stock
        const outOfStockProducts = stockCheck.filter(product => product.availableStock === 0);
        if (outOfStockProducts.length > 0) {
            setStockWarning(outOfStockProducts);
            setOutOfStock(true);  // Set out-of-stock status

            // Remove out-of-stock products from the cart
            const updatedCartItems = cartItems.filter(
                item => !outOfStockProducts.some(product => product.ALBEDOcodigo === item.ALBEDOcodigo)
            );

            // Update the cart state and localStorage
            setCartItems(updatedCartItems);
            localStorage.setItem("carrito", JSON.stringify(updatedCartItems));

            return false;
        }

        return true;
    };


    const copyAccountNumber = () => {
        const accountNumber = IBAN;
        navigator.clipboard.writeText(accountNumber);
        setIsCopied(true);
        setTimeout(() => {
            setIsCopied(false);
        }, 4000);
    };

    const handleConfirmPayment = async () => {
        try { 
            localStorage.clear();
            await saveNewOrder(orderData);
            setPaymentConfirmed(true);
        } catch (error) {
            console.error('Error during stock check:', error);
        }
    };

    const handleContinueWithUpdatedStock = () => {
        orderData.cartProducts.forEach(product => {
            const stockProduct = stockWarning.find(p => p.ALBEDOcodigo === product.ALBEDOcodigo);
            if (stockProduct) {
                // Update the product quantity in the cart to available stock
                product.quantity = stockProduct.availableStock;
                updateCartItem(product.ALBEDOcodigo, stockProduct.availableStock);
            }
        });

        // After updating the cart, check if all products now have sufficient stock
        const outOfStockProducts = cartItems.filter(item =>
            stockWarning.some(product => product.ALBEDOcodigo === item.ALBEDOcodigo && product.availableStock === 0)
        );

        if (outOfStockProducts.length === 0) {
            // If no products are out of stock, reset the stock warning and allow payment to proceed
            setStockWarning(null);
            setOutOfStock(false);
            // setPaymentConfirmed(true);
        } else {
            // If there are still out-of-stock items, keep the warning
            setStockWarning(outOfStockProducts);
        }
    };


    const updateCartItem = (id, newQuantity) => {
        newQuantity = Math.max(1, newQuantity);
        const updatedCartItems = cartItems.map((product) => {
            if (product.ALBEDOcodigo === id) {
                return { ...product, quantity: newQuantity };
            }
            return product;
        });
        setCartItems(updatedCartItems);
        localStorage.setItem("carrito", JSON.stringify(updatedCartItems));
    };

    useEffect(() => {
        // Check stock before allowing the modal to open
        if (isOpen) {
            hasStockAvailable();
        }
    }, [isOpen, orderData, onClose]);

    return isOpen ? (
        <div className="fixed inset-0 p-6 flex flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto font-[sans-serif]">
            {outOfStock ? (
                <div className="w-[1000px] max-w-6xl bg-white shadow-lg rounded-md p-12 relative">
                    <div className='flex justify-center'>
                        {/* Warning SVG */}
                    </div>
                    <h1 className="text-3xl font-bold mb-3 text-center">Stock insuficiente</h1>
                    <h3 className="text-xl mb-6 text-center">Los siguientes productos están fuera de stock:</h3>
                    <ul className="mt-1.5 ml-4 list-disc list-inside">
                        {stockWarning.map((product, index) => (
                            <li key={index}>
                                {product.ALBEDOtitulo} - Stock disponible: {product.availableStock}
                            </li>
                        ))}
                    </ul>
                    <div className='flex flex-row space-x-6 justify-center mt-4'>
                        <button onClick={onClose} className='text-center w-[150px] rounded-md bg-[#304590] py-1.5 px-4 font-medium text-blue-50 hover:bg-[#475caa]'>
                            Cerrar
                        </button>
                    </div>
                </div>
            ) : paymentConfirmed ? (
                <div className="w-[1000px] max-w-6xl bg-white shadow-lg rounded-md p-12 relative">
                    <div className='flex justify-center'>
                        {/* Success SVG */}
                    </div>
                    <h1 className="text-3xl font-bold mb-3 text-center">Gracias por la compra!</h1>
                    <h3 className="text-lg font-semibold mb-2 text-center">
                        Recibirá un correo con todos los datos del pedido
                    </h3>
                    <h3 className="text-lg font-semibold mb-2 text-center">UNA VEZ RECIBAMOS EL PAGO DE LA TRANSFERENCIA PROCEDEREMOS A EFECTUAR EL ENVÍO DE SUS PRODUCTOS</h3>
                    <p className="text-lg mb-2 text-center">*En caso de no recibir la transferencia en las 72 horas hábiles posteriores a la solicitud, se cancelará el pedido automáticamente</p>
                    <div className='flex flex-row space-x-6 justify-center mt-2'>
                        <Link href="/" className='text-center self-center w-[150px] rounded-md bg-[#304590] py-1.5 px-4 font-medium text-blue-50 hover:bg-[#475caa]'>
                            INICIO
                        </Link>
                        <Link href="/products" className='text-center self-center w-auto rounded-md bg-[#304590] py-1.5 px-4 font-medium text-blue-50 hover:bg-[#475caa] text-nowrap' >
                            SEGUIR COMPRANDO
                        </Link>
                        <Link href="/products" className='text-center self-center w-[150px] rounded-md bg-[#304590] py-1.5 px-4 font-medium text-blue-50 hover:bg-[#475caa]' >
                            CONTACTO
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
                                            {product.ALBEDOtitulo} - Stock disponible: {product.availableStock}
                                        </li>
                                    ))}
                                </ul>
                                <p className="mt-1.5 font-medium">Por favor, actualice el carrito para proceder con el pedido.</p>
                                        <button onClick={handleContinueWithUpdatedStock} className='text-center self-center w-auto rounded-md py-1.5 px-4 font-medium text-blue-50 bg-[#304590] hover:bg-[#475caa]'>Actualizar Stock</button>
                                    </div>
                        )}
                        <div className='flex flex-col justify-start items-center text-center'>
                            <h1 className="text-3xl font-bold mb-2 text-center">Pago por transferencia</h1>

                            <div className="text-lg my-6 text-center bg-gray-100 rounded-lg w-[50%] p-2">
                                <h2 className="text-xl font-bold">Número de cuenta</h2>
                                <p>{IBAN}</p>
                                <button
                                    onClick={copyAccountNumber}
                                    className={`mt-4 text-center self-center w-auto rounded-md bg-[#304590] py-1.5 px-4 font-medium text-blue-50 hover:bg-[#475caa]`}
                                >
                                    {isCopied ? 'Número de cuenta copiado!' : 'Copiar número de cuenta'}
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
                            </table>
                            <div className='flex flex-row justify-end items-end text-xl'>
                                <p className="grow text-right font-bold">Total con Iva:</p>
                                <p className="  font-bold">{precioTotal}€</p>
                            </div>
                        </div>
                        <button
                            disabled={stockWarning && stockWarning.length > 0}
                            onClick={handleConfirmPayment}
                            className={`text-center self-center w-auto rounded-md py-1.5 px-4 font-medium text-blue-50 
                ${stockWarning && stockWarning.length > 0 ? 'bg-[#304590] cursor-not-allowed' : 'bg-[#304590] hover:bg-[#475caa]'}`}
                        >
                            Confirmar pago
                        </button>

                    </div>
                </div>
            )}
        </div>
    ) : null;
}
