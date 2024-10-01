"use server"
import { promises as fs } from 'fs';
import jwt from 'jsonwebtoken';
import { revalidatePath } from 'next/cache';
import { readFile, writeFile } from 'fs/promises';
import nodemailer from 'nodemailer';  
import { exec } from 'child_process';
import util from 'util'; 
// Promisify the exec function to use it as a promise
const execPromise = util.promisify(exec);
const currentdate = new Date();
const euFormattedDateTime = currentdate.getDate() + "/" + (currentdate.getMonth() + 1) + "/" + currentdate.getFullYear() + " " + (currentdate.getHours()) + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();
var filteredProductList = [];
const filePath = './public/data/Products.json';
const filePathActiveOrders = './public/data/ClientOrdersActive.json';
const filePathInactiveOrders = './public/data/ClientOrdersInactive.json';
const filePathParameters = './public/data/Parameters.json'; 

const transporter = nodemailer.createTransport({
    host: "smtp.serviciodecorreo.es",
    port: 465,
    secure: true, // Use `true` for port 465, `false` for other ports
    auth: {
        user: process.env.SENDER,
        pass: process.env.PASS,
    },
});
export async function requireContent() {
    // if (!cachedContent) {
    const res = await fs.readFile(filePath, 'utf8');
    // cachedContent = JSON.parse(res);
    // }
    return JSON.parse(res);
}
export async function getCategories() {
    const content = await requireContent();
    if (content) {
        const { categories } = content;
        revalidatePath('/admin/list');
        return categories;
    } else {
        return []; // Return an empty array if categories don't exist
    }
}
export async function getCategoryDataForListProducts() {
    const content = await requireContent();
    if (content) {
        const { categories } = content;
        revalidatePath('/admin/list');
        return categories;
    } else {
        return []; // Return an empty array if categories don't exist
    }
}
export async function getListProductsFiltered() {
    const content = await requireContent();
    if (content) {
        const { categories } = content;
        // console.log(filteredProductList);
        if (filteredProductList.length == 0) {
            revalidatePath('/admin/list');
            return categories;
        } else {
            revalidatePath('/admin/list');
            return filteredProductList;
        }
    }
}
export async function getRefillStockProducts() {
    try {
        const refillProductList = [];
        console.log("File path:", filePath);
        const data = await fs.readFile(filePath, 'utf8');
        //console.log("File content:", data);
        const { categories } = JSON.parse(data);
        //console.log("Parsed categories:", categories);
        const loopRecursive = async (categories) => {
            for (let i = 0; i < categories.length; i++) {
                const category = categories[i];
                for (let j = 0; j < category.products.length; j++) {
                    const product = category.products[j];
                    //console.log("Product details:", product);
                    if (parseInt(product.ALBEDOstock) < parseInt(product.ALBEDOstock_minimo)) {
                        refillProductList.push(product);
                    }
                }
                if (category.subCategories && category.subCategories.length > 0) {
                    console.log("Subcategories:", category.subCategories);
                    await loopRecursive(category.subCategories);
                }
            }
        };
        await loopRecursive(categories);
        if (refillProductList.length === 0) {
            console.log("No products need refilling.");
            return []; // Return an empty array if no products need refilling
        }
        return refillProductList; // Return the array of products needing refilling
    } catch (error) {
        console.log("Error:", error.message);
        return []; // Return an empty array on error
    }
}
export async function getFeaturedProducts() {
    try {
        const productList = [];
        console.log("File path:", filePath);
        const data = await fs.readFile(filePath, 'utf8');
        //console.log("File content:", data);
        const { categories } = JSON.parse(data);
        //console.log("Parsed categories:", categories);
        const loopRecursive = async (categories) => {
            for (let i = 0; i < categories.length; i++) {
                const category = categories[i];
                for (let j = 0; j < category.products.length; j++) {
                    const product = category.products[j];
                    //console.log("Product details:", product);
                    if (product.isFeatured) {
                        productList.push(product);
                    }
                }
                if (category.subCategories && category.subCategories.length > 0) {
                    console.log("Subcategories:", category.subCategories);
                    await loopRecursive(category.subCategories);
                }
            }
        };
        await loopRecursive(categories);
        if (productList.length === 0) {
            console.log("No products need refilling.");
            return []; // Return an empty array if no products need refilling
        }
        return productList; // Return the array of products needing refilling
    } catch (error) {
        console.log("Error:", error.message);
        return []; // Return an empty array on error
    }
}
export async function getProducts() {
    try {
        const productList = [];
        // const filePath = "/path/to/your/file.json"; // Define your file path here
        const data = await fs.readFile(filePath, 'utf8');
        const { categories } = JSON.parse(data);
        const loopRecursive = async (categories) => {
            for (let i = 0; i < categories.length; i++) {
                const category = categories[i];
                for (let j = 0; j < category.products.length; j++) {
                    const product = category.products[j];
                    // Filter products based on the search term (in title or other properties)
                    if (product.ALBEDOprecio) {
                        productList.push(product);
                    }
                }
                if (category.subCategories && category.subCategories.length > 0) {
                    await loopRecursive(category.subCategories);
                }
            }
        };
        await loopRecursive(categories);
        return productList.length > 0 ? productList : []; // Return filtered products or an empty array
    } catch (error) {
        console.log("Error:", error.message);
        return []; // Return an empty array on error
    }
}
export async function getFiltersListProducts(categoryFilter = '', refillStock) {
    const content = await requireContent();
    const { categories } = content;
    if (refillStock) {
        try {
            const data = await fs.readFile(filePath, 'utf8');
            const { categories } = JSON.parse(data);
            const loopRecursive = async (categories) => {
                for (let i = 0; i < categories.length; i++) {
                    const category = categories[i];
                    for (let j = 0; j < category.products.length; j++) {
                        const product = category.products[j];
                        if (product.ALBEDOstock < product.ALBEDOstock_minimo) {
                            filteredProductList.push(product);
                            return true;
                        }
                    }
                    if (category.subCategories && category.subCategories.length > 0) {
                        const subcategoryDeleted = await loopRecursive(category.subCategories);
                        if (subcategoryDeleted) return true;
                    }
                }
                return false;
            };
            const product = await loopRecursive(categories);
            if (!product) {
                return false;
            }
            console.log(JSON.stringify(filteredProductList));
            return true;
        } catch (error) {
            console.log("Error:", error);
            return false;
        }
    } else {
        const filteredCategories = categories.filter(category => {
            if (categoryFilter && category.name !== categoryFilter) {
                return false;
            }
            return true;
        });
        filteredProductList = filteredCategories;
    }
    revalidatePath('/admin/list');
}
export async function searchFilter(searchTerm, searchBy) {
    console.log(searchTerm, searchBy);
    const products = await getProducts();  // Assuming this function fetches categories and products 
    let searchedList = []; 
    try {
        // Filter products based on the search term and searchBy criteria
        products.filter((product) => {
            // Example filtering logic; adjust according to your requirements
            if (searchBy === "name") {
                return product.ALBEDOtitulo.toLowerCase().includes(searchTerm.toLowerCase());
            } else if (searchBy === "id") {
                return product.ALBEDOcodigo.toLowerCase().includes(searchTerm.toLowerCase());
            }
            return false;  // Default case if searchBy doesn't match
        }).forEach((product) => {
            // console.log(product);
            
            searchedList.push(product);
        }); 
        // revalidatePath("/admin/buscador")
        console.log(searchedList);
        
        return searchedList;  // Return the array of filtered products
    } catch (error) {
        console.error("Error:", error);
        return [];  // Return an empty array if there was an error
    }
}


