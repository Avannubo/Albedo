"use client"
import React, { useState } from 'react';
import Modal from '@/components/admin/products/product/actions/editModal';

export default function editProduct({ category, product }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
        // if (isModalOpen) {
        //     window.location.reload();
        // }
    };
    return (
        <>
            <div onClick={toggleModal} className="cursor-pointer flex flex-row hover:text-yellow-400">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                </svg>
                <h1>Editar</h1>
            </div>
            <Modal isOpen={isModalOpen} onClose={toggleModal} category={category} product={product} />
        </>
    )
}
