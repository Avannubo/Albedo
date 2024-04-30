"use server"
import { promises as fs } from 'fs';
import jwt from 'jsonwebtoken';
import Bcrypt from 'bcryptjs';
import { revalidatePath } from 'next/cache';
import { readFile, writeFile } from 'fs/promises';
import path from 'path';
const isLocal = typeof window === 'undefined'; // Check if not running in the browser (server-side)
const filePath = isLocal ? path.resolve('public/data/Products.json') : '/data/Products.json';
const filePathOrders = isLocal ? path.resolve('public/data/ClientOrders.json') : '/data/ClientOrders.json';
const filePathParameters = isLocal ? path.resolve('public/data/Parameters.json') : '/data/Parameters.json';
let cachedData = null;
let lastModifiedTime = null;
const currentdate = new Date();
const euFormattedDateTime = currentdate.getDate() + "/" + (currentdate.getMonth() + 1) + "/" + currentdate.getFullYear() + " " + (currentdate.getHours()) + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();
/**
 * Reads the content of a JSON file containing product data.
 * @returns {Object} The parsed JSON content of the file.
 */
export async function requireContent() {
    const stats = await fs.stat(filePath);
    if (stats.mtimeMs !== lastModifiedTime) {
        lastModifiedTime = stats.mtimeMs;
        const res = await fs.readFile(filePath, 'utf8');
        cachedData = JSON.parse(res);
    }
    return cachedData;
}
/**
 * Retrieves categories from the product data.
 * @returns {Array} An array of category objects.
 */
