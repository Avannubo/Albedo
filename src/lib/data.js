"use server"

import { promises as fs } from 'fs';
import { revalidatePath } from 'next/cache';
import { readFile, writeFile } from 'fs/promises';

import path from 'path';
const isLocal = typeof window === 'undefined'; // Check if not running in the browser (server-side)
const filePath = isLocal ? path.resolve('public/data/data.json') : '/data/data.json';
let cachedData = null;
let lastModifiedTime = null;
const currentdate = new Date();
const euFormattedDateTime = currentdate.getDate() + "/"
    + (currentdate.getMonth() + 1) + "/"
    + currentdate.getFullYear() + "   "
    + (currentdate.getHours()) + ":"
    + currentdate.getMinutes() + ":"
    + currentdate.getSeconds();

// Convert the EU date and time to a string
// const euFormattedDateTime = euDateTimeFormat.format(euTime);
// // console.log(euFormattedDateTime); // Output the current time in the EU timezone

export async function requireContent() {
    const stats = await fs.stat(filePath);
    if (stats.mtimeMs !== lastModifiedTime) {
        lastModifiedTime = stats.mtimeMs;
        const res = await fs.readFile(filePath, 'utf8');
        cachedData = JSON.parse(res);
    }
    return cachedData;
}

export async function getCategories() {
    const content = await requireContent();
    if (content) {
        const { categories } = content;
        return categories;
    } else {
        return []; // Return an empty array if categories don't exist
    }
}

// export async function getUsers() {//para usuarios
//     const {
//         users
//     } = await requireContent();
//     return users
// }

