"use server"

import { promises as fs } from 'fs';
import { revalidatePath } from 'next/cache';
import { readFile, writeFile } from 'fs/promises';

let cachedData = null;
let lastModifiedTime = null;

const filePath = './public/data/data.json';
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

export async function getUsers() {
    const {
        users

    } = await requireContent();

    return users

}

export async function deleteElement(categoryId, productId) {
    if (categoryId.categoryId !== "none" || categoryId.productId !== "none") {
        try {
            const data = await fs.readFile(filePath, 'utf8');
            const { categories, deletedContent } = JSON.parse(data);

            if (categoryId.categoryId !== "none") {
                const categoryToDeleteId = categoryId.categoryId.id;
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
                    console.log("Category not found.");
                    return false;
                }
                console.log("Category deleted successfully.");
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
}
export async function addCategory(name, description) {
    console.log("New subcategory: " + name + " " + description);

    try {
        const data = await readFile(filePath, 'utf8');
        const jsonData = JSON.parse(data);
        const { categories } = jsonData;

        const newCategory = {
            "id": name,
            "name": name,
            "url_Id": "",
            "ALBEDOcuerpo": description,
            "subCategories": [],
            "products": []
        };

        categories.push(newCategory);

        await writeFile(filePath, JSON.stringify(jsonData));
        revalidatePath('/admin/categories');

        console.log("Subcategory added successfully.");
        return true;
    } catch (error) {
        console.error("Error adding subcategory:", error);
        return false;
    }
}

/**
 * Función para agregar una nueva subcategoría con un nombre y descripción dados.
 *
 * @param {string} name - El nombre de la nueva subcategoría.
 * @param {string} description - La descripción de la nueva subcategoría.
 * @returns {boolean} Un valor booleano que indica si la subcategoría se agregó correctamente.
 */
export async function addSubcategory(categoryId, newCategoryName) {
    console.log("Adding subcategory to " + categoryId.categoryId.id);
    console.log(" subcategory name " + newCategoryName);

    try {
        const data = await fs.readFile(filePath, 'utf8');
        const { categories, deletedContent } = JSON.parse(data);
        const categoryToModifyId = categoryId.categoryId.id;
        const addSubcategoryRecursive = async (categoryList) => {
            for (let i = 0; i < categoryList.length; i++) {
                const category = categoryList[i];
                console.log("Checking category:", category);
                if (category.id === categoryToModifyId) {
                    console.log("Category found:", category);
                    if (!category.subCategories) {
                        category.subCategories = [];
                    }
                    const dataObj = {
                        "id": newCategoryName,
                        "name": newCategoryName,
                        "ALBEDOcuerpo": "",
                        "subCategories": [],
                        "products": []
                    }
                    category.subCategories.push(dataObj);
                    console.log("New subcategory added:", dataObj);
                    console.log("Writing updated data to file...");
                    await fs.writeFile(filePath, JSON.stringify({ categories, deletedContent }));
                    console.log("Data written successfully.");
                    revalidatePath('/admin/categories');
                    console.log("Path revalidated.");
                    return true;
                }
                if (category.subCategories && category.subCategories.length > 0) {
                    console.log("Checking subcategories of:", category);
                    const subcategoryAdded = await addSubcategoryRecursive(category.subCategories);
                    if (subcategoryAdded) return true;
                }
            }
            return false;
        };
        console.log("Starting adding subcategory process...");
        const subcategoryAdded = await addSubcategoryRecursive(categories);
        if (!subcategoryAdded) {
            console.log("Category not found.");
            return false;
        }
        console.log("Subcategory added successfully.");
        return true;
    } catch (error) {
        console.error("Error adding subcategory:", error);
        return false;
    }
}

export async function addproduct(categoryId, productCode, Name, Price, Description, Body, Stock, MinStock, DeliveryTime) {
    console.log("New product:" + categoryId.categoryId.id + " " + Name + " " + Price + " " + Description + " " + Body + " " + Stock + " " + MinStock + " " + DeliveryTime);

    try {
        const data = await fs.readFile(filePath, 'utf8');
        const { categories, deletedContent } = JSON.parse(data);
        const categoryToModifyId = categoryId.categoryId.id;
        const addProductRecursive = async (categoryList) => {
            for (let i = 0; i < categoryList.length; i++) {
                const category = categoryList[i];
                if (category.id === categoryToModifyId) {
                    console.log("Category found:", category);
                    if (!category.products) {
                        category.products = [];
                    }
                    const dataObj = {
                        "ALBEDOcodigo": productCode,
                        "ALBEDOtitulo": Name,
                        "url_Id": "",
                        "ALBEDOprecio": Price,
                        "ALBEDOdescripcion": Description,
                        "ALBEDOcuerpo": Body,
                        "ALBEDOstock_minimo": MinStock,
                        "ALBEDOstock": Stock,
                        "imagen": "/images/ADFSSM100/imagen.png",
                        "imagen.small": "/images/ADFSSM100/imagen.small.png",
                        "ALBEDOplazo_entrega": DeliveryTime
                    }
                    category.products.push(dataObj);
                    console.log("New product added:", dataObj);
                    console.log("Writing updated data to file...");
                    await fs.writeFile(filePath, JSON.stringify({ categories, deletedContent }));
                    console.log("Data written successfully.");
                    revalidatePath('/admin/categories');
                    console.log("Path revalidated.");
                    return true;
                }
                if (category.subCategories && category.subCategories.length > 0) {
                    console.log("Checking products in subcategories of:", category.subCategories);
                    const productAdded = await addProductRecursive(category.subCategories);
                    if (productAdded) return true;
                }
            }
            return false;
        };
        console.log("Starting adding product process...");
        const productAdded = await addProductRecursive(categories);
        if (!productAdded) {
            console.log("Category not found.");
            return false;
        }
        console.log("product added successfully.");
        return true;
    } catch (error) {
        console.error("Error adding product:", error);
        return false;
    }
}

export async function editproduct(productId, productCode, Name, Price, Description, Body, Stock, MinStock, DeliveryTime) {
    console.log("\nNew product data changes:\n" + productCode + " \n" + Name + " \n" + Price + " \n" + Description + " \n" + Body + " \n" + Stock + " \n" + MinStock + " \n" + DeliveryTime);
    try {
        const data = await fs.readFile(filePath, 'utf8');
        const { categories, deletedContent } = JSON.parse(data);
        const productToEdit = productCode;
        console.log("\nproduct to EDIT: ", productToEdit);

        const loopRecursive = async (categoryList) => {
            for (let i = 0; i < categoryList.length; i++) {
                const category = categoryList[i];
                for (let j = 0; j < category.products.length; j++) {
                    const product = category.products[j];
                    // console.log(productId.productId);
                    if (product.ALBEDOcodigo === productId.productId) {
                        console.log("product found:", product);
                        product.ALBEDOcodigo = productCode;
                        product.ALBEDOtitulo = Name;
                        product.ALBEDOprecio = Price;
                        product.ALBEDOdescripcion = Description;
                        product.ALBEDOcuerpo = Body;
                        product.ALBEDOstock_minimo = MinStock;
                        product.ALBEDOstock = Stock;
                        product.ALBEDOplazo_entrega = DeliveryTime;

                        console.log("Writing updated data to file...");
                        await fs.writeFile(filePath, JSON.stringify({ categories, deletedContent }));
                        console.log("Data written successfully.");
                        // Assuming revalidatePath is defined somewhere
                        // window.location.reload();
                        //  revalidatePath('/admin/categories');
                        // console.log("Path revalidated.");
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
        console.log("Starting saving process...");
        const product = await loopRecursive(categories);
        if (!product) {
            console.log("product not found.");
            return false;
        }
        console.log("product saved successfully.");
        return true;
    } catch (error) {
        console.log("Error:", error);
        return false;
    }
}

export async function getProductById(productId) {
    // console.log(productId);
    try { // Provide correct file path
        const data = await fs.readFile(filePath, 'utf8');
        const { categories } = JSON.parse(data); // Destructure categories directly

        const productToEdit = productId.productId;
        // console.log(productToEdit);
        const findProduct = async (categoryList) => {
            for (let i = 0; i < categoryList.length; i++) {
                const category = categoryList[i];
                for (let j = 0; j < category.products.length; j++) {
                    const product = category.products[j];
                    if (product.ALBEDOcodigo === productToEdit) {
                        console.log("\nProduct found(back):", JSON.stringify(product));
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
            console.log("Product not found.");
            return null; // Return null if product not found
        }
        return product; // Return found product
    } catch (error) {
        console.log("Error:", error); // Log error
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
        console.log("Searching for category with ID:", categoryId.categoryId.id);

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
                    // console.log("cat found in back: "+ JSON.stringify(category));
                    return category; // Return category and its data
                }
                // If the category has subcategories, search for the ID within those subcategories
                if (category.subCategories && category.subCategories.length > 0) {
                    const subcategory = await Recursive(category.subCategories);
                    // console.log("subCat found in back: "+ JSON.stringify(category));
                    if (subcategory) return subcategory;
                }
            }
            return false;
        };
        const categoryFound = await Recursive(categories);
        if (!categoryFound) {
            console.log("Category not found.");
            return false;
        }
        return categoryFound; // Return the found category along with its data
    } catch (error) {
        console.error("Error occurred:", error);
        return false;
    }
}

// Exported async function to edit a category with the given parameters
export async function editCategory(categoryId, Code, Name, Description, Body) {
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
                console.log("Checking category:", category.id, "not equal to:", categoryId);
                // Check if the current category is the one to be updated
                if (category.id === categoryId.categoryId.id) {
                    console.log("Category found:", category);
                    // Update the category properties
                    category.id = Code;
                    category.name = Name;
                    category.ALBEDOdescripcion = Description;
                    category.ALBEDOcuerpo = Body;
                    // Log that the updated data is being written to the file
                    console.log("Writing updated data to file...");
                    // Write the updated JSON data to the file
                    await fs.writeFile(filePath, JSON.stringify({ categories, deletedContent }));
                    // Log that the data was written successfully
                    console.log("Data written successfully.");
                    // Log that the path has been revalidated
                    console.log("Path revalidated.");
                    // Return true to indicate that the category was updated
                    return true;
                }
                // If the category has subcategories, recursively check them
                if (category.subCategories && category.subCategories.length > 0) {
                    console.log("Checking subcategories for category:", category.id);
                    const subcategorySaved = await loopRecursive(category.subCategories);
                    // If the subcategory was updated, return true
                    if (subcategorySaved) return true;
                }
            }
            // Return false if the category was not found
            return false;
        };

        // Log that the saving process is starting
        console.log("Starting saving process...");
        // Call the recursive function to save the category
        const categorySaved = await loopRecursive(categories);

        // If the category was not found, log that fact and return false
        if (!categorySaved) {
            console.log("Category not found.");
            return false;
        }
    } catch (error) {
        // Handle any errors that occur during the process
        console.log("Error editing category:", error);
        return false;
    }
}