// Function to return the filtered list on the client side
export async function searchFilterList() {
    console.log(searchedList);
    revalidatePath('/admin/buscador');
    return searchedList;  // Return the searched list
}
export async function getParameters() {
    try {
        const data = await readFile(filePathParameters, 'utf8');
        const jsonData = JSON.parse(data);
        delete jsonData.Password; // Remove the "Password" field 
        return jsonData;
    } catch (error) {
        console.error("Error getting Parameters:", error);
        return [];
    }
}
export async function getShippingPrices() {
    try {
        const data = await getParameters();
        delete data.Password; // Remove the "Password" field if it exists
        const { EnvioES, EnviosUE, EnviosINT } = data;
        return { EnvioES, EnviosUE, EnviosINT }; // Return only shipping-related data
    } catch (error) {
        console.error("Error getting shipping prices:", error);
        return {}; // Return an empty object or handle the error as needed
    }
}
export async function getIBAN() {
    try {
        const data = await getParameters();
        delete data.Password; // Remove the "Password" field if it exists
        const { IBAN } = data;
        return { IBAN }; // Return only shipping-related data
    } catch (error) {
        console.error("Error getting shipping prices:", error);
        return {}; // Return an empty object or handle the error as needed
    }
}
export async function getIVA() {
    try {
        const data = await getParameters();
        delete data.Password; // Remove the "Password" field if it exists
        const { IVA } = data;
        return { IVA }; // Return only shipping-related data
    } catch (error) {
        console.error("Error getting shipping prices:", error);
        return {}; // Return an empty object or handle the error as needed
    }
}
export async function updateafsadfsafsf(hgjfgjgjgjh, asdfasfvcxz) {
    try {
        // Read data from file
        const data = await readFile(filePathParameters, 'utf8');
        const jsonData = JSON.parse(data);
        // Check if the current password matches the stored password
        if (hgjfgjgjgjh !== jsonData.icsdbcisbvcs) {
            throw new Error("It does not match.");
        }
        // Update the password
        jsonData.icsdbcisbvcs = asdfasfvcxz;
        // Write the updated JSON back to the file
        await writeFile(filePathParameters, JSON.stringify(jsonData, null, 2));
        return true;
    } catch (error) {
        throw new Error("Error updating password: " + error.message);
    }
}
export async function updateShippingPrices(spainPrice, euPrice, internationalPrice) {
    try {
        // Read data from file
        const data = await readFile(filePathParameters, 'utf8');
        const jsonData = JSON.parse(data);
        jsonData.EnvioES = spainPrice || 0;
        jsonData.EnviosUE = euPrice || 0;
        jsonData.EnviosINT = internationalPrice || 0;
        // Write the updated JSON back to the file
        await writeFile(filePathParameters, JSON.stringify(jsonData, null, 2));
        return jsonData;
    } catch (error) {
        throw new Error("Error updating shipping prices: " + error.message);
    }
}
export async function updateIBAN(newIBAN) {
    try {
        // Read data from file
        const data = await readFile(filePathParameters, 'utf8');
        const jsonData = JSON.parse(data);
        // Update IBAN
        if (newIBAN !== 0 && newIBAN !== null && newIBAN !== undefined) {
            jsonData.IBAN = newIBAN;
        }
        // Write the updated JSON back to the file
        await writeFile(filePathParameters, JSON.stringify(jsonData, null, 2));
        return jsonData;
    } catch (error) {
        throw new Error("Error updating IBAN: " + error.message);
    }
}
export async function updateIVA(newIVA) {
    try {
        const data = await readFile(filePathParameters, 'utf8');
        const jsonData = JSON.parse(data);
        // Update the IVA field
        jsonData.IVA = newIVA || 0; // Use newIVA if it's not null or undefined, otherwise default to 0
        // Write the updated JSON back to the file
        await writeFile(filePathParameters, JSON.stringify(jsonData, null, 2));
        return jsonData;
    } catch (error) {
        console.error("Error updating IVA:", error);
        return null;
    }
}
/**
 * Deletes a category or a product based on provided IDs.
 * @param {object} categoryId - The ID of the category or product to be deleted.
 * @param {string} productId - The ID of the product to be deleted.
 * @returns {boolean} Indicates whether the deletion was successful.
 */
