"use client";
import React, { useState, useEffect } from "react";

function cartLength() {
  const [cartProducts, setCartProducts] = useState();

  // useEffect(() => {
  //   setCartProducts(JSON.parse(localStorage.getItem("carrito")));
  // }, []);

  return (
    <>
      {cartProducts && cartProducts.length > 0 && (
        <p className="bg-white text-red-700 text-center text-xs font-extrabold rounded-full h-4 w-4 -ml-3">
          {cartProducts.length}
        </p>
      )}
    </>
  );
}

export default cartLength;
