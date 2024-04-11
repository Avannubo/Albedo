"use client";
import React from "react";

function AddToCart({ producto }) {
  const handleClick = () => {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    let foundDuplicate = false;

    console.log("Current Cart:", carrito);

    // Check if the product already exists in the cart
    carrito.forEach(item => {
      if (item.ALBEDOcodigo === producto.ALBEDOcodigo) {
        console.log("Found Duplicate:", item);
        item.quantity += 1;
        foundDuplicate = true;
      }
    });

    // If not found, add the product to the cart
    if (!foundDuplicate) {
      console.log("Adding New Product:", producto);
      carrito.push({ ...producto, quantity: 1 });
    }

    // Update the cart in localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem("carrito", JSON.stringify(carrito));
    }

    console.log("Updated Cart:", carrito);
    // window.location.reload();
  };

  return (
    <button
      className="self-center text-white w-full py-1.5 rounded-md bg-[#304590] hover:bg-[#475caa]"
      onClick={handleClick}
    >
      Añadir al carrito
    </button>
  );
}

export default AddToCart;
