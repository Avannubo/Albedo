// "use client"
// import { useState } from 'react';
// import { addProduct } from '@/lib/data';
// import React from 'react';

// export default function Page() {
//     const [newProductName, setNewProductName] = useState('');
//     const [newProductPrice, setNewProductPrice] = useState('');
//     const [newProductDescription, setNewProductDescription] = useState('');
//     const [newProductBody, setNewProductBody] = useState('');
//     const [newProductStock, setNewProductStock] = useState(0);
//     const [newProductMinStock, setNewProductMinStock] = useState(0);
//     const [newProductDeliveryTime, setNewProductDeliveryTime] = useState(0);

//     const handleInputChangeProduct = (event) => {
//         setNewProductName(event.target.value);
//     };
//     const handleInputChangePrice = (event) => {
//         setNewProductPrice(event.target.value);
//     }; 
//     const handleInputChangeDescription = (event) => {
//         setNewProductDescription(event.target.value);
//     }; 
//     const handleInputChangeBody = (event) => {
//         setNewProductBody(event.target.value);
//     };
//     const handleInputChangeStock = (event) => {
//         setNewProductStock(event.target.value);
//     };
//     const handleInputChangeMinStock = (event) => {
//         setNewProductMinStock(event.target.value);
//     };
//     const handleInputChangeDeliveryTime = (event) => {
//         setNewProductDeliveryTime(event.target.value);
//     };
//     const handleFormSubmit = (event) => {
//         event.preventDefault();    
//         const formData = {
//             categoryId: 1,
//             name: newProductName,   
//             price: newProductPrice,
//             desc: newProductDescription,
//             body: newProductBody,
//             stock: newProductStock,
//             minStock: newProductMinStock,
//             deliveryTime: newProductDeliveryTime
//         }  
//         addProduct(formData);
//     };
//     return (
//         <div>
//             <div className="flex flex-col">
//                 <div className="">
//                     <h1 className="font-semibold text-4xl">Product</h1>
//                 </div>
//                 <div className="w-full rounded-md shadow-lg mb-12 p-10">
//                     <div  className='flex flex-col'>
//                         <div className='flex flex-row justify-between space-x-4'>
//                             <div className="mb-4 flex-1">
//                                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Nombre de Producto</label>
//                                 <input onChange={handleInputChangeProduct} value={newProductName} type="text" className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="product" required />
//                             </div>
//                             <div className="mb-4 flex-1">
//                                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Precio de producto</label>
//                                 <input onChange={handleInputChangePrice} value={newProductPrice} type="text" className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="Precio" required />
//                             </div>
//                         </div>

//                         <div className="mb-4">
//                             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Descripción del Producto</label>
//                             <input onChange={handleInputChangeDescription} value={newProductDescription} type="text" className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="Descripción" required />
//                         </div>
//                         <div className="mb-4">
//                             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Producto Cuerpo</label>
//                             <textarea onChange={handleInputChangeBody} value={newProductBody} rows="5" className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
//                         </div>
//                         <div className='flex flex-row justify-between space-x-4'>
//                             <div className="flex-1 mb-4">
//                                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Stock</label>
//                                 <input onChange={handleInputChangeStock} value={newProductStock} type="number" className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="Stock" required />
//                             </div>
//                             <div className="flex-1 mb-4">
//                                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Min. Stock</label>
//                                 <input onChange={handleInputChangeMinStock} value={newProductMinStock} type="number" min="0" className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="Min. Stock" required />
//                             </div>
//                             <div className="flex-1 mb-4">
//                                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Plazo de entrega</label>
//                                 <input onChange={handleInputChangeDeliveryTime} value={newProductDeliveryTime} type="number" className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="Dias" required />
//                             </div>
//                         </div>
//                         <div className='flex justify-center my-4'>
//                             <button onClick={handleFormSubmit} type="submit" className="w-[150px] bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
//                                 Guardar
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }
