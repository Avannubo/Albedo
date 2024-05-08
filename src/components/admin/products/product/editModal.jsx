"use client";
import React, { useState, useEffect } from 'react';
import { editproduct, getProductById, saveImage, saveFile } from '@/lib/data';
import QuillEditor from "@/components/admin/products/QuillEditor"
import Image from 'next/image';
export default function EditModal({ isOpen, onClose, productId }) {
    // console.log(productId.productId);
    const [loading, setLoading] = useState(false);

    const [newProductName, setNewProductName] = useState(productId.productId.ALBEDOtitulo);
    const [newProductCode, setNewProductCode] = useState(productId.productId.ALBEDOcodigo);
    const [newProductUrlCode, setNewProductUrlCode] = useState(productId.productId.url_Id);
    const [newProductPrice, setNewProductPrice] = useState(productId.productId.ALBEDOprecio);
    const [newProductDescription, setNewProductDescription] = useState(productId.productId.ALBEDOdescripcion);
    const [newProductBody, setNewProductBody] = useState(productId.productId.ALBEDOcuerpo);
    const [newProductStock, setNewProductStock] = useState(productId.productId.ALBEDOstock);
    const [newProductMinStock, setNewProductMinStock] = useState(productId.productId.ALBEDOstock_minimo);
    const [newProductDeliveryTime, setNewProductDeliveryTime] = useState(productId.productId.ALBEDOplazo_entrega);
    const [newCategoryIsPublished, setNewCategoryIsPublished] = useState(productId.productId.isPublished);
    const [productImages, setProductImages] = useState(productId.productId.imagens);
    const [productFiles, setProductFiles] = useState(productId.productId.archivos);
    const [selectedImages, setSelectedImages] = useState([]);
    const [selectedFiles, setSelectedFiles] = useState([]);
    // useEffect(() => {
    //     if (isOpen && productId) {
    //         setNewProductName(productId.productId.ALBEDOtitulo);
    //         setNewProductCode(productId.productId.ALBEDOcodigo);
    //         setNewProductUrlCode(productId.productId.url_Id);
    //         setNewProductPrice(productId.productId.ALBEDOprecio);
    //         setNewProductDescription(productId.productId.ALBEDOdescripcion);
    //         setNewProductBody(productId.productId.ALBEDOcuerpo);
    //         setNewProductStock(productId.productId.ALBEDOstock);
    //         setNewCategoryIsPublished(productId.productId.isPublished);
    //         setNewProductMinStock(productId.productId.ALBEDOstock_minimo);
    //         setNewProductDeliveryTime(productId.productId.ALBEDOplazo_entrega);
    //         setProductImages(productId.productId.imagens);
    //         setProductFiles(productId.productId.archivos);
    //     }
    // }, [isOpen, productId]);

    const handleInputChangeProduct = (event) => {
        setNewProductName(event.target.value);
    };
    const handleInputChangeCode = (event) => {
        setNewProductCode(event.target.value);
    };
    const handleInputChangeUrlCode = (event) => {
        setNewProductUrlCode(event.target.value);
    };
    const handleInputChangePrice = (event) => {
        setNewProductPrice(event.target.value);
    };
    const handleInputChangeDescription = (value) => {
        setNewProductDescription(value);
    };
    const handleInputChangeBody = (value) => {
        setNewProductBody(value);
    };
    const handleInputChangeIsPublished = (event) => {
        setNewCategoryIsPublished(event.target.checked);
    };
    const handleInputChangeStock = (event) => {
        setNewProductStock(event.target.value);
    };
    const handleInputChangeMinStock = (event) => {
        setNewProductMinStock(event.target.value);
    };
    const handleInputChangeDeliveryTime = (event) => {
        setNewProductDeliveryTime(event.target.value);
    };
    const handleImageChange = (event) => {
        const files = Array.from(event.target.files);
        setSelectedImages(files);
    };
    const handleFileChange = (event) => {
        const files = Array.from(event.target.files);
        setSelectedFiles(files);
    };
    const handleDeleteImage = async (index) => {
        try {
            const currentImages = [...productImages];
            currentImages.splice(index, 1);
            console.log(currentImages);
            setProductImages(currentImages); // Update productImages state
            // Call deleteImages function to delete the image
            // await deleteImages([imagePathToDelete]);
            console.log('Image deleted successfully');
        } catch (error) {
            console.error('Error deleting image:', error);
            // You might want to handle errors here, e.g., show an error message
        }
    };
    const handleDeleteFile = (index) => {
        try {
            const updatedFiles = [...productFiles];
            updatedFiles.splice(index, 1);
            setProductFiles(updatedFiles); // Update productFiles state
            console.log('File deleted successfully' + updatedFiles);
        } catch (error) {
            console.error('Error deleting file:', error);
            // You might want to handle errors here, e.g., show an error message
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
                        const imagePath = `./public/assets/images/${image.name}`;
                        const imagePathToSave = `/assets/images/${image.name}`;
                        console.log("Uploading image:", imagePath);
                        try {
                            // Assuming saveImage is asynchronous and returns a promise
                            await saveImage(base64Image, imagePath.replace(/ /g, "_"));
                            imagePaths.push(imagePathToSave.replace(/ /g, "_"));
                            console.log("Image uploaded:", imagePathToSave.replace(/ /g, "_"));
                            resolveImage();
                        } catch (error) {
                            console.error("Error uploading image:", error);
                            rejectImage(error);
                        }
                    };
                    reader.onerror = error => {
                        console.error("Error reading image:", error);
                        rejectImage(error);
                    };
                    reader.readAsDataURL(image);
                });
            });
            Promise.all(uploadPromises)
                .then(() => {
                    console.log("All images uploaded successfully " + uploadPromises);
                    resolve(imagePaths);
                })
                .catch(error => {
                    console.error("Error uploading images:", error);
                    reject(error);
                });
        });
    };
    const uploadRelatedFiles = () => {
        return new Promise((resolve, reject) => {
            const filesPaths = [];
            const uploadPromises = selectedFiles.map(file => {
                return new Promise((resolveFile, rejectFile) => {
                    const reader = new FileReader();
                    reader.onload = async () => {
                        const fileData = reader.result;
                        const filePath = `./public/assets/archivos/${file.name}`;
                        const filePathToSave = `/assets/archivos/${file.name}`;
                        console.log("Uploading file:", filePath);
                        try {
                            // Assuming saveFile is asynchronous and returns a promise
                            await saveFile(fileData, filePath.replace(/ /g, "_"));
                            filesPaths.push(filePathToSave.replace(/ /g, "_"));
                            console.log("File uploaded:", filePath.replace(/ /g, "_"));
                            resolveFile();
                        } catch (error) {
                            console.error("Error uploading file:", error);
                            rejectFile(error);
                        }
                    };
                    reader.onerror = error => {
                        console.error("Error reading file:", error);
                        rejectFile(error);
                    };
                    reader.readAsDataURL(file);
                });
            });
            Promise.all(uploadPromises)
                .then(() => {
                    console.log("All files uploaded successfully" + filesPaths);
                    resolve(filesPaths);
                })
                .catch(error => {
                    console.error("Error uploading files:", error);
                    reject(error);
                });
        });
    };
    const handleAddProduct = async () => {
        try {
            setLoading(true);
            // Upload images and related files
            const imagePaths = await uploadImages();
            const relatedFilePaths = await uploadRelatedFiles();

            // console.log(relatedFilePaths);
            // Combine new and existing image paths and file paths
            const uniqueImagePaths = Array.from(new Set([...imagePaths, ...productImages]));
            const uniqueFilePaths = Array.from(new Set([...relatedFilePaths, ...productFiles]));
            console.log(uniqueFilePaths);
            await editproduct(productId,
                newProductCode,
                newProductUrlCode,
                newProductName,
                newProductPrice,
                newProductDescription,
                newProductBody,
                newProductStock,
                newProductMinStock,
                newProductDeliveryTime,
                newCategoryIsPublished,
                uniqueImagePaths,
                uniqueFilePaths);
            setProductImages(uniqueImagePaths);
            setProductFiles(uniqueFilePaths);
            setLoading(false);
            // setNewProductName('');
            // setNewProductCode('');
            // setNewProductUrlCode('');
            // setNewProductPrice(0);
            // setNewProductDescription('');
            // setNewProductBody('');
            // setNewProductStock(0);
            // setNewProductMinStock(0);
            // setNewProductDeliveryTime(0);
            // setNewCategoryIsPublished(newCategoryIsPublished);
            // setProductImages([]);
            // setSelectedImages([]);
            // setSelectedFiles([]);
            // setProductFiles([]);
            onClose();
        } catch (error) {
            console.error("Error uploading images:", error);
            setLoading(false);
        }
    };
    return isOpen ? (
        <div className="fixed inset-0 p-4 flex flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:max-h-screen before:bg-[rgba(0,0,0,0.5)] overflow-y-scroll font-[sans-serif]">
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
                            <h1 className='font-bold text-xl'>Editar Producto</h1>
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
                                    <label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Codigo de producto</label>
                                    <input onChange={handleInputChangeCode} disabled value={newProductCode} type="text" className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-[#304590] focus:border-[#304590]" placeholder="Codigo" required />
                                </div>
                                <div className="mb-4 flex-1">
                                    <label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Codigo de URL</label>
                                    <input onChange={handleInputChangeUrlCode} value={newProductUrlCode} type="text" className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-[#304590] focus:border-[#304590]" placeholder="Codigo" required />
                                </div>
                            </div>
                            <div className='flex flex-row justify-between space-x-4'>
                                <div className="mb-4 flex-1">
                                    <label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Nombre de Producto</label>
                                    <input onChange={handleInputChangeProduct} value={newProductName} type="text" className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-[#304590] focus:border-[#304590]" placeholder="product" required />
                                </div>
                                <div className="mb-4 flex-1">
                                    <label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Precio de producto</label>
                                    <div className='flex flex-row justify-center space-x-1 self-center mr-2'>
                                        <input onChange={handleInputChangePrice} value={newProductPrice} type="number" min="0" step="0.1" className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-[#304590] focus:border-[#304590]" placeholder="Precio " required />
                                        <label className="block text-lg font-medium text-gray-700 dark:text-gray-300 self-center whitespace-nowrap">€ +IVA</label>
                                    </div>
                                </div>
                            </div>
                            <div className="mb-4">
                                <label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Descripción del Producto</label>
                                <QuillEditor value={newProductDescription} onChange={handleInputChangeDescription} />
                                {/* <input onChange={handleInputChangeDescription} value={newProductDescription} type="text" className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-[#304590] focus:border-[#304590]" placeholder="Descripción" required /> */}
                            </div>
                            <div className="mb-4">
                                <label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Producto Cuerpo</label>
                                <QuillEditor value={newProductBody} onChange={handleInputChangeBody} />
                                {/* <textarea onChange={handleInputChangeBody} value={newProductBody} rows="5" className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-[#304590] focus:border-[#304590]" placeholder='Cuerpo' /> */}
                            </div>
                            <div className='flex flex-row justify-between space-x-4'>
                                <div className="flex-1 mb-4">
                                    <label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Stock</label>
                                    <input onChange={handleInputChangeStock} value={newProductStock} type="number" className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-[#304590] focus:border-[#304590]" min="0" placeholder="Stock" required />
                                </div>
                                <div className="flex-1 mb-4">
                                    <label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Min. Stock</label>
                                    <input onChange={handleInputChangeMinStock} value={newProductMinStock} type="number" min="0" className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-[#304590] focus:border-[#304590]" placeholder="Min. Stock" required />
                                </div>
                                <div className="flex-1 mb-4">
                                    <label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Plazo de entrega</label>
                                    <input onChange={handleInputChangeDeliveryTime} value={newProductDeliveryTime} type="number" className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-[#304590] focus:border-[#304590]" min="0" placeholder="Dias" required />
                                </div>
                            </div>
                            <div className='flex flex-col justify-start'>
                                <div className='flex flex-col justify-start'>
                                    <label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">imagenses Del Producto</label>
                                    <input multiple onChange={handleImageChange} type="file" accept="image/*" className="mb-4 shadow-sm rounded-md  border border-gray-300 focus:outline-none focus:ring-[#304590] focus:border-[#304590]" required />
                                </div>
                                <div className='flex  flex-row justify-start flex-wrap '>
                                    {productImages && productImages.length > 0 && (
                                        productImages.map((imagePath, index) => (
                                            <div key={index} className="relative mr-4">
                                                <Image
                                                    src={imagePath}
                                                    alt={`Product Image ${index + 1}`}
                                                    className="h-[100px] w-[150px] object-cover rounded-lg mb-2 border-2 border-gray-200"
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
                            </div>
                            <div className='flex flex-col justify-center '>
                                <div className='flex flex-col  '>
                                    <label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Archivos Relacionados</label>
                                    <input multiple
                                        accept=".rar,.zip,.pdf,.exe,.docx"
                                        type="file"
                                        onChange={handleFileChange}
                                        className="mb-4 shadow-sm rounded-md border border-gray-300 focus:outline-none focus:ring-[#304590] focus:border-[#304590]" required />
                                </div>
                                {
                                    productFiles && productFiles.length > 0 && (
                                        <div className='flex flex-row justify-start flex-wrap'>
                                            {productFiles.map((filename, index) => (
                                                <div key={index} className='relative mr-4 mb-4'>
                                                    <div className='border py-2 px-4 rounded-xl'>
                                                        <p>{filename.substring(filename.lastIndexOf('/') + 1)}</p>
                                                    </div>
                                                    <button
                                                        className="absolute -top-2 -right-2 bg-red-500 rounded-full text-white w-6 h-6 text-sx"
                                                        onClick={() => handleDeleteFile(index)}
                                                    >
                                                        X
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                            </div>
                            < div className='flex justify-center mt-6'>
                                <button onClick={handleAddProduct} type="submit" className="w-[150px] bg-[#304590] hover:bg-[#475caa] text-white font-bold py-2 px-4 rounded">
                                    Guardar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    ) : null;
}
