'use client'
import React, { useState, useEffect } from 'react';
import CartItem from "@/components/products/cartItem";
import ModalTransference from "@/components/checkout/modalTransference";
export default function Page() {
  const [selectedShipping, setSelectedShipping] = useState({ method: null, price: null });
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [cartProducts, setCartProducts] = useState([]);
  const [userInfo, setUserInfo] = useState({
    firstName: '',
    lastName: '',
    dni: '',
    dateOfBirth: '',
    company: '',
    cif: '',
    phoneNumber: '',
    email: '',
    address: '',
    city: '',
    province: '',
    zipCode: '',
    acceptedTerms: false,
    invoice: false
  });
  const [errors, setErrors] = useState({}); // Define errors state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orderData, setOrderData] = useState({});
  const [totalPedido, setTotalPedido] = useState();
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const handleShippingSelect = (shippingOption, shipingPrice) => {
    setSelectedShipping({ method: shippingOption, price: shipingPrice });
    const total = shipingPrice + subTotal;
    setTotalPedido(total)
    console.log("Selected shipping option:", shippingOption, shipingPrice);
  };
  const handlePaymentSelect = (paymentMethod) => {
    setSelectedPayment(paymentMethod);
    console.log("Selected payment method:", paymentMethod);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    // setUserInfo(prevUserInfo => ({
    //   ...prevUserInfo,
    //   [name]: checked
    // }));
    if (name === 'terms') {
      setUserInfo(prevUserInfo => ({
        ...prevUserInfo,
        acceptedTerms: checked
      }));
    }
    if (name === 'invoice') {
      setUserInfo(prevUserInfo => ({
        ...prevUserInfo,
        invoice: checked
      }));
    }
  };
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (typeof window !== 'undefined') {
        setCartProducts(JSON.parse(localStorage.getItem("carrito")) || []);
      }
    }, 500);
    return () => clearInterval(intervalId);
  }, []);
  const subTotal = cartProducts.reduce((total, product) => total + (product.quantity * product.ALBEDOprecio), 0);
  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!userInfo.firstName.trim()) {
      newErrors.firstName = "El nombre es obligatorio.";
    }
    if (!userInfo.lastName.trim()) {
      newErrors.lastName = "Los apellidos son obligatorios.";
    }


    const dniRegex = /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKET]$/i;
    if (!userInfo.dni.trim()) {
      newErrors.dni = "El DNI es obligatorio.";
    } else if (!dniRegex.test(userInfo.dni)) {
      newErrors.dni = "Por favor, introduce un DNI español válido.";
    }


    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
    if (!userInfo.email.trim()) {
      newErrors.email = "El Email es obligatorio.";
    } else if (!emailRegex.test(userInfo.email)) {
      newErrors.email = "Por favor, introduce una dirección de correo electrónico válida.";
    }
    if (!userInfo.phoneNumber.trim()) {
  newErrors.phoneNumber = "El Número de teléfono es obligatorio.";
} else if (!/^\d{9}$/.test(userInfo.phoneNumber)) {
  newErrors.phoneNumber = "El Número de teléfono debe tener 9 dígitos.";
} else if (!/[679]/.test(userInfo.phoneNumber.charAt(0))) {
  newErrors.phoneNumber = "El Número de teléfono debe comenzar con 6, 7 o 9.";
}


   const validProvinces = [
  "Álava", "Albacete", "Alicante", "Almería", "Asturias", "Ávila", "Badajoz", "Barcelona", "Burgos", "Cáceres",
  "Cádiz", "Cantabria", "Castellón", "Ceuta", "Ciudad Real", "Córdoba", "Cuenca", "Gerona", "Granada", "Guadalajara",
  "Guipúzcoa", "Huelva", "Huesca", "Islas Baleares", "Jaén", "La Coruña", "La Rioja", "Las Palmas", "León", "Lérida",
  "Lugo", "Madrid", "Málaga", "Melilla", "Murcia", "Navarra", "Orense", "Palencia", "Pontevedra", "Salamanca",
  "Santa Cruz de Tenerife", "Segovia", "Sevilla", "Soria", "Tarragona", "Teruel", "Toledo", "Valencia", "Valladolid",
  "Vizcaya", "Zamora", "Zaragoza"
];
if (!userInfo.address.trim()) {
  newErrors.address = "La dirección de envío es obligatoria.";
}
if (!userInfo.city.trim()) {
  newErrors.city = "La ciudad es obligatoria.";
}
if (!userInfo.province.trim()) {
  newErrors.province = "La provincia es obligatoria.";
} else if (!validProvinces.includes(userInfo.province.trim())) {
  newErrors.province = "Por favor, introduce una provincia válida en España.";
}


    if (!userInfo.zipCode.trim()) {
      newErrors.zipCode = "El zipCode es obligatorio.";
    }else if (isNaN(userInfo.zipCode)) {
  newErrors.zipCode = "El zipCode debe ser un número.";
}else if (userInfo.zipCode.length !== 6) {
  newErrors.zipCode = "El zipCode debe tener 6 dígitos.";
}


    if (!userInfo.acceptedTerms) {
      newErrors.terms = "Debe aceptar los Términos y Condiciones.";
    }
    setErrors(newErrors);
    // If there are errors, prevent form submission
    if (Object.keys(newErrors).length > 0) {
      console.log(newErrors);
      return;
    }

    setOrderData({
      userInfo,
      cartProducts,
      selectedShipping,
      selectedPayment,
      totalPedido,
      invoice: userInfo.invoice
    });
    console.log(orderData);
    if (selectedPayment === 'Transferencia') {
      toggleModal();
    }
  };
  return (
    <div className="flex flex-row items-start min-h-[85vh] w-[1100px] mt-6 mb-8">
      <div className="bg-gray-50 p-2 mr-2 grow w-[45%]">
        <h1 className="mb-4 text-start text-2xl font-bold">Datos del pedido</h1>
        <form onSubmit={handleSubmit} className="w-full max-w-lg" >
          <div className="flex flex-wrap -mx-3 mb-4">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-first-name"
              >
                Nombre:
              </label>
              <input
                className="appearance-none block w-full bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                id="grid-first-name"
                type="text"
                name="firstName"
                value={userInfo.firstName}
                onChange={handleInputChange}
              />
              {errors.firstName && (
                <p className="text-red-500 text-xs italic">{errors.firstName}</p>
              )}
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
                name="lastName"
                value={userInfo.lastName}
                onChange={handleInputChange}
              />
              {errors.lastName && (
                <p className="text-red-500 text-xs italic">{errors.lastName}</p>
              )}
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-4">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-password"
              >
                DNI/CIF:
              </label>
              <input
                className="appearance-none block w-full bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="text"
                name="dni"
                value={userInfo.dni}
                onChange={handleInputChange}
              />
              {errors.dni && (
                <p className="text-red-500 text-xs italic">{errors.dni}</p>
              )}
            </div>
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-password"
              >
                Empresa (Opcional):
              </label>
              <input
                className="appearance-none block w-full bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="text"
                name="company"
                value={userInfo.company}
                onChange={handleInputChange}
              />
              {errors.company && (
                <p className="text-red-500 text-xs italic">{errors.company}</p>
              )}
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-4">
            <div className="w-full md:w-1/2 px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-password"
              >
                Número de teléfono:
              </label>
              <input
                className="appearance-none block w-full bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="telephone"
                name="phoneNumber"
                value={userInfo.phoneNumber}
                onChange={handleInputChange}
              />
              {errors.phoneNumber && (
                <p className="text-red-500 text-xs italic">{errors.phoneNumber}</p>
              )}
            </div> <div className="w-full md:w-1/2 px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-password"
              >
                Email:
              </label>
              <input
                className="appearance-none block w-full bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="email"
                name="email"
                value={userInfo.email}
                onChange={handleInputChange}
              />
              {errors.email && (
                <p className="text-red-500 text-xs italic">{errors.email}</p>
              )}
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
                className="appearance-none block w-full bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="text"
                name="address"
                value={userInfo.address}
                onChange={handleInputChange}
              />
              {errors.address && (
                <p className="text-red-500 text-xs italic">{errors.address}</p>
              )}
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
                name="city"
                value={userInfo.city}
                onChange={handleInputChange}
              />
              {errors.city && (
                <p className="text-red-500 text-xs italic">{errors.city}</p>
              )}
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
                name="province"
                value={userInfo.province}
                onChange={handleInputChange}
              />
              {errors.province && (
                <p className="text-red-500 text-xs italic">{errors.province}</p>
              )}
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
                name="zipCode"
                value={userInfo.zipCode}
                onChange={handleInputChange}
              />
              {errors.zipCode && (
                <p className="text-red-500 text-xs italic">{errors.zipCode}</p>
              )}
            </div>
          </div>
          <div className="flex flex-wrap p-3 text-lg space-y-2 mb-2">
            <div className="space-x-2">
              <input type="checkbox" name="invoice" id="invoice" onChange={handleCheckboxChange} checked={userInfo.invoice} />
              <label htmlFor="invoice"> Quiero recibir una factura digital</label>
            </div>
            <div className="space-x-2">
              <input type="checkbox" name="terms" id="terms" onChange={handleCheckboxChange} checked={userInfo.acceptedTerms} />
              <label htmlFor="terms">*Acepto los Términos y Condiciones</label>
            </div>
            {userInfo.acceptedTerms && (
              <p className="text-red-500 text-xs italic">{userInfo.acceptedTerms}</p>
            )}
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
              <div className={`grow text-center border  py-2 font-medium rounded-md whitespace-nowrap text-bold text-[16px] hover:bg-[#304590] hover:text-blue-50 cursor-pointer 
              ${selectedShipping && selectedShipping.method === 'Envío Ibérica' ? 'bg-[#304590] text-blue-50 hover:bg-[#475caa]' : 'bg-white'}`}
                onClick={() => handleShippingSelect('Envío Ibérica', 4.99)}>
                Península 4,99€
              </div>
              <div className={`grow text-center border  py-2 font-medium rounded-md whitespace-nowrap text-bold text-[16px]  hover:bg-[#304590] hover:text-blue-50 cursor-pointer 
              ${selectedShipping && selectedShipping.method === 'Envío Baleares' ? 'bg-[#304590] text-blue-50 hover:bg-[#475caa]' : 'bg-white'}`}
                onClick={() => handleShippingSelect('Envío Baleares', 8.99)}>
                Baleares 8,99€
              </div>
              <div className={`grow text-center border  py-2 font-medium rounded-md whitespace-nowrap text-bold text-[16px] hover:bg-[#304590] hover:text-blue-50 cursor-pointer 
              ${selectedShipping && selectedShipping.method === 'Recogida' ? 'bg-[#304590] text-blue-50 hover:bg-[#475caa]' : 'bg-white'}`}
                onClick={() => handleShippingSelect('Recogida', 0.0)}>
                Recogida en tienda
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
              
              <div className={`grow text-center border  py-2 font-medium rounded-md whitespace-nowrap text-bold text-[16px]  hover:bg-[#304590] hover:text-blue-50 cursor-pointer ${selectedPayment === 'Transferencia' ? 'bg-[#304590] hover:bg-[#475caa] text-blue-50' : 'bg-white'}`} onClick={() => handlePaymentSelect('Transferencia')}>
                Transferencia
              </div>
              <div className={`grow text-center border  py-2 font-medium rounded-md whitespace-nowrap text-bold text-[16px] cursor-not-allowed ${selectedPayment === 'Visa-Mastercard' ? '' : 'bg-grey-300'}`} >
                Visa-Mastercard
              </div>
              {/* onClick={() => handlePaymentSelect('Visa-Mastercard')} */}
              <div className={`grow text-center border  py-2 font-medium rounded-md whitespace-nowrap text-bold text-[16px]  cursor-not-allowed ${selectedPayment === 'Bizum' ? '' : 'bg-grey-300'}`} >
                {/* onClick={() => handlePaymentSelect('Bizum')} */}
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
                  <p className="text-gray-700">{selectedShipping.price}€</p>
                </div>
                <hr className="my-2" />
                <div className="flex justify-between">
                  <p className="text-lg font-bold">Total</p>
                  <div className="">
                    <p className="mb-1 text-lg font-bold text-right">{subTotal + selectedShipping.price}€</p>
                    <p className="text-sm text-gray-700">*IVA incluido</p>
                  </div>
                </div>
                <form onSubmit={handleSubmit}>
                  {/* if transfrence is selected i want to toggle the modal  */}
                  <button type="submit" className="mt-2 w-full rounded-md bg-[#304590] py-1.5 font-medium text-blue-50 hover:bg-[#475caa]">
                    Proceder al pago
                  </button>
                </form> <ModalTransference isOpen={isModalOpen} onClose={toggleModal} orderData={orderData} />
                {/* orderData={orderData}  */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
