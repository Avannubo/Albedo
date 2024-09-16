"use client";
import React, { useState, useEffect } from 'react';
import { editCategory, getCategoryById, saveImage } from '@/lib/data';
import QuillEditor from "@/components/admin/products/QuillEditor";
import Image from 'next/image';
export default function EditModal({ isOpen, onClose, categoryId }) {
    const [newCategoryName, setNewCategoryName] = useState('');
    const [newCategoryUrlId, setNewCategoryUrlId] = useState('');
    const [newCategoryDescription, setNewCategoryDescription] = useState('');
    const [newCategoryBody, setNewCategoryBody] = useState('');
    const [newCategoryIsPublished, setNewCategoryIsPublished] = useState(false);
    const [categoryImages, setCategoryImages] = useState([]);
    const [selectedImages, setSelectedImages] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        resetState();
    }, [categoryId]);
    const resetState = () => {
        setNewCategoryName(categoryId.name || '');
        setNewCategoryUrlId(categoryId.url_Id || '');
        setNewCategoryDescription(categoryId.ALBEDOdescripcion || '');
        setNewCategoryBody(categoryId.ALBEDOcuerpo || '');
        setNewCategoryIsPublished(categoryId.isPublished || false);
        setCategoryImages(categoryId.imagens || []);
    };
    const [nameError, setNameError] = useState(false);
    const [descriptionError, setDescriptionError] = useState(false);
    const [urlCodeError, setUrlCodeError] = useState(false);
    const handleInputChangeName = (event) => {
        setNewCategoryName(event.target.value);
    };
    const handleInputChangeUrlId = (event) => {
        setNewCategoryUrlId(event.target.value);
    };
    const handleInputChangeDescription = (value) => {
        setNewCategoryDescription(value);
    };
    const handleInputChangeBody = (value) => {
        setNewCategoryBody(value);
    };
    const handleInputChangeIsPublished = (event) => {
        setNewCategoryIsPublished(event.target.checked);
    };
    const handleImageChange = (event) => {
        const files = Array.from(event.target.files);
        setSelectedImages(files);
    };
    const handleDeleteImage = (index) => {
        try {
            const currentImages = [...categoryImages];
            currentImages.splice(index, 1);
            setCategoryImages(currentImages);
        } catch (error) {
            console.error('Error deleting image:', error);
        }
    };
    const uploadImages = () => {
        return new Promise((resolve, reject) => {
            const imagePaths = [];
            const uploadPromises = selectedImages.map(image => {
                return new Promise((resolveImage, rejectImage) => {
                    const reader = new FileReader();
                    reader.onload = async () => {
                        const base64Image = reader.result;
                        const uniqueId = `${Date.now()}_${Math.floor(Math.random() * 1e9)}`;
                        const imageExtension = image.name.split('.').pop();
                        const imagePath = `./public/assets/images/${uniqueId}.${imageExtension}`;
                        try {
                            const cloudImageLink = await saveImage(base64Image, imagePath);
                            imagePaths.push(cloudImageLink);
                            resolveImage();
                        } catch (error) {
                            rejectImage(error);
                        }
                    };
                    reader.onerror = error => {
                        rejectImage(error);
                    };
                    reader.readAsDataURL(image);
                });
            });
            Promise.all(uploadPromises)
                .then(() => {
                    resolve(imagePaths);
                })
                .catch(error => {
                    reject(error);
                });
        });
    };

    const handleAddProduct = async () => {
        setUrlCodeError(!newCategoryUrlId.trim());
        setNameError(!newCategoryName.trim());
        setDescriptionError(!newCategoryDescription.trim());
        if (!newCategoryName.trim() || !newCategoryUrlId.trim() || !newCategoryDescription.trim()) {
            return;
        }
        setLoading(true);
        let imagePaths = [];

        imagePaths = await uploadImages();

        const allImagePaths = [...imagePaths, ...categoryImages];
        const uniqueImagePaths = Array.from(new Set(allImagePaths));
        if (uniqueImagePaths.length > 0) {
            // Only upload images if new ones are selected
        }
        await editCategory(categoryId.id,
            newCategoryUrlId,
            newCategoryName,
            newCategoryDescription,
            newCategoryBody,
            newCategoryIsPublished,
            uniqueImagePaths
        );
        setLoading(false);
        onClose();
    };
    return isOpen ? (
        <div className="fixed inset-0 p-4 flex flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto font-[sans-serif]">
            <div className="w-full max-w-6xl bg-white shadow-lg rounded-md p-6 relative">
                {loading && <div className="absolute inset-0 flex justify-center items-center bg-gray-200 bg-opacity-75 z-[1000]">
                    <div className="flex-col gap-4 w-full flex items-center justify-center">
                        <div className="w-20 h-20 border-8 text-[#304590] text-xl animate-spin border-gray-300 flex items-center justify-center border-t-[#304590] rounded-full"></div>
                    </div>
                </div>}
                <svg onClick={onClose} xmlns="http://www.w3.org/2000/svg" className="w-3.5 cursor-pointer shrink-0 fill-black hover:fill-red-500 float-right" viewBox="0 0 320.591 320.591">
                    <path d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z" data-original="#000000"></path>
                    <path d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z" data-original="#000000"></path>
                </svg>
                <div className="flex flex-col">
                    <div className="w-full rounded-md p-10">
                        <div className='flex space-x-6 mb-4'>
                            <h1 className='font-bold text-xl'>Editar Categoria {categoryId.name}</h1>
                            <div className='flex justify-start '>
                                <script src="https://unpkg.com/@themesberg/flowbite@latest/dist/flowbite.bundle.js"></script>
                                {/* <span className="mx-3 text-lg self-center font-medium text-gray-900 dark:text-gray-300">Borrador</span> */}
                                <label className="inline-flex items-center cursor-pointer">
                                    <input onChange={handleInputChangeIsPublished} type="checkbox" checked={newCategoryIsPublished} className="sr-only peer" />
                                    <div className="self-center relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#304590]"></div>
                                </label>
                                <span className="mx-3 text-lg self-center font-medium text-gray-900 dark:text-gray-300">Publicado</span>
                            </div>
                        </div>
                        <div className='flex flex-col'>
                            <div className='flex flex-row justify-between space-x-4'>
                                <div className="mb-4 flex-1">
                                    <label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Nombre</label>
                                    <input onChange={handleInputChangeName} value={newCategoryName} type="text" className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-[#304590] focus:border-[#304590]" placeholder="category" required />
                                    {nameError && <span className="text-red-500 italic text-xs">El nombre de la categoría es requerido</span>}
                                </div>
                                <div className="mb-4 flex-1">
                                    <label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Codigo de URL</label>
                                    <input onChange={handleInputChangeUrlId} value={newCategoryUrlId} type="text" className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-[#304590] focus:border-[#304590]" placeholder="Url Id" required />
                                    {urlCodeError && <span className="text-red-500 italic text-xs"> El código URL es obligatorio y no duplicado. </span>}
                                </div>
                            </div>
                            <div className="mb-4">
                                <label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Descripción del Producto</label>
                                {/* <input onChange={handleInputChangeDescription} value={newCategoryDescription} type="text" className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-[#304590] focus:border-[#304590]" placeholder="Descripción" required /> */}
                                <QuillEditor value={newCategoryDescription} onChange={handleInputChangeDescription} />
                                {descriptionError && <span className="text-red-500 italic text-xs">La descripción de la categoría es requerida</span>}
                            </div>
                            <div className="mb-4">
                                <label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Producto Cuerpo</label>
                                {/* <textarea onChange={handleInputChangeBody} value={newCategoryBody} rows="5" className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-[#304590] focus:border-[#304590]" placeholder='Cuerpo' /> */}
                                <QuillEditor value={newCategoryBody} onChange={handleInputChangeBody} />
                            </div>
                            {/* <div className='flex flex-row  justify-between space-x-4'> */}
                            <div className="grow mb-4">
                                <label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Images</label>
                                <input multiple onChange={handleImageChange} type="file" accept="image/*" className="shadow-sm rounded-md w-full border border-gray-300 focus:outline-none focus:ring-[#304590] focus:border-[#304590]" required />
                            </div>
                            {/* <div className="grow mb-4">
                                    <label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Archivos Relacionados</label>
                                    <input type="file" className="sshadow-sm rounded-md w-full border border-gray-300 focus:outline-none focus:ring-[#304590] focus:border-[#304590]" required />
                                </div> */}
                            {/* </div> */}<div className='flex  flex-row justify-start flex-wrap space-x-4 '>
                                {categoryImages && categoryImages.length > 0 && (
                                    categoryImages.map((imagePath, index) => (
                                        <div key={index} className="relative">
                                            <img
                                                src={imagePath}
                                                alt={`Product Image ${index + 1}`}
                                                className="h-[100px] w-[150px] object-contain rounded-lg mb-2 border-2 border-gray-200"
                                                width="350"
                                                height="80"
                                            />
                                            <button
                                                className="absolute -top-2 -right-2 bg-red-500 rounded-full text-white w-7 h-7 text-lg"
                                                onClick={() => handleDeleteImage(index)}
                                            >
                                                X
                                            </button>
                                        </div>
                                    ))
                                )}
                            </div>
                            <div className='flex justify-center mt-6'>
                                <button onClick={handleAddProduct} type="submit" className="w-[150px] bg-[#304590] hover:bg-[#475caa] text-white font-bold py-2 px-4 rounded">
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
