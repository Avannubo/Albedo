import React from 'react'
import { getAllOrders } from '@/lib/data'
export default async function page() {
  const orders = await getAllOrders();
  


  return (
    <div>
      <h1 className="font-semibold text-4xl">Pedidos</h1>
      <div class="flex flex-col ">
        <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div class="overflow-hidden">
              <table
                class="min-w-full text-left text-md font-light text-surface ">
                <thead
                  class="border-b border-neutral-200 font-medium ">
                  <tr>
                    <th scope="col" class="text-center px-6 py-4">ID</th>
                    <th scope="col" class="text-center px-6 py-4">First</th>
                    <th scope="col" class="text-center px-6 py-4">Last</th>
                    <th scope="col" class="text-center px-6 py-4">DNI</th>
                    <th scope="col" class="text-center px-6 py-4">Total de Pedido</th>
                    <th scope="col" class="text-center px-6 py-4">Metodo de Pago</th>
                    <th scope="col" class="text-center px-6 py-4">Estado</th>
                    <th scope="col" class="text-center px-6 py-4">Ver</th>
                  </tr>
                </thead>
                <tbody className='border-spacing-y-4'>
                  {orders && orders.length > 0 && orders.map((order, index) => (
                    <tr key={index} class="border-b border-neutral-200  rounded-lg">
                      {/* hover:bg-slate-200 */}
                      <td class="text-center whitespace-nowrap px-6 py-4 font-medium">#{index + 1}</td>
                      <td class="text-center whitespace-nowrap px-6 py-4 font-medium">{order.userInfo.firstName}</td>
                      <td class="text-center whitespace-nowrap px-6 py-4 font-medium">{order.userInfo.lastName}</td>
                      <td class="text-center whitespace-nowrap px-6 py-4 font-medium">{order.userInfo.dni}</td>
                      <td class="text-center whitespace-nowrap px-6 py-4 font-medium">{order.totalPedido}€</td>
                      <td class="text-center whitespace-nowrap px-6 py-4 font-medium">{order.selectedPayment}</td>
                      <td class="text-center whitespace-nowrap px-6 py-4 font-medium">
                        <div className='border font-semibold p-2 rounded-lg bg-green-300 hover:bg-green-400 cursor-pointer'>
                          {order.orderState}
                        </div>
                      </td>
                      <td class="text-center whitespace-nowrap px-6 py-4 font-medium">
                        <div className='flex justify-center border p-2 rounded-lg bg-blue-300 hover:bg-blue-400 cursor-pointer'>
                          <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                            <g id="SVGRepo_iconCarrier">
                              <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                              <path d="M1 12C1 12 5 20 12 20C19 20 23 12 23 12" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                              <circle cx="12" cy="12" r="3" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></circle> </g>
                          </svg>
                        </div>

                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}