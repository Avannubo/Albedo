import Details from '@/components/admin/orders/details/btn';
import Delete from '@/components/admin/orders/delete/btn';
import State from '@/components/admin/orders/state/btn';
import Layout from "@/app/(admin)/admin/AdminLayout";
import { getAllActiveOrders, getAllInactiveOrders } from '@/lib/data';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers'
export default async function page() {
  const cookieStore = cookies() 
  const token = cookieStore.has('token');  
  if (!token) {
    redirect('/admin');
  }
  const Active = await getAllActiveOrders();
  const Inactive = await getAllInactiveOrders();
  return ( 
    <Layout>
      <div className='-mt-10'>
        <h1 className="font-semibold text-4xl">Pedidos</h1>
      </div>
      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8 space-y-6">
            <h1 className="font-bold text-xl">Pedidos Activos</h1>
            {Active.length > 0 && (
              <div className={`overflow-y-scroll 
                              ${Inactive ? 'h-full no-scrollbar' : 'h-[350px]'}  
                              ${Active && Active.length <= 5 ? 'no-scrollbar' : ''}`}>
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
                          <State orderState={order.orderState} orderId={index} />
                        </td>
                        <td className="text-center whitespace-nowrap px-6 py-2 font-medium">
                          <Details order={order} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {Inactive.length > 0 && (
              <h1 className="font-bold text-xl">Pedidos Cancelado/Facturados</h1>
            )}
            <div className={`overflow-y-scroll h-[350px] ${Inactive && Inactive.length <= 5 ? 'no-scrollbar' : ''}`}>
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
                          <State orderState={order.orderState} orderId={index} />
                          {/* //handleModalClose={handleModalClose} */}
                        </td>
                        <td className="text-center whitespace-nowrap px-6 py-2 font-medium">
                          <Details order={order} />
                        </td>
                        <td>
                          <Delete index={index} />
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
    </Layout>
  );
} 
