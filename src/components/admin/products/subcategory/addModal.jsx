// deleteModal.js
"use client"
import { useState, useEffect } from 'react';
import React from 'react';
import { addSubcategory, getCategories } from '@/lib/data';
import QuillEditor from "@/components/admin/products/QuillEditor"

export default function AddSubcategory({ isOpen, onClose, categoryId }) {
    const [data, setData] = useState([]);
    const [newCategoryName, setNewCategoryName] = useState('');
    const [newCategoryDescription, setNewCategoryDescription] = useState('');
    const [newCategoryBody, setNewCategoryBody] = useState('');
    const [newCategoryCode, setNewCategoryCode] = useState('');
    const [newCategoryUrlCode, setNewCategoryUrlCode] = useState('');
    const [isPublished, setisPublished] = useState(false);
    const [nameError, setNameError] = useState(false);
    const [descriptionError, setDescriptionError] = useState(false);
    const [codeError, setCodeError] = useState(false);
    const [urlCodeError, setUrlCodeError] = useState(false);

    useEffect(() => {
        function fetchData() {
            // Assuming getCategories() returns a promise
            getCategories()
                .then(categories => {
                    setData(categories); // Set the data after the promise resolves
                    if (categoryId.categoryId.isPublished) {
                        setisPublished(true);
                    }
                })
                .catch(error => {
                    console.error('Error fetching categories:', error);
                    // Handle errors if necessary
                });
        }
        fetchData();
    }, []);


    const handleInputChangeCode = (event) => {
        setNewCategoryCode(event.target.value);
    };

    const handleInputChangeUrlCode = (event) => {
        setNewCategoryUrlCode(event.target.value);
    };

    const handleInputChangeName = (event) => {
        setNewCategoryName(event.target.value);
    };

    const handleInputChangeDescription = (value) => {
        setNewCategoryDescription(value);
    };

    const handleInputChangeBody = (value) => {
        setNewCategoryBody(value);
    };

    const handleAddCategory = () => {
        // Check if any of the required fields are empty
        setCodeError(!newCategoryCode.trim());
        setUrlCodeError(!newCategoryUrlCode.trim());
        setNameError(!newCategoryName.trim());
        setDescriptionError(!newCategoryDescription.trim());

        // If any of the required fields are empty, return early
        if (!newCategoryCode.trim() || !newCategoryUrlCode.trim() || !newCategoryName.trim() || !newCategoryDescription.trim()) {
            return;
        }

        console.log('categoryId:', categoryId.categoryId.id);

        // Recursive function to search for category by categoryId
        const findCategoryRecursive = (categoryList) => {
            for (let i = 0; i < categoryList.length; i++) {
                const category = categoryList[i];
                // console.log("Checking category:", category);
                if (category.id === categoryId.categoryId.id) {
                    console.log("Category found:", category);
                    return category;
                }
                if (category.subCategories && category.subCategories.length > 0) {
                    console.log("Checking subcategories of:", category);
                    const foundCategory = findCategoryRecursive(category.subCategories);
                    if (foundCategory) return foundCategory;
                }
            }
            return null;
        };

        // Find the category by categoryId using recursive function
        const catObj = findCategoryRecursive(data);

        console.log('page cat :' + JSON.stringify(categoryId.categoryId.id));
        console.log('cat obj: ' + JSON.stringify(catObj));

        // If category is not found, log an error and return
        if (!catObj) {
            console.error("Category not found.");
            return;
        }

        // Ensure subCategories array exists
        if (!catObj.subCategories) {
            catObj.subCategories = [];
        }

        // Check if the urlId exists in subCategories
        const urlIdExists = catObj.subCategories.some(category => category.url_Id === newCategoryUrlCode);

        // If urlId exists, setUrlCodeError and return
        if (urlIdExists) {
            setUrlCodeError(true);
            return;
        }

        // If everything is valid, add the subcategory
        addSubcategory(categoryId, newCategoryCode, newCategoryUrlCode, newCategoryName, newCategoryDescription, newCategoryBody, isPublished);

        // Clear input fields and close modal
        setNewCategoryName('');
        setNewCategoryDescription('');
        setNewCategoryBody('');
        setNewCategoryCode('');
        setNewCategoryUrlCode('');
        setUrlCodeError(false);
        onClose();
    };






    return isOpen ? (
        <div className="fixed inset-0 p-4 flex flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto font-[sans-serif]">
            <div className="w-full max-w-6xl bg-white shadow-lg rounded-md p-6 relative">
                <svg onClick={onClose} xmlns="http://www.w3.org/2000/svg" className="w-3.5 cursor-pointer shrink-0 fill-black hover:fill-red-500 float-right" viewBox="0 0 320.591 320.591">
                    <path d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z" data-original="#000000"></path>
                    <path d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z" data-original="#000000"></path>
                </svg>
                <h1 className='font-bold text-xl'>Añadir Nueva Subcategoría</h1>
                <div className="flex flex-col">
                    <div className="">
                    </div>
                    <div className="w-full rounded-md  p-10">
                        <div className='flex flex-col'>
                            <div className='flex flex-row justify-between space-x-4'>
                                <div className="mb-4 flex-1">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Codigo de Subcategoría</label>
                                    <input onChange={handleInputChangeCode} type="text" className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-[#304590] focus:border-[#304590]" placeholder="Codigo" required />
                                    {codeError && <span className="text-red-500 italic text-xs ">El código de categoría es requerido</span>}

                                </div>
                                <div className="mb-4 flex-1">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Codigo de URL</label>
                                    <input onChange={handleInputChangeUrlCode} min="0" type="text" className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-[#304590] focus:border-[#304590]" placeholder="Codigo URL ej. 001" required />
                                    {urlCodeError && <span className="text-red-500 italic text-xs"> El código URL es obligatorio y no duplicado. </span>}

                                </div>
                            </div>
                            <div className='flex flex-row justify-between space-x-4'>
                                <div className="mb-4 flex-1">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Nombre de Subcategoría</label>
                                    <input onChange={handleInputChangeName} type="text" className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-[#304590] focus:border-[#304590]" placeholder="Subcategoría" required />
                                    {nameError && <span className="text-red-500 italic text-xs">El nombre de la categoría es requerido</span>}
                                </div>
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Descripción del Subcategoría</label>
                                <QuillEditor value={newCategoryDescription} onChange={handleInputChangeDescription} />
                                {/* <textarea onChange={handleInputChangeDescription} type="text" className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-[#304590] focus:border-[#304590]" placeholder="Descripción" required /> */}
                                {descriptionError && <span className="text-red-500 italic text-xs">La descripción de la categoría es requerida</span>}
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Cuerpo de Subcategoría </label>
                                <QuillEditor value={newCategoryBody} onChange={handleInputChangeBody} />
                                {/* <textarea onChange={handleInputChangeBody} rows="5" className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-[#304590] focus:border-[#304590]" placeholder="Cuerpo" /> */}
                            </div>
                            <div className='flex flex-row justify-between space-x-4'>
                                <div className="flex-1 mb-4">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Imagenes</label>
                                    <input type="file" className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-[#304590] focus:border-[#304590]" required />
                                </div>
                                <div className="flex-1 mb-4">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Archivos Relacionados</label>
                                    <input type="file" className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-[#304590] focus:border-[#304590]" required />
                                </div>
                            </div>
                            <div className='flex justify-center mt-4'>
                                <button onClick={handleAddCategory} type="submit" className="w-[150px] bg-[#304590] hover:bg-[#475caa] text-white font-bold py-2 px-4 rounded">
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
