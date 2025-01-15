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
  //console.log(Active,Inactive);
  return (
    <Layout>
      <div className='-mt-10'>
        <h1 className="font-semibold text-4xl">Todos los Pedidos</h1>
        <p>Aquí tienes todos los pedidos divididos en Activos e Inactivos</p>
      </div>
      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8 space-y-6">
            {Active.length > 0 ? (
              <>
                <h1 className="font-bold text-xl">Pedidos Activos</h1>
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
                        <th scope="col" className="text-center px-6 py-2">Total de Pedido con Iva</th>
                        <th scope="col" className="text-center px-6 py-2">Metodo de Pago</th>
                        <th scope="col" className="text-center px-6 py-2">Estado</th>
                        <th scope="col" className="text-center px-6 py-2">Ver</th>
                      </tr>
                    </thead>
                    <tbody className='border-spacing-y-4'>
                      {Active.map((order, index) => (
                        <tr key={index} className="border-b border-neutral-200 rounded-lg">
                          <td className="text-center whitespace-nowrap px-6 py-2 font-medium">#{index + 1}</td>
                          <td className="text-center whitespace-nowrap px-6 py-2 font-medium">{order?.userInfo?.firstName}</td>
                          <td className="text-center whitespace-nowrap px-6 py-2 font-medium">{order?.userInfo?.lastName}</td>
                          <td className="text-center whitespace-nowrap px-6 py-2 font-medium">{order?.userInfo?.dni}</td>
                          <td className="text-center whitespace-nowrap px-6 py-2 font-medium">{order?.precioTotalConIva}€</td>
                          <td className="text-center whitespace-nowrap px-6 py-2 font-medium">{order?.selectedPayment}</td>
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
              </>
            ) : (
                <div className="h-[40vh] flex flex-col space-y-20">
                <div className="flex flex-col justify-center items-center ">
                <p className="text-2xl font-semibold text-[#706e6b]">No hay pedidos Activos</p>
                  <svg width="160px" height="160px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M9 12C9 11.5341 9 11.3011 9.07612 11.1173C9.17761 10.8723 9.37229 10.6776 9.61732 10.5761C9.80109 10.5 10.0341 10.5 10.5 10.5H13.5C13.9659 10.5 14.1989 10.5 14.3827 10.5761C14.6277 10.6776 14.8224 10.8723 14.9239 11.1173C15 11.3011 15 11.5341 15 12C15 12.4659 15 12.6989 14.9239 12.8827C14.8224 13.1277 14.6277 13.3224 14.3827 13.4239C14.1989 13.5 13.9659 13.5 13.5 13.5H10.5C10.0341 13.5 9.80109 13.5 9.61732 13.4239C9.37229 13.3224 9.17761 13.1277 9.07612 12.8827C9 12.6989 9 12.4659 9 12Z" stroke="#706e6b" strokeWidth="1.5"></path> <path d="M20.5 7V13C20.5 16.7712 20.5 18.6569 19.3284 19.8284C18.1569 21 16.2712 21 12.5 21H11.5M3.5 7V13C3.5 16.7712 3.5 18.6569 4.67157 19.8284C5.37634 20.5332 6.3395 20.814 7.81608 20.9259" stroke="#706e6b" strokeWidth="1.5" strokeLinecap="round"></path> <path d="M12 3H4C3.05719 3 2.58579 3 2.29289 3.29289C2 3.58579 2 4.05719 2 5C2 5.94281 2 6.41421 2.29289 6.70711C2.58579 7 3.05719 7 4 7H20C20.9428 7 21.4142 7 21.7071 6.70711C22 6.41421 22 5.94281 22 5C22 4.05719 22 3.58579 21.7071 3.29289C21.4142 3 20.9428 3 20 3H16" stroke="#706e6b" strokeWidth="1.5" strokeLinecap="round"></path> </g></svg>
                </div>
              </div>
            )
            }
            {Inactive.length > 0 && (
              <h1 className="font-bold text-xl">Pedidos Cancelado/Facturados</h1>
            )}
            <div className={`overflow-y-scroll h-[350px] ${Inactive && Inactive.length <= 5 ? 'no-scrollbar' : ''}`}>
              {Inactive.length > 0 ? (
                <table className="min-w-full text-left text-md font-light text-surface">
                  <thead className="border-b border-neutral-200 font-medium">
                    <tr>
                      <th scope="col" className="text-center px-6 py-2">ID</th>
                      <th scope="col" className="text-center px-6 py-2">First</th>
                      <th scope="col" className="text-center px-6 py-2">Last</th>
                      <th scope="col" className="text-center px-6 py-2">DNI</th>
                      <th scope="col" className="text-center px-6 py-2">Total de Pedido con Iva</th>
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
                        <td className="text-center whitespace-nowrap px-6 py-2 font-medium">{order?.userInfo?.firstName}</td>
                        <td className="text-center whitespace-nowrap px-6 py-2 font-medium">{order?.userInfo?.lastName}</td>
                        <td className="text-center whitespace-nowrap px-6 py-2 font-medium">{order?.userInfo?.dni}</td>
                        <td className="text-center whitespace-nowrap px-6 py-2 font-medium">{order?.totalPedido}€</td>
                        <td className="text-center whitespace-nowrap px-6 py-2 font-medium">{order?.selectedPayment}</td>
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
              ) : (
                  <div className="h-[40vh] flex flex-col space-y-20">
                  <div className="flex flex-col justify-center items-center ">
                  <p className="text-2xl font-semibold text-[#706e6b]">No hay pedidos Inactivos</p>
                    <svg width="160px" height="160px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M9.5 13.4L10.9286 15L14.5 11" stroke="#706e6b" strokeWidth="1.5" strokeLinecap="round" stroke-linejoin="round"></path> <path d="M20.5 7V13C20.5 16.7712 20.5 18.6569 19.3284 19.8284C18.1569 21 16.2712 21 12.5 21H11.5M3.5 7V13C3.5 16.7712 3.5 18.6569 4.67157 19.8284C5.37634 20.5332 6.3395 20.814 7.81608 20.9259" stroke="#706e6b" strokeWidth="1.5" strokeLinecap="round"></path> <path d="M12 3H4C3.05719 3 2.58579 3 2.29289 3.29289C2 3.58579 2 4.05719 2 5C2 5.94281 2 6.41421 2.29289 6.70711C2.58579 7 3.05719 7 4 7H20C20.9428 7 21.4142 7 21.7071 6.70711C22 6.41421 22 5.94281 22 5C22 4.05719 22 3.58579 21.7071 3.29289C21.4142 3 20.9428 3 20 3H16" stroke="#706e6b" strokeWidth="1.5" strokeLinecap="round"></path> </g></svg>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
} 
