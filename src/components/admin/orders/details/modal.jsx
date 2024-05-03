"use client"; 
export default function modal({ isOpen, onClose, order }) {
  return isOpen ? (
    <div className="fixed inset-0 p-8 flex flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto font-[sans-serif]">
      <div className="w-full max-w-6xl bg-white shadow-lg rounded-md p-6 relative">
        <div className='flex flex-col '>
          <div className='flex flex-row justify-end mb-4'>
            <svg onClick={onClose} xmlns="http://www.w3.org/2000/svg" className=" ml-4 w-3.5 cursor-pointer shrink-0 fill-black hover:fill-red-500 float-right" viewBox="0 0 320.591 320.591">
              <path d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z" data-original="#000000"></path>
              <path d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z" data-original="#000000"></path>
            </svg>
          </div>
          <div className=''>
            {order && (
              <div className='flex flex-row'>
                <div className='flex-1 mr-6 bg-gray-50 p-2'>
                  <h1 className="mb-4 text-start text-2xl font-bold">
                    Pedido:
                  </h1>
                  <div className={`h-[270px] overflow-y-scroll ${order.cartProducts && order.cartProducts.length <= 4 ? 'no-scrollbar' : ''}`}>
                    {order.cartProducts && order.cartProducts.length > 0 && (
                      order.cartProducts.map((product, index) => (
                        <div className='flex flex-col mr-2' key={index}>
                          <div className='flex flex-row'>
                            <div className='w-[70px] h-auto my-2'>
                              <img
                                src={product.imagen}
                                alt="product-image"
                                className="object-cover rounded-xl"
                              />
                            </div>
                            <div className='ml-4 my-2'>
                              <h1 className='font-bold w-full'>{product.ALBEDOtitulo}({product.ALBEDOcodigo})</h1>
                              <p className='text-left'>{product.quantity} x {product.ALBEDOprecio}€</p>
                            </div>
                          </div>
                          <div className=''>
                            <hr />
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
                <div className='grow bg-gray-50 p-2'>
                  <h1 className="mb-4 text-start text-2xl font-bold">
                    Datos de Cliente:
                  </h1>
                  {order.userInfo && (
                    <div className='flex flex-col space-y-2 text-lg'>
                      <div className='flex flex-row '>
                        <div className='flex flex-row items-center space-x-2 w-1/2 grow'>
                          <h1 className='font-bold'>Nombre: </h1>
                          <p>{order.userInfo.firstName}</p>
                        </div>
                        <div className='flex flex-row items-center space-x-2 w-1/2 grow'>
                          <h1 className='font-bold'>Apellidos: </h1>
                          <p>{order.userInfo.lastName}</p>
                        </div>
                      </div>
                      <div className='flex flex-row '>
                        <div className='flex flex-row items-center space-x-2 w-1/2 grow'>
                          <h1 className='font-bold'>DNI/CIF: </h1>
                          <p>{order.userInfo.dni}</p>
                        </div>
                        <div className='flex flex-row items-center space-x-2 w-1/2 grow'>
                          <h1 className='font-bold'>Teléfono: </h1>
                          <p>{order.userInfo.phoneNumber}</p>
                        </div>
                      </div>
                      {
                        order.userInfo.company && (
                          <div className='flex flex-row items-center space-x-2'>
                            <h1 className='font-bold'>Empresa: </h1>
                            <p>{order.userInfo.company}</p>
                          </div>
                        )}
                      <div className='flex flex-row items-center space-x-2'>
                        <h1 className='font-bold'>Email: </h1>
                        <p>{order.userInfo.email}</p>
                      </div>
                      <div className='flex flex-row space-x-2'>
                        <h1 className='font-bold'>Dirección de Entrega: </h1>
                        <p className='text-wrap text-left'>{order.userInfo.address}
                          {order.userInfo.zipCode} {order.userInfo.city}
                          {order.userInfo.province}</p>
                      </div>
                      <div className='flex flex-row  items-center space-x-2'>
                        <h1 className='font-bold'>Tipo de Envío: </h1>
                        <p>{order.selectedShipping.method}</p>
                      </div>
                      <div className='flex flex-row'>
                        <div className='flex flex-row items-center space-x-2  w-1/2'>
                          <h1 className='font-bold'>Metodo de pago: </h1>
                          <p>{order.selectedPayment}</p>
                        </div>
                        <div className='flex flex-row items-center space-x-2  w-1/2'>
                          <h1 className='font-bold'>Total de Pedido: </h1>
                          <p>{order.totalPedido}€</p>
                        </div>
                      </div>
                      <div className='flex flex-row'>
                        <div className='flex flex-row items-center space-x-2  w-1/2'>
                          <h1 className='font-bold'>Factura: </h1>
                          <p>{order.invoice ? 'Sí' : 'No'}</p>
                        </div>
                        <div className='flex flex-row space-x-2  w-1/2'>
                          <h1 className='font-bold'>Estado de Pedido: </h1>
                          <p>{order.orderState}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}</div>
        </div>
      </div>
    </div>
  ) : null;
}