export async function deleteElement(categoryId, product) {
    try {
        const data = await fs.readFile(filePath, 'utf8'); // Load file data
        const { categories } = JSON.parse(data); // Parse JSON

        // Recursive function to delete a category
        const deleteCategoryRecursive = async (categoryList) => {
            for (let i = 0; i < categoryList.length; i++) {
                const category = categoryList[i];
                console.log(`Checking category with ID: ${category.id}`); // Debug log

                // Check if the category matches the categoryId
                if (category.id == categoryId.id) {
                    // Remove the category from the array
                    const deletedObject = categoryList.splice(i, 1)[0];
                    console.log(`Category deleted: ${JSON.stringify(deletedObject)}`); // Debug log
                    await fs.writeFile(filePath, JSON.stringify({ categories }));
                    revalidatePath('/admin/list');
                    return true; // Category successfully deleted
                }

                // If the category has subcategories, check them recursively
                if (category.subCategories && category.subCategories.length > 0) {
                    const subcategoryDeleted = await deleteCategoryRecursive(category.subCategories);
                    if (subcategoryDeleted) return true; // If a subcategory was deleted, return
                }
            }
            return false; // Category not found
        };

        // Recursive function to delete a product
        const deleteProductRecursive = async (categoryList) => {
            for (let i = 0; i < categoryList.length; i++) {
                const category = categoryList[i];

                // Check if the category has products
                if (category.products) {
                    for (let j = 0; j < category.products.length; j++) {
                        if (category.products[j].ALBEDOcodigo === product.ALBEDOcodigo) {
                            // Remove the product from the array
                            const deletedProduct = category.products.splice(j, 1)[0];
                            console.log(`Product deleted: ${JSON.stringify(deletedProduct)}`); // Debug log
                            await fs.writeFile(filePath, JSON.stringify({ categories }));
                            revalidatePath('/admin/list');
                            return true; // Product successfully deleted
                        }
                    }
                }

                // If the category has subcategories, check them recursively for products
                if (category.subCategories && category.subCategories.length > 0) {
                    const subcategoryDeleted = await deleteProductRecursive(category.subCategories);
                    if (subcategoryDeleted) return true; // If a product in a subcategory was deleted, return
                }
            }
            return false; // Product not found
        };

        // Determine whether we are deleting a category or a product
        if (categoryId !== "none") {
            const categoryDeleted = await deleteCategoryRecursive(categories);
            if (!categoryDeleted) {
                console.log("Category not found.");
                return false;
            }
            console.log("Category deleted successfully.");
            return true;
        } else if (product !== "none") {
            const productDeleted = await deleteProductRecursive(categories);
            if (!productDeleted) {
                console.log("Product not found.");
                return false;
            }
            console.log("Product deleted successfully.");
            return true;
        }
    } catch (error) {
        console.error("An error occurred:", error);
        return false;
    }
}


/**
 * Adds a new category with provided details to the product data.
 * @param {string} Code - The code of the new category.
 * @param {string} Url_Id - The URL ID of the new category.
 * @param {string} name - The name of the new category.
 * @param {string} description - The description of the new category.
 * @param {string} body - The body of the new category.
 * @param {boolean} isPublished - Whether the category is published.
 * @param {string} imageFile - The file path of the image for the category.
 * @param {string} pdfFile - The file path of the PDF for the category.
 * @returns {boolean} Indicates whether the addition was successful.
 */
export async function addCategory(Url_Id, name, description, body, isPublished, imagePaths) {
    //console.log("New subcategory: " + imagePaths);
    try {
        const data = await readFile(filePath, 'utf8');
        const jsonData = JSON.parse(data);
        const { categories } = jsonData;
        // Save image and pdf files to assets directory
        // const savedImageFilePath = await saveFileToAssets(imageFile, name + '_' + Url_Id + '_' + getFileIdNumber(100000, 10000000) + '.jpg');
        // const savedPdfFilePath = await saveFileToAssets(pdfFile, name + '_' + Url_Id + '.pdf');
        const newCategory = {
            "id": name.replace(/ /g, "-"),
            "url_Id": Url_Id,
            "fixedUrl": "",
            "name": name,
            "ALBEDOdescripcion": description,
            "ALBEDOcuerpo": body,
            "isPublished": isPublished,
            "FeachaDeCreacion": euFormattedDateTime,
            "FechaDeModificacion": euFormattedDateTime,
            "imagens": imagePaths,
            "subCategories": [],
            "products": [],
            // "imageFilePath": savedImageFilePath, // Store the path to the saved image file
            // "pdfFilePath": savedPdfFilePath // Store the path to the saved pdf file
        };
        categories.unshift(newCategory);
        await writeFile(filePath, JSON.stringify(jsonData));
        revalidatePath('/admin/list');
        // //console.log("Subcategory added successfully.");
        return true;
    } catch (error) {
        console.error("Error adding subcategory:", error);
        return false;
    }
}
/**
 * Adds a new subcategory to an existing category.
 * @param {object} categoryId - The ID of the category to which the subcategory will be added.
 * @param {string} Code - The code of the new subcategory.
 * @param {string} Url_Id - The URL ID of the new subcategory.
 * @param {string} newCategoryName - The name of the new subcategory.
 * @param {string} Description - The description of the new subcategory.
 * @param {string} Body - The body of the new subcategory.
 * @param {boolean} isPublished - Whether the subcategory is published.
 * @returns {boolean} Indicates whether the addition was successful.
 */
export async function addSubcategory(categoryId, subCategoryData) {
    // // //console.log("Adding subcategory to " + categoryId.categoryId.id);
    // // //console.log(" subcategory name " + newCategoryName);
    try {
        const data = await fs.readFile(filePath, 'utf8');
        const { categories, deletedContent } = JSON.parse(data);
        const categoryToModifyId = categoryId.id;
        const addSubcategoryRecursive = async (categoryList) => {
            for (let i = 0; i < categoryList.length; i++) {
                const category = categoryList[i];
                // // //console.log("Checking category:", category);
                if (category.id === categoryToModifyId) {
                    // // //console.log("Category found:", category);
                    if (!category.subCategories) {
                        category.subCategories = [];
                    }
                    const dataObj = {
                        "id": subCategoryData.newCategoryName.replace(/ /g, "-"),
                        "url_Id": subCategoryData.newCategoryUrlCode,
                        "name": subCategoryData.newCategoryName,
                        "description": subCategoryData.newCategoryDescription,
                        "ALBEDOcuerpo": subCategoryData.newCategoryBody,
                        "isPublished": false,
                        "imagens": subCategoryData.imagePaths,
                        "FeachaDeCreacion": euFormattedDateTime,
                        "FechaDeModificacion": euFormattedDateTime,
                        "subCategories": [],
                        "products": []
                    }
                    category.subCategories.unshift(dataObj);
                    // //console.log("New subcategory added:", dataObj);
                    // //console.log("Writing updated data to file...");
                    await fs.writeFile(filePath, JSON.stringify({ categories, deletedContent }));
                    // //console.log("Data written successfully.");
                    revalidatePath('/admin/list');
                    // //console.log("Path revalidated.");
                    return true;
                }
                if (category.subCategories && category.subCategories.length > 0) {
                    // //console.log("Checking subcategories of:", category);
                    const subcategoryAdded = await addSubcategoryRecursive(category.subCategories);
                    if (subcategoryAdded) return true;
                }
            }
            return false;
        };
        // //console.log("Starting adding subcategory process...");
        const subcategoryAdded = await addSubcategoryRecursive(categories);
        if (!subcategoryAdded) {
            // //console.log("Category not found.");
            return false;
        }
        // //console.log("Subcategory added successfully.");
        return true;
    } catch (error) {
        console.error("Error adding subcategory:", error);
        return false;
    }
}
/**
 * Adds a new product to an existing category.
 * @param {object} categoryId - The ID of the category to which the product will be added.
 * @param {string} productCode - The code of the new product.
 * @param {string} Url_Id - The URL ID of the new product.
 * @param {string} Name - The name of the new product.
 * @param {string} Price - The price of the new product.
 * @param {string} Description - The description of the new product.
 * @param {string} Body - The body of the new product.
 * @param {number} Stock - The stock quantity of the new product.
 * @param {number} MinStock - The minimum stock quantity of the new product.
 * @param {string} DeliveryTime - The delivery time of the new product.
 * @param {boolean} isPublished - Whether the product is published.
 * @returns {boolean} Indicates whether the addition was successful.
 */
