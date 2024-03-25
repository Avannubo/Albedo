 
import React from 'react'
import { getCategories } from '@/lib/data'
export default function item(closeDropdown) {

    return (
        <a
            href="#"
            className="block px-4 py-2 text-sm text-gray-700 hover"
            onClick={closeDropdown}
        >
            Option 1
        </a>
    )
}
