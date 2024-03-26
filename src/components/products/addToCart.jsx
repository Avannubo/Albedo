"use client";
import React from "react";

function AddToCart({ producto }) {
  const handleClick = () => {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    carrito.push(producto);

    // Guardar el carrito actualizado en el localStorage
    localStorage.setItem("carrito", JSON.stringify(carrito));
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
