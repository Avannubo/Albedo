"use client";

import React, { useState, useEffect, useRef } from "react";
import { getCategories } from "@/lib/data";
import Link from "next/link";

export default function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const dropdownRef = useRef(null);

  const handleCategoryHover = (index) => {
    setActiveCategory(index);
  };

  const handleCategoryLeave = () => {
    setActiveCategory(null);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getCategories();
        const Categories = data.filter(category => category.isPublished === true);

        setCategories(Categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="w-full py-2 z-[999] ">
      <div className="relative inline-block" ref={dropdownRef}>
        <button
          type="button"
          className=" py-2 text-white font-medium rounded-lg text-lg inline-flex items-center"
          onClick={toggleDropdown}
        >
          Products{" "}
          <svg
            className="w-2.5 h-2.5 ml-2.5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 4 4 4-4"
            />
          </svg>
        </button>

        {isOpen && (
          <div className=" absolute left-0 w-auto rounded-xl shadow-lg bg-white ring-1 ring-black ring-opacity-5 h-auto overflow-y-scroll no-scrollbar">
            <ul className="m-1">
              <li className="px-2 py-1.5 text-md text-gray-700 hover:bg-gray-100 rounded-lg">
                <Link href="/products" className="whitespace-nowrap">Gama de productos</Link>
              </li>
              {categories.map((category, index) => (
                <li key={index} className="relative">
                  <Link
                    href={`/products/${category.url_Id}`}
                    className="block px-2 py-1.5 text-md text-gray-700 hover:bg-gray-100 rounded-lg whitespace-nowrap"
                    onMouseEnter={() => handleCategoryHover(index)}
                    onMouseLeave={handleCategoryLeave}
                  >
                    {category.name.split(" ").length > 2
                      ? category.name.split(" ")[0]
                      : category.name}
                  </Link>
                  {activeCategory === index && category.subcategories && (
                    <div className="absolute top-full left-0 mt-2 w-44 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                      <ul>
                        {category.subcategories.map((subCategory, subIndex) => (
                          <li
                            key={subIndex}
                            className="px-2 py-1.5 text-md text-gray-700 whitespace-nowrap"
                          >
                            {subCategory.name}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
