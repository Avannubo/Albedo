'use client';
import React, { useState, useEffect } from "react";

export default function CartItem() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // Initial cart load from localStorage
    const storedCartItems = JSON.parse(localStorage.getItem("carrito"));
    if (storedCartItems) {
      setCartItems(storedCartItems);
    }

    // Add an event listener for localStorage changes
    const handleStorageChange = () => {
      const updatedCartItems = JSON.parse(localStorage.getItem("carrito"));
      if (updatedCartItems) {
        setCartItems(updatedCartItems);
      }
    };

    // Listen to the 'storage' event, which triggers when localStorage changes
    window.addEventListener("storage", handleStorageChange);

    return () => {
      // Clean up the event listener on component unmount
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const updateCartItem = (id, newQuantity) => {
    newQuantity = Math.max(1, newQuantity);

    const updatedCartItems = cartItems.map((product) => {
      if (product.ALBEDOcodigo === id) {
        return { ...product, quantity: newQuantity };
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
        <div className="space-y-2 p-2 w-full">
          {cartItems.map((product) => (
            <div key={product.ALBEDOcodigo} className="rounded-lg">
              <div className="flex flex-row border-b w-full justify-between sm:py-4 py-2 border-gray-300">
                <img
                  src={product.imagens[0]}
                  alt="product-image"
                  className="w-[160px] h-[100px] object-contain rounded-lg"
                  priority="true"
                />
                <div className="flex flex-col justify-between items-end ">
                  <h1 className="font-bold w-full text-right">
                    {product.ALBEDOtitulo} ({product.ALBEDOcodigo})
                  </h1>
                  <div className="flex flex-row justify-center items-center space-x-4 ">
                    <div className="flex items-center border-gray-100">
                      <span
                        onClick={() => {
                          if (product.quantity > 1) {
                            updateCartItem(
                              product.ALBEDOcodigo,
                              product.quantity - 1
                            );
                          }
                        }}
                        className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-[#304590] hover:text-blue-50 select-none"
                      >
                        {" "}
                        -{" "}
                      </span>
                      <input
                        className="h-8 w-12 border bg-white text-center text-sm outline-none number-input"
                        type="number"
                        value={product.quantity}
                        max={product.ALBEDOstock}
                        min="1"
                        onChange={(e) => {
                          const newQuantity = parseInt(e.target.value);
                          if (
                            !isNaN(newQuantity) &&
                            newQuantity >= 1 &&
                            newQuantity <= product.ALBEDOstock
                          ) {
                            updateCartItem(
                              product.ALBEDOcodigo,
                              newQuantity
                            );
                          }
                        }}
                      />
                      <span
                        onClick={() => {
                          if (product.quantity < product.ALBEDOstock) {
                            updateCartItem(
                              product.ALBEDOcodigo,
                              product.quantity + 1
                            );
                          }
                        }}
                        className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-[#304590] hover:text-blue-50 select-none"
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
                      className="w-6 h-6 cursor-pointer hover:text-red-700"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                      />
                    </svg>
                  </div>
                  <div className="flex flex-row space-x-2">
                    <p>Total por producto:</p>
                    <h1 className="font-semibold">
                      {(product.ALBEDOprecio * product.quantity).toFixed(2)} €
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-row justify-center p-4 no-scrollbar">
          <div className="flex flex-col justify-center self-center items-center">
            <svg
              fill="#c0c0c0"
              height="64px"
              width="64px"
              viewBox="0 0 231.523 231.523"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <g>
                  <path d="M107.415,145.798c0.399,3.858,3.656,6.73,7.451,6.73c0.258,0,0.518-0.013,0.78-0.04c4.12-0.426,7.115-4.111,6.689-8.231 l-3.459-33.468c-0.426-4.12-4.113-7.111-8.231-6.689c-4.12,0.426-7.115,4.111-6.689,8.231L107.415,145.798z"></path>
                  <path d="M154.351,152.488c0.262,0.027,0.522,0.04,0.78,0.04c3.796,0,7.052-2.872,7.451-6.73l3.458-33.468 c0.426-4.121-2.569-7.806-6.689-8.231c-4.123-0.421-7.806,2.57-8.232,6.689l-3.458,33.468 C147.235,148.377,150.23,152.062,154.351,152.488z"></path>
                  <path d="M96.278,185.088c-12.801,0-23.215,10.414-23.215,23.215c0,12.804,10.414,23.221,23.215,23.221 c12.804,0,23.217-10.417,23.217-23.221C119.495,195.501,109.082,185.088,96.278,185.088z M96.278,216.524 c-4.505,0-8.181-3.676-8.181-8.221s3.676-8.215,8.181-8.215c4.505,0,8.182,3.67,8.182,8.215 S100.783,216.524,96.278,216.524z"></path>
                  <path d="M160.032,185.088c-12.801,0-23.217,10.414-23.217,23.215c0,12.804,10.416,23.221,23.217,23.221 c12.801,0,23.215-10.417,23.215-23.221C183.247,195.501,172.834,185.088,160.032,185.088z M160.032,216.524 c-4.505,0-8.181-3.676-8.181-8.221s3.676-8.215,8.181-8.215c4.505,0,8.182,3.67,8.182,8.215 S164.537,216.524,160.032,216.524z"></path>
                  <path d="M218.025,47.896c-2.402-3.025-6.007-4.785-9.846-4.785H65.097L60.591,18.64c-1.383-7.076-7.646-12.064-14.85-12.064 H15c-4.143,0-7.5,3.357-7.5,7.5s3.357,7.5,7.5,7.5h30.742c0.887,0,1.665,0.629,1.833,1.498l28.41,145.463 c1.384,7.076,7.646,12.064,14.85,12.064h107.57c4.143,0,7.5-3.357,7.5-7.5s-3.357-7.5-7.5-7.5H90.835 c-0.888,0-1.666-0.629-1.833-1.498l-4.691-24.025c0.644,0.105,1.299,0.163,1.965,0.163h107.57c6.84,0,12.444-2.76,14.846-4.785 c4.315-3.541,6.516-8.645,6.053-14.121L218.025,47.896z M202.639,138.104c-0.167,1.705-1.751,4.5-6.053,4.5H89.015 c-0.887,0-1.664-0.629-1.832-1.498L62.404,45.611h145.674L202.639,138.104z"></path>
                </g>
              </g>
            </svg>
            <p className="text-[#c0c0c0]">No tienes productos en el carrito</p>
          </div>
        </div>
      )}
    </div>
  );
}
