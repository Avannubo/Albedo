// addModal.js
"use client";
import React, { useState, useEffect } from 'react';
import { editCategory, getCategoryById } from '@/lib/data';

export default function EditModal({ isOpen, onClose, categoryId }) {
    // const productData = getProductById(productId);
    // console.log(JSON.stringify(productData));
    const [newCategoryName, setNewCategoryName] = useState('');
    const [newCategoryCode, setNewCategoryCode] = useState('');
    const [newCategoryDescription, setNewCategoryDescription] = useState('');
    const [newCategoryBody, setNewCategoryBody] = useState('');
    const [newCategoryIsPublished, setNewCategoryIsPublished] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getCategoryById(categoryId);
                console.log("client:", JSON.stringify(data));
                if (data) {
                    setNewCategoryCode(data.id);
                    setNewCategoryName(data.name);
                    setNewCategoryDescription(data.ALBEDOdescripcion);
                    setNewCategoryBody(data.ALBEDOcuerpo);
                    setNewCategoryIsPublished(data.isPublished);
                } else {
                    console.log("category not found.");
                }
            } catch (error) {
                console.error('Error fetching category data:', error);
            }
        };

        if (isOpen) {
            fetchData();
        }
    }, [isOpen, categoryId]);

    //change listeners  for inputs
    const handleInputChangeName = (event) => {
        setNewCategoryName(event.target.value);
    };
    const handleInputChangeCode = (event) => {
        setNewCategoryCode(event.target.value);
    };
    const handleInputChangeDescription = (event) => {
        setNewCategoryDescription(event.target.value);
    };
    const handleInputChangeBody = (event) => {
        setNewCategoryBody(event.target.value);
    };
    const handleInputChangeIsPublished = (event) => {
        setNewCategoryIsPublished(event.target.checked);
    };

    //server Action here
    const handleAddProduct = () => {
        editCategory(categoryId, newCategoryCode, newCategoryName, newCategoryDescription, newCategoryBody, newCategoryIsPublished);
        setNewCategoryCode('');
        setNewCategoryName('');
        setNewCategoryDescription('');
        setNewCategoryBody('');
        setNewCategoryIsPublished(newCategoryIsPublished);
        onClose();

    };

    return isOpen ? (
        <div className="fixed inset-0 p-4 flex flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto font-[sans-serif]">
            <div className="w-full max-w-6xl bg-white shadow-lg rounded-md p-6 relative">
                <svg onClick={onClose} xmlns="http://www.w3.org/2000/svg" className="w-3.5 cursor-pointer shrink-0 fill-black hover:fill-blue-500 float-right" viewBox="0 0 320.591 320.591">
                    <path d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z" data-original="#000000"></path>
                    <path d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z" data-original="#000000"></path>
                </svg>
                <div className="flex flex-col">
                    <div className="w-full rounded-md p-10">
                        <div className='flex space-x-6 mb-4'>
                            <h1 className='font-bold text-xl'>Editar Categoria</h1>

                            <div className='flex justify-start '>
                                <script src="https://unpkg.com/@themesberg/flowbite@latest/dist/flowbite.bundle.js"></script>
                                {/* <span class="mx-3 text-lg self-center font-medium text-gray-900 dark:text-gray-300">Borrador</span> */}
                                <label class="inline-flex items-center cursor-pointer">
                                    <input onChange={handleInputChangeIsPublished} type="checkbox" checked={newCategoryIsPublished} class="sr-only peer" />
                                    <div class="self-center relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                </label>
                                <span class="mx-3 text-lg self-center font-medium text-gray-900 dark:text-gray-300">Publicado</span>
                            </div>
                        </div>
                        <div className='flex flex-col'>
                            <div className='flex flex-row justify-between space-x-4'>

                                <div className="mb-4 flex-1">
                                    <label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Codigo de producto</label>
                                    <input onChange={handleInputChangeCode} value={newCategoryCode} type="text" className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="Codigo" required />
                                </div>
                                <div className="mb-4 flex-1">
                                    <label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Nombre de Producto</label>
                                    <input onChange={handleInputChangeName} value={newCategoryName} type="text" className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="category" required />
                                </div>
                            </div>

                            <div className="mb-4">
                                <label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Descripción del Producto</label>
                                <input onChange={handleInputChangeDescription} value={newCategoryDescription} type="text" className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="Descripción" required />
                            </div>
                            <div className="mb-4">
                                <label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Producto Cuerpo</label>
                                <textarea onChange={handleInputChangeBody} value={newCategoryBody} rows="5" className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder='Cuerpo' />
                            </div>
                            <div className='flex justify-center mt-6'>
                                <button onClick={handleAddProduct} type="submit" className="w-[150px] bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                    Guardar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ) : null;
}
