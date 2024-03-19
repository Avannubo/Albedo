"use client"
import { addCategory } from '@/lib/data';
import { useState } from 'react';

export default function Page() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [body, setBody] = useState('');
    const handleInputChangeName = (event) => {
        setName(event.target.value);
    };
    const handleInputChangeDescription = (event) => {
        setDescription(event.target.value);
    };
    const handleInputChangeBody = (event) => {
        setBody(event.target.value);
    };
    const handleAddCategory = async () => {
        try {
            await addCategory(name, description, body);
        } catch (error) {
            console.error('Error adding category:', error);
        }
    };
    return (
        <div>
            <div className="flex flex-col">
                <div className="">
                    <h1 className="font-semibold text-4xl">Añadir Nueva categoria</h1>
                </div>
                <div className="w-full rounded-md shadow-lg mb-12 p-10">
                    <form action="#" className='flex flex-col'>
                        <div className='flex flex-row justify-between space-x-4'>
                            <div className="mb-4 flex-1">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Nombre de Categoria</label>
                                <input onChange={handleInputChangeName} type="text" className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="Categoria" required />
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Descripción del Categoria</label>
                            <input onChange={handleInputChangeDescription} type="text" className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="Descripción" required />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Cuerpo categoria</label>
                            <textarea onChange={handleInputChangeBody} rows="5" className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="Cuerpo Categoria" />
                        </div>
                        <div className='flex justify-center my-4'>
                            <button onClick={handleAddCategory} className="w-[150px] bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                Guardar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
