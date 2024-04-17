"use client";
import React, { useState } from 'react';
import { updateOrderStateById } from "@/lib/data";

export default function Modal({ isOpen, onClose, orderId, orderState, onModalClose }) {
  const [newOrderState, setNewOrderState] = useState(orderState);
  const availableStates = ["Nuevo", "Pendiente", "Confirmado", "Procesando", "Enviado", "Cancelado"];

  const handleStateUpdate = async () => {
    const success = await updateOrderStateById(orderId, newOrderState);
    if (success) {
      console.log("Order state updated successfully.");
      onClose(); // Close the modal after successful update
      onModalClose(); // Callback to inform the parent component about modal close
    } else {
      console.error("Failed to update order state.");
    }
  };

  return isOpen ? (
    <div className="fixed inset-0 p-4 flex flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto font-[sans-serif]">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-md p-8 space-y-4 relative">
        <svg onClick={onClose} xmlns="http://www.w3.org/2000/svg" className="w-3.5 cursor-pointer shrink-0 fill-black hover:fill-red-500 float-right" viewBox="0 0 320.591 320.591">
          <path d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z" data-original="#000000"></path>
          <path d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z" data-original="#000000"></path>
        </svg>

        <h1 className='font-bold text-xl'>Estado de Pedido</h1>

        <p>Seleccione el estado del pedido:</p>
        <select
          value={newOrderState}
          onChange={(e) => setNewOrderState(e.target.value)}
          className="border font-medium p-2 rounded-lg bg-white"
        >
          {availableStates.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>

        <button className='ml-2 self-center text-white p-1.5 rounded-md bg-[#304590] hover:bg-[#475caa]' onClick={handleStateUpdate}>
          Actualizar Estado
        </button>
      </div>
    </div>
  ) : null;
}
