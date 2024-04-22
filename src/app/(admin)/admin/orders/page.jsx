
"use client"
import { useState, useEffect } from 'react';
import React from 'react'
import Details from '@/components/admin/orders/details/btn'
import State from '@/components/admin/orders/state/btn'
import OrdersStateCount from '@/components/admin/orders/OrdersStateCount'
import Layout from "@/app/(admin)/admin/AdminLayout";
import { getAllOrders } from '@/lib/data'
export default function page() {
  const [isLoading, setIsLoading] = useState(false);
  const [orders, setOrders] = useState();
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    setIsLoading(true);
    const data = await getAllOrders();

    setOrders(data);
    setIsLoading(false);
  }
  return (
    <Layout>
      <div>
        <h1 className="font-semibold text-4xl">Pedidos</h1>
        <div>

        </div>
      </div>

      {isLoading ? (
        <div class="flex-col gap-4 w-full flex items-center justify-center">
          <div class="w-20 h-20 border-8 text-[#304590] text-xl animate-spin border-gray-300 flex items-center justify-center border-t-[#304590] rounded-full">
          </div>
        </div>
      ) : (
        <div className="flex flex-col ">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                {orders && orders.length > 0 && (<table
                  className="min-w-full text-left text-md font-light text-surface ">
                  <thead
                    className="border-b border-neutral-200 font-medium ">
                    <tr>
                      <th scope="col" className="text-center px-6 py-4">ID</th>
                      <th scope="col" className="text-center px-6 py-4">First</th>
                      <th scope="col" className="text-center px-6 py-4">Last</th>
                      <th scope="col" className="text-center px-6 py-4">DNI</th>
                      <th scope="col" className="text-center px-6 py-4">Total de Pedido</th>
                      <th scope="col" className="text-center px-6 py-4">Metodo de Pago</th>
                      <th scope="col" className="text-center px-6 py-4">Estado</th>
                      <th scope="col" className="text-center px-6 py-4">Ver</th>
                    </tr>
                  </thead>
                  <tbody className='border-spacing-y-4'>
                    {orders.map((order, index) => (
                      <tr key={index} className="border-b border-neutral-200  rounded-lg">
                        {/* hover:bg-slate-200 */}
                        <td className="text-center whitespace-nowrap px-6 py-4 font-medium">#{index + 1}</td>
                        <td className="text-center whitespace-nowrap px-6 py-4 font-medium">{order.userInfo.firstName}</td>
                        <td className="text-center whitespace-nowrap px-6 py-4 font-medium">{order.userInfo.lastName}</td>
                        <td className="text-center whitespace-nowrap px-6 py-4 font-medium">{order.userInfo.dni}</td>
                        <td className="text-center whitespace-nowrap px-6 py-4 font-medium">{order.totalPedido}€</td>
                        <td className="text-center whitespace-nowrap px-6 py-4 font-medium">{order.selectedPayment}</td>
                        <td className="text-center whitespace-nowrap px-6 py-4 font-medium">
                          <State orderState={order.orderState} orderId={index} />
                        </td>
                        <td className="text-center whitespace-nowrap px-6 py-4 font-medium">
                          <Details orderId={index} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>)}
              </div>
            </div>
          </div>
        </div>)}
    </Layout>
  );
}