// deleteModal.js
"use client"
import { useState } from 'react';
import React from 'react';
import { addSubcategory, saveImage } from '@/lib/data';
import QuillEditor from "@/components/admin/products/QuillEditor"
export default function AddSubcategory({ isOpen, onClose, categoryId }) {
    //console.log(categoryId);
    const [newCategoryName, setNewCategoryName] = useState('');
    const [newCategoryDescription, setNewCategoryDescription] = useState('');
    const [newCategoryBody, setNewCategoryBody] = useState('');
    const [newCategoryUrlCode, setNewCategoryUrlCode] = useState('');
    const [nameError, setNameError] = useState(false);
    const [descriptionError, setDescriptionError] = useState(false);
    const [urlCodeError, setUrlCodeError] = useState(false);
    const [selectedImages, setSelectedImages] = useState([]);

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
    const handleImageChange = (event) => {
        const files = Array.from(event.target.files);
        setSelectedImages(files);
    };
    const uploadImages = () => {
        return new Promise((resolve, reject) => {
            const imagePaths = [];
            const uploadPromises = selectedImages.map(image => {
                return new Promise((resolveImage, rejectImage) => {
                    const reader = new FileReader();
                    reader.onload = async () => {
                        const base64Image = reader.result;

                        // Generate a unique ID for the image
                        const uniqueId = `${Date.now()}_${Math.floor(Math.random() * 1e9)}`;
                        const imageExtension = image.name.split('.').pop();
                        const imagePath = `./public/assets/images/${uniqueId}.${imageExtension}`;
                        const imagePathToSave = `/public/assets/images/${uniqueId}.${imageExtension}`;

                        // Assuming saveImage is asynchronous and returns a promise
                        await saveImage(base64Image, imagePath);
                        imagePaths.push(imagePathToSave);
                        resolveImage();
                    };
                    reader.onerror = error => rejectImage(error);
                    reader.readAsDataURL(image);
                });
            });
            Promise.all(uploadPromises)
                .then(() => resolve(imagePaths))
                .catch(error => reject(error));
        });
    };
    const handleAddCategory = async () => {
        // Check if any of the required fields are empty 
        setUrlCodeError(!newCategoryUrlCode.trim());
        setNameError(!newCategoryName.trim());
        setDescriptionError(!newCategoryDescription.trim());
        // If any of the required fields are empty, return early
        if (!newCategoryUrlCode.trim() || !newCategoryName.trim() || !newCategoryDescription.trim()) {
            return;
        }

        // Check if the urlId exists in subCategories
        const urlIdExists = categoryId.subCategories.some(category => category.url_Id === newCategoryUrlCode);
        // If urlId exists, setUrlCodeError and return
        if (urlIdExists) {
            setUrlCodeError(true);
            return;
        }
        try {
            const imagePaths = await uploadImages();
            const subCategoryData = { 
                newCategoryUrlCode: newCategoryUrlCode,
                newCategoryName: newCategoryName,
                newCategoryDescription: newCategoryDescription,
                newCategoryBody: newCategoryBody,
                imagePaths: imagePaths
            };
            await addSubcategory(categoryId, subCategoryData);
            // If everything is valid, add the subcategory
            // Clear input fields and close modal
            setNewCategoryName('');
            setNewCategoryDescription('');
            setNewCategoryBody('');
            setNewCategoryUrlCode('');
            setUrlCodeError(false);
            setSelectedImages([]);
            onClose();
        } catch (error) {
            console.error("Error uploading images:", error);
        }

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
                                    <label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Codigo de URL</label>
                                    <input onChange={handleInputChangeUrlCode} min="0" type="text" className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-[#304590] focus:border-[#304590]" placeholder="Codigo URL ej. 001" required />
                                    {urlCodeError && <span className="text-red-500 italic text-xs"> El código URL es obligatorio y no duplicado. </span>}
                                </div>
                                <div className="mb-4 flex-1">
                                    <label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Nombre de Subcategoría</label>
                                    <input onChange={handleInputChangeName} type="text" className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-[#304590] focus:border-[#304590]" placeholder="Subcategoría" required />
                                    {nameError && <span className="text-red-500 italic text-xs">El nombre de la categoría es requerido</span>}
                                </div>
                            </div>
                            <div className="mb-4">
                                <label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Descripción del Subcategoría</label>
                                <QuillEditor value={newCategoryDescription} onChange={handleInputChangeDescription} />
                                {/* <textarea onChange={handleInputChangeDescription} type="text" className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-[#304590] focus:border-[#304590]" placeholder="Descripción" required /> */}
                                {descriptionError && <span className="text-red-500 italic text-xs">La descripción de la categoría es requerida</span>}
                            </div>
                            <div className="mb-4">
                                <label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Cuerpo de Subcategoría </label>
                                <QuillEditor value={newCategoryBody} onChange={handleInputChangeBody} />
                                {/* <textarea onChange={handleInputChangeBody} rows="5" className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-[#304590] focus:border-[#304590]" placeholder="Cuerpo" /> */}
                            </div>
                            <div className='flex flex-row justify-between space-x-4'>
                                <div className="flex-1 mb-4">
                                    <label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Imagenes</label>
                                    <input onChange={handleImageChange} multiple type="file" className="shadow-sm rounded-md w-full border border-gray-300 focus:outline-none focus:ring-[#304590] focus:border-[#304590]" required />
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
