"use server"

import { promises as fs } from 'fs';

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
  
 

