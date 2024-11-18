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
                  className="w-[160px] h-[100px] object-cover rounded-lg"
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
              <svg width="64px" height="64px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M7.5 18C8.32843 18 9 18.6716 9 19.5C9 20.3284 8.32843 21 7.5 21C6.67157 21 6 20.3284 6 19.5C6 18.6716 6.67157 18 7.5 18Z" stroke="#c0c0c0" stroke-width="1.5"></path> <path d="M16.5 18.0001C17.3284 18.0001 18 18.6716 18 19.5001C18 20.3285 17.3284 21.0001 16.5 21.0001C15.6716 21.0001 15 20.3285 15 19.5001C15 18.6716 15.6716 18.0001 16.5 18.0001Z" stroke="#c0c0c0" stroke-width="1.5"></path> <path d="M9.5 9L10.0282 12.1179" stroke="#c0c0c0" stroke-width="1.5" stroke-linecap="round"></path> <path d="M15.5283 9L15.0001 12.1179" stroke="#c0c0c0" stroke-width="1.5" stroke-linecap="round"></path> <path d="M2 3L2.26121 3.09184C3.5628 3.54945 4.2136 3.77826 4.58584 4.32298C4.95808 4.86771 4.95808 5.59126 4.95808 7.03836V9.76C4.95808 12.7016 5.02132 13.6723 5.88772 14.5862C6.75412 15.5 8.14857 15.5 10.9375 15.5H12M16.2404 15.5C17.8014 15.5 18.5819 15.5 19.1336 15.0504C19.6853 14.6008 19.8429 13.8364 20.158 12.3075L20.6578 9.88275C21.0049 8.14369 21.1784 7.27417 20.7345 6.69708C20.2906 6.12 18.7738 6.12 17.0888 6.12H11.0235M4.95808 6.12H7" stroke="#c0c0c0" stroke-width="1.5" stroke-linecap="round"></path> </g></svg>
            <p className="text-[#c0c0c0]">No tienes productos en el carrito</p>
          </div>
        </div>
      )}
    </div>
  );
}
