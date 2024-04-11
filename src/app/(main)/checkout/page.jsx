'use client'
import React, { useState, useEffect } from 'react';
import CartItem from "@/components/products/cartItem";
export default function Page() {
  const [selectedShipping, setSelectedShipping] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [cartProducts, setCartProducts] = useState();
  const handleShippingSelect = (shippingOption) => {
    setSelectedShipping(shippingOption);
    console.log("Selected shipping option:", shippingOption);
  };
  const handlePaymentSelect = (paymentMethod) => {
    setSelectedPayment(paymentMethod);
    console.log("Selected payment method:", paymentMethod);
  };
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (typeof window !== 'undefined') {
        setCartProducts(JSON.parse(localStorage.getItem("carrito")));
      }
    }, 500);
    // Clear the interval on component unmount to prevent memory leaks
    return () => clearInterval(intervalId);
  }, []);
  const subTotal = cartProducts ? cartProducts.reduce((total, product) => total + (product.quantity * product.ALBEDOprecio), 0) : 0;
  return (
    <div className="flex flex-row items-start h-[85vh] w-[1100px] mt-6 mb-8">
      <div className="bg-gray-50 p-2 mr-2 grow w-[45%]">
        <h1 className="mb-4 text-start text-2xl font-bold">Datos del pedido</h1>
        <form className="w-full max-w-lg">
          <div className="flex flex-wrap -mx-3 mb-4">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-first-name"
              >
                Nombre:
              </label>
              <input
                className="appearance-none block w-full bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-first-name"
                type="text"
              />
              {/* <p className="text-red-500 text-xs italic">Please fill out this field.</p> */}
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-last-name"
              >
                Apellidos:
              </label>
              <input
                className="appearance-none block w-full bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-last-name"
                type="text"
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-4">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-password"
              >
                DNI:
              </label>
              <input
                className="appearance-none block w-full bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="text"
              />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-last-name"
              >
                Fecha de nacimiento:
              </label>
              <input
                className="appearance-none block w-full bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-last-name"
                type="date"
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-4">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-password"
              >
                Empresa (Opcional):
              </label>
              <input
                className="appearance-none block w-full bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="text"
              />
            </div>
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-password"
              >
                CIF (Opcional):
              </label>
              <input
                className="appearance-none block w-full bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="text"
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-4">
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-password"
              >
                Número de teléfono:
              </label>
              <input
                className="appearance-none block w-full bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="telephone"
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-4">
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-password"
              >
                Dirección de envío:
              </label>
              <input
                className="appearance-none block w-full bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="text"
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-2">
            <div className="w-full md:w-1/3 px-3 mb-6">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-city"
              >
                Ciudad:
              </label>
              <input
                className="appearance-none block w-full bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-city"
                type="text"
              />
            </div>
            <div className="w-full md:w-1/3 px-3 mb-6">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-city"
              >
                Provincia:
              </label>
              <input
                className="appearance-none block w-full bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-city"
                type="text"
              />
            </div>
            <div className="w-full md:w-1/3 px-3 mb-6">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-zip"
              >
                Código Postal
              </label>
              <input
                className="appearance-none block w-full bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-zip"
                type="text"
              />
            </div>
          </div>
        </form>
      </div>
      <div className="grow w-[55%] space-y-2">
        <div className="bg-gray-50 p-2 py-4">
          <div className="h-auto">
            <h1 className="mb-4 text-start text-2xl font-bold">
              Productos en el carrito:
            </h1>
            <div className="max-h-[270px] bg-white overflow-y-scroll ">
              {/* no-scrollbar */}
              <CartItem />
            </div>
          </div>
        </div>
        <div className="bg-gray-50 p-2 py-4">
          <div className="h-auto">
            <h1 className="mb-4 text-start text-2xl font-bold">
              Envío:
            </h1>
            <div className="flex flex-row justify-start space-x-2 text-sm">
              <div className={`grow text-center border  py-2 font-medium rounded-md whitespace-nowrap text-bold text-[16px] hover:bg-[#304590] hover:text-blue-50 cursor-pointer ${selectedShipping === 'Envío Ibérica' ? 'bg-[#304590] text-blue-50 hover:bg-[#475caa]' : 'bg-white'}`} onClick={() => handleShippingSelect('Envío Ibérica')}>
                Envío Ibérica
              </div>
              <div className={`grow text-center border  py-2 font-medium rounded-md whitespace-nowrap text-bold text-[16px]  hover:bg-[#304590] hover:text-blue-50 cursor-pointer ${selectedShipping === 'Envío Baleares' ? 'bg-[#304590] text-blue-50 hover:bg-[#475caa]' : 'bg-white'}`} onClick={() => handleShippingSelect('Envío Baleares')}>
                Envío Baleares
              </div>
              <div className={`grow text-center border  py-2 font-medium rounded-md whitespace-nowrap text-bold text-[16px] hover:bg-[#304590] hover:text-blue-50 cursor-pointer ${selectedShipping === 'Recogida' ? 'bg-[#304590] text-blue-50 hover:bg-[#475caa]' : 'bg-white'}`} onClick={() => handleShippingSelect('Recogida')}>
                Recogida
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 p-2 py-4">
          <div className="h-auto">
            <h1 className="mb-4 text-start text-2xl font-bold">
              Selecciona el método de pago:
            </h1>
            <div className="flex flex-row justify-start space-x-2 text-sm">
              <div className={`grow text-center border  py-2 font-medium rounded-md whitespace-nowrap text-bold text-[16px] hover:bg-[#304590] hover:text-blue-50 cursor-pointer ${selectedPayment === 'Visa-Mastercard' ? 'bg-[#304590] hover:bg-[#475caa] text-blue-50' : 'bg-white'}`} onClick={() => handlePaymentSelect('Visa-Mastercard')}>
                Visa-Mastercard
              </div>
              <div className={`grow text-center border  py-2 font-medium rounded-md whitespace-nowrap text-bold text-[16px]  hover:bg-[#304590] hover:text-blue-50 cursor-pointer ${selectedPayment === 'Transferencia' ? 'bg-[#304590] hover:bg-[#475caa] text-blue-50' : 'bg-white'}`} onClick={() => handlePaymentSelect('Transferencia')}>
                Transferencia
              </div>
              <div className={`grow text-center border  py-2 font-medium rounded-md whitespace-nowrap text-bold text-[16px] hover:bg-[#304590] hover:text-blue-50 cursor-pointer ${selectedPayment === 'Bizum' ? 'bg-[#304590] hover:bg-[#475caa] text-blue-50' : 'bg-white'}`} onClick={() => handlePaymentSelect('Bizum')}>
                Bizum
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 ">
          <div className="h-auto">
            <div className="justify-center p-2 py-4 space-y-3">
              <div className="h-full   border bg-white p-3">
                <div className="mb-2 flex justify-between">
                  <p className="text-gray-700">Subtotal</p>
                  <p className="text-gray-700 font-bold">{subTotal}€</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-gray-700">Envío</p>
                  <p className="text-gray-700">4.99€</p>
                </div>
                <hr className="my-2" />
                <div className="flex justify-between">
                  <p className="text-lg font-bold">Total</p>
                  <div className="">
                    <p className="mb-1 text-lg font-bold text-right">{subTotal + 4.99}€</p>
                    <p className="text-sm text-gray-700">*IVA incluido</p>
                  </div>
                </div>
                <button className="mt-2 w-full rounded-md bg-[#304590] py-1.5 font-medium text-blue-50 hover:bg-[#475caa]">
                  Proceder al pago
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
