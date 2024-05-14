"use client"
import React, { useState } from 'react';
import Modal from '@/components/admin/products/product/actions/addModal';

export default function addproduct({ categoryId }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };
    return (
        <div>
            {/*  href="/admin/products/newProduct" */}
            <div onClick={toggleModal} className="cursor-pointer flex flex-row self-center hover:text-green-500">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 ">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                <div className="">Producto</div>
            </div>
            <Modal isOpen={isModalOpen} onClose={toggleModal} categoryId={categoryId} />
        </div>
    )
}
