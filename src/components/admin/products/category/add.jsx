"use client"
import React, { useState } from 'react';
import Modal from '@/components/admin/products/category/addModal';

export default function addCategory({refetchData}) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };
    return (
        <div className='self-center'>
            <div onClick={toggleModal} className="cursor-pointer flex flex-row rounded-lg ml-4 p-2  border-2 border-[#304590] bg-blue-100 hover:bg-blue-200 self-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                <div className="">Añadir Categoría</div> 
            </div> 
            <Modal isOpen={isModalOpen} onClose={toggleModal} refetchData={refetchData} />
        </div>
    )
}
