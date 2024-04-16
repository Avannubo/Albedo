"use client"
import Modal from "@/components/admin/orders/state/modal";
import React, { useState } from 'react';
export default function btn({ orderState }) { 
    const [isModalOpen, setIsModalOpen] = useState(false);
    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };
    return (
        <div>
            <div onClick={toggleModal} className='border font-semibold p-2 rounded-lg bg-green-300 hover:bg-green-400 cursor-pointer'>
            {orderState}
            </div>
            <Modal isOpen={isModalOpen} onClose={toggleModal} />
        </div>
    )
}