export async function addproduct(categoryId, productData) {
    //console.log("New product:" +  JSON.stringify(productData));
    //console.log(productData.imagePaths);
    try {
        const data = await fs.readFile(filePath, 'utf8');
        const { categories, deletedContent } = JSON.parse(data);
        const categoryToModifyId = categoryId.id;
        const addProductRecursive = async (categoryList) => {
            for (let i = 0; i < categoryList.length; i++) {
                const category = categoryList[i];
                if (category.id === categoryToModifyId) {
                    // //console.log("Category found:", category);
                    if (!category.products) {
                        category.products = [];
                    }
                    //console.log(productData.relatedFilePaths);
                    const dataObj = {
                        "ALBEDOcodigo": productData.newProductCode,  //productCode.replace(/ /g, "-"),
                        "url_Id": productData.newProductUrlCode,
                        "ALBEDOtitulo": productData.newProductName,
                        "ALBEDOprecio": parseFloat(productData.newProductPrice),
                        "ALBEDOdescripcion": productData.newProductDescription,
                        "ALBEDOcuerpo": productData.newProductBody,
                        "ALBEDOstock": parseInt(productData.newProductStock, 10), // Convert to integer
                        "ALBEDOstock_minimo": parseInt(productData.newProductMinStock, 10), // Convert to integer
                        "isPublished": false,
                        "FeachaDeCreacion": euFormattedDateTime,
                        "FechaDeModificacion": euFormattedDateTime,
                        "imagens": productData.imagePaths,
                        "archivos": productData.relatedFilePaths,
                        "ALBEDOplazo_entrega": productData.newProductDeliveryTime
                    }
                    category.products.push(dataObj);
                    // //console.log("New product added:", dataObj);
                    // //console.log("Writing updated data to file...");
                    await fs.writeFile(filePath, JSON.stringify({ categories, deletedContent }));
                    // //console.log("Data written successfully.");
                    revalidatePath('/admin/list');
                    // //console.log("Path revalidated.");
                    return true;
                }
                if (category.subCategories && category.subCategories.length > 0) {
                    // //console.log("Checking products in subcategories of:", category.subCategories);
                    const productAdded = await addProductRecursive(category.subCategories);
                    if (productAdded) return true;
                }
            }
            return false;
        };
        // //console.log("Starting adding product process...");
        const productAdded = await addProductRecursive(categories);
        if (!productAdded) {
            // //console.log("Category not found.");
            return false;
        }
        // //console.log("product added successfully.");
        return true;
    } catch (error) {
        console.error("Error adding product:", error);
        return false;
    }
}
/**
 * Edits an existing product's details.
 * @param {string} productId - The ID of the product to be edited.
 * @param {string} productCode - The new code of the product.
 * @param {string} url_Id - The new URL ID of the product.
 * @param {string} Name - The new name of the product.
 * @param {string} Price - The new price of the product.
 * @param {string} Description - The new description of the product.
 * @param {string} Body - The new body of the product.
 * @param {number} Stock - The new stock quantity of the product.
 * @param {number} MinStock - The new minimum stock quantity of the product.
 * @param {string} DeliveryTime - The new delivery time of the product.
 * @param {boolean} isPublished - Whether the product is published.
 * @returns {boolean} Indicates whether the editing was successful.
 */
export async function editproduct(productId, url_Id, Name, Price, Description, Body, Stock, MinStock, DeliveryTime, isPublished, isFeatured, imagePaths, filePaths) {
    // console.log('called function editproduct' + JSON.stringify());
    try {
        const data = await fs.readFile(filePath, 'utf8');
        const { categories, deletedContent } = JSON.parse(data);
        const loopRecursive = async (categoryList) => {
            for (let i = 0; i < categoryList.length; i++) {
                const category = categoryList[i];
                for (let j = 0; j < category.products.length; j++) {
                    const product = category.products[j];
                    // //console.log(productId.productId);
                    if (product.ALBEDOcodigo === productId.ALBEDOcodigo) {
                        product.url_Id = url_Id;
                        product.ALBEDOtitulo = Name;
                        product.ALBEDOprecio = parseFloat(Price);
                        product.ALBEDOdescripcion = Description;
                        product.ALBEDOcuerpo = Body;
                        product.ALBEDOstock_minimo = MinStock;
                        product.ALBEDOstock = Stock;
                        product.FechaDeModificacion = euFormattedDateTime;
                        product.ALBEDOplazo_entrega = DeliveryTime;
                        product.isPublished = isPublished;
                        product.isFeatured = isFeatured;
                        product.imagens = imagePaths;
                        product.archivos = filePaths;
                        await fs.writeFile(filePath, JSON.stringify({ categories, deletedContent }));
                        revalidatePath('/admin/list');
                        return true;
                    }
                }
                if (category.subCategories && category.subCategories.length > 0) {
                    const subcategoryDeleted = await loopRecursive(category.subCategories);
                    if (subcategoryDeleted) return true;
                }
            }
            return false;
        };
        //console.log("Starting saving process...");
        const product = await loopRecursive(categories);
        if (!product) {
            //console.log("product not found.");
            return false;
        }
        //console.log("product saved successfully.");
        return true;
    } catch (error) {
        //console.log("Error:", error);
        return false;
    }
}
/**
 * Edits an existing category's details.
 * @param {object} categoryId - The ID of the category to be edited.
 * @param {string} Code - The new code of the category.
 * @param {string} Name - The new name of the category.
 * @param {string} Description - The new description of the category.
 * @param {string} Body - The new body of the category.
 * @param {boolean} isPublished - Whether the category is published.
 * @returns {boolean} Indicates whether the editing was successful.
 */