export async function deleteElement(categoryId, productId) {
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
export async function addCategory(Code, Url_Id, name, description, body, isPublished, imageFile, pdfFile) {
    console.log("New subcategory: " + imageFile, pdfFile);
    try {
        const data = await readFile(filePath, 'utf8');
        const jsonData = JSON.parse(data);
        const { categories } = jsonData;
        // Save image and pdf files to assets directory
        const savedImageFilePath = await saveFileToAssets(imageFile, name + '_' + Url_Id + '_' + getFileIdNumber(100000,10000000) +'.jpg');
        const savedPdfFilePath = await saveFileToAssets(pdfFile, name + '_' + Url_Id +'.pdf');

        const newCategory = {
            "id": Code.replace(/ /g, "-"),
            "url_Id": Url_Id,
            "name": name,
            "ALBEDOdescripcion": description,
            "ALBEDOcuerpo": body,
            "isPublished": isPublished,
            "FeachaDeCreacion": euFormattedDateTime,
            "FechaDeModificacion": euFormattedDateTime,
            "subCategories": [],
            "products": [],
            "imageFilePath": savedImageFilePath, // Store the path to the saved image file
            "pdfFilePath": savedPdfFilePath // Store the path to the saved pdf file
        };

        categories.push(newCategory);

        await writeFile(filePath, JSON.stringify(jsonData));
        revalidatePath('/admin/categories');

        // console.log("Subcategory added successfully.");
        return true;
    } catch (error) {
        console.error("Error adding subcategory:", error);
        return false;
    }
}
function getFileIdNumber(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
/**
 * Función para agregar una nueva subcategoría con un nombre y descripción dados.
 *
 * @param {string} name - El nombre de la nueva subcategoría.
 * @param {string} description - La descripción de la nueva subcategoría.
 * @returns {boolean} Un valor booleano que indica si la subcategoría se agregó correctamente.
 */
export async function addSubcategory(categoryId, Code, Url_Id, newCategoryName, Description, Body, isPublished) {
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
                        "name": newCategoryName,
                        "description": Description,
                        "ALBEDOcuerpo": Body,
                        "isPublished": isPublished,
                        "FeachaDeCreacion": new Date().toISOString(),
                        "FechaDeModificacion": new Date().toISOString(),
                        "subCategories": [],
                        "products": []
                    }
                    category.subCategories.push(dataObj);
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

export async function addproduct(categoryId, productCode, Url_Id, Name, Price, Description, Body, Stock, MinStock, DeliveryTime, isPublished) {
    // console.log("New product:" + categoryId.categoryId.id + " " + productCode + " " + Url_Id + "  " + Name + " " + Price + " " + Description + " " + Body + " " + Stock + " " + MinStock + " " + DeliveryTime);
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
                        "ALBEDOcodigo": productCode.replace(/ /g, "-"),
                        "url_Id": Url_Id,
                        "ALBEDOtitulo": Name,
                        "ALBEDOprecio": parseFloat(Price),
                        "ALBEDOdescripcion": Description,
                        "ALBEDOcuerpo": Body,
                        "ALBEDOstock_minimo": MinStock,
                        "ALBEDOstock": Stock,
                        "isPublished": isPublished,
                        "FeachaDeCreacion": new Date().toISOString(),
                        "FechaDeModificacion": new Date().toISOString(),
                        "imagen": "/images/ADFSSM100/imagen.png",
                        "imagen.small": "/images/ADFSSM100/imagen.small.png",
                        "ALBEDOplazo_entrega": DeliveryTime
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

export async function editproduct(productId, productCode, url_Id, Name, Price, Description, Body, Stock, MinStock, DeliveryTime, isPublished) {
    // console.log("\nNew product data changes:\n" + productCode + " \n" + url_Id + " " + Name + " \n" + Price + " \n" + Description + " \n" + Body + " \n" + Stock + " \n" + MinStock + " \n" + DeliveryTime);
    try {
        const data = await fs.readFile(filePath, 'utf8');
        const { categories, deletedContent } = JSON.parse(data);
        const productToEdit = productCode;
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
                        product.FechaDeModificacion = new Date().toISOString();
                        product.ALBEDOplazo_entrega = DeliveryTime;
                        product.isPublished = isPublished;

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


// Exported async function to edit a category with the given parameters
export async function editCategory(categoryId, Code, Name, Description, Body, isPublished) {
    try {
        // Read the contents of the file as a string
        const data = await fs.readFile(filePath, 'utf8');
        // Parse the JSON data into an object containing categories and deleted content
        const { categories, deletedContent } = JSON.parse(data);
        // Recursive function to traverse through categories and update the specified category
        const loopRecursive = async (categoryList) => {
            for (let i = 0; i < categoryList.length; i++) {
                const category = categoryList[i];
                // Log the current category id and the id of the category to be updated
                // console.log("Checking category:", category.id, "not equal to:", categoryId);
                // Check if the current category is the one to be updated
                if (category.id === categoryId.categoryId.id) {
                    // console.log("Category found:", category);
                    // Update the category properties
                    category.id = Code;
                    category.name = Name;
                    category.ALBEDOdescripcion = Description;
                    category.ALBEDOcuerpo = Body;
                    category.isPublished = isPublished,
                        category.FechaDeModificacion = new Date().toISOString();

                    // Log that the updated data is being written to the file
                    // console.log("Writing updated data to file...");
                    // Write the updated JSON data to the file
                    await fs.writeFile(filePath, JSON.stringify({ categories, deletedContent }));
                    // Log that the data was written successfully
                    // console.log("Data written successfully.");
                    // Log that the path has been revalidated
                    // console.log("Path revalidated.");
                    // Return true to indicate that the category was updated
                    return true;
                }
                // If the category has subcategories, recursively check them
                if (category.subCategories && category.subCategories.length > 0) {
                    // console.log("Checking subcategories for category:", category.id);
                    const subcategorySaved = await loopRecursive(category.subCategories);
                    // If the subcategory was updated, return true
                    if (subcategorySaved) return true;
                }
            }
            // Return false if the category was not found
            return false;
        };

        // Log that the saving process is starting
        // console.log("Starting saving process...");
        // Call the recursive function to save the category
        const categorySaved = await loopRecursive(categories);

        // If the category was not found, log that fact and return false
        if (!categorySaved) {
            // console.log("Category not found.");
            return false;
        }
    } catch (error) {
        // Handle any errors that occur during the process
        // console.log("Error editing category:", error);
        return false;
    }
}


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

function saveFileToAssets(file, fileName) {
    const uploadDir = path.join(__dirname, '../public/assets/');
    let destDir;

    // Determine the destination directory based on file extension
    const fileExtension = path.extname(fileName).toLowerCase();
    if (fileExtension === '.pdf') {
        destDir = path.join(uploadDir, 'pdf/');
    } else if (fileExtension === '.png' || fileExtension === '.jpg' || fileExtension === '.jpeg') {
        destDir = path.join(uploadDir, 'images/');
    } else {
        // Handle other file types (optional)
        destDir = uploadDir;
    }

    // Ensure the destination directory exists
    fs.mkdirSync(destDir, { recursive: true });

    // Construct the full file path
    const filePath = path.join(destDir, fileName);

    return new Promise((resolve, reject) => {
        file.mv(filePath, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(filePath);
            }
        });
    });
}
