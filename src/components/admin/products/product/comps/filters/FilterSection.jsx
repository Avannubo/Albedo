// FilterSection.js
import React from 'react';
import FilterSelect from './FilterSelect'; // Make sure this path is correct

export default function FilterSection({ isPublishedFilter, categoryFilter, onPublishedChange, onCategoryChange, categoryOptions }) {
    return (
        <div className="flex flex-row space-x-4">
            <FilterSelect
                value={isPublishedFilter === true ? "" : isPublishedFilter}
                onChange={(e) => {
                    onPublishedChange(e.target.value === "" ? true : e.target.value === 'true');
                    onCategoryChange(''); // Reset category filter when isPublishedFilter changes
                }}
                options={[
                    { label: "Publicado", value: true },
                    { label: "Borrador", value: false }
                ]}
            />
            <FilterSelect
                value={categoryFilter}
                onChange={(e) => onCategoryChange(e.target.value)}
                options={[
                    // { label: "Todas las categorias", value: "" },
                    ...categoryOptions.map(category => ({
                        label: category.name.split(" ").length > 2 ? category.name.split(" ")[0] : category.name,
                        value: category.name
                    }))
                ]}
            />
        </div>
    );
}
