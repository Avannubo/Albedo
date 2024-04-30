"use client"
import React, { useState, useEffect } from 'react';
import Layout from "@/app/(admin)/admin/AdminLayout";
import { updatePassword, updateShippingPrices, updateIBAN, updateIVA } from '@/lib/data'; // Import the functions for updating data
export default function page() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [spainPrice, setSpainPrice] = useState(0);
  const [euPrice, setEuPrice] = useState(0);
  const [internationalPrice, setInternationalPrice] = useState(0);
  const [newIBAN, setNewIBAN] = useState("");
  const [newIVA, setNewIVA] = useState(0);
  const [updateMessage, setUpdateMessage] = useState(null); // State for update message
  const [errorMessage, setErrorMessage] = useState(null); // State for update message
  const [loading, setLoading] = useState(false); // State for loading indicator
  useEffect(() => {
    // Clear update message after 5 seconds
    const timer = setTimeout(() => {
      setUpdateMessage(null);
      setErrorMessage(null);
    }, 5000);
    return () => clearTimeout(timer);
  }, [updateMessage, errorMessage]);
  async function handlePasswordUpdate() {
    try {
      setLoading(true);
      await updatePassword(currentPassword, newPassword);
      setUpdateMessage("Contraseña actualizada correctamente!");
      setCurrentPassword('');
      setNewPassword('');
    } catch (error) {
      // console.error(error);
      setErrorMessage("Error contraseña actual incorrecta!");
    } finally {
      setLoading(false); // Set loading to false in the finally block
    }
  }
  async function handleShippingPricesUpdate() {
    try {
      setLoading(true);
      await updateShippingPrices(spainPrice, euPrice, internationalPrice);
      setUpdateMessage("¡Precios de envío actualizados correctamente!");
      setSpainPrice(0);
      setEuPrice(0);
      setInternationalPrice(0);
    } catch (error) {
      // console.error("Error updating shipping prices:", error);
      setErrorMessage(error.message);
    } finally {
      setLoading(false); // Set loading to false in the finally block
    }
  }
  async function handleIBANUpdate() {
    try {
      setLoading(true);
      // if (newIBAN.length !== 24) {
      //   throw new Error("El IBAN debe tener 24 caracteres.");
      // }
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
    <Layout>
      {/* Display update message and loading bar if there's a message */}
      {updateMessage && (
        <div className="absolute top-5 right-5 rounded-lg border-2 animate-bounce border-green-500  bg-green-200 text-slate-800 py-2 px-4 z-10">
          {updateMessage}
          {/* {loading && <div className="h-1 bg-green-600 mt-1" style={{ width: '100%', borderRadius: '0.25rem' }} />} */}
        </div>
      )}
      {errorMessage && (
        <div className="absolute top-5 right-5 rounded-lg border-2 animate-bounce border-red-600  bg-red-200 text-slate-800 py-2 px-4 z-10">
          {errorMessage}
          {loading && (<div className="h-1 bg-red-600 mt-1" style={{ width: '100%', borderRadius: '0.25rem' }} />)}
        </div>
      )}
      <h1 className="font-semibold text-4xl">Parametros Globales</h1>
      <div className="flex flex-col space-y-6 my-4">
        <div className="flex flex-row justify-between space-x-6 ">
          <div className="w-full h-auto bg-slate-50 rounded-lg p-4 space-y-1 border">
            <h1 className="font-semibold text-slate-500 text-2xl mb-4">Actualizar Contraseña</h1>
            <div className='space-y-0'>
              <div className='flex flex-row justify-between space-x-2'>
                <div className="mb-2 flex-1">
                  <label className="block text-sm font-bold text-slate-700 dark:text-gray-300 mb-2">Contraseña Actual</label>
                  <input rows="2" type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} className="shadow-sm rounded-md w-full px-2 py-1.5 border border-gray-300 focus:outline-1 focus:ring-[#475caa] focus:border-[#475caa]" placeholder="Contraseña Actual" required />
                </div>
              </div>
              <div className='flex flex-row justify-between space-x-4'>
                <div className="mb-2 flex-1">
                  <label className="block text-sm font-bold text-slate-700 dark:text-gray-300 mb-2">Nueva contraseña</label>
                  <input rows="2" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="shadow-sm rounded-md w-full px-2 py-1.5 border border-gray-300 focus:outline-1 focus:ring-[#475caa] focus:border-[#475caa]" placeholder="Nueva contraseña" required />
                </div>
              </div>
            </div> 
            <div className='flex justify-center mt-2'>
              <button type="button" className="w-[150px] bg-[#304590] hover:bg-[#475caa] text-white font-bold py-1.5 px-4 rounded-lg" onClick={handlePasswordUpdate}>Guardar</button>
            </div>
          </div>
          <div className="w-full h-auto bg-slate-50 rounded-lg p-4 space-y-1 border">
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
        </div>
        <div className="flex flex-row justify-between space-x-6 ">
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
          </div>
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
          </div>
        </div>
      </div>
    </Layout>
  );
}