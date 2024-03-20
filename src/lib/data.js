"use server"

import { promises as fs } from 'fs';
import { revalidatePath } from 'next/cache';
import { readFile, writeFile } from 'fs/promises';

export async function requireContent() {
    const res = await fs.readFile('/data/data.json', 'utf8')

    return JSON.parse(res)
}

export async function getCategories() {
    const {
        categories,

    } = await requireContent();

    return categories
}

export async function getUsers() {
    const {
        users

    } = await requireContent();

    return users

}

export async function deleteCategory(categoryId) {
    try {
        const data = await fs.readFile('/data/data.json', 'utf8');
        const { categories, deletedContent } = JSON.parse(data);
        const categoryToDeleteId = categoryId.categoryId.id;

        const deleteRecursive = async (categoryList) => {
            for (let i = 0; i < categoryList.length; i++) {
                const category = categoryList[i];
                // console.log("Checking category:", category);
                if (category.id === categoryToDeleteId) {
                    // console.log("Category found:", category);
                    const deletedObject = categoryList.splice(i, 1)[0];
                    deletedContent.push(deletedObject);
                    // console.log("Writing updated data to file...");
                    await fs.writeFile('/data/data.json', JSON.stringify({ categories, deletedContent }));
                    // console.log("Data written successfully.");
                    revalidatePath('/admin/categories');
                    // console.log("Path revalidated.");
                    return true;
                }
                if (category.subCategories && category.subCategories.length > 0) {
                    // console.log("Checking subcategories of:", category);
                    const subcategoryDeleted = await deleteRecursive(category.subCategories);
                    if (subcategoryDeleted) return true;
                }
            }
            return false;
        };
        -
            console.log("Starting deletion process...");
        const categoryDeleted = await deleteRecursive(categories);
        if (!categoryDeleted) {
            console.log("Category not found.");
            return false;
        }
        // console.log("Category deleted successfully.");
        return true;
    } catch (error) {
        // console.error("Error deleting category:", error);
        return false;
    }
}

export async function addCategory(name, description) {
    console.log("New subcategory: " + name + " " + description);

    try {
        const data = await readFile('/data/data.json', 'utf8');
        const jsonData = JSON.parse(data);
        const { categories } = jsonData;

        const newCategory = {
            id: name,
            name: name,
            ALBEDOcuerpo: description,
            subCategories: [],
            products: []
        };

        categories.push(newCategory);

        await writeFile('/data/data.json', JSON.stringify(jsonData));
        revalidatePath('/admin/categories');

        console.log("Subcategory added successfully.");
        return true;
    } catch (error) {
        console.error("Error adding subcategory:", error);
        return false;
    }
}

export async function addSubcategory(categoryId, newCategoryName) {
    console.log("Adding subcategory to " + categoryId.categoryId.id);
    console.log(" subcategory name " + newCategoryName);

    try {
        const data = await fs.readFile('/data/data.json', 'utf8');
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
                    await fs.writeFile('/data/data.json', JSON.stringify({ categories, deletedContent }));
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
        const data = await fs.readFile('/data/data.json', 'utf8');
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
                        "ALBEDOprecio": Price + " +IVA",
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
                    await fs.writeFile('/data/data.json', JSON.stringify({ categories, deletedContent }));
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