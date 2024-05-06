"use client";
import React, { useState, useEffect } from 'react';
import Details from '@/components/admin/orders/details/btn';
import Delete from '@/components/admin/orders/delete/btn';
import State from '@/components/admin/orders/state/btn';
import Layout from "@/app/(admin)/admin/AdminLayout";
import { getAllActiveOrders, getAllInactiveOrders } from '@/lib/data';
export default function page() {
  const [isLoading, setIsLoading] = useState(false);
  // const [orders, setOrders] = useState([]);
  const [Active, setActive] = useState([]);
  const [Inactive, setInactive] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    setIsLoading(true);
    const active = await getAllActiveOrders();
    setActive(active);
    const inactive = await getAllInactiveOrders();
    setInactive(inactive);
    setIsLoading(false);
  };
  const refetchData = async () => {
    fetchData();
  }
  // const handleModalClose = async () => {
  //   setIsLoading(true);
  //   const active = await getAllActiveOrders();
  //   setActive(active);
  //   const inactive = await getAllInactiveOrders();
  //   setInactive(inactive);
  //   setIsLoading(false);
  // };
  // useEffect(() => {
  //   const activeOrders = orders.filter(order => order.orderState !== 'Cancelado' && order.orderState !== 'Facturado');
  //   setActive(activeOrders);
  //   const inActiveOrders = orders.filter(order => order.orderState === 'Cancelado' || order.orderState === 'Facturado');
  //   setInactive(inActiveOrders);
  // }, [orders]);
  return (
    <Layout>
      <div className='-mt-10'>
        <h1 className="font-semibold text-4xl">Pedidos</h1>
      </div>
      {isLoading ? (
        <div className="flex-col gap-4 w-full flex items-center justify-center">
          <div className="w-20 h-20 border-8 text-[#304590] text-xl animate-spin border-gray-300 flex items-center justify-center border-t-[#304590] rounded-full"></div>
        </div>
      ) : (
        <div className="flex flex-col">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8 space-y-6">
              <div className={`overflow-y-scroll h-[400px] ${Active && Active.length <= 5 ? 'no-scrollbar' : ''}`}>
                <h1 className="font-bold text-xl">Pedidos Activos</h1>
                {Active.length > 0 && (
                  <table className="min-w-full text-left text-md font-light text-surface">
                    <thead className="border-b border-neutral-200 font-medium">
                      <tr>
                        <th scope="col" className="text-center px-6 py-2">ID</th>
                        <th scope="col" className="text-center px-6 py-2">First</th>
                        <th scope="col" className="text-center px-6 py-2">Last</th>
                        <th scope="col" className="text-center px-6 py-2">DNI</th>
                        <th scope="col" className="text-center px-6 py-2">Total de Pedido</th>
                        <th scope="col" className="text-center px-6 py-2">Metodo de Pago</th>
                        <th scope="col" className="text-center px-6 py-2">Estado</th>
                        <th scope="col" className="text-center px-6 py-2">Ver</th>
                      </tr>
                    </thead>
                    <tbody className='border-spacing-y-4'>
                      {Active.map((order, index) => (
                        <tr key={index} className="border-b border-neutral-200 rounded-lg">
                          <td className="text-center whitespace-nowrap px-6 py-2 font-medium">#{index + 1}</td>
                          <td className="text-center whitespace-nowrap px-6 py-2 font-medium">{order.userInfo.firstName}</td>
                          <td className="text-center whitespace-nowrap px-6 py-2 font-medium">{order.userInfo.lastName}</td>
                          <td className="text-center whitespace-nowrap px-6 py-2 font-medium">{order.userInfo.dni}</td>
                          <td className="text-center whitespace-nowrap px-6 py-2 font-medium">{order.totalPedido}€</td>
                          <td className="text-center whitespace-nowrap px-6 py-2 font-medium">{order.selectedPayment}</td>
                          <td className="text-center whitespace-nowrap px-6 py-2 font-medium">
                            <State orderState={order.orderState} orderId={index} refetchData={refetchData} />
                          </td>
                          <td className="text-center whitespace-nowrap px-6 py-2 font-medium">
                            <Details order={order} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
              <div className={`overflow-y-scroll h-[400px] ${Inactive && Inactive.length <= 5 ? 'no-scrollbar' : ''}`}>
                {Inactive.length > 0 && (
                  <h1 className="font-bold text-xl">Pedidos Cancelado/Facturados</h1>
                )}
                {Inactive.length > 0 && (
                  <table className="min-w-full text-left text-md font-light text-surface">
                    <thead className="border-b border-neutral-200 font-medium">
                      <tr>
                        <th scope="col" className="text-center px-6 py-2">ID</th>
                        <th scope="col" className="text-center px-6 py-2">First</th>
                        <th scope="col" className="text-center px-6 py-2">Last</th>
                        <th scope="col" className="text-center px-6 py-2">DNI</th>
                        <th scope="col" className="text-center px-6 py-2">Total de Pedido</th>
                        <th scope="col" className="text-center px-6 py-2">Metodo de Pago</th>
                        <th scope="col" className="text-center px-6 py-2">Estado</th>
                        <th scope="col" className="text-center px-6 py-2">Ver</th>
                        <th scope="col" className="text-center px-6 py-2">Eliminar </th>
                      </tr>
                    </thead>
                    <tbody className='border-spacing-y-4'>
                      {Inactive.map((order, index) => (
                        <tr key={index} className="border-b border-neutral-200 rounded-lg">
                          <td className="text-center whitespace-nowrap px-6 py-2 font-medium">#{index + 1}</td>
                          <td className="text-center whitespace-nowrap px-6 py-2 font-medium">{order.userInfo.firstName}</td>
                          <td className="text-center whitespace-nowrap px-6 py-2 font-medium">{order.userInfo.lastName}</td>
                          <td className="text-center whitespace-nowrap px-6 py-2 font-medium">{order.userInfo.dni}</td>
                          <td className="text-center whitespace-nowrap px-6 py-2 font-medium">{order.totalPedido}€</td>
                          <td className="text-center whitespace-nowrap px-6 py-2 font-medium">{order.selectedPayment}</td>
                          <td className="text-center whitespace-nowrap px-6 py-2 font-medium">
                            <State orderState={order.orderState} orderId={index} refetchData={refetchData} />
                            {/* //handleModalClose={handleModalClose} */}
                          </td>
                          <td className="text-center whitespace-nowrap px-6 py-2 font-medium">
                            <Details order={order} />
                          </td>
                          <td>
                            <Delete index={index} refetchData={refetchData} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
