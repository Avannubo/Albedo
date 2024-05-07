"use client"
import Modal from "@/components/admin/orders/state/modal";
import { getActiveOrderByIndex, getInactiveOrderByIndex } from "@/lib/data";
import React, { useState, useEffect } from 'react';
export default function Btn({ orderState, orderId, refetchData }) {
    // console.log(orderState);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [orderDataStateUpdated, setOrderDataStateUpdated] = useState(null); // State to store fetched order data
    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };
    const fetchOrderData = async () => {
        if (orderState === 'Facturado' || orderState === 'Cancelado') {
            try {
                const order = await getInactiveOrderByIndex(orderId);
                setOrderDataStateUpdated(order.orderState);
            } catch (error) {
                console.error("Error fetching order data:", error);
            }
        }
        
        if (orderState === 'Pendiente' || orderState === 'Confirmado' || orderState === 'Procesando' || orderState === 'Enviado') {
            try {
                const order = await getActiveOrderByIndex(orderId);
                setOrderDataStateUpdated(order.orderState);
            } catch (error) {
                console.error("Error fetching order data:", error);
            }
        }
    };
    useEffect(() => {
        fetchOrderData();
    }, []);
    const handleModalClose = () => {
        setIsModalOpen(false);
        refetchData();
        fetchOrderData();
    };
    const stateColors = {
        "Pendiente": "bg-yellow-300 hover:bg-yellow-400",
        "Confirmado": "bg-orange-300 hover:bg-orange-400",
        "Procesando": "bg-green-300 hover:bg-green-400",
        "Enviado": "bg-indigo-300 hover:bg-indigo-400",
        "Facturado": "bg-purple-300 hover:bg-purple-400",
        "Cancelado": "bg-red-300 hover:bg-red-400",
    };
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
