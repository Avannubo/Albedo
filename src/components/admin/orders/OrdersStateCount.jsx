"use client"
import React, { useState, useEffect } from 'react';
import { getAllOrders } from '@/lib/data';

export default function OrdersStateCount() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const fetchedOrders = await getAllOrders();
                setOrders(fetchedOrders);
            } catch (error) {
                console.error("Error fetching orders:", error);
            }
        };

        const intervalId = setInterval(fetchOrders, 5000); // Fetch orders every 5 seconds

        return () => clearInterval(intervalId); // Cleanup function to clear interval on component unmount
    }, []); // Run effect only on component mount

    // Function to group orders by state
    const groupOrdersByState = () => {
        const groupedOrders = {};
        orders.forEach(order => {
            if (!groupedOrders[order.orderState]) {
                groupedOrders[order.orderState] = [];
            }
            groupedOrders[order.orderState].push(order);
        });
        return groupedOrders;
    };

    const stateColors = {
        "Nuevo": "bg-green-400",
        "Pendiente": "bg-yellow-400",
        "Confirmado": "bg-orange-400",
        "Procesando": "bg-purple-400",
        "Enviado": "bg-indigo-400",
        "Cancelado": "bg-red-400",
    };

    const ordersByState = groupOrdersByState();

    return ( 
            <div className='rounded-lg box-shadow p-4 space-y-2 h-auto'>
            <h1 className="font-semibold text-slate-600 text-xl">Estados de Pedidos</h1> 
            <hr />
                {/* list the order states  */}
                {Object.entries(ordersByState).map(([state, orders]) => (
                    <div key={state} className='flex flex-row space-x-1 items-center'>
                        <div className={`rounded-full h-[15px] w-[35px] ${stateColors[state]}`}></div>
                        <p className='text-xl font-medium'>{state}: {orders.length}</p>
                    </div>
                ))}
            </div> 
    );
}
