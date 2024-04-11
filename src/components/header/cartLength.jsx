"use client";
import React, { useState, useEffect } from "react";

function CartLength() {
  const [cartProducts, setCartProducts] = useState();

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCartProducts(JSON.parse(localStorage.getItem("carrito")));
    }, 500);

    // Clear the interval on component unmount to prevent memory leaks
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      {cartProducts && cartProducts.length > 0 && (
        <p className="bg-red-600 text-white text-center text-xs font-extrabold rounded-full h-4 w-4 -ml-3">
          {cartProducts.length}
        </p>
      )}
    </>
  );
}

export default CartLength;
