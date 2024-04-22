"use client"
import React, { useState, useEffect, useMemo } from 'react';
import { getAllOrders } from '@/lib/data';

export default function OrdersStateCount() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const fetchedOrders = await getAllOrders();
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
        <div className='rounded-lg box-shadow p-4 space-y-2 min-h-[180px]'>
            <h1 className="font-semibold text-slate-600 text-xl">Estados de Pedidos</h1>
            <hr />
            {loading ? (
                <div className="flex flex-col items-start justify-between space-y-2">
                    <div className="h-5 w-16 bg-gray-400 rounded-full animate-pulse"></div>
                    <div className="h-5 w-56 bg-gray-400 rounded-full animate-pulse"></div>
                    <div className="h-5 w-44 bg-gray-400 rounded-full animate-pulse"></div>
                    <div className="h-5 w-36 bg-gray-400 rounded-full animate-pulse"></div> 
                </div>
            ) : (
                Object.entries(groupOrdersByState).map(([state, orders]) => (
                    <div key={state} className='flex flex-row space-x-1 items-center'>
                        <div className={`rounded-full h-[15px] w-[35px] ${stateColors[state]}`}></div>
                        <p className='text-xl font-medium'>{state}: {orders.length}</p>
                    </div>
                ))
            )}
        </div>
    );
}
