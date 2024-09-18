"use client";
import React, { useState } from "react";
function AddToCart({ producto }) {
  //console.log(producto.ALBEDOstock);
  // State to store the quantity input value
  const [quantity, setQuantity] = useState(1);
  const handleQuantityChange = (event) => {
    // Update the quantity state when the input value changes
    setQuantity(parseInt(event.target.value) || 0); // Ensure input is converted to integer or 0 if not valid
  };
  const handleClick = () => {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    let foundDuplicate = false;
    // Check if the product already exists in the cart
    carrito.forEach((item) => {
      if (item.ALBEDOcodigo === producto.ALBEDOcodigo) {
        // Increment the quantity based on input value or add 1 if input is not used
        item.quantity += quantity;
        foundDuplicate = true;
      }
    });
    // If not found, add the product to the cart
    if (!foundDuplicate) {
      // Add the product with the specified quantity
      carrito.push({ ...producto, quantity });
    }
    // Update the cart in localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("carrito", JSON.stringify(carrito));
    }
    // Reset quantity input to 1
    setQuantity(1);
  };
  return (
    <div className="flex flex-row justify-center items-center space-x-0 md:space-x-2">
      {producto.ALBEDOstock > 0 ? (
        <>
          {/* Input field to specify quantity */}
          <input
            type="number"
            className="self-center shadow-sm rounded-md w-1/4 mr-2 p-0 h-[36px] text-center border border-gray-300 focus:outline-2 focus:ring-[#304590] focus:border-[#304590]"
            placeholder="0"
            max={producto.ALBEDOstock}
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
        </>
      ) : ( 
            <p className="text-red-500 text-center w-full">
            Producto agotado
          </p> 
      )}
    </div>
  );
}
export default AddToCart;
