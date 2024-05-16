"use client"
import React, { useState } from 'react'
import { updateIBAN } from '@/lib/data'
export default function iban() {
    const [newIBAN, setNewIBAN] = useState("");
    async function handleIBANUpdate() {
        try {
            setLoading(true); 
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
        } finally {
            setLoading(false); // Set loading to false in the finally block
        }
    }
    return (
        <div className="w-full h-auto bg-slate-50 rounded-lg p-4 space-y-1 border">
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
        </div>)
}
