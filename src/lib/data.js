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
        
        const category = categoryId.categoryId.id;
        const index = categories.findIndex(obj => obj.id === category);

        if (index !== -1) {
            const deletedObject = categories.splice(index, 1)[0];
            deletedContent.push(deletedObject);
            
            // Write the modified data back to the JSON file
            await fs.writeFile(process.cwd() + '/src/data.json', JSON.stringify({ categories, deletedContent }));
        }

        // Perform any additional operations needed (e.g., revalidatePath function)
        revalidatePath('/admin/categories'); // Assuming this function is defined elsewhere

        return true;
    } catch (error) {
        console.error("Error deleting category:", error);
        return false;
    }
}




