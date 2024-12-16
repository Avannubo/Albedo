"use client";

import React, { useEffect, useState } from 'react';
import { editProduct, getProductById } from '@/lib/data'; // Ensure these functions are properly implemented

export default function Page({ product, productId }) {
    // console.log(productId);
    const [loading, setLoading] = useState(false); 
    const [newProductName, setNewProductName] = useState(product.ALBEDOtitulo);
    const [newProductUrlCode, setNewProductUrlCode] = useState(product.url_Id); 
    const [newProductPrice, setNewProductPrice] = useState(product.ALBEDOprecio);
    const [newProductDescription, setNewProductDescription] = useState(product.ALBEDOdescripcion);
    const [newProductBody, setNewProductBody] = useState(product.ALBEDOcuerpo);
    const [newProductStock, setNewProductStock] = useState(product.ALBEDOstock);
    const [newProductMinStock, setNewProductMinStock] = useState(product.ALBEDOstock_minimo);
    const [newProductDeliveryTime, setNewProductDeliveryTime] = useState(product.ALBEDOplazo_entrega);
    const [newProductIsPublished, setNewProductIsPublished] = useState(product.isPublished); 
    const [isFeatured, setIsFeatured] = useState(product.isFeatured); // Default to false 
    const [productImages, setProductImages] = useState(product.imagens);
    const [productFiles, setProductFiles] = useState(product.archivos);
    // Fetch product details on mount
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const product = await getProductById(productId);
                if (product) {
                    setIsFeatured(product.isFeatured); // Update the state based on product data
                }
            } catch (error) {
                console.error("Error fetching product:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [productId]);

    const handleInputChangeIsFeatured = async (event) => {
        const updatedFeatured = event.target.checked;
        console.log(updatedFeatured);
        
        setIsFeatured(updatedFeatured); // Update the UI optimistically

        try {
            // Clone and update the product object
            // const updatedProduct = { ...product, isFeatured: updatedFeatured };
            // console.log("Updated product before saving:", updatedProduct); 
            // Call the editProduct function with the updated product
            //await editProduct(updatedProduct); // Save changes to the backend
            await editProduct(product,
                newProductUrlCode,
                newProductName,
                newProductPrice,
                newProductDescription,
                newProductBody,
                newProductStock,
                newProductMinStock,
                newProductDeliveryTime,
                newProductIsPublished,
                updatedFeatured,
                productImages,
                productFiles);
        } catch (error) {
            console.error("Error updating product:", error);

            // Revert the state in case of an error
            setIsFeatured(!updatedFeatured);
        }
    };


    // Render loading state
    if (loading) {
        return <div>Cargando...</div>;
    }

    return (
        <div className="flex justify-start">
            <label className="inline-flex items-center cursor-pointer">
                <input
                    onChange={handleInputChangeIsFeatured}
                    type="checkbox"
                    checked={isFeatured}
                    className="sr-only peer"
                />
                <div className="self-center relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#304590]"></div>
            </label>
            <span className="mx-2 text-lg self-center font-normal text-gray-900 dark:text-gray-300">
                Destacado
            </span>
        </div>
    );
}
