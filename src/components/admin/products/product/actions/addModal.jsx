// addModal.js
"use client";
import { useState } from 'react';
import { addproduct, saveImage, saveFile } from '@/lib/data';
import QuillEditor from "@/components/admin/products/QuillEditor"
import HTMLEditorComponent from "@/components/admin/products/HTMLEditorComponent"

export default function AddModal({ isOpen, onClose, categoryId }) {
    const [newProductName, setNewProductName] = useState('');
    const [newProductUrlCode, setNewProductUrlCode] = useState('');
    const [newProductPrice, setNewProductPrice] = useState(0);
    const [newProductDescription, setNewProductDescription] = useState('');
    const [newProductBody, setNewProductBody] = useState('');
    const [newProductStock, setNewProductStock] = useState(0);
    const [newProductMinStock, setNewProductMinStock] = useState(0);
    const [newProductDeliveryTime, setNewProductDeliveryTime] = useState(0);
    const [nameError, setNameError] = useState(false);
    const [descriptionError, setDescriptionError] = useState(false);
    const [urlCodeError, setUrlCodeError] = useState(false);
    const [selectedImages, setSelectedImages] = useState([]);
    const [relatedFiles, setRelatedFiles] = useState([]);
    const [selectedFiles, setSelectedFiles] = useState([]);
    // const [priceError, setPriceError] = useState(false);
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
    const handleRelatedFilesChange = (event) => {
        const files = Array.from(event.target.files);
        setSelectedFiles(files);
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
                        const filePathToSave = `/public/assets/archivos/${file.name}`;
                        //console.log("Uploading file:", filePath);
                        try {
                            // Assuming saveFile is asynchronous and returns a promise
                            await saveFile(fileData, filePath.replace(/ /g, "_"));
                            filesPaths.push(filePathToSave.replace(/ /g, "_"));
                            //console.log("File uploaded:", filePath.replace(/ /g, "_"));
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
                    //console.log("All files uploaded successfully" + filesPaths);
                    resolve(filesPaths);
                })
                .catch(error => {
                    console.error("Error uploading files:", error);
                    reject(error);
                });
        });
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
                            const ImageLink = await saveImage(base64Image);
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

                    reader.readAsDataURL(image);
                });
            });

            Promise.all(uploadPromises)
                .then(() => {
                    //console.log('All images uploaded successfully:', imagePaths);
                    resolve(imagePaths);
                })
                .catch(error => {
                    console.error('Error uploading images:', error);
                    reject(error);
                });
        });
    };

    // State variables for error handling
    const handleAddProduct = async () => {
        // Set errors for all fields that don't meet the requirements 
        setUrlCodeError(!newProductUrlCode.trim());
        setNameError(!newProductName.trim());
        setDescriptionError(!newProductDescription.trim());
        // If any field doesn't meet the requirements, stop execution
        if (!newProductUrlCode.trim() ||
            !newProductName.trim() ||
            !newProductDescription.trim()) {
            return;
        }
        //check for duplicate product Ids
        // console.log('Products:', categoryId.categoryId.products);
        // Check if the urlId exists in subCategories
        const urlIdExists = categoryId.products.some(product => product.url_Id === newProductUrlCode);
        // If urlId exists, setUrlCodeError and return
        if (urlIdExists) {
            setUrlCodeError(true);
            return;
        }
        try {
            const imagePaths = await uploadImages();
            const relatedFilePaths = await uploadRelatedFiles();
            //console.log(imagePaths);
            //console.log(relatedFilePaths);
            const productData = {
                newProductUrlCode: newProductUrlCode,
                newProductName: newProductName,
                newProductPrice: newProductPrice,
                newProductDescription: newProductDescription,
                newProductBody: newProductBody,
                newProductStock: newProductStock,
                newProductMinStock: newProductMinStock,
                newProductDeliveryTime: newProductDeliveryTime,
                imagePaths: imagePaths,
                relatedFilePaths: relatedFilePaths,
            };
            console.log(newProductStock);
            console.log(newProductMinStock);
            console.log(productData);
            // Ensure addproduct is awaited
            await addproduct(
                categoryId,
                productData
            );
            //reset fields 
            setNewProductUrlCode('');
            setNewProductName('');
            setNewProductPrice('');
            setNewProductDescription('');
            setNewProductBody('');
            setNewProductStock(0);
            setNewProductMinStock(0);
            setNewProductDeliveryTime(0);
            setSelectedImages([]);
            setRelatedFiles([]);
            // onClose();
        } catch (error) {
            console.error("Error adding product:", error);
        }
    };
    return isOpen ? (
        <div className="fixed inset-0 p-4 flex flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto font-[sans-serif]">
            <div className="w-full max-w-6xl bg-white shadow-lg rounded-md p-6 relative">
                <svg onClick={onClose} xmlns="http://www.w3.org/2000/svg" className="w-3.5 cursor-pointer shrink-0 fill-black hover:fill-red-500 float-right" viewBox="0 0 320.591 320.591">
                    <path d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z" data-original="#000000"></path>
                    <path d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z" data-original="#000000"></path>
                </svg>
                <h1 className='font-bold text-xl'>Add New Product</h1>
                <div className="flex flex-col">
                    <div className="">
                    </div>
                    <div className="w-full rounded-md  p-4">
                        <div className='flex flex-col'>
                            <div className='flex flex-row justify-between space-x-4'>
                                {/* <div className="mb-4 flex-1">
                                    <label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Codigo de producto</label>
                                    <input onChange={handleInputChangeCode} type="text" className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-[#304590] focus:border-[#304590]" placeholder="Codigo" required />
                                    {codeError && <span className="text-red-500 italic text-xs ">El código de categoría es requerido</span>}
                                </div> */}

                            </div>
                            <div className='flex flex-row justify-between space-x-4'>
                                <div className="mb-4 flex-1">
                                    <label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Codigo de URL</label>
                                    <input onChange={handleInputChangeUrlCode} min="0" type="text" className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-[#304590] focus:border-[#304590]" placeholder="Codigo URL ej. 001" required />
                                    {urlCodeError && <span className="text-red-500 italic text-xs "> El Codigo de URL es requerido y no duplicado</span>}
                                </div>
                                <div className="mb-4 flex-1">
                                    <label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Nombre de Producto</label>
                                    <input onChange={handleInputChangeProduct} type="text" className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-[#304590] focus:border-[#304590]" placeholder="product" required />
                                    {nameError && <span className="text-red-500 italic text-xs "> El Nombre de Producto es requerido</span>}
                                </div>
                                <div className="mb-4 flex-1">
                                    <label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Precio de producto</label>
                                    <input onChange={handleInputChangePrice} type="number" min="0" step="0.1" className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-[#304590] focus:border-[#304590]" placeholder="Precio" required />
                                    {/* {priceError && <span className="text-red-500 italic text-xs "> El Precio de producto es requerido</span>} */}
                                </div>
                            </div>
                            <div className="mb-4">
                                <label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Descripción del Producto</label>
                                {/* <textarea onChange={handleInputChangeDescription} type="text" className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-[#304590] focus:border-[#304590]" placeholder="Descripción" required /> */}
                                <QuillEditor value={newProductDescription} onChange={handleInputChangeDescription} />
                                {descriptionError && <span className="text-red-500 italic text-xs "> El Descripción del Producto es requerido</span>}
                            </div>
                            <div className="mb-4">
                                <label className=" text-sm font-medium text-gray-700 dark:text-gray-300">Más Información</label>
                                {/* <textarea  rows="5" className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-[#304590] focus:border-[#304590]" /> */}
                                {/* <QuillEditor value={newProductBody} onChange={handleInputChangeBody} /> */}
                                <HTMLEditorComponent value={newProductBody} onChange={handleInputChangeBody} />
                            </div>
                            <div className='flex flex-row justify-between space-x-4'>
                                <div className="flex-1 mb-4">
                                    <label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Stock</label>
                                    <input onChange={handleInputChangeStock} type="number" className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-[#304590] focus:border-[#304590]" min="0" placeholder="Stock" required />
                                </div>
                                <div className="flex-1 mb-4">
                                    <label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Min. Stock</label>
                                    <input onChange={handleInputChangeMinStock} type="number" min="0" className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-[#304590] focus:border-[#304590]" placeholder="Min. Stock" required />
                                </div>
                                <div className="flex-1 mb-4">
                                    <label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Plazo de entrega</label>
                                    <input onChange={handleInputChangeDeliveryTime} type="number" className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-[#304590] focus:border-[#304590]" min="0" placeholder="Dias" required />
                                </div>
                            </div>
                            <div className='flex flex-row justify-between space-x-4'>
                                <div className="flex-1 mb-4">
                                    <label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Images</label>
                                    <input onChange={handleImageChange} multiple type="file" className="shadow-sm rounded-md w-full border border-gray-300 focus:outline-none focus:ring-[#304590] focus:border-[#304590]" required />
                                </div>
                                <div className="flex-1 mb-4">
                                    <label className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Archivos Relacionados</label>
                                    <input
                                        onChange={handleRelatedFilesChange}
                                        multiple
                                        type="file"
                                        accept=".rar,.zip,.pdf,.exe,.docx"
                                        className="shadow-sm rounded-md w-full  border border-gray-300 focus:outline-none focus:ring-[#304590] focus:border-[#304590]"
                                        required
                                    />
                                </div>
                            </div>
                            <div className='flex justify-center mt-4'>
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