export async function editCategory(categoryId, UrlCode, Name, Description, Body, isPublished, imagePaths) {
    //console.log('called function editCategory');
    try {
        const data = await fs.readFile(filePath, 'utf8');
        const { categories, deletedContent } = JSON.parse(data);
        const loopRecursive = async (categoryList) => {
            for (let i = 0; i < categoryList.length; i++) {
                const category = categoryList[i];
                if (category.id === categoryId) {
                    // Update the category properties
                    // category.id = Code;
                    category.name = Name;
                    category.url_Id = UrlCode;
                    category.ALBEDOdescripcion = Description;
                    category.ALBEDOcuerpo = Body;
                    category.isPublished = isPublished;
                    category.imagens = imagePaths;
                    category.FechaDeModificacion = euFormattedDateTime;
                    // Update publishing status of products in the current category
                    await updateProductsPublishingStatus(category.products, isPublished);
                    // If the category has children, update their publishing status recursively
                    if (category.subCategories && category.subCategories.length > 0) {
                        await updateChildrenPublishingStatus(category.subCategories, isPublished);
                    }
                    // Write the updated JSON data to the file
                    await fs.writeFile(filePath, JSON.stringify({ categories, deletedContent }));
                    revalidatePath('/admin/list');
                    return true;
                }
                if (category.subCategories && category.subCategories.length > 0) {
                    const subcategorySaved = await loopRecursive(category.subCategories);
                    if (subcategorySaved) return true;
                }
            }
            return false;
        };
        const updateChildrenPublishingStatus = async (children, parentIsPublished) => {
            for (let i = 0; i < children.length; i++) {
                const child = children[i];
                // Update the publishing status of the child based on the parent's publishing status
                child.isPublished = parentIsPublished;
                child.FechaDeModificacion = euFormattedDateTime;
                // Update publishing status of products in the current category
                await updateProductsPublishingStatus(child.products, parentIsPublished);
                // If the child has children, update their publishing status recursively
                if (child.subCategories && child.subCategories.length > 0) {
                    await updateChildrenPublishingStatus(child.subCategories, parentIsPublished);
                }
            }
        };
        const updateProductsPublishingStatus = async (products, publishingStatus) => {
            for (let i = 0; i < products.length; i++) {
                const product = products[i];
                product.isPublished = publishingStatus;
                product.FechaDeModificacion = euFormattedDateTime;
            }
        };
        const categorySaved = await loopRecursive(categories);
        if (!categorySaved) {
            return false;
        }
        return true;
    } catch (error) {
        console.error("Error editing category:", error);
        return false;
    }
}
export async function getCategoryById(categoryId) {
    // Check if the categoryId is provided and has an id field 
    try {
        if (!categoryId || !categoryId.id) {
            throw new Error("Invalid categoryId");
        }
        // Log the category ID to be searched for 
        // console.log("Searching for category with ID:", categoryId.categoryId.id);
        // Read the contents of the JSON file
        const data = await fs.readFile(filePath, 'utf8');
        // Parse the JSON file contents into JavaScript object
        const { categories } = JSON.parse(data);
        // Get the category ID to be searched for 
        // Recursive function to search for a category by ID in the given category list
        const Recursive = async (categoryList) => {
            // Loop through the category list 
            for (let i = 0; i < categoryList.length; i++) {
                const category = categoryList[i];
                // If the category ID matches, return the category and its data
                if (category.id === categoryId.id) {
                    revalidatePath('/admin/ListPr');
                    return category; // Return category and its data
                }
                // If the category has subcategories, search for the ID within those subcategories
                if (category.subCategories && category.subCategories.length > 0) {
                    const subcategory = await Recursive(category.subCategories);
                    // // console.log("subCat found in back: "+ JSON.stringify(category));
                    if (subcategory) return subcategory;
                }
            }
            return false;
        };
        const categoryFound = await Recursive(categories);
        if (!categoryFound) {
            // console.log("Category not found.");
            return false;
        }
        return categoryFound; // Return the found category along with its data
    } catch (error) {
        console.error("Error occurred:", error);
        return false;
    }
}
export async function duplicateProduct(category, product) {
    try {
        const data = await fs.readFile(filePath, 'utf8');
        const { categories, deletedContent } = JSON.parse(data);
        const categoryToModifyId = category.id;
        // Function to find the highest url_Id and increment it
        const findNextUniqueUrlId = (categoryProducts) => {
            const existingUrlIds = categoryProducts.map(p => parseInt(p.url_Id, 10)).filter(id => !isNaN(id));
            const maxUrlId = existingUrlIds.length ? Math.max(...existingUrlIds) : 0;
            return String(maxUrlId + 1).padStart(3, '0'); // Increment and pad with zeros
        };
        const addProductRecursive = async (categoryList) => {
            for (let i = 0; i < categoryList.length; i++) {
                const category = categoryList[i];
                if (category.id === categoryToModifyId) {
                    if (!category.products) {
                        category.products = [];
                    }
                    // Get the next unique url_Id
                    const nextUrlId = findNextUniqueUrlId(category.products);
                    const dataObj = {
                        "ALBEDOcodigo": product.ALBEDOcodigo + "(copia)",  //productCode.replace(/ /g, "-"),
                        "url_Id": nextUrlId,
                        "ALBEDOtitulo": product.ALBEDOtitulo + "(copia)",
                        "ALBEDOprecio": product.ALBEDOprecio,
                        "ALBEDOdescripcion": product.ALBEDOdescripcion,
                        "ALBEDOcuerpo": product.ALBEDOcuerpo,
                        "ALBEDOstock_minimo": product.ALBEDOstock_minimo,
                        "ALBEDOstock": product.ALBEDOstock,
                        "isPublished": product.isPublished,
                        "FeachaDeCreacion": euFormattedDateTime,
                        "FechaDeModificacion": euFormattedDateTime,
                        "imagens": product.imagens,
                        "archivos": product.archivos,
                        "ALBEDOplazo_entrega": product.ALBEDOplazo_entrega
                    };
                    category.products.push(dataObj);
                    await fs.writeFile(filePath, JSON.stringify({ categories, deletedContent }));
                    revalidatePath('/admin/list');
                    return true;
                }
                if (category.subCategories && category.subCategories.length > 0) {
                    const productAdded = await addProductRecursive(category.subCategories);
                    if (productAdded) return true;
                }
            }
            return false;
        };
        const productAdded = await addProductRecursive(categories);
        if (!productAdded) {
            return false;
        }
        return true;
    } catch (error) {
        console.error("Error duplicating product:", error);
        return false;
    }
}
/**
 * Returns the category data based on the given URL IDs.
 * @param {string[]} slugIds - The array of URL IDs.
 * @returns {Category | { subCategory: Category, products: Product[] }} - The category data.
 */
