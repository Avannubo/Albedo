"use client"
import React, { useState, useEffect } from 'react'
import { updateIBAN } from '@/lib/data'
export default function iban() {
    const [newIBAN, setNewIBAN] = useState("");
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
    async function handleIBANUpdate() {
        try {
            const ibanRegex = /^ES34\d{22}$/;
            if (!ibanRegex.test(newIBAN)) {
                throw new Error("El IBAN debe tener el formato 'ES34' seguido de 22 dígitos.");
            }
            await updateIBAN(newIBAN);
            setUpdateMessage("¡IBAN actualizado correctamente!");
            setNewIBAN('');
        } catch (error) {
            // console.error("Error updating IBAN:", error);
            setErrorMessage(error.message);
        }
    }
    return (
        <>

            <div className="w-full h-auto bg-slate-50 rounded-lg p-4 space-y-1 border">
                {updateMessage && (
                    <div className="relative top-0 rounded-lg border-2  border-green-500  bg-green-200 text-slate-800 py-2 px-4 z-10">
                        {updateMessage}
                    </div>
                )}
                {errorMessage && (
                    <div className="relative top-0 rounded-lg border-2 animate-bounce border-red-600  bg-red-200 text-slate-800 py-2 px-4 z-10">
                        {errorMessage}
                    </div>
                )}
                <h1 className="font-semibold text-slate-500 text-2xl mb-4">Actualizar IBAN</h1>
                <div>
                    <div className='flex flex-row justify-between space-x-2 '>
                        <div className="mb-4 flex-1">
                            <label className="block text-sm font-bold text-slate-700 dark:text-gray-300 mb-2">Nº de Cuenta (IBAN)</label>
                            <input rows="2" type="text" value={newIBAN} onChange={(e) => setNewIBAN(e.target.value)} className="shadow-sm rounded-md w-full px-2 py-1.5 border border-gray-300 focus:outline-1 focus:ring-[#475caa] focus:border-[#475caa]" placeholder="ES34 1234 2134 1234 1234 1234" required />
                        </div>
                    </div>
                </div>
                <div className='flex justify-center mt-2'>
                    <button type="button" className="w-[150px] bg-[#304590] hover:bg-[#475caa] text-white font-bold py-1.5 px-4 rounded-lg" onClick={handleIBANUpdate}>Guardar</button>
                </div>
            </div>
        </>
    )
}
