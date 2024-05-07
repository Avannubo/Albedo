"use client";
import React, { useState, useEffect } from "react";

function CartLength() {
  const [cartProducts, setCartProducts] = useState();

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (typeof window !== 'undefined') {
        setCartProducts(JSON.parse(localStorage.getItem("carrito")));
      }
    }, 500);

    // Clear the interval on component unmount to prevent memory leaks
    return () => clearInterval(intervalId);
  }, []);
  const totalQuantity = cartProducts ? cartProducts.reduce((total, product) => total + product.quantity, 0) : 0;

  return (
    <>
      {cartProducts && cartProducts.length > 0 && (
        <div className="bg-red-600 text-white flex justify-center rounded-full h-4 w-4 -ml-3">
          <p className=" self-center  text-[10px] font-bold ">
          {totalQuantity}
        </p>
        </div>
        
      )}
    </>
  );
}

export default CartLength;
