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
        // borrar categoria

        revalidatePath('admin/categories')

        return true 
    } catch (error) {
        return false
    }
}
 

