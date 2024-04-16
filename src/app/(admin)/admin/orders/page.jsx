
import React from 'react'
import { getAllOrders } from '@/lib/data'
export default async function page() {
  const orders = await getAllOrders();

  return (
    <div>
      <h1 className="font-semibold text-4xl">Pedidos</h1>

      <table className='w-full table-auto'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre de Cliente</th>
            <th>DNI</th>
            <th>Total de Pedido</th>
            <th>Metodo de Pago</th>
            <th>Estado de pedido</th>
          </tr>
        </thead>{orders && orders.length > 0 && orders.map((order, index) => (
        <tbody key={index} className=''>
          
            <tr  className='bg-slate-300 hover:bg-slate-200 hover:cursor-pointer'>
              <td className='text-center'>#{index}</td>
              <td className='text-center'>{order.userInfo.firstName} {order.userInfo.lastName}</td>
              <td className='text-center'>{order.userInfo.dni}</td>
              <td className='text-center'>{order.totalPedido}€</td>
              <td className='text-center'>{order.selectedPayment}</td>
              <td className='text-center'>Nuevo</td>
            </tr>
          
        </tbody>))}
      </table>
    </div>
  );
}