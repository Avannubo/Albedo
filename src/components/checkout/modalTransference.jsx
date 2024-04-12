'use client'
import React, { useState } from 'react';
import Link from 'next/link';
export default function ModalTransference({ isOpen, onClose, orderData }) {
    const [isCopied, setIsCopied] = useState(false);

    const copyAccountNumber = () => {
        const accountNumber = 'ES34 1234 1234 1234 1234'; // Your account number
        navigator.clipboard.writeText(accountNumber);
        setIsCopied(true);
        setTimeout(() => {
            setIsCopied(false);
        }, 4000); // Reset copied message after 2 seconds
    };
    console.log('modal console: ', JSON.stringify(orderData));
    return isOpen ? (
        <div className="fixed inset-0 p-6 flex flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto font-[sans-serif]">
            <div className="w-[1000px] max-w-6xl bg-white shadow-lg rounded-md p-12 relative">
                <div className='flex flex-col'>
                    <div className='flex flex-row justify-end'>
                        <svg onClick={onClose} xmlns="http://www.w3.org/2000/svg" className="w-3.5 cursor-pointer shrink-0 fill-black hover:fill-red-500 float-right" viewBox="0 0 320.591 320.591">
                            <path d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z" data-original="#000000"></path>
                            <path d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z" data-original="#000000"></path>
                        </svg>
                    </div>
                    <div className='flex flex-col space-y-4'>
                        <div className='flex flex-row'>
                            <div className='w-1/2 grow mr-6'>
                                <h1 className="mb-4 text-start text-2xl font-bold">
                                    Pedido:
                                </h1>
                                <div className='overflow-y-scroll h-[200px]'>
                                    {orderData.cartProducts && orderData.cartProducts.length > 0 && (
                                        orderData.cartProducts.map((product, index) => (
                                            <div className='flex flex-col ' key={index}>
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
                                                        <p>{product.quantity} x {product.ALBEDOprecio}€</p>
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
                            <div className='w-1/2 grow'>
                                <h1 className="mb-4 text-start text-2xl font-bold">
                                    Datos de Usuarios:
                                </h1>
                                {orderData.userInfo && (
                                    <div className='flex flex-col space-y-2 text-lg'>
                                        <div className='flex flex-row '>
                                            <div className='flex flex-row space-x-2 w-1/2 grow'>
                                                <h1 className='font-bold'>Nombre: </h1>
                                                <p>{orderData.userInfo.firstName}</p>
                                            </div>
                                            <div className='flex flex-row space-x-2 w-1/2 grow'>
                                                <h1 className='font-bold'>Apellidos: </h1>
                                                <p>{orderData.userInfo.lastName}</p>
                                            </div>
                                        </div>
                                        <div className='flex flex-row '>
                                            <div className='flex flex-row space-x-2 w-1/2 grow'>
                                                <h1 className='font-bold'>DNI/CIF: </h1>
                                                <p>{orderData.userInfo.dni}</p>
                                            </div>
                                            <div className='flex flex-row space-x-2 w-1/2 grow'>
                                                <h1 className='font-bold'>Teléfono: </h1>
                                                <p>{orderData.userInfo.phoneNumber}</p>
                                            </div>
                                        </div>

                                        {
                                            orderData.userInfo.company && (
                                                <div className='flex flex-row space-x-2'>
                                                    <h1 className='font-bold'>Empresa: </h1>
                                                    <p>{orderData.userInfo.company}</p>
                                                </div>
                                            )}

                                        <div className='flex flex-row space-x-2'>
                                            <h1 className='font-bold'>Email: </h1>
                                            <p>{orderData.userInfo.email}</p>
                                        </div>
                                        <div className='flex flex-row space-x-2'>
                                            <h1 className='font-bold'>Dirección: </h1>
                                            <p>{orderData.userInfo.address} 
                                                {orderData.userInfo.zipCode} {orderData.userInfo.city} 
                                                {orderData.userInfo.province}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className='flex flex-col justify-center space-y-4 mt-12'><hr />
                            <h1 className='font-bold text-2xl self-center'>Proceso de Pago Por Transferencia</h1>
                            <p className='text-center self-center'>Para enviar su pedido, debe enviar el pago del pedido a este número de cuenta y hacer clic para confirmar el pago. Recibirá la confirmación del pedido en 2-3 días hábiles. Cualquier duda ponte en <Link className='text-[#304590] hover:text-[#475caa]' href="/about/contacto">contacto con nosotros</Link>.</p>
                            <div className='flex flex-row space-x-2 text-xl self-center mt-4 p-2 justify-end w-auto'>
                                    <h1 className='font-bold'>Precio total de pedido:</h1>
                                    <p> {orderData.totalPedido}€ </p>
                                </div>
                            <div className='flex flex-row self-center space-x-2'>
                                
                                <p className='self-center text-lg'>
                                    Nº de Cuenta:
                                </p>
                                <div className='flex flex-row justify-center '>
                                    <div className='relative'>
                                        <p className='self-center text-lg p-3 rounded-lg border border-grey flex flex-row hover:border-[#475caa] hover:bg-blue-100' onClick={copyAccountNumber} style={{ cursor: 'pointer' }}>
                                            ES34 1234 1234 1234 1234
                                        </p>
                                        {isCopied &&
                                            <span className='absolute -right-24 top-2.5  self-center flex flex-row p-1 border border-green-400 rounded-lg bg-green-100'>
                                                <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                                                    <g id="SVGRepo_iconCarrier">
                                                        <path d="M6 11C6 8.17157 6 6.75736 6.87868 5.87868C7.75736 5 9.17157 5 12 5H15C17.8284 5 19.2426 5 20.1213 5.87868C21 6.75736 21 8.17157 21 11V16C21 18.8284 21 20.2426 20.1213 21.1213C19.2426 22 17.8284 22 15 22H12C9.17157 22 7.75736 22 6.87868 21.1213C6 20.2426 6 18.8284 6 16V11Z" stroke="#c0c0c0" stroke-width="1.5"></path>
                                                        <path d="M6 19C4.34315 19 3 17.6569 3 16V10C3 6.22876 3 4.34315 4.17157 3.17157C5.34315 2 7.22876 2 11 2H15C16.6569 2 18 3.34315 18 5" stroke="#c0c0c0" stroke-width="1.5"></path>
                                                    </g>
                                                </svg>Copiado</span>}
                                    </div>

                                </div>

                            </div>


                            <button className='self-center w-[150px] rounded-md bg-[#304590] py-1.5 px-4 font-medium text-blue-50 hover:bg-[#475caa]' type="button">
                                Confirmar Pago
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ) : null;
}
