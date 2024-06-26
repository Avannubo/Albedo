"use client"
import React, { useState, useEffect } from 'react'
import { updateShippingPrices, getShippingPrices } from '@/lib/data';
export default function envios() {
    //getShippingPrices to set default onload data of the prices
    const [spainPrice, setSpainPrice] = useState(0);
    const [euPrice, setEuPrice] = useState(0);
    const [internationalPrice, setInternationalPrice] = useState(0);
    const [updateMessage, setUpdateMessage] = useState(null); // State for update message
    const [errorMessage, setErrorMessage] = useState(null); // State for update message
    useEffect(() => {
        // Clear update message after 5 seconds
        const timer = setTimeout(() => {
            setUpdateMessage(null);
            setErrorMessage(null);
        }, 5000);
        return () => clearTimeout(timer);
    }, [updateMessage, errorMessage]);
    useEffect(() => {
        async function fetchShippingPrices() {
            try {
                const prices = await getShippingPrices();
                setSpainPrice(prices.EnvioES || 0);
                setEuPrice(prices.EnviosUE || 0);
                setInternationalPrice(prices.EnviosINT || 0);
            } catch (error) {
                console.error("Error fetching shipping prices:", error);
                setErrorMessage("Error fetching shipping prices");
            }
        }
        fetchShippingPrices();
    }, []);
    async function handleShippingPricesUpdate() {
        try {
            await updateShippingPrices(spainPrice, euPrice, internationalPrice);
            setUpdateMessage("¡Precios de envío actualizados correctamente!");
        } catch (error) {
            // console.error("Error updating shipping prices:", error);
            setErrorMessage(error.message);
        }
    }
    return (
        <>
            <div className="relative w-full h-auto bg-slate-50 rounded-lg p-4 space-y-1 border">
                {updateMessage && (
                    <div className="absolute top-0 rounded-lg border-2  border-green-500  bg-green-200 text-slate-800 py-2 px-4 z-10">
                        {updateMessage}
                    </div>
                )}
                {errorMessage && (
                    <div className="absolute top-0 rounded-lg border-2  border-red-600  bg-red-200 text-slate-800 py-2 px-4 z-10">
                        {errorMessage}
                    </div>
                )}
                <h1 className="font-semibold text-slate-500 text-2xl mb-4">Precios de Envíos</h1>
                <div className='flex flex-col justify-between'>
                    <div className="mb-2 flex-1">
                        <label className="block text-sm font-bold text-slate-700 dark:text-gray-300 mb-2">España</label>
                        <input min="0" step="0.1" type="number" value={spainPrice} onChange={(e) => setSpainPrice(parseFloat(e.target.value))} className="shadow-sm rounded-md w-full px-2 py-1.5 border border-gray-300 focus:outline-1 focus:ring-[#475caa] focus:border-[#475caa]" placeholder="0" required />
                    </div>
                    <div className="mb-2 flex-1">
                        <label className="block text-sm font-bold text-slate-700 dark:text-gray-300 mb-2">UE</label>
                        <input min="0" step="0.1" type="number" value={euPrice} onChange={(e) => setEuPrice(parseFloat(e.target.value))} className="shadow-sm rounded-md w-full px-2 py-1.5 border border-gray-300 focus:outline-1 focus:ring-[#475caa] focus:border-[#475caa]" placeholder="0" required />
                    </div>
                    <div className="mb-2 flex-1">
                        <label className="block text-sm font-bold text-slate-700 dark:text-gray-300 mb-2">International</label>
                        <input min="0" step="0.1" type="number" value={internationalPrice} onChange={(e) => setInternationalPrice(parseFloat(e.target.value))} className="shadow-sm rounded-md w-full px-2 py-1.5 border border-gray-300 focus:outline-1 focus:ring-[#475caa] focus:border-[#475caa]" placeholder="0" required />
                    </div>
                </div>
                <div className='flex justify-center mt-2'>
                    <button type="button" className="w-[150px] bg-[#304590] hover:bg-[#475caa] text-white font-bold py-1.5 px-4 rounded-lg" onClick={handleShippingPricesUpdate}>Guardar</button>
                </div>
            </div>
        </>
    )
}
