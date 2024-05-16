"use client"
import React, { useState } from 'react'
import { updateIVA } from '@/lib/data'; // Import the functions for updating data

export default function iva() {
    const [newIVA, setNewIVA] = useState(0);
    async function handleIVAUpdate() {
        try {
            setLoading(true);
            if (newIVA > 99) {
                throw new Error("El IVA debe ser inferior al 99%.");
            }
            await updateIVA(newIVA);
            setUpdateMessage("¡IVA actualizado correctamente!");
            setNewIVA('');
        } catch (error) {
            // console.error("Error updating IVA:", error);
            setErrorMessage(error.message);
        } finally {
            setLoading(false); // Set loading to false in the finally block
        }
    }
    return (
        <div className="w-full h-auto bg-slate-50 rounded-lg p-4 space-y-1 border">
            <h1 className="font-semibold text-slate-500 text-2xl mb-4">Actualizar IVA</h1>
            <div>
                <div className='flex flex-row justify-between space-x-4'>
                    <div className="mb-4 flex-1">
                        <label className="block text-sm font-bold text-slate-700 dark:text-gray-300 mb-2">Actualizar IVA%</label>
                        <input max="99" min="0" step="1" type="number" value={newIVA} onChange={(e) => setNewIVA(parseFloat(e.target.value))} className="shadow-sm rounded-md w-full px-2 py-1.5 border border-gray-300 focus:outline-1 focus:ring-[#475caa] focus:border-[#475caa]" placeholder="Nueva IVA" required />
                    </div>
                </div>
            </div>
            <div className='flex justify-center mt-2'>
                <button type="button" className="w-[150px] bg-[#304590] hover:bg-[#475caa] text-white font-bold py-1.5 px-4 rounded-lg" onClick={handleIVAUpdate}>Guardar</button>
            </div>
        </div>)
}
