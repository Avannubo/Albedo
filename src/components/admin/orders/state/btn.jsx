"use client"
import Modal from "@/components/admin/orders/state/modal";
import { getOrderByIndex } from "@/lib/data";
import React, { useState, useEffect } from 'react';

export default function Btn({ orderState, orderId }) {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [orderDataStateUpdated, setOrderDataStateUpdated] = useState(null); // State to store fetched order data

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const fetchOrderData = async () => {
        try {
            const order = await getOrderByIndex(orderId);
            setOrderDataStateUpdated(order.orderState);
        } catch (error) {
            console.error("Error fetching order data:", error);
            // Handle error if needed
        }
    };

    useEffect(() => {
        // Fetch order data initially
        fetchOrderData();
    }, []);

    // Function to handle modal close and update order data
    const handleModalClose = () => {
        setIsModalOpen(false);
        fetchOrderData();
    };

    // Define a mapping of order states to button colors
    const stateColors = {
        "Nuevo": "bg-green-300 hover:bg-green-400",
        "Pendiente": "bg-yellow-300 hover:bg-yellow-400",
        "Confirmado": "bg-orange-300 hover:bg-orange-400",
        "Procesando": "bg-purple-300 hover:bg-purple-400",
        "Enviado": "bg-indigo-300 hover:bg-indigo-400",
        "Cancelado": "bg-red-300 hover:bg-red-400",
    };

    // Determine the color class based on the order state
    const colorClass = stateColors[orderDataStateUpdated] || "bg-gray-300 hover:bg-gray-400";

    return (
        <div>
            <button onClick={toggleModal} className={`border font-semibold w-full  p-2 rounded-lg cursor-pointer ${colorClass}`}>
                {orderDataStateUpdated}
            </button>
            <Modal isOpen={isModalOpen} onClose={toggleModal} orderId={orderId} orderState={orderState} onModalClose={handleModalClose} />
        </div>
    );
}
