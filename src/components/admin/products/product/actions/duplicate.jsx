import React, { useState } from 'react'
import { duplicateProduct } from '@/lib/data';
export default function duplicate({ category, product, refetchData }) {
    // const [isModalOpen, setIsModalOpen] = useState(false);
    // const toggleModal = () => {
    //     setIsModalOpen(!isModalOpen);
    // };
    const handleDuplicate = async () => {
        console.log("duplicate: " + JSON.stringify(product));
        const success = await duplicateProduct(category, product);
        if (success) {
            refetchData();
        }
    }
    return (
        <>
            <div onClick={handleDuplicate} className="cursor-pointer flex flex-row hover:text-green-500">
                <svg className="w-6 h-6" viewBox="0 0 21 21" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor">
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                    <g id="SVGRepo_iconCarrier">
                        <g fill="none" fillRule="evenodd" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" transform="translate(2 2)">
                            <path d="m12.5 14.5v-8c0-1.1045695-.8954305-2-2-2h-8c-1.1045695 0-2 .8954305-2 2v8c0 1.1045695.8954305 2 2 2h8c1.1045695 0 2-.8954305 2-2z"></path>
                            <path d="m12.5 12.5h2c1.1045695 0 2-.8954305 2-2v-7.99654173c0-1.1045695-.8954305-2-2-2-.0011518 0-.0023035 0-.0034553 0l-7.99999998.01382415c-1.10321873.00190597-1.99654472.89677664-1.99654472 1.99999701v1.98272057"></path>
                            <path d="m6.5 7.5v6"></path>
                            <path d="m6.5 7.5v6" transform="matrix(0 1 -1 0 17 4)"></path>
                        </g>
                    </g>
                </svg>
                <h1>Duplicar</h1>
            </div>
        </>
    )
}
