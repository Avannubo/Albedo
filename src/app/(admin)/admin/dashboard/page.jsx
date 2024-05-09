"use client"
import { useEffect, useState } from 'react';
import Layout from "@/app/(admin)/admin/AdminLayout";
import OrdersStateCount from "@/components/admin/orders/OrdersStateCount";
import OrdersChart from "@/components/admin/panel/ordersChart";
import { getAllInactiveOrders, getAllActiveOrders } from "@/lib/data";
export default function page() {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    async function fetchOrders() {
      try {
        const inactiveOrders = await getAllInactiveOrders();
        const activeOrders = await getAllActiveOrders();
        const fetchedOrders = [...inactiveOrders, ...activeOrders];
        setOrders(fetchedOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
        // Handle error if necessary
      }
    }
    fetchOrders();
  }, []);
  // Function to get total order count
  const getOrderCount = () => orders.length;
  // Function to get total products sold count
  const getTotalSoldCount = () => {
    return orders.reduce((total, order) => total + order.cartProducts.reduce((acc, product) => acc + product.quantity, 0), 0);
  };
  // Function to get total revenue generated
  const getTotalRevenue = () => {
    return orders.reduce((total, order) => total + order.totalPedido, 0);
  };
  // Function to get order count by payment type
  const getOrderCountByPaymentType = (paymentType) => {
    return orders.filter(order => order.selectedPayment === paymentType).length;
  };
  const getTopMostSoldProducts = () => {
    const productsSold = {};
    orders.forEach(order => {
      order.cartProducts.forEach(product => {
        if (productsSold[product.ALBEDOtitulo]) {
          productsSold[product.ALBEDOtitulo] += product.quantity;
        } else {
          productsSold[product.ALBEDOtitulo] = product.quantity;
        }
      });
    });
    // Convert productsSold object to an array of objects
    const soldProductsArray = Object.keys(productsSold).map(productName => ({
      name: productName,
      quantity: productsSold[productName]
    }));
    // Sort the array by quantity in descending order
    soldProductsArray.sort((a, b) => b.quantity - a.quantity);
    // Return the top 3 most sold products
    return soldProductsArray.slice(0, 3);
  };
  const orderCount = getOrderCount();
  const totalSoldCount = getTotalSoldCount();
  const totalRevenue = getTotalRevenue().toFixed(2);
  const transferCount = getOrderCountByPaymentType('Transferencia');
  const visaMastercardCount = getOrderCountByPaymentType('Visa-Mastercard');
  const bizumCount = getOrderCountByPaymentType('Bizum');
  const topMostSoldProducts = getTopMostSoldProducts();
  return (
    <Layout>
      <div>
        <h1 className="font-semibold text-4xl">Admin Panel</h1>
        <div className="flex flex-col space-y-6 my-4">
          <div className="flex flex-row justify-between space-x-6 ">
            <div className="grow h-auto box-shadow rounded-lg p-2 space-y-2">
              <div className="flex flex-row justify-between">
                <div className="flex flex-col justify-center">
                  <h1 className="font-semibold text-slate-600 text-xl">Pedidos Totales</h1>
                  <p className="text-2xl font-bold">{orderCount}</p>
                </div>
                <div className="p-1 rounded-lg bg-slate-100">
                  <svg width="64px" height="64px" viewBox="0 0 48 48" version="1" xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 48 48" fill="#000000">
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                    <g id="SVGRepo_iconCarrier">
                      <path fill="#8d9acf" d="M43,36H29V14h10.6c0.9,0,1.6,0.6,1.9,1.4L45,26v8C45,35.1,44.1,36,43,36z"></path>
                      <path fill="#3a55af" d="M29,36H5c-1.1,0-2-0.9-2-2V9c0-1.1,0.9-2,2-2h22c1.1,0,2,0.9,2,2V36z"></path> <g fill="#d8d8d8">
                        <circle cx="37" cy="36" r="5"></circle>
                        <circle cx="13" cy="36" r="5"></circle> </g>
                      <g fill="#78909C"> <circle cx="37" cy="36" r="2"></circle>
                        <circle cx="13" cy="36" r="2"></circle> </g> <path fill="#d8d8d8" d="M41,25h-7c-0.6,0-1-0.4-1-1v-7c0-0.6,0.4-1,1-1h5.3c0.4,0,0.8,0.3,0.9,0.7l1.7,5.2c0,0.1,0.1,0.2,0.1,0.3V24 C42,24.6,41.6,25,41,25z"></path>
                      <polygon fill="#b9d3f4" points="21.8,13.8 13.9,21.7 10.2,17.9 8,20.1 13.9,26 24,15.9"></polygon> </g></svg>
                </div>
              </div>
            </div>
            <div className="grow h-auto box-shadow rounded-lg p-2 space-y-2">
              <div className="flex flex-row justify-between">
                <div className="flex flex-col justify-center">
                  <h1 className="font-semibold text-slate-600 text-xl">Productos Vendidos</h1>
                  <p className="text-2xl font-bold">{totalSoldCount}</p>
                </div>
                <div className="p-1 rounded-lg bg-slate-100">
                  <svg width="64px" height="64px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M15.5777 3.38197L17.5777 4.43152C19.7294 5.56066 20.8052 6.12523 21.4026 7.13974C22 8.15425 22 9.41667 22 11.9415V12.0585C22 14.5833 22 15.8458 21.4026 16.8603C20.8052 17.8748 19.7294 18.4393 17.5777 19.5685L15.5777 20.618C13.8221 21.5393 12.9443 22 12 22C11.0557 22 10.1779 21.5393 8.42229 20.618L6.42229 19.5685C4.27063 18.4393 3.19479 17.8748 2.5974 16.8603C2 15.8458 2 14.5833 2 12.0585V11.9415C2 9.41667 2 8.15425 2.5974 7.13974C3.19479 6.12523 4.27063 5.56066 6.42229 4.43152L8.42229 3.38197C10.1779 2.46066 11.0557 2 12 2C12.9443 2 13.8221 2.46066 15.5777 3.38197Z" stroke="#8d9acf" strokeWidth="1.5" strokeLinecap="round"></path> <path d="M21 7.5L17 9.5M12 12L3 7.5M12 12V21.5M12 12C12 12 14.7426 10.6287 16.5 9.75C16.6953 9.65237 17 9.5 17 9.5M17 9.5V13M17 9.5L7.5 4.5" stroke="#8d9acf" strokeWidth="1.5" strokeLinecap="round"></path> </g></svg>
                </div>
              </div>
            </div>
            <div className="grow h-auto box-shadow rounded-lg p-2 space-y-2">
              <div className="flex flex-row justify-between">
                <div className="flex flex-col justify-center">
                  <h1 className="font-semibold text-slate-600 text-xl">Total Facturado</h1>
                  <p className="text-2xl font-bold">{totalRevenue}€</p>
                </div>
                <div className="p-1 rounded-lg bg-slate-100">
                  <svg width="64px" height="64px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M1.28869 2.76282C1.41968 2.36986 1.84442 2.15749 2.23737 2.28848L2.50229 2.37678C2.51549 2.38118 2.52864 2.38557 2.54176 2.38994C3.16813 2.59871 3.69746 2.77513 4.11369 2.96876C4.55613 3.17459 4.94002 3.42968 5.23112 3.83355C5.52221 4.23743 5.64282 4.68229 5.69817 5.16711C5.75025 5.62321 5.75023 6.18117 5.7502 6.84142L5.7502 9.49999C5.7502 10.9354 5.7518 11.9365 5.85335 12.6919C5.952 13.4256 6.13245 13.8142 6.40921 14.091C6.68598 14.3677 7.07455 14.5482 7.80832 14.6468C8.56367 14.7484 9.56479 14.75 11.0002 14.75H18.0002C18.4144 14.75 18.7502 15.0858 18.7502 15.5C18.7502 15.9142 18.4144 16.25 18.0002 16.25H10.9453C9.57774 16.25 8.47542 16.25 7.60845 16.1335C6.70834 16.0125 5.95047 15.7536 5.34855 15.1516C4.74664 14.5497 4.48774 13.7918 4.36673 12.8917C4.25017 12.0248 4.25018 10.9225 4.2502 9.55487L4.2502 6.88303C4.2502 6.17003 4.24907 5.69826 4.20785 5.33726C4.16883 4.99541 4.10068 4.83052 4.01426 4.71062C3.92784 4.59072 3.79296 4.47392 3.481 4.3288C3.15155 4.17554 2.70435 4.02527 2.02794 3.79981L1.76303 3.7115C1.37008 3.58052 1.15771 3.15578 1.28869 2.76282Z" fill="#3a55af"></path> <path opacity="0.5" d="M5.74512 5.99997C5.75008 6.25909 5.75008 6.53954 5.75007 6.84137L5.75006 9.49997C5.75006 10.9354 5.75166 11.9365 5.85321 12.6918C5.86803 12.8021 5.8847 12.9045 5.90326 13H16.0221C16.9815 13 17.4612 13 17.8369 12.7522C18.2126 12.5045 18.4016 12.0636 18.7795 11.1817L19.2081 10.1817C20.0176 8.29291 20.4223 7.3485 19.9777 6.67423C19.5331 5.99997 18.5056 5.99997 16.4507 5.99997H5.74512Z" fill="#3a55af"></path> <path d="M7.25 9C7.25 8.58579 7.58579 8.25 8 8.25H11C11.4142 8.25 11.75 8.58579 11.75 9C11.75 9.41421 11.4142 9.75 11 9.75H8C7.58579 9.75 7.25 9.41421 7.25 9Z" fill="#3a55af"></path> <path d="M7.5 18C8.32843 18 9 18.6716 9 19.5C9 20.3284 8.32843 21 7.5 21C6.67157 21 6 20.3284 6 19.5C6 18.6716 6.67157 18 7.5 18Z" fill="#3a55af"></path> <path d="M18 19.5001C18 18.6716 17.3284 18.0001 16.5 18.0001C15.6716 18.0001 15 18.6716 15 19.5001C15 20.3285 15.6716 21.0001 16.5 21.0001C17.3284 21.0001 18 20.3285 18 19.5001Z" fill="#3a55af"></path> </g></svg>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-row justify-between space-x-6 ">
            <OrdersStateCount />
            <div className="grow h-auto box-shadow rounded-lg p-3 space-y-2">
              <h1 className="font-semibold text-slate-600 text-xl">Pedidos Por transacciones</h1>
              <hr />
              <div>
                <p className="text-xl font-medium">Transferencia: {transferCount}</p>
                <p className="text-xl font-medium">Visa-Mastercard: {visaMastercardCount}</p>
                <p className="text-xl font-medium">Bizum: {bizumCount}</p>
              </div>
            </div>
            <div className="grow h-auto box-shadow rounded-lg p-3 space-y-2">
              <h1 className="font-semibold text-slate-600 text-xl">Productos mas vendidos</h1>
              <hr />
              <div>
                {topMostSoldProducts && topMostSoldProducts.length > 0 && (
                  topMostSoldProducts.map((top, index) => (
                    <p key={index} className="text-xl font-medium">{top.name}: {top.quantity}</p>
                  ))
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-row justify-between space-x-2">
            <div className="grow">
              <OrdersChart />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}