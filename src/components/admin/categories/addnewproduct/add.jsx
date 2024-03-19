"use client"

import Link from "next/link"

// import React, { useState } from 'react';
// import Modal from '@/components/admin/categories/addnewproduct/addModal';

export default function addCategory() {
    // const [isModalOpen, setIsModalOpen] = useState(false);

    // const toggleModal = () => {
    //     setIsModalOpen(!isModalOpen);
    // }; onClick={toggleModal} 
    return (
        <div>
            <Link href="/admin/products/newProduct" className="cursor-pointer flex flex-row self-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                <div className="">Producto</div> 
            </Link> 
            {/* <Modal isOpen={isModalOpen} onClose={toggleModal}/> */}
        </div>
    )
}
