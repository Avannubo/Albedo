 
import React from 'react' 
import { Link } from 'next/link'
export default function item(closeDropdown) {

    return (
        <Link
            href="#"
            className="block px-4 py-2 text-sm text-gray-700 hover"
            onClick={closeDropdown}
        >
            Option 1
        </Link>
    )
}
