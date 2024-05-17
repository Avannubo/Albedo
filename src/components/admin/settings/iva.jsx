"use client"
import React, { useState, useEffect } from 'react'
import { updateIVA, getIVA } from '@/lib/data'; // Import the functions for updating data
export default function iva() {
    const [newIVA, setNewIVA] = useState(0);
    const [updateMessage, setUpdateMessage] = useState(null); // State for update message
    const [errorMessage, setErrorMessage] = useState(null); // State for update message
    useEffect(() => {
        async function fetchIVA() {
            try {
                const data = await getIVA();
                setNewIVA(data.IVA || 0); // Set default IVA, 0 if not available
            } catch (error) {
                console.error("Error fetching IVA:", error);
                setErrorMessage("Error fetching IVA");
            }
        }
        fetchIVA();
    }, []);

    async function handleIVAUpdate() {
        try {
            if (newIVA > 99) {
                throw new Error("El IVA debe ser inferior al 99%.");
            }
            await updateIVA(newIVA);
            setUpdateMessage("¡IVA actualizado correctamente!"); 
        } catch (error) {
            // console.error("Error updating IVA:", error);
            setErrorMessage(error.message);
        }
    }
    useEffect(() => {
        // Clear update message after 5 seconds
        const timer = setTimeout(() => {
            setUpdateMessage(null);
            setErrorMessage(null);
        }, 5000);
        return () => clearTimeout(timer);
    }, [updateMessage, errorMessage]);
    return (
        <>
            <div className="w-full h-auto bg-slate-50 rounded-lg p-4 space-y-1 border">

                {updateMessage && (
                    <div className="relative top-0   rounded-lg border-2  border-green-500  bg-green-200 text-slate-800 py-2 px-4 z-10">
                        {updateMessage}
                    </div>
                )}

                <h1 className="font-semibold text-slate-500 text-2xl mb-4">Actualizar IVA</h1>
                <div>
                    <div className='flex flex-row justify-between space-x-4'>
                        <div className="mb-4 flex-1">
                            <label className="block text-sm font-bold text-slate-700 dark:text-gray-300 mb-2">Actualizar IVA%</label>
                            <input max="99" min="0" step="1" type="number" value={newIVA} onChange={(e) => setNewIVA(parseFloat(e.target.value))} className="shadow-sm rounded-md w-full px-2 py-1.5 border border-gray-300 focus:outline-1 focus:ring-[#475caa] focus:border-[#475caa]" placeholder="Nueva IVA" required />
                        </div>
                    </div>
                </div>
                {errorMessage && (
                    <div className="relative top-0 rounded-lg border-2  border-red-600  bg-red-200 text-slate-800 py-2 px-4 z-10">
                        {errorMessage}
                    </div>
                )}
                <div className='flex justify-center mt-2'>
                    <button type="button" className="w-[150px] bg-[#304590] hover:bg-[#475caa] text-white font-bold py-1.5 px-4 rounded-lg" onClick={handleIVAUpdate}>Guardar</button>
                </div>
            </div>
        </>
    )
}