export async function getDataByUrlId(slugIds) {
    try {
        // Read the JSON file
        const data = await fs.readFile(filePath, 'utf8');
        const { categories } = JSON.parse(data);
        // Check if slugIds is provided and is a valid array
        if (!Array.isArray(slugIds) || slugIds.length === 0) {
            throw new Error("Invalid slugIds");
        }
        let currentData = categories; // Start from the top level of categories
        // Iterate through each ID in the slugIds except the last one
        for (let i = 0; i < slugIds.length - 1; i++) {
            const id = slugIds[i];
            // Find the category with the current ID in the currentData
            const category = currentData.find(cat => cat.url_Id === id);
            if (!category) {
                throw new Error(`Category with ID ${id} not found`);
            }
            // If the category has subcategories, update currentData to the subcategories
            if (category.subCategories && category.subCategories.length > 0) {
                currentData = category.subCategories;
            } else {
                // If there are no subcategories, return the current category
                revalidatePath('/admin/list');
                return category;
            }
        }
        // Get the last ID in slugIds
        const lastId = slugIds[slugIds.length - 1];
        // Find the category with the last ID in the currentData
        const lastCategory = currentData.find(cat => cat.url_Id === lastId);
        if (!lastCategory) {
            throw new Error(`Category with ID ${lastId} not found`);
        }
        // Check if the last category has products
        if (lastCategory.products && lastCategory.products.length > 0) {
            // Return the last subcategory and its products
            return { subCategory: lastCategory, products: lastCategory.products };
        } else {
            // Return only the last subcategory
            return { subCategory: lastCategory };
        }
        // //console.log(JSON.stringify(lastCategory));
        return lastCategory;
    } catch (error) {
        console.error("Error occurred:", error);
        return false;
    }
}
//function to save new orders on checkout page
/**
 * Saves a new order to the system.
 * @param {Object} orderData - The data of the new order.
 * @returns {boolean} Indicates whether the addition was successful.
 */
export async function saveNewOrder(orderData) {
    console.log('Order Data:', orderData);
    try {
        // console.log('Reading file:', filePathActiveOrders);
        const data = await fs.readFile(filePathActiveOrders, 'utf8');
        //console.log('File content:', data);
        const jsonData = JSON.parse(data);
        // console.log('Parsed JSON:', jsonData);
        if (!jsonData.ClientOrders) {
            //console.log('ClientOrders does not exist, creating an empty array.');
            jsonData.ClientOrders = [];
        }
        if (!Array.isArray(jsonData.ClientOrders)) {
            throw new Error('ClientOrders is not an array');
        }
        // console.log('Current ClientOrders:', jsonData.ClientOrders);
        const orderDataWithState = {
            ...orderData,
            orderState: 'Pendiente',
            createdAt: euFormattedDateTime
        };
        // console.log('Order data with state:', orderDataWithState);
        jsonData.ClientOrders.unshift(orderDataWithState);
        // console.log('Updated ClientOrders:', jsonData.ClientOrders);
        await fs.writeFile(filePathActiveOrders, JSON.stringify(jsonData, null, 2), 'utf8');
        await sendEmail(orderData);
        await updateStock(orderData);
        // console.log('Email sent.');
        revalidatePath('/admin/orders');
        // console.log('Path revalidated.');
        // console.log('Order saved successfully.');
        return true;
    } catch (error) {
        console.error('Error saving new Client Order:', error);
        return false;
    }
}
export async function updateStock(orderData) {
    try {
        const data = await fs.readFile(filePath, 'utf8');
        const { categories } = JSON.parse(data);
        if (!orderData || !orderData.cartProducts || orderData.cartProducts.length === 0) {
            console.log("product not available");
            return false;
        }
        const updateStockRecursive = async (categoryList) => {
            for (let category of categoryList) {
                for (let product of category.products) {
                    const cartProduct = orderData.cartProducts.find(cp => cp.ALBEDOcodigo === product.ALBEDOcodigo);
                    if (cartProduct) {
                        product.ALBEDOstock -= cartProduct.quantity;
                        await fs.writeFile(filePath, JSON.stringify({ categories }, null, 2));
                        revalidatePath('/admin/list');
                        return true;
                    }
                }
                if (category.subCategories && category.subCategories.length > 0) {
                    const subcategoryUpdated = await updateStockRecursive(category.subCategories);
                    if (subcategoryUpdated) return true;
                }
            }
            return false;
        };
        const productUpdated = await updateStockRecursive(categories);
        if (!productUpdated) {
            console.log("product not found.");
            return false;
        }
        console.log("product saved successfully.");
        return true;
    } catch (error) {
        console.error("Error:", error);
        return false;
    }
}
export async function checkStock(orderData) {
    try {
        const data = await fs.readFile(filePath, 'utf8');
        const { categories } = JSON.parse(data);
        if (!orderData || !orderData.cartProducts || orderData.cartProducts.length === 0) {
            console.log("No products in the cart.");
            return [];
        }
        const stockList = [];
        const updateStockRecursive = (categoryList) => {
            for (let category of categoryList) {
                for (let product of category.products) {
                    const cartProduct = orderData.cartProducts.find(cp => cp.ALBEDOcodigo === product.ALBEDOcodigo);
                    if (cartProduct) {
                        stockList.push({
                            ALBEDOcodigo: product.ALBEDOcodigo,
                            availableStock: product.ALBEDOstock,
                            quantity: cartProduct.quantity,
                            ALBEDOtitulo: product.ALBEDOtitulo
                        });
                    }
                }
                if (category.subCategories && category.subCategories.length > 0) {
                    updateStockRecursive(category.subCategories);
                }
            }
        };
        updateStockRecursive(categories);
        if (stockList.length === 0) {
            console.log("No matching products found.");
            return [];
        }
        console.log("Stock check completed successfully.");
        return stockList;
    } catch (error) {
        console.error("Error:", error);
        return [];
    }
}
export async function sendEmail(orderData) {
    try {
        // Validate orderData
        if (!orderData || !orderData.userInfo || !orderData.cartProducts || !orderData.selectedShipping) {
            throw new Error("Invalid order data");
        }
        const { userInfo: customerDetails, cartProducts: products, selectedShipping: shippingDetails } = orderData;
        let productsText = '';
        products.forEach(product => {
            productsText += `
                Código del Producto: ${product.ALBEDOcodigo}
                Título del Producto: ${product.ALBEDOtitulo}
                Descripción: ${product.ALBEDOdescripcion.replace(/<[^>]*>?/gm, '')}
                Precio: ${product.ALBEDOprecio} EUR
                Cantidad Pedida: ${product.quantity} 
                \n`;
        });
        // Compose email text for owner and client
        const emailTextOwner = `
            Información del Pedido:
            Detalles del Cliente:
            - Nombre: ${customerDetails.firstName}
            - Apellidos: ${customerDetails.lastName}
            - DNI: ${customerDetails.dni}
            - Fecha de Nacimiento: ${customerDetails.dateOfBirth || '[No proporcionado]'}
            - Empresa: ${customerDetails.company}
            - CIF: ${customerDetails.cif || '[No proporcionado]'}
            - Número de Teléfono: ${customerDetails.phoneNumber}
            - Correo Electrónico: ${customerDetails.email}
            - Dirección: ${customerDetails.address}
            - Ciudad: ${customerDetails.city}
            - Provincia: ${customerDetails.province}
            - Código Postal: ${customerDetails.zipCode}
            - Solicitud de Factura: ${customerDetails.invoice ? 'Sí' : 'No'}
            Detalles del Pedido:
            ${productsText}
            Información de Envío:
            - Método de Envío: ${shippingDetails.method}
            - Precio del Envío: ${shippingDetails.price} EUR
            Información de Pago:
            - Método de Pago: ${orderData.selectedPayment}
            Monto Total del Pedido: ${orderData.totalPedido} EUR
            Factura Requerida: ${orderData.invoice ? 'Sí' : 'No'}
        `;
        const emailTextClient = `
            Información del Pedido: 
            ${productsText}
            Información de Envío:
            - Método de Envío: ${shippingDetails.method}
            - Precio del Envío: ${shippingDetails.price} EUR
            Información de Pago:
            - Método de Pago: ${orderData.selectedPayment}
            Monto Total del Pedido: ${orderData.totalPedido} EUR
            Factura Requerida: ${orderData.invoice ? 'Sí' : 'No'}
        `;
        console.log(process.env.SENDER);
        console.log(customerDetails.email);
        // Define mail options
        const mailOptionsOwner = {
            from: process.env.SENDER,
            to: process.env.SENDER,
            subject: "Detalles del pedido realizado",
            text: emailTextOwner,
        };
        const mailOptionsClient = {
            from: process.env.SENDER,
            to: customerDetails.email,
            subject: "Detalles del pedido",
            text: emailTextClient,
        };
        // Send emails
        const infoOwner = await transporter.sendMail(mailOptionsOwner);
        const infoClient = await transporter.sendMail(mailOptionsClient);
        console.log("Email Sent:", infoOwner.response, infoClient.response);
        return true;
    } catch (error) {
        console.error("Error sending email:", error.message);
        if (error.responseCode === 535) {
            console.error("Invalid login. Please check your email and password.");
        }
        return false;
    }
}
//functions to /admin/orders
/**
 * Retrieves all orders.
 * @returns {Array} An array of order objects.
 */
