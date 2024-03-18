"use server"

import { promises as fs } from 'fs';
import { revalidatePath } from 'next/cache';

export async function requireContent() {
    const res = await fs.readFile(process.cwd() + '/src/data.json', 'utf8')

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
        // Read the content from the JSON file
        const data = await fs.readFile(process.cwd() + '/src/data.json', 'utf8');
        const { categories, deletedContent } = JSON.parse(data); 
        const categoryToDeleteId = categoryId.categoryId.id;

        // Define a recursive function to search for and delete the category
        const deleteRecursive = async (categoryList) => {
            for (let i = 0; i < categoryList.length; i++) {
                const category = categoryList[i];
                console.log("Checking category:", category);
                if (category.id === categoryToDeleteId) {
                    // Category found, delete it
                    console.log("Category found:", category);
                    const deletedObject = categoryList.splice(i, 1)[0];
                    deletedContent.push(deletedObject); 
                    // Write the modified data back to the JSON file
                    console.log("Writing updated data to file...");
                    await fs.writeFile(process.cwd() + '/src/data.json', JSON.stringify({ categories, deletedContent }));
                    console.log("Data written successfully.");
                    revalidatePath('/admin/categories'); // Assuming this function is defined elsewhere
                    console.log("Path revalidated.");
                    return true; // Category deleted successfully
                }
                // If the category has subcategories, recursively search in them
                if (category.subCategories && category.subCategories.length > 0) {
                    console.log("Checking subcategories of:", category);
                    const subcategoryDeleted = await deleteRecursive(category.subCategories);
                    if (subcategoryDeleted) return true; // Category deleted from subcategory
                }
            }
            return false; // Category not found
        };

        // Start the recursive deletion process
        console.log("Starting deletion process...");
        const categoryDeleted = await deleteRecursive(categories);
        if (!categoryDeleted) {
            console.log("Category not found.");
            return false;
        }
        console.log("Category deleted successfully.");
        return true;
    } catch (error) {
        console.error("Error deleting category:", error);
        return false;
    }
}






