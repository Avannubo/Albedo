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
      <h1 className="font-semibold text-4xl">Pedidos</h1>
      <div className="flex flex-col ">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table
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
                  {orders && orders.length > 0 && orders.map((order, index) => (
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
              </table>
            </div>
          </div>
        </div>
      </div> 
      {/* <OrdersStateCount /> */}
    </Layout>
  );
}