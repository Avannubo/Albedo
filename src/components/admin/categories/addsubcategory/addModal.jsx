// deleteModal.js
"use client"
import { useState } from 'react';
import { addSubcategory } from '@/lib/data';
import React from 'react';

export default function AddSubcategory({ isOpen, onClose, categoryId }) {
    const [newCategoryName, setNewCategoryName] = useState('');
    const handleInputChangeName = (event) => {
        setNewCategoryName(event.target.value);
    };
    const handleAddCategory = () => { 
        addSubcategory(categoryId, newCategoryName);
        onClose();
    };
    return isOpen ? (
        <div className="fixed inset-0 p-4 flex flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto font-[sans-serif]">
            <div className="w-full max-w-md bg-white shadow-lg rounded-md p-6 relative"> 
                <svg onClick={onClose} xmlns="http://www.w3.org/2000/svg" className="w-3.5 cursor-pointer shrink-0 fill-black hover:fill-blue-500 float-right" viewBox="0 0 320.591 320.591">
                    <path d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z" data-original="#000000"></path>
                    <path d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z" data-original="#000000"></path>
                </svg> 
                <div className="my-8 text-center"> 
                    <div className="w-full  mb-2 md:mb-0">  
                        <input className="appearance-none block w-full bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Nombre" onChange={handleInputChangeName} /> 
                    </div> 
                </div>
                <div className="flex flex-col space-y-2"> 
                    <button  onClick={handleAddCategory} className="w-full px-6 py-2.5 rounded-md text-white text-sm font-semibold border-none outline-none bg-blue-500 hover:bg-blue-600 active:bg-blue-500">Añadir</button> 
                    <button onClick={onClose} className="px-6 py-2.5 rounded-md text-black text-sm font-semibold border-none outline-none bg-gray-200 hover:bg-gray-300 active:bg-gray-200">Cancelar</button>
                </div>
            </div>
        </div>
    ) : null;
}