export async function getAllActiveOrders() {
    try {
        const data = await readFile(filePathActiveOrders, 'utf8');
        const jsonData = JSON.parse(data);
        const { ClientOrders } = jsonData;
        revalidatePath('/admin/orders');
        return ClientOrders;
    } catch (error) {
        console.error("Error getting all Client Orders:", error);
        return [];
    }
}
export async function getAllInactiveOrders() {
    try {
        const data = await readFile(filePathInactiveOrders, 'utf8');
        const jsonData = JSON.parse(data);
        const { InactiveOrders } = jsonData;
        revalidatePath('/admin/orders');
        return InactiveOrders;
    } catch (error) {
        console.error("Error getting all Client Orders:", error);
        return [];
    }
}
//to get individual order by id to get the state of the order for teh client
/**
 * Retrieves an order based on its index.
 * @param {number} orderIndex - The index of the order to retrieve.
 * @returns {Object | null} The order data, or null if not found.
 */
export async function getActiveOrderByIndex(orderIndex) {
    try {
        const data = await readFile(filePathActiveOrders, 'utf8');
        const jsonData = JSON.parse(data);
        const { ClientOrders } = jsonData;
        if (orderIndex < 0 || orderIndex >= ClientOrders.length) {
            throw new Error("Invalid order index");
        }
        revalidatePath('/admin/orders');
        return ClientOrders[orderIndex];
    } catch (error) {
        console.error("Error getting order by index:", error);
        return null;
    }
}
export async function getInactiveOrderByIndex(orderIndex) {
    try {
        const data = await readFile(filePathInactiveOrders, 'utf8');
        const jsonData = JSON.parse(data);
        const { InactiveOrders } = jsonData;
        if (orderIndex < 0 || orderIndex >= InactiveOrders.length) {
            throw new Error("Invalid order index");
        }
        revalidatePath('/admin/orders');
        return InactiveOrders[orderIndex];
    } catch (error) {
        console.error("Error getting order by index:", error);
        return null;
    }
}
//to update the state of the order in the Modal
/**
 * Updates the state of an order.
 * @param {number} orderId - The ID of the order to update.
 * @param {string} newState - The new state of the order.
 * @returns {boolean} Indicates whether the update was successful.
 */
