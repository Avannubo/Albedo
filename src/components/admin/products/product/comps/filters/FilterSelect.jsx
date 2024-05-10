// FilterSelect.js
import React from 'react';

export default function FilterSelect({ value, onChange, options }) {
    return (
        <select
            value={value}
            onChange={onChange}
            className="px-1.5 py-1 border-2 border-[#304590] rounded-lg focus:outline-none focus:border-[#304590] "
        >
            {options.map((option, index) => (
                <option key={index} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
}
