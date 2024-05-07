"use client"
import React, { useState, useEffect, useMemo } from 'react';
import { getAllActiveOrders } from '@/lib/data';

export default function OrdersStateCount() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const fetchedOrders = await getAllActiveOrders();
                setOrders(fetchedOrders);
            } catch (error) {
                console.error("Error fetching orders:", error);
            } finally {
                setLoading(false);
            }
        };

        const intervalId = setInterval(fetchOrders, 5000); // Fetch orders every 5 seconds

        return () => clearInterval(intervalId); // Cleanup function to clear interval on component unmount
    }, []);

    const groupOrdersByState = useMemo(() => {
        const groupedOrders = {};
        orders.forEach(order => {
            if (!groupedOrders[order.orderState]) {
                groupedOrders[order.orderState] = [];
            }
            groupedOrders[order.orderState].push(order);
        });
        return groupedOrders;
    }, [orders]);

    const stateColors = {
        "Nuevo": "bg-green-400",
        "Pendiente": "bg-yellow-400",
        "Confirmado": "bg-orange-400",
        "Procesando": "bg-purple-400",
        "Enviado": "bg-indigo-400",
        "Cancelado": "bg-red-400",
    };

    return (
        <div className='grow h-auto box-shadow p-3 space-y-2 rounded-lg box-shadow min-h-[155px]'>
            <h1 className="font-semibold text-slate-500 text-xl">Estados de Pedidos</h1>
            <hr />
            {loading ? (
                <div className="flex flex-col items-start justify-between space-y-2 mt-2">
                    <div className="h-5 w-16 bg-gray-200 rounded-full animate-pulse"></div>
                    <div className="h-5 w-56 bg-gray-200 rounded-full animate-pulse"></div>
                    <div className="h-5 w-44 bg-gray-200 rounded-full animate-pulse"></div>
                    <div className="h-5 w-36 bg-gray-200 rounded-full animate-pulse"></div> 
                </div>
            ) : (
                Object.entries(groupOrdersByState).map(([state, orders]) => (
                    <div key={state} className='flex flex-row space-x-2 items-center'>
                        <div className={`rounded-full h-[15px] w-[35px] ${stateColors[state]}`}></div>
                        <p className='text-xl font-medium'>{state}: {orders.length}</p>
                    </div>
                ))
            )}
        </div>
    );
}
