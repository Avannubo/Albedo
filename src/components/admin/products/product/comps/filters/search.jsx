"use client";
import React, { useState } from "react";

export default function Search() {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchBy, setSearchBy] = useState("name");

    const searchFilter = () => {
        // Your filtering logic goes here
        console.log("Searching for:", searchTerm, "by", searchBy);
        // Example: Perform the search operation based on `searchTerm` and `searchBy`
    };

    // Update the search term and call the searchFilter function
    const handleSearchTermChange = (e) => {
        setSearchTerm(e.target.value);
        searchFilter();
    };

    // Update the search option and call the searchFilter function
    const handleSearchByChange = (e) => {
        setSearchBy(e.target.value);
        searchFilter(searchTerm, searchBy);
    };

    return (
        <div className="flex items-center space-x-2">
            <input
                type="text"
                value={searchTerm}
                onChange={handleSearchTermChange}
                className="border p-2 rounded w-full"
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
