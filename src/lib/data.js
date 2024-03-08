"use server"

import { promises as fs } from 'fs';

export async function requireContent() {
    const res = await fs.readFile(process.cwd() + '/src/data.json', 'utf8')

    return JSON.parse(res)
}

export async function getProducts() {
    const {
        products
    } = await requireContent();
    
    return products
}

export async function getCategories() {
    const {
        Categories
    } = await requireContent();
    
    return Categories
}