export async function getCategories() {
    const content = await requireContent();
    if (content) {
        const { categories } = content;
        return categories;
    } else {
        return []; // Return an empty array if categories don't exist
    }
}
export async function getParameters() {
    try {
        const data = await readFile(filePathParameters, 'utf8');
        const jsonData = JSON.parse(data);
        console.log(JSON.stringify(jsonData));
        return jsonData;
    } catch (error) {
        console.error("Error getting Parameters:", error);
        return [];
    }
}
export async function updatePassword(currentPassword, newPassword) {
    try {
        // Read data from file
        const data = await readFile(filePathParameters, 'utf8');
        const jsonData = JSON.parse(data);
        // Check if the current password matches the stored password
        if (currentPassword !== jsonData.Password) {
            throw new Error("Current password does not match.");
        }
        // Update the password
        jsonData.Password = newPassword;
        // Write the updated JSON back to the file
        await writeFile(filePathParameters, JSON.stringify(jsonData, null, 2));
        return jsonData;
    } catch (error) {
        throw new Error("Error updating password: " + error.message);
    }
}
export async function updateShippingPrices(spainPrice, euPrice, internationalPrice) {
    try {
        // Read data from file
        const data = await readFile(filePathParameters, 'utf8');
        const jsonData = JSON.parse(data);
        if (jsonData.EnvioEspaña !== spainPrice && euPrice !== 0 && euPrice !== null) {
            jsonData.EnvioEspaña = spainPrice;
        }
        if (jsonData.EnviosUE !== euPrice && euPrice !== 0 && euPrice !== null) {
            jsonData.EnviosUE = euPrice;
        }
        if (jsonData.EnviosInternacional !== internationalPrice && internationalPrice !== 0 && internationalPrice !== null) {
            jsonData.EnviosInternacional = internationalPrice;
        }
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
        if (newIVA !== 0 && newIVA !== null && newIVA !== undefined) {
            jsonData.IVA = newIVA;
        }
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
export async function deleteElement(categoryId) {
    if (categoryId.categoryId !== "none" || categoryId.productId !== "none") {
        try {
            const data = await fs.readFile(filePath, 'utf8');//call file
            const { categories, deletedContent } = JSON.parse(data);//get object  from json 
            if (categoryId.categoryId !== "none") {// if there is no cat Id the code will exit and return false
                const categoryToDeleteId = categoryId.categoryId.id; //save the catId in a var
                const deleteRecursive = async (categoryList) => {
                    for (let i = 0; i < categoryList.length; i++) {
                        const category = categoryList[i];
                        if (category.id === categoryToDeleteId) {
                            const deletedObject = categoryList.splice(i, 1)[0];
                            deletedContent.push(deletedObject);
                            await fs.writeFile(filePath, JSON.stringify({ categories, deletedContent }));
                            revalidatePath('/admin/categories');
                            return true;
                        }
                        if (category.subCategories && category.subCategories.length > 0) {
                            const subcategoryDeleted = await deleteRecursive(category.subCategories);
                            if (subcategoryDeleted) return true;
                        }
                    }
                    return false;
                };
                const categoryDeleted = await deleteRecursive(categories);
                if (!categoryDeleted) {
                    // console.log("Category not found.");
                    return false;
                }
                // console.log("Category deleted successfully.");
                return true;
            } else {
                const productToDelete = categoryId.productId.ALBEDOcodigo;
                const deleteRecursive = async (categoryList) => {
                    for (let i = 0; i < categoryList.length; i++) {
                        const category = categoryList[i];
                        for (let j = 0; j < category.products.length; j++) {
                            const product = category.products[j];
                            if (product.ALBEDOcodigo === productToDelete) {
                                const deletedObject = category.products.splice(j, 1)[0];
                                deletedContent.push(deletedObject);
                                await fs.writeFile(filePath, JSON.stringify({ categories, deletedContent }));
                                revalidatePath('/admin/categories');
                                return true;
                            }
                        }
                        if (category.subCategories && category.subCategories.length > 0) {
                            const subcategoryDeleted = await deleteRecursive(category.subCategories);
                            if (subcategoryDeleted) return true;
                        }
                    }
                    return false;
                };
                const productDeleted = await deleteRecursive(categories);
                if (!productDeleted) {
                    // console.log("Product not found.");
                    return false;
                }
                // console.log("Product deleted successfully.");
                return true;
            }
        } catch (error) {
            console.error("An error occurred:", error);
            return false;
        }
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
export async function addCategory(Code, Url_Id, name, description, body, isPublished, imagePaths, pdfFile) {
    console.log("New subcategory: " + imagePaths);
    try {
        const data = await readFile(filePath, 'utf8');
        const jsonData = JSON.parse(data);
        const { categories } = jsonData;
        // Save image and pdf files to assets directory
        // const savedImageFilePath = await saveFileToAssets(imageFile, name + '_' + Url_Id + '_' + getFileIdNumber(100000, 10000000) + '.jpg');
        // const savedPdfFilePath = await saveFileToAssets(pdfFile, name + '_' + Url_Id + '.pdf');
        const newCategory = {
            "id": Code.replace(/ /g, "-"),
            "url_Id": Url_Id,
            "fixedUrl": "",
            "name": name,
            "ALBEDOdescripcion": description,
            "ALBEDOcuerpo": body,
            "isPublished": isPublished,
            "FeachaDeCreacion": euFormattedDateTime,
            "FechaDeModificacion": euFormattedDateTime,
            "imagen": imagePaths,
            "archivos": "/assets/archivos/G34304249.pdf",
            "subCategories": [],
            "products": [],
            // "imageFilePath": savedImageFilePath, // Store the path to the saved image file
            // "pdfFilePath": savedPdfFilePath // Store the path to the saved pdf file
        };
        categories.unshift(newCategory);
        await writeFile(filePath, JSON.stringify(jsonData));
        revalidatePath('/admin/categories');
        // console.log("Subcategory added successfully.");
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
export async function addSubcategory(categoryId, Code, Url_Id, newCategoryName, Description, Body, imagePaths) {
    // // console.log("Adding subcategory to " + categoryId.categoryId.id);
    // // console.log(" subcategory name " + newCategoryName);
    try {
        const data = await fs.readFile(filePath, 'utf8');
        const { categories, deletedContent } = JSON.parse(data);
        const categoryToModifyId = categoryId.categoryId.id;
        const addSubcategoryRecursive = async (categoryList) => {
            for (let i = 0; i < categoryList.length; i++) {
                const category = categoryList[i];
                // // console.log("Checking category:", category);
                if (category.id === categoryToModifyId) {
                    // // console.log("Category found:", category);
                    if (!category.subCategories) {
                        category.subCategories = [];
                    }
                    const dataObj = {
                        "id": Code.replace(/ /g, "-"),
                        "url_Id": Url_Id,
                        "fixedUrl": "",
                        "name": newCategoryName,
                        "description": Description,
                        "ALBEDOcuerpo": Body,
                        "isPublished": false,
                        "FeachaDeCreacion": euFormattedDateTime,
                        "FechaDeModificacion": euFormattedDateTime,
                        "imagen": imagePaths, 
                        "subCategories": [],
                        "products": []
                    }
                    category.subCategories.unshift(dataObj);
                    // console.log("New subcategory added:", dataObj);
                    // console.log("Writing updated data to file...");
                    await fs.writeFile(filePath, JSON.stringify({ categories, deletedContent }));
                    // console.log("Data written successfully.");
                    revalidatePath('/admin/categories');
                    // console.log("Path revalidated.");
                    return true;
                }
                if (category.subCategories && category.subCategories.length > 0) {
                    // console.log("Checking subcategories of:", category);
                    const subcategoryAdded = await addSubcategoryRecursive(category.subCategories);
                    if (subcategoryAdded) return true;
                }
            }
            return false;
        };
        // console.log("Starting adding subcategory process...");
        const subcategoryAdded = await addSubcategoryRecursive(categories);
        if (!subcategoryAdded) {
            // console.log("Category not found.");
            return false;
        }
        // console.log("Subcategory added successfully.");
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
    console.log("New product:" +
        JSON.stringify(productData));
    console.log(productData.imagePaths);
    try {
        const data = await fs.readFile(filePath, 'utf8');
        const { categories, deletedContent } = JSON.parse(data);
        const categoryToModifyId = categoryId.categoryId.id;
        const addProductRecursive = async (categoryList) => {
            for (let i = 0; i < categoryList.length; i++) {
                const category = categoryList[i];
                if (category.id === categoryToModifyId) {
                    // console.log("Category found:", category);
                    if (!category.products) {
                        category.products = [];
                    }
                    const dataObj = {
                        "ALBEDOcodigo": productData.newProductCode,  //productCode.replace(/ /g, "-"),
                        "url_Id": productData.newProductUrlCode,
                        "fixedUrl": "",
                        "ALBEDOtitulo": productData.newProductName,
                        "ALBEDOprecio": parseFloat(productData.newProductPrice),
                        "ALBEDOdescripcion": productData.newProductDescription,
                        "ALBEDOcuerpo": productData.newProductBody,
                        "ALBEDOstock_minimo": productData.newProductStock,
                        "ALBEDOstock": productData.newProductStock,
                        "isPublished": false,
                        "FeachaDeCreacion": euFormattedDateTime,
                        "FechaDeModificacion": euFormattedDateTime,
                        "imagen": productData.imagePaths,
                        "archivos": productData.relatedFilePaths,
                        "ALBEDOplazo_entrega": productData.newProductDeliveryTime
                    }
                    category.products.push(dataObj);
                    // console.log("New product added:", dataObj);
                    // console.log("Writing updated data to file...");
                    await fs.writeFile(filePath, JSON.stringify({ categories, deletedContent }));
                    // console.log("Data written successfully.");
                    revalidatePath('/admin/categories');
                    // console.log("Path revalidated.");
                    return true;
                }
                if (category.subCategories && category.subCategories.length > 0) {
                    // console.log("Checking products in subcategories of:", category.subCategories);
                    const productAdded = await addProductRecursive(category.subCategories);
                    if (productAdded) return true;
                }
            }
            return false;
        };
        // console.log("Starting adding product process...");
        const productAdded = await addProductRecursive(categories);
        if (!productAdded) {
            // console.log("Category not found.");
            return false;
        }
        // console.log("product added successfully.");
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
export async function editproduct(productId, productCode, url_Id, Name, Price, Description, Body, Stock, MinStock, DeliveryTime, isPublished, imagePaths, filePaths) {
    try {
        const data = await fs.readFile(filePath, 'utf8');
        const { categories, deletedContent } = JSON.parse(data);
        // console.log("\nproduct to EDIT: ", productToEdit);
        const loopRecursive = async (categoryList) => {
            for (let i = 0; i < categoryList.length; i++) {
                const category = categoryList[i];
                for (let j = 0; j < category.products.length; j++) {
                    const product = category.products[j];
                    // // console.log(productId.productId);
                    if (product.ALBEDOcodigo === productId.productId) {
                        // console.log("product found:", product);
                        product.ALBEDOcodigo = productCode.replace(/ /g, "-");
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
                        product.imagen = imagePaths;
                        product.archivos = filePaths;
                        // console.log("Writing updated data to file...");
                        await fs.writeFile(filePath, JSON.stringify({ categories, deletedContent }));
                        // console.log("Data written successfully.");
                        // Assuming revalidatePath is defined somewhere
                        // window.location.reload();
                        //  revalidatePath('/admin/categories');
                        // // console.log("Path revalidated.");
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
        // console.log("Starting saving process...");
        const product = await loopRecursive(categories);
        if (!product) {
            // console.log("product not found.");
            return false;
        }
        // console.log("product saved successfully.");
        return true;
    } catch (error) {
        // console.log("Error:", error);
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
export async function editCategory(categoryId, Code, Name, Description, Body, isPublished, imagePaths) {
    try {
        const data = await fs.readFile(filePath, 'utf8');
        const { categories, deletedContent } = JSON.parse(data);
        const loopRecursive = async (categoryList) => {
            for (let i = 0; i < categoryList.length; i++) {
                const category = categoryList[i];
                if (category.id === categoryId.categoryId.id) {
                    // Update the category properties
                    category.id = Code;
                    category.name = Name;
                    category.ALBEDOdescripcion = Description;
                    category.ALBEDOcuerpo = Body;
                    category.isPublished = isPublished;
                    category.imagen = imagePaths;
                    category.FechaDeModificacion = euFormattedDateTime;
                    // Update publishing status of products in the current category
                    await updateProductsPublishingStatus(category.products, isPublished);
                    // If the category has children, update their publishing status recursively
                    if (category.subCategories && category.subCategories.length > 0) {
                        await updateChildrenPublishingStatus(category.subCategories, isPublished);
                    }
                    // Write the updated JSON data to the file
                    await fs.writeFile(filePath, JSON.stringify({ categories, deletedContent }));
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
/**
 * Retrieves a product based on its ID.
 * @param {string} productId - The ID of the product to retrieve.
 * @returns {Object} The product data.
 */
export async function getProductById(productId) {
    // // console.log(productId);
    try { // Provide correct file path
        const data = await fs.readFile(filePath, 'utf8');
        const { categories } = JSON.parse(data); // Destructure categories directly
        const productToEdit = productId.productId;
        // // console.log(productToEdit);
        const findProduct = async (categoryList) => {
            for (let i = 0; i < categoryList.length; i++) {
                const category = categoryList[i];
                for (let j = 0; j < category.products.length; j++) {
                    const product = category.products[j];
                    if (product.ALBEDOcodigo === productToEdit) {
                        // console.log("\nProduct found(back):", JSON.stringify(product));
                        return JSON.stringify(product); // Return product when found
                    }
                }
                if (category.subCategories && category.subCategories.length > 0) {
                    const foundProduct = await findProduct(category.subCategories);
                    if (foundProduct) return foundProduct; // Return product when found
                }
            }
            return null; // Return null if product not found
        };
        const product = await findProduct(categories);
        if (!product) {
            // console.log("Product not found.");
            return null; // Return null if product not found
        }
        return product; // Return found product
    } catch (error) {
        // console.log("Error:", error); // Log error
        throw error; // Rethrow error
    }
}
/**
 * Retrieves a category based on its ID.
 * @param {object} categoryId - The ID of the category to retrieve.
 * @returns {Object} The category data.
 */
export async function getCategoryById(categoryId) {
    // Check if the categoryId is provided and has an id field 
    try {
        if (!categoryId || !categoryId.categoryId || !categoryId.categoryId.id) {
            throw new Error("Invalid categoryId");
        }
        // Log the category ID to be searched for 
        // console.log("Searching for category with ID:", categoryId.categoryId.id);
        // Read the contents of the JSON file
        const data = await fs.readFile(filePath, 'utf8');
        // Parse the JSON file contents into JavaScript object
        const { categories } = JSON.parse(data);
        // Get the category ID to be searched for
        const categoryToDeleteId = categoryId.categoryId.id;
        // Recursive function to search for a category by ID in the given category list
        const Recursive = async (categoryList) => {
            // Loop through the category list 
            for (let i = 0; i < categoryList.length; i++) {
                const category = categoryList[i];
                // If the category ID matches, return the category and its data
                if (category.id === categoryToDeleteId) {
                    // revalidatePath('/admin/categories');
                    // // console.log("cat found in back: "+ JSON.stringify(category));
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
        // console.log(JSON.stringify(lastCategory));
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
    console.log(orderData);
    try {
        const data = await readFile(filePathOrders, 'utf8');
        const jsonData = JSON.parse(data);
        const { ClientOrders } = jsonData;
        const orderDataWithState = { ...orderData, orderState: 'Pendiente', createdAt: euFormattedDateTime };
        // Add orderState field with default value
        ClientOrders.unshift(orderDataWithState);
        await writeFile(filePathOrders, JSON.stringify(jsonData));
        revalidatePath('/');
        // console.log("Subcategory added successfully.");
        return true;
    } catch (error) {
        console.error("Error saving new Client Order:", error);
        return false;
    }
}
//functions to /admin/orders
/**
 * Retrieves all orders.
 * @returns {Array} An array of order objects.
 */
export async function getAllOrders() {
    try {
        const data = await readFile(filePathOrders, 'utf8');
        const jsonData = JSON.parse(data);
        const { ClientOrders } = jsonData;
        return ClientOrders;
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
export async function getOrderByIndex(orderIndex) {
    try {
        const data = await readFile(filePathOrders, 'utf8');
        const jsonData = JSON.parse(data);
        const { ClientOrders } = jsonData;
        if (orderIndex < 0 || orderIndex >= ClientOrders.length) {
            throw new Error("Invalid order index");
        }
        return ClientOrders[orderIndex];
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
export async function updateOrderStateById(orderId, newState) {
    try {
        const data = await readFile(filePathOrders, 'utf8');
        const jsonData = JSON.parse(data);
        const { ClientOrders } = jsonData;
        // Update the state of the order
        ClientOrders[orderId].orderState = newState;
        // Write the updated data back to the file
        await writeFile(filePathOrders, JSON.stringify(jsonData));
        return true;
    } catch (error) {
        console.error("Error updating order state:", error);
        return false;
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
function getStoredPassword() {
    // Fetch the stored password from your database or wherever it's stored
    // For now, returning a hardcoded password for demonstration
    return 'qwe123';
}
export async function login(userInput) {
    try {
        const storedPassword = getStoredPassword();
        if (userInput === '123') {
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
export async function saveImage(base64Image, imagePath) {
    // Remove the data URI prefix
    const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, '');
    // Create a buffer from the base64 string
    const buffer = Buffer.from(base64Data, 'base64');
    // Write the buffer to the file
    fs.writeFile(imagePath, buffer, (err) => {
        if (err) {
            console.error('Error saving image:', err);
        } else {
            console.log('Image saved successfully.');
        }
    });
}
export async function deleteImages(imagePathsToDelete) {
    return new Promise((resolve, reject) => {
        // Loop through each image path and delete it
        const deletePromises = imagePathsToDelete.map(imagePath => {
            console.log(imagePath);
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
export async function saveFile(file, filePath) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        // Set up event listener for when file reading is complete
        reader.onloadend = () => {
            const fileData = reader.result;
            // Create a Blob object from the file data
            const blob = new Blob([new Uint8Array(fileData)]);
            // Create a URL representing the file blob
            const fileURL = URL.createObjectURL(blob);
            // Create a new anchor element to trigger the download
            const a = document.createElement('a');
            a.href = fileURL;
            a.download = filePath;
            // Trigger a click event to start the download
            a.dispatchEvent(new MouseEvent('click'));
            // Resolve the promise with the file path
            resolve(filePath);
        };
        // Set up event listener for file reading errors
        reader.onerror = (error) => {
            reject(error);
        };
        // Start reading the file
        reader.readAsArrayBuffer(file);
    });
}
