"use client"
import Modal from "@/components/admin/orders/details/modal";
import React, { useState } from 'react';
export default function btn({  orderId }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  }; 
  return (
    <div>
      <div onClick={toggleModal} className='flex justify-center border p-2 rounded-lg bg-blue-300 hover:bg-blue-400 cursor-pointer'>
        <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
          <g id="SVGRepo_iconCarrier">
            <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
            <path d="M1 12C1 12 5 20 12 20C19 20 23 12 23 12" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
            <circle cx="12" cy="12" r="3" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></circle> </g>
        </svg>
      </div>
      <Modal isOpen={isModalOpen} onClose={toggleModal} orderId={orderId} />
    </div>
  )
}
