import React from 'react'
import Details from '@/components/admin/orders/details/btn'
import State from '@/components/admin/orders/state/btn'
import OrdersStateCount from '@/components/admin/orders/OrdersStateCount'
import Layout from "@/app/(admin)/admin/AdminLayout";
import { getAllOrders } from '@/lib/data'
export default async function page() {
  const orders = await getAllOrders();
  return (
    <Layout>
      <h1 className="font-semibold text-4xl">Variable Globales</h1>
      <div className="flex flex-col space-y-6 my-4">
        <div className="flex flex-row justify-between space-x-6 ">
          <div className="w-full h-auto bg-slate-50 rounded-lg p-4 space-y-1 border">
            <h1 className="font-semibold text-slate-500 text-2xl mb-4">Actualizar Contrasenya</h1>
            {/* <hr /> */}
            <div className='space-y-0'>
              <div className='flex flex-row justify-between space-x-2'>
                <div className="mb-2 flex-1">
                  <label className="block text-sm font-bold text-slate-700 dark:text-gray-300 mb-2">Contraseña Actual</label>
                  <input rows="2" type="text" className="shadow-sm rounded-md w-full px-2 py-1.5 border border-gray-300 focus:outline-1 focus:ring-[#475caa] focus:border-[#475caa]" placeholder="Contraseña Actual" required />
                </div>
              </div>
              <div className='flex flex-row justify-between space-x-4'>
                <div className="mb-2 flex-1">
                  <label className="block text-sm font-bold text-slate-700 dark:text-gray-300 mb-2">Nueva contraseña</label>
                  <input rows="2" type="text" className="shadow-sm rounded-md w-full px-2 py-1.5 border border-gray-300 focus:outline-1 focus:ring-[#475caa] focus:border-[#475caa]" placeholder="Nueva contraseña" required />
                </div>
              </div>
              <div className='flex flex-row justify-between space-x-4'>
                <div className="mb-2 flex-1">
                  <label className="block text-sm font-bold text-slate-700 dark:text-gray-300 mb-2">Reescribir Nueva contraseña</label>
                  <input rows="2" type="text" className="shadow-sm rounded-md w-full px-2 py-1.5 border border-gray-300 focus:outline-1 focus:ring-[#475caa] focus:border-[#475caa]" placeholder="Reescribir Nueva contraseña" required />
                </div>
              </div>
            </div>
            <div className='flex justify-center mt-2'>
              <button type="submit" className="w-[150px] bg-[#304590] hover:bg-[#475caa] text-white font-bold py-1.5 px-4 rounded-lg">
                Guardar
              </button>
            </div>
          </div>
          <div className="w-full h-auto bg-slate-50 rounded-lg p-4 space-y-1 border">
            <h1 className="font-semibold text-slate-500 text-2xl mb-4">Precios de Envios</h1>
            {/* <hr /> */}
            <div>
              <div className='flex flex-row justify-between space-x-2'>
                <div className="mb-2 flex-1">
                  <label className="block text-sm font-bold text-slate-700 dark:text-gray-300 mb-2">España</label>
                  <input min="0" step="0.1" type="number" className="shadow-sm rounded-md w-full px-2 py-1.5 border border-gray-300 focus:outline-1 focus:ring-[#475caa] focus:border-[#475caa]" placeholder="0" required />
                </div>
              </div>
              <div className='flex flex-row justify-between space-x-4'>
                <div className="mb-2 flex-1">
                  <label className="block text-sm font-bold text-slate-700 dark:text-gray-300 mb-2">Unión Europea</label>
                  <input type="number" step="0.1" min={0} className="shadow-sm rounded-md w-full px-2 py-1.5 border border-gray-300 focus:outline-1 focus:ring-[#475caa] focus:border-[#475caa]" placeholder="0" required />
                </div>
              </div>
              <div className='flex flex-row justify-between space-x-4'>
                <div className="mb-2 flex-1">
                  <label className="block text-sm font-bold text-slate-700 dark:text-gray-300 mb-2">Resto del mundo</label>
                  <input type="number" step="0.1" min={0} className="shadow-sm rounded-md w-full px-2 py-1.5 border border-gray-300 focus:outline-1 focus:ring-[#475caa] focus:border-[#475caa]" placeholder="0" required />
                </div>
              </div>
            </div>
            <div className='flex justify-center mt-2'>
              <button type="submit" className="w-[150px] bg-[#304590] hover:bg-[#475caa] text-white font-bold py-1.5 px-4 rounded-lg">
                Guardar
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-between space-x-6 ">
          <div className="w-full h-auto bg-slate-50 rounded-lg p-4 space-y-1 border">
            <h1 className="font-semibold text-slate-500 text-2xl mb-4">Actualizar IBAN</h1>
            {/* <hr /> */}
            <div>
              <div className='flex flex-row justify-between space-x-2 '>
                <div className="mb-4 flex-1">
                  <label className="block text-sm font-bold text-slate-700 dark:text-gray-300 mb-2">Nº de Cuenta (IBAN)</label>
                  <input rows="2" type="text" className="shadow-sm rounded-md w-full px-2 py-1.5 border border-gray-300 focus:outline-1 focus:ring-[#475caa] focus:border-[#475caa]" placeholder="ES34 1234 2134 1234 1234 1234" required />
                </div>
              </div>
            </div>
            <div className='flex justify-center mt-2'>
              <button type="submit" className="w-[150px] bg-[#304590] hover:bg-[#475caa] text-white font-bold py-1.5 px-4 rounded-lg">
                Guardar
              </button>
            </div>
          </div>
          <div className="w-full h-auto bg-slate-50 rounded-lg p-4 space-y-1 border">
            <h1 className="font-semibold text-slate-500 text-2xl mb-4">Actualizar IVA</h1>
            {/* <hr /> */}
            <div>
              <div className='flex flex-row justify-between space-x-4'>
                <div className="mb-4 flex-1">
                  <label className="block text-sm font-bold text-slate-700 dark:text-gray-300 mb-2">Actualizar IVA%</label>
                  <input rows="2" type="number" className="shadow-sm rounded-md w-full px-2 py-1.5 border border-gray-300 focus:outline-1 focus:ring-[#475caa] focus:border-[#475caa]" placeholder="Nueva IVA" required />
                </div>
              </div>
            </div>
            <div className='flex justify-center mt-2'>
              <button type="submit" className="w-[150px] bg-[#304590] hover:bg-[#475caa] text-white font-bold py-1.5 px-4 rounded-lg">
                Guardar
              </button>
            </div>
          </div>
        </div> 
      </div>
    </Layout>
  );
}