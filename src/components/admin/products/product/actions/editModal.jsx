"use client";
import React, { useState, useEffect } from 'react';
import { editProduct, saveImage, saveFile } from '@/lib/data';
import QuillEditor from "@/components/admin/products/QuillEditor"
import HTMLEditorComponent from "@/components/admin/products/HTMLEditorComponent"
export default function EditModal({ isOpen, onClose, category, product }) {
    const [loading, setLoading] = useState(false);
    const [saveMessageVisible, setSaveMessageVisible] = useState(false); // New state for saving message

    const [newProductName, setNewProductName] = useState(product.ALBEDOtitulo);
    const [newProductUrlCode, setNewProductUrlCode] = useState(product.url_Id);
    const [newProductPrice, setNewProductPrice] = useState(product.ALBEDOprecio);
    const [newProductDescription, setNewProductDescription] = useState(product.ALBEDOdescripcion);
    const [newProductBody, setNewProductBody] = useState(product.ALBEDOcuerpo || '');
    const [newProductStock, setNewProductStock] = useState(product.ALBEDOstock);
    const [newProductMinStock, setNewProductMinStock] = useState(product.ALBEDOstock_minimo);
    const [newProductDeliveryTime, setNewProductDeliveryTime] = useState(product.ALBEDOplazo_entrega);
    const [newCategoryIsPublished, setNewCategoryIsPublished] = useState(product.isPublished);
    const [newCategoryIsFeatured, setNewCategoryIsFeatured] = useState(product.isFeatured);
    const [productImages, setProductImages] = useState(product.imagens);
    const [productFiles, setProductFiles] = useState(product.archivos);
    const [selectedImages, setSelectedImages] = useState([]);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [nameError, setNameError] = useState(false);
    const [urlCodeError, setUrlCodeError] = useState(false);
    const [descriptionError, setDescriptionError] = useState(false); 
    const handleInputChangeProduct = (event) => {
        setNewProductName(event.target.value);
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
    const handleInputChangeIsFeatured = (event) => {
        setNewCategoryIsFeatured(event.target.checked);
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
            //console.log(currentImages);
            setSelectedImages([]);
            setProductImages(currentImages); // Update productImages state
            // Call deleteImages function to delete the image
            // await deleteImages([imagePathToDelete]);
            //console.log('Image deleted successfully');
        } catch (error) {
            console.error('Error deleting image:', error);
            // You might want to handle errors here, e.g., show an error message
        }
    };
    const handleDeleteFile = (index) => {
        try {
            const updatedFiles = [...productFiles];
            updatedFiles.splice(index, 1);
            setSelectedFiles([]);
            setProductFiles(updatedFiles); // Update productFiles state
            //console.log('File deleted successfully' + updatedFiles);
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
    const uploadRelatedFiles = () => {
        return new Promise((resolve, reject) => {
            const filesPaths = [];
            const uploadPromises = selectedFiles.map(file => {
                return new Promise((resolveFile, rejectFile) => {
                    const reader = new FileReader();
                    reader.onload = async () => {
                        const fileData = reader.result;
                        // Generate a unique ID for the file name to avoid duplicates
                        const uniqueId = `${Date.now()}_${Math.floor(Math.random() * 1e9)}`;
                        const fileExtension = file.name.split('.').pop();
                        const uniqueFileName = `${uniqueId}.${fileExtension}`;
                        const filePath = `./public/assets/archivos/${uniqueFileName}`;
                        const filePathToSave = `./public/assets/archivos/${uniqueFileName}`;
                        // console.log(`Generated unique file name: ${uniqueFileName}`);
                        // console.log(`File path: ${filePath}`);
                        try {
                            // Assuming saveFile is asynchronous and returns a promise
                            await saveFile(fileData, filePath.replace(/ /g, "_"));
                            filesPaths.push(filePathToSave.replace(/ /g, "_"));
                            console.log("File uploaded successfully:", filePath.replace(/ /g, "_"));
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
                    console.log("All files uploaded successfully:", filesPaths);
                    resolve(filesPaths);
                })
                .catch(error => {
                    console.error("Error uploading files:", error);
                    reject(error);
                });
        });
    };
    const handleAddProduct = async () => {
        //console.log(newProductBody);
        setUrlCodeError(!newProductUrlCode.trim());
        setNameError(!newProductName.trim());
        setDescriptionError(!newProductDescription.trim());
        if (!newProductName.trim() || !newProductUrlCode.trim() || !newProductDescription.trim()) {
            return;
        }
        // const urlIdExists = category.products.some(category => category.url_Id === newProductUrlCode); // Use 'url_Id' for comparison
        // if (urlIdExists) {
        //     setUrlCodeError(true);
        //     return;
        // }
        setLoading(true);
        try {
            // Upload images and related files
            const imagePaths = await uploadImages();
            const relatedFilePaths = await uploadRelatedFiles();
            // console.log(relatedFilePaths);
            // Combine new and existing image paths and file paths
            const uniqueImagePaths = Array.from(new Set([...productImages, ...imagePaths]));
            const uniqueFilePaths = Array.from(new Set([...productFiles, ...relatedFilePaths]));
            //console.log(uniqueFilePaths);
            await editProduct(product,
                newProductUrlCode,
                newProductName,
                newProductPrice,
                newProductDescription,
                newProductBody,
                newProductStock,
                newProductMinStock,
                newProductDeliveryTime,
                newCategoryIsPublished,
                newCategoryIsFeatured,
                uniqueImagePaths,
                uniqueFilePaths);
            // Reset the form fields
            setNewProductName(newProductName);
            setNewProductUrlCode(newProductUrlCode);
            setNewProductPrice(newProductPrice);
            setNewProductDescription(newProductDescription);
            setNewProductBody(newProductBody || '');
            setNewProductStock(newProductStock);
            setNewProductMinStock(newProductMinStock);
            setNewProductDeliveryTime(newProductDeliveryTime);
            setNewCategoryIsPublished(newCategoryIsPublished);
            setNewCategoryIsFeatured(newCategoryIsFeatured);
            // Set the updated images and files (this will cause a re-render)
            setProductImages(uniqueImagePaths);
            setProductFiles(uniqueFilePaths);
            // Clear error and loading states
            setNameError(false);
            setDescriptionError(false);
            setUrlCodeError(false);
            setLoading(false);

            // Trigger the save message
            setSaveMessageVisible(true);
            setTimeout(() => setSaveMessageVisible(false), 3000); // Hide after 3 seconds


            // onClose();
        } catch (error) {
            console.error("Error uploading images:", error);
            setLoading(false);
        } finally {
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
                <div className="flex flex-col">
                    <div className="w-full rounded-md p-10">
                        <div className='flex flex-row justify-between space-x-6 mb-4'>
                            <h1 className='font-bold text-xl'>Editar Producto {product.ALBEDOtitulo}</h1>
                            <script src="https://unpkg.com/@themesberg/flowbite@latest/dist/flowbite.bundle.js"></script>
                            <div className='flex flex-row space-x-4'>
                                <div className='flex justify-start '>
                                    <label className="inline-flex items-center cursor-pointer">
                                        <input onChange={handleInputChangeIsPublished} type="checkbox" checked={newCategoryIsPublished} className="sr-only peer" />
                                        <div className="self-center relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#304590]"></div>
                                    </label>
                                    <span className="mx-2 text-lg self-center font-medium text-gray-900 dark:text-gray-300">Publicado</span>
                                </div>
                                <div className='flex justify-start '>
                                    <label className="inline-flex items-center cursor-pointer">
                                        <input onChange={handleInputChangeIsFeatured} type="checkbox" checked={newCategoryIsFeatured} className="sr-only peer" />
                                        <div className="self-center relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#304590]"></div>
                                    </label>
                                    <span className="mx-2 text-lg self-center font-medium text-gray-900 dark:text-gray-300">Destacado</span>
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-col'>
                            <div className='flex flex-row justify-between space-x-4'>
                                {/* <div className="mb-4 flex-1">
                                    <label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Codigo de producto</label>
                                    <input onChange={handleInputChangeCode} disabled value={newProductCode} type="text" className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-[#304590] focus:border-[#304590]" placeholder="Codigo" required />
                                </div> */}
                            </div>
                            <div className='flex flex-row justify-between space-x-4'>
                                <div className="mb-4 flex-1">
                                    <label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Codigo de URL</label>
                                    <input onChange={handleInputChangeUrlCode} value={newProductUrlCode} type="text" className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-[#304590] focus:border-[#304590]" placeholder="Codigo" required />
                                    {urlCodeError && <span className="text-red-500 italic text-xs"> El código URL es obligatorio y no duplicado. </span>}
                                </div>
                                <div className="mb-4 flex-1">
                                    <label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Nombre de Producto</label>
                                    <input onChange={handleInputChangeProduct} value={newProductName} type="text" className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-[#304590] focus:border-[#304590]" placeholder="product" required />
                                    {nameError && <span className="text-red-500 italic text-xs">El nombre de producto es requerido</span>}
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
                                <label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Más Información:</label>
                                <QuillEditor value={newProductDescription} onChange={handleInputChangeDescription} />
                                {descriptionError && <span className="text-red-500 italic text-xs"> La descripción de producto es requerida</span>}
                                {/* <input onChange={handleInputChangeDescription} value={newProductDescription} type="text" className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-[#304590] focus:border-[#304590]" placeholder="Descripción" required /> */}
                            </div>
                            <div className="mb-4">
                                <label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Más Información:</label>
                                {/* <QuillEditor  />  */}
                                <HTMLEditorComponent value={newProductBody} onChange={handleInputChangeBody} />
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
                                    <label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Imagenes del producto</label>
                                    <input multiple onChange={handleImageChange} type="file" accept="image/*" className="mb-4 shadow-sm rounded-md  border border-gray-300 focus:outline-none focus:ring-[#304590] focus:border-[#304590]" required />
                                </div>
                                <div className='flex  flex-row justify-start flex-wrap '>
                                    {productImages && productImages.length > 0 && (
                                        productImages.map((imagePath, index) => (
                                            <div key={index} className="relative mr-4">
                                                {/* {console.log(`Image Path Retrived [${index}]: `, imagePath)} */}
                                                <img
                                                    src={imagePath}
                                                    alt={`Product Image ${index + 1}`}
                                                    className="h-[100px] w-[150px]  object-contain rounded-lg mb-2 border-2 border-gray-200"
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
                            < div className='flex flex-col space-x-2 items-center justify-center mt-6'>
                                < div className='flex flex-row space-x-2 items-center justify-center mt-6'>
                                    <button onClick={handleAddProduct} type="submit" className="w-[150px] bg-[#304590] hover:bg-[#475caa] text-white font-bold py-2 px-4 rounded">
                                        Guardar
                                    </button>
                                    <button onClick={onClose} className="w-[150px] bg-gray-500 hover:bg-gray-400 text-white font-bold py-2 px-4 rounded">
                                        Cerrar
                                    </button>
                                </div>
                                {(descriptionError || urlCodeError || nameError) && <span className="text-red-500 italic text-xs">¡Hay algunos errores en el formulario!</span>}
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
                    Producto actualizado!
                </div>
            )}
        </div >
    ) : null;
}
