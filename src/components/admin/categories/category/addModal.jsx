// addModal.js
"use client";
import React, { useState } from 'react';
import { addCategory } from '@/lib/data';

export default function AddModal({ isOpen, onClose }) {
    const [newCategoryName, setNewCategoryName] = useState('');
    const [newCategoryDescription, setNewCategoryDescription] = useState('');
    const [newCategoryBody, setNewCategoryBody] = useState('');
    const [newCategoryCode, setNewCategoryCode] = useState('');
    const [newCategoryUrlCode, setNewCategoryUrlCode] = useState('');
    const [newCategoryIsPublished, setNewCategoryIsPublished] = useState(false);

    const handleInputChangeCode = (event) => {
        setNewCategoryCode(event.target.value);
    };
    const handleInputChangeUrlCode = (event) => {
        setNewCategoryUrlCode(event.target.value);
    };
    const handleInputChangeIsPublished = (event) => {
        setNewCategoryIsPublished(event.target.checked);
    };
    const handleInputChangeName = (event) => {
        setNewCategoryName(event.target.value);
    };

    const handleInputChangeDescription = (event) => {
        setNewCategoryDescription(event.target.value);
    };
    const handleInputChangeBody = (event) => {
        setNewCategoryBody(event.target.value);
    };

    const handleAddCategory = () => {
        addCategory(newCategoryCode, newCategoryUrlCode, newCategoryName, newCategoryDescription, newCategoryBody, newCategoryIsPublished);
        setNewCategoryName('');
        setNewCategoryDescription('');
        setNewCategoryBody('');
        setNewCategoryCode('');
        setNewCategoryUrlCode('');
        setNewCategoryIsPublished(false);
        onClose();

    };

    return isOpen ? (
        <div className="fixed inset-0 p-4 flex flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto font-[sans-serif]">
            <div className="w-full max-w-6xl bg-white shadow-lg rounded-md p-6 relative">
                <svg onClick={onClose} xmlns="http://www.w3.org/2000/svg" className="w-3.5 cursor-pointer shrink-0 fill-black hover:fill-blue-500 float-right" viewBox="0 0 320.591 320.591">
                    <path d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z" data-original="#000000"></path>
                    <path d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z" data-original="#000000"></path>
                </svg>
                <div className='flex space-x-6'>
                    <h1 className='font-bold text-xl'>Añadir Nueva Categoria</h1>
                    <div className='flex justify-start '>
                        <script src="https://unpkg.com/@themesberg/flowbite@latest/dist/flowbite.bundle.js"></script>
                        {/* <span class="mx-3 text-lg self-center font-medium text-gray-900 dark:text-gray-300">Borrador</span> */}
                        <label class="inline-flex items-center cursor-pointer">
                            <input onChange={handleInputChangeIsPublished} type="checkbox" value="false" class="sr-only peer" />
                            <div class="self-center relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        </label>
                        <span class="mx-3 text-lg self-center font-medium text-gray-900 dark:text-gray-300">Publicado</span>
                    </div>
                </div>
                <div className="flex flex-col">
                    <div className="">
                    </div>
                    <div className="w-full rounded-md  p-10">
                        <div className='flex flex-col'>
                            <div className='flex flex-row justify-between space-x-4'>
                                <div className="mb-4 flex-1">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Codigo de Categoría</label>
                                    <input onChange={handleInputChangeCode} type="text" className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="Codigo" required />
                                </div>
                                <div className="mb-4 flex-1">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Codigo de URL</label>
                                    <input onChange={handleInputChangeUrlCode} min="0" type="text" className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="Codigo URL ej. 001" required />
                                </div>
                            </div>
                            <div className='flex flex-row justify-between space-x-4'>
                                <div className="mb-4 flex-1">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Nombre de Categoría</label>
                                    <input onChange={handleInputChangeName} rows="2" type="text" className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="Categoría" required />
                                </div>
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Descripción del Categoría</label>
                                <textarea onChange={handleInputChangeDescription} type="text" className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="Descripción" required />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Cuerpo de Categoría </label>
                                <textarea onChange={handleInputChangeBody} rows="5" className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="Cuerpo" />
                            </div>
                            <div className='flex flex-row justify-between space-x-4'>
                                <div className="flex-1 mb-4">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Images</label>
                                    <input type="file" className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500" required />
                                </div>
                                <div className="flex-1 mb-4">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">PDFs</label>
                                    <input type="file" className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500" required />
                                </div>
                            </div>
                            <div className='flex justify-center mt-4'>
                                <button onClick={handleAddCategory} type="submit" className="w-[150px] bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
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