export async function updateActiveOrder(orderId, newState) {
    if (newState === 'Cancelado' || newState === 'Facturado') {
        //console.log('Update active order: moving to inactive JSON');
        try {
            const inactiveData = await readFile(filePathInactiveOrders, 'utf8');
            const activeData = await readFile(filePathActiveOrders, 'utf8');
            const inactiveJsonData = JSON.parse(inactiveData);
            const activeJsonData = JSON.parse(activeData);
            const { InactiveOrders } = inactiveJsonData;
            const { ClientOrders } = activeJsonData;
            const orderToUpdate = ClientOrders[orderId];
            if (!orderToUpdate) {
                throw new Error("Order not found in ActiveOrders.");
            }
            orderToUpdate.orderState = newState;
            //console.log(orderId);
            ClientOrders.splice(orderId, 1);
            // Add the updated order object to InactiveOrders
            InactiveOrders.push(orderToUpdate);
            // Write changes back to files
            await Promise.all([
                await writeFile(filePathInactiveOrders, JSON.stringify({ InactiveOrders })),
                await writeFile(filePathActiveOrders, JSON.stringify({ ClientOrders }))
            ]);
            revalidatePath('/admin/orders');
            return true;
        } catch (error) {
            console.error("Error updating active order state:", error);
            return false;
        }
    } else {
        //console.log('Update active order: staying in the same JSON');
        try {
            const data = await readFile(filePathActiveOrders, 'utf8');
            const jsonData = JSON.parse(data);
            const { ClientOrders } = jsonData;
            ClientOrders[orderId].orderState = newState;
            await writeFile(filePathActiveOrders, JSON.stringify(jsonData));
            return true;
        } catch (error) {
            //console.log(error);
            return false;
        }
    }
}
export async function updateInactiveOrder(orderId, newState) {
    if (newState === 'Pendiente' || newState === 'Confirmado' || newState === 'Procesando' || newState === 'Enviado') {
        //console.log('Update inactive order: moving to active JSON');
        try {
            const inactiveData = await readFile(filePathInactiveOrders, 'utf8');
            const activeData = await readFile(filePathActiveOrders, 'utf8');
            const inactiveJsonData = JSON.parse(inactiveData);
            const activeJsonData = JSON.parse(activeData);
            const { InactiveOrders } = inactiveJsonData;
            const { ClientOrders } = activeJsonData;
            const orderToUpdate = InactiveOrders[orderId];
            if (!orderToUpdate) {
                throw new Error("Order not found in InactiveOrders.");
            }
            orderToUpdate.orderState = newState;
            //console.log(orderId);
            InactiveOrders.splice(orderId, 1);
            // Add the updated order object to ActiveOrders
            ClientOrders.push(orderToUpdate);
            // Write changes back to files
            await Promise.all([
                await writeFile(filePathInactiveOrders, JSON.stringify({ InactiveOrders })),
                await writeFile(filePathActiveOrders, JSON.stringify({ ClientOrders }))
            ]);
            revalidatePath('/admin/orders');
            return true;
        } catch (error) {
            console.error("Error updating inactive order state:", error);
            return false;
        }
    } else {
        //console.log('Update inactive order: staying in the same JSON');
        try {
            const data = await readFile(filePathInactiveOrders, 'utf8');
            const jsonData = JSON.parse(data);
            const { InactiveOrders } = jsonData;
            InactiveOrders[orderId].orderState = newState;
            await writeFile(filePathInactiveOrders, JSON.stringify(jsonData));
            return true;
        } catch (error) {
            //console.log(error);
            return false;
        }
    }
}
export async function deleteOrder(index) {
    //console.log(index);
    try {
        //console.log("Reading file...");
        const data = await readFile(filePathInactiveOrders, 'utf8');
        //console.log("File read successfully.");
        //console.log("Parsing JSON...");
        const jsonData = JSON.parse(data);
        //console.log("JSON parsed successfully.");
        let { InactiveOrders } = jsonData;
        // Check if the index is valid
        if (index >= 0 && index < InactiveOrders.length) {
            //console.log("Deleting order at index:", index);
            // Splice the array to remove the order at the given index
            InactiveOrders.splice(index, 1);
            //console.log("Order deleted successfully.");
            //console.log("Writing to file...");
            await writeFile(filePathInactiveOrders, JSON.stringify(jsonData));
            //console.log("File updated successfully.");
            revalidatePath('/admin/orders');
            return true; // Return true to indicate successful deletion
        } else {
            console.error("Invalid index provided.");
            return false; // Return false to indicate failure
        }
    } catch (error) {
        console.error("An error occurred:", error);
        return false; // Return false to indicate failure
    }
}
export async function getHashPassword() {
    return new Promise((resolve, reject) => {
        const storedPassword = process.env.PASSWORD_HASH;
        if (storedPassword) {
            resolve(storedPassword);
        } else {
            reject(new Error("Stored password not found in environment variables."));
        }
    });
}
async function getStoredPassword() {
    // Fetch the stored password from your database or wherever it's stored
    // For now, returning a hardcoded password for demonstration
    try {
        // Read data from file
        const data = await readFile(filePathParameters, 'utf8');
        const jsonData = JSON.parse(data);
        // Write the updated JSON back to the file  
        return jsonData.icsdbcisbvcs;
    } catch (error) {
        throw new Error("Error updating password: " + error.message);
    }
}
export async function login(userInput) {
    try {
        const storedPassword = await getStoredPassword();
        if (userInput === storedPassword) {
            // Passwords match, generate token
            const token = generateToken();
            return { token };
        } else {
            return { error: 'Contraseña incorrecta. Inténtelo de nuevo.' };
        }
    } catch (error) {
        console.error('Error during login:', error);
        return { error: 'Error during login. Please try again.' };
    }
}
function generateToken() {
    const secretKey = getSecKey();
    const token = jwt.sign({ user: 'username' }, secretKey, { expiresIn: '1h' });
    return token;
}
function getSecKey() {
    const key = process.env.SECRET_KEY;
    if (key) {
        return key;
    } else {
        throw new Error("Stored secret key not found in environment variables.");
    }
}
export async function saveImage(base64Image) {
    const imageId = `${Date.now()}_${Math.floor(Math.random() * 1e9)}`;

    // Define your local path
    const localImagePath = path.join('/assets/images/', `${imageId}.jpg`);

    try {
        // Remove the data URI prefix
        const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, '');
        // Create a buffer from the base64 string
        const buffer = Buffer.from(base64Data, 'base64');

        // Write the buffer to the file locally
        await fs.writeFile(localImagePath, buffer);
        console.log('Image saved locally.');

        // // Generate a unique image ID
        // const remotePath = `/images/${imageId}.jpg`; // Define your remote server path with unique ID

        // // Upload the image using SCP (from local to remote)
        // const user = 'web_worker';
        // const host = 'blog.albedo.biz';
        // const remoteDest = `${user}@${host}:${remotePath}`;
        // const command = `scp ${localImagePath} ${remoteDest}`; // Corrected the command for upload

        // await execPromise(command);
        console.log('Image uploaded to server successfully.');

        // Return the URL of the uploaded image
        const imageUrl = `http://albedo.biz/images/${imageId}.jpg`; // Adjust as needed
        return imageUrl;

    } catch (error) {
        console.error('Error saving or uploading image:', error);
        throw error; // Re-throw the error to propagate it back
    }
}
export async function saveFile(fileData, filePath) {
    try {
        const base64Data = fileData.replace(/^data:\w+\/\w+;base64,/, '');
        const buffer = Buffer.from(base64Data, 'base64');
        await fs.writeFile(filePath, buffer);
        console.log(`File saved successfully at: ${filePath}`);
        return filePath;
    } catch (error) {
        console.error(`Error saving file at ${filePath}:`, error);
        throw error;
    }
}
export async function deleteImages(imagePathsToDelete) {
    return new Promise((resolve, reject) => {
        // Loop through each image path and delete it
        const deletePromises = imagePathsToDelete.map(imagePath => {
            //console.log(imagePath);
            return new Promise((resolveDelete, rejectDelete) => {
                // Delete the image file
                fs.unlink(imagePath, (err) => {
                    if (err) {
                        console.error('Error deleting image:', err);
                        rejectDelete(err);
                    } else {
                        console.log(`Image deleted successfully: ${imagePath}`);
                        resolveDelete();
                    }
                });
            });
        });
        // Resolve or reject the promise based on the completion of deletion
        Promise.all(deletePromises)
            .then(() => resolve())
            .catch(error => reject(error));
    });
}
