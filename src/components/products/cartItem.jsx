'use client'
import React, { useState } from "react";

export default function CartItem() {
  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem("carrito")) || []
  );

  const updateCartItem = (id, action) => {
    const updatedCartItems = cartItems.map((product) => {
      if (product.ALBEDOcodigo === id) {
        if (action === "increment") {
          return { ...product, quantity: product.quantity + 1 };
        } else if (action === "decrement") {
          return { ...product, quantity: Math.max(1, product.quantity - 1) };
        }
      }
      return product;
    });
    setCartItems(updatedCartItems);
    localStorage.setItem("carrito", JSON.stringify(updatedCartItems));
  };

  const deleteCartProduct = (id) => {
    const newCartItems = cartItems.filter(
      (product) => product.ALBEDOcodigo !== id
    );
    setCartItems(newCartItems);
    localStorage.setItem("carrito", JSON.stringify(newCartItems));
  };

  return (
    <div className="">
      {cartItems && cartItems.length > 0 ? (
        <div className="">
          {cartItems.map((product) => (
            <div key={product.ALBEDOcodigo} className="rounded-lg mb-2">
              <div className="flex flex-row justify-between  border bg-white py-4 px-8 w-full">
                <img
                  src={product.imagen}
                  alt="product-image"
                  className="w-[160px] h-[100px] object-contain"
                />
                <div className="flex flex-col justify-between items-end ">
                  <h1 className="font-bold w-full">{product.ALBEDOtitulo}</h1>
                  <div className="flex flex-row justify-center items-center space-x-4 ">
                    <div className="flex items-center border-gray-100">
                      <span
                        onClick={() => updateCartItem(product.ALBEDOcodigo, "decrement")}
                        className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"
                      >
                        {" "}
                        -{" "}
                      </span>
                      <input
                        className="h-8 w-8 border bg-white text-center text-xs outline-none"
                        type="number"
                        value={product.quantity}
                        min="1" 
                      />
                      <span
                        onClick={() => updateCartItem(product.ALBEDOcodigo, "increment")}
                        className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"
                      >
                        {" "}
                        +{" "}
                      </span>
                    </div>
                    <svg
                      onClick={() => deleteCartProduct(product.ALBEDOcodigo)}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6 cursor-pointer"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                      />
                    </svg>
                  </div>
                  <h1>{product.ALBEDOprecio * product.quantity} €</h1>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <h1 className="">No hay productos en el carrito</h1>
      )}
    </div>
  );
}
