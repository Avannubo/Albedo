// deleteModal.js
"use client"
import { useState } from 'react';
import React from 'react';
import { addSubcategory, saveImage } from '@/lib/data';
import QuillEditor from "@/components/admin/products/QuillEditor"
import HTMLEditorComponent from "@/components/admin/products/HTMLEditorComponent"
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
    const [loading, setLoading] = useState(false);
    const [savedImages, setSavedImages] = useState([]);
    const [saveMessageVisible, setSaveMessageVisible] = useState(false); // New state for saving message
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
                        try {
                            // Get the original file name from the image object
                            const originalFileName = image.name;
                            // Pass both the base64 image and original file name to saveImage
                            const ImageLink = await saveImage(base64Image, originalFileName);
                            imagePaths.push(ImageLink);
                            console.log(`Image saved successfully: ${ImageLink}`);
                            resolveImage();
                        } catch (error) {
                            console.error(`Error saving image: ${error}`);
                            rejectImage(error);
                        }
                    };
                    reader.onerror = error => {
                        console.error(`Error reading image file: ${error}`);
                        rejectImage(error);
                    };
                    reader.readAsDataURL(image); // Convert the image file to base64
                });
            });
            Promise.all(uploadPromises)
                .then(() => {
                    // All images uploaded successfully, resolve the image paths
                    resolve(imagePaths);
                })
                .catch(error => {
                    console.error('Error uploading images:', error);
                    reject(error);
                });
        });
    };
    const handleOnClose = (value) => {
        setNewCategoryName('');
        setNewCategoryDescription('');
        setNewCategoryBody('');
        setNewCategoryUrlCode('');
        setUrlCodeError(false);
        setSelectedImages([]);
        setNameError(false);
        setSavedImages([]);
        setDescriptionError(false);
        setUrlCodeError(false);
        onClose();
    };
    const handleAddImages = async (event) => {
        try {
            const imagePaths = await uploadImages(); // Wait for uploadImages to complete
            setSavedImages(imagePaths); // Set the returned image paths
        } catch (error) {
            console.error("Error uploading images:", error); // Handle errors
        }
    };
    const handleDeleteImagePreloaded = (index) => {
        try {
            const currentImages = [...savedImages];
            currentImages.splice(index, 1);
            setSelectedImages([]);
            setSavedImages(currentImages);
        } catch (error) {
            console.error('Error deleting image:', error);
        }
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
        setLoading(true);
        // Check if the urlId exists in subCategories
        const urlIdExists = categoryId.subCategories.some(category => category.url_Id === newCategoryUrlCode);
        // If urlId exists, setUrlCodeError and return
        if (urlIdExists) {
            setUrlCodeError(true);
            return;
        }
        try {
            // const imagePaths = await uploadImages();
            const subCategoryData = {
                newCategoryUrlCode: newCategoryUrlCode,
                newCategoryName: newCategoryName,
                newCategoryDescription: newCategoryDescription,
                newCategoryBody: newCategoryBody,
                imagePaths: savedImages
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
            setSavedImages([]);
            setLoading(false);
            setSaveMessageVisible(true);
            setTimeout(() => {
                setSaveMessageVisible(false); // Hide the message after 2 seconds
                onClose(); // Close the modal
            }, 1500);
        } catch (error) {
            console.error("Error uploading images:", error);
        }
    };
    return isOpen ? (
        <div className="fixed inset-0 p-4 flex flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto font-[sans-serif]">
            <div className="w-full max-w-6xl bg-white shadow-lg rounded-md p-5 relative">
                <svg onClick={handleOnClose} xmlns="http://www.w3.org/2000/svg" className="w-3.5 cursor-pointer shrink-0 fill-black hover:fill-red-500 float-right" viewBox="0 0 320.591 320.591">
                    <path d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z" data-original="#000000"></path>
                    <path d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z" data-original="#000000"></path>
                </svg>
                <div className="flex flex-col p-5 h-[90vh]">
                    <div className="w-full rounded-md p-5 overflow-y-scroll overflow-hidden">
                        <h1 className='font-bold text-xl'>Añadir Nueva Subcategoría</h1>
                        <div className='flex flex-col mt-4'>
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
                                {/* <QuillEditor value={newCategoryDescription} onChange={handleInputChangeDescription} /> */}
                                <HTMLEditorComponent value={newCategoryDescription} onChange={handleInputChangeDescription} />
                                {/* <textarea onChange={handleInputChangeDescription} type="text" className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-[#304590] focus:border-[#304590]" placeholder="Descripción" required /> */}
                                {descriptionError && <span className="text-red-500 italic text-xs">La descripción de la categoría es requerida</span>}
                            </div>
                            <div className="mb-4">
                                <label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Cuerpo de Subcategoría </label>
                                <HTMLEditorComponent value={newCategoryBody} onChange={handleInputChangeBody} />
                                {/* <QuillEditor value={newCategoryBody} onChange={handleInputChangeBody} /> */}
                                {/* <textarea onChange={handleInputChangeBody} rows="5" className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-[#304590] focus:border-[#304590]" placeholder="Cuerpo" /> */}
                            </div>
                            <div className="grow mb-4">
                                <label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Images</label>
                                <div className='flex flex-row space-x-2'>
                                    <input multiple onChange={handleImageChange} type="file" accept="image/*" className="shadow-sm rounded-md w-full border border-gray-300 focus:outline-none focus:ring-[#304590] focus:border-[#304590]" required />
                                    <button onClick={handleAddImages} type="submit" className="w-[250px] bg-[#304590] hover:bg-[#475caa] text-white font-bold py-2 px-4 rounded-md">
                                        Cargar Imagenes
                                    </button>
                                </div>
                            </div>
                            {savedImages && savedImages.length > 0 ? (
                                <>
                                    <h2 className="text-xl font-semibold mb-2">Imágenes precargadas</h2>
                                    <div className='flex flex-row justify-start flex-wrap'>
                                        {savedImages.map((imagePath, index) => (
                                            <div key={index} className="relative">
                                                <img
                                                    src={imagePath}
                                                    alt={`Product Image ${index + 1}`}
                                                    className="h-[100px] w-[150px] object-contain mr-4 rounded-lg mb-4 border-2 border-gray-200"
                                                    width="350"
                                                    height="80"
                                                />
                                                <button
                                                    className="absolute -top-2 right-1 bg-red-500 rounded-full text-white w-7 h-7 text-lg"
                                                    onClick={() => handleDeleteImagePreloaded(index)}
                                                >
                                                    X
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            ) : (
                                <p className="text-gray-500">No imágenes precargadas</p>
                            )}
                            <div className='flex flex-row space-x-2 items-center justify-center mt-6'>
                                <button onClick={handleAddCategory} type="submit" className="w-[150px] bg-[#304590] hover:bg-[#475caa] text-white font-bold py-2 px-4 rounded">
                                    Guardar
                                </button>
                                {/* <button onClick={onClose} className="w-[150px] bg-gray-500 hover:bg-gray-400 text-white font-bold py-2 px-4 rounded">
                                    Cerrar
                                </button> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Save message */}
            {saveMessageVisible && (
                <div style={{
                    position: 'fixed',
                    top: '20px',
                    right: '45%',
                    backgroundColor: '#31AD83',
                    color: 'white',
                    padding: '10px 20px',
                    borderRadius: '5px',
                    zIndex: 1000
                }}>
                    Subcategoría Agregada!
                </div>
            )}
        </div>
    ) : null;
}
