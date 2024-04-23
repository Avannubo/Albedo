"use client";
import React, { useState } from "react";

function AddToCart({ producto }) {
  // State to store the quantity input value
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (event) => {
    // Update the quantity state when the input value changes
    setQuantity(parseInt(event.target.value) || 0); // Ensure input is converted to integer or 0 if not valid
  };

  const handleClick = () => {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    let foundDuplicate = false;

    console.log("Current Cart:", carrito);

    // Check if the product already exists in the cart
    carrito.forEach((item) => {
      if (item.ALBEDOcodigo === producto.ALBEDOcodigo) {
        console.log("Found Duplicate:", item);
        // Increment the quantity based on input value or add 1 if input is not used
        item.quantity += quantity;
        foundDuplicate = true;
      }
    });

    // If not found, add the product to the cart
    if (!foundDuplicate) {
      console.log("Adding New Product:", producto);
      // Add the product with the specified quantity
      carrito.push({ ...producto, quantity });
    }

    // Update the cart in localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("carrito", JSON.stringify(carrito));
    }

    console.log("Updated Cart:", carrito);
    // window.location.reload();
    setQuantity(1);
  };

  return (
    <div className="flex flex-row space-x-2">
      {/* Input field to specify quantity */}
      <input
        type="number"
        className="shadow-sm rounded-md w-1/4 text-center p-1 border border-gray-300 focus:outline-2 focus:ring-[#304590] focus:border-[#304590]"
        placeholder="0"
        min="1"
        step="1"
        value={quantity}
        onChange={handleQuantityChange}
        required
      />

      <button
        className="self-center text-white w-full py-1.5 rounded-md bg-[#304590] hover:bg-[#475caa]"
        onClick={handleClick}
      >
        Añadir al carrito
      </button>
    </div>
  );
}

export default AddToCart;
