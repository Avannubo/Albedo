"use client";
import React, { useState } from "react"; 
export default function Search({ onSearchChange }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchBy, setSearchBy] = useState("name");

    const handleSearchTermChange = (e) => {
        const newSearchTerm = e.target.value;
        setSearchTerm(newSearchTerm);
        onSearchChange(newSearchTerm, searchBy); // Notify parent about search term change
    };

    const handleSearchByChange = (e) => {
        const newSearchBy = e.target.value;
        setSearchBy(newSearchBy);
        onSearchChange(searchTerm, newSearchBy); // Notify parent about search criteria change
    };

    return (
        <div className="flex items-center space-x-2 w-full">
            <input
                type="text"
                value={searchTerm}
                onChange={handleSearchTermChange}
                className="border p-2 rounded w-[100%]"
                placeholder="Enter search term"
            />
            <select
                value={searchBy}
                onChange={handleSearchByChange}
                className="border p-2 rounded"
            >
                <option value="name">Buscar por nombre</option>
                <option value="id">Buscar por ID</option>
            </select>
        </div>
    );
}
