'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { saveNewOrder, checkStock, getIBAN } from '@/lib/data';
import Image from 'next/image';
export default function ModalTPV({ isOpen, onClose, orderData, precioTotal }) {
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
    return isOpen ? (
        <div className="fixed inset-0 p-6 flex flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto font-[sans-serif]">

            ...
        </div>
    ) : null;
}
