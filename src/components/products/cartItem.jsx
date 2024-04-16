'use client'
import React, { useState, useEffect } from "react";
export default function CartItem() {
  const [cartItems, setCartItems] = useState([]);
  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem("carrito"));
    if (storedCartItems) {
      setCartItems(storedCartItems);
    }
  }, []);
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
        <div className="space-y-2 p-2">
          {cartItems.map((product) => (
            <div key={product.ALBEDOcodigo} className="rounded-lg ">
              <div className="flex flex-row border-b  justify-between py-4 px-8  border-gray-300">
                <img
                  src={product.imagen}
                  alt="product-image"
                  className="w-[160px] h-[100px] object-contain "
                  priority
                />
                <div className="flex flex-col justify-between items-end ">
                  <h1 className="font-bold w-full text-right">{product.ALBEDOtitulo} ({product.ALBEDOcodigo})</h1>
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
                    <p>
                      Total por producto:
                    </p>
                    <h1 className="font-semibold">{product.ALBEDOprecio * product.quantity} €</h1>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
          <div className="flex flex-row justify-center p-4 no-scrollbar">
            <div className="flex flex-col justify-center self-center items-center">
              <svg fill="#c0c0c0" height="64px" width="64px" viewBox="0 0 231.523 231.523">
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                <g id="SVGRepo_iconCarrier"> <g>
                  <path d="M107.415,145.798c0.399,3.858,3.656,6.73,7.451,6.73c0.258,0,0.518-0.013,0.78-0.04c4.12-0.426,7.115-4.111,6.689-8.231 l-3.459-33.468c-0.426-4.12-4.113-7.111-8.231-6.689c-4.12,0.426-7.115,4.111-6.689,8.231L107.415,145.798z"></path>
                  <path d="M154.351,152.488c0.262,0.027,0.522,0.04,0.78,0.04c3.796,0,7.052-2.872,7.451-6.73l3.458-33.468 c0.426-4.121-2.569-7.806-6.689-8.231c-4.123-0.421-7.806,2.57-8.232,6.689l-3.458,33.468 C147.235,148.377,150.23,152.062,154.351,152.488z"></path> 
                  <path d="M96.278,185.088c-12.801,0-23.215,10.414-23.215,23.215c0,12.804,10.414,23.221,23.215,23.221 c12.801,0,23.216-10.417,23.216-23.221C119.494,195.502,109.079,185.088,96.278,185.088z M96.278,216.523 c-4.53,0-8.215-3.688-8.215-8.221c0-4.53,3.685-8.215,8.215-8.215c4.53,0,8.216,3.685,8.216,8.215 C104.494,212.835,100.808,216.523,96.278,216.523z"></path>
                  <path d="M173.719,185.088c-12.801,0-23.216,10.414-23.216,23.215c0,12.804,10.414,23.221,23.216,23.221 c12.802,0,23.218-10.417,23.218-23.221C196.937,195.502,186.521,185.088,173.719,185.088z M173.719,216.523 c-4.53,0-8.216-3.688-8.216-8.221c0-4.53,3.686-8.215,8.216-8.215c4.531,0,8.218,3.685,8.218,8.215 C181.937,212.835,178.251,216.523,173.719,216.523z"></path> 
                  <path d="M218.58,79.08c-1.42-1.837-3.611-2.913-5.933-2.913H63.152l-6.278-24.141c-0.86-3.305-3.844-5.612-7.259-5.612H18.876 c-4.142,0-7.5,3.358-7.5,7.5s3.358,7.5,7.5,7.5h24.94l6.227,23.946c0.031,0.134,0.066,0.267,0.104,0.398l23.157,89.046 c0.86,3.305,3.844,5.612,7.259,5.612h108.874c3.415,0,6.399-2.307,7.259-5.612l23.21-89.25C220.49,83.309,220,80.918,218.58,79.08z M183.638,165.418H86.362l-19.309-74.25h135.895L183.638,165.418z"></path> 
                  <path d="M105.556,52.851c1.464,1.463,3.383,2.195,5.302,2.195c1.92,0,3.84-0.733,5.305-2.198c2.928-2.93,2.927-7.679-0.003-10.607 L92.573,18.665c-2.93-2.928-7.678-2.927-10.607,0.002c-2.928,2.93-2.927,7.679,0.002,10.607L105.556,52.851z"></path> 
                  <path d="M159.174,55.045c1.92,0,3.841-0.733,5.306-2.199l23.552-23.573c2.928-2.93,2.925-7.679-0.005-10.606 c-2.93-2.928-7.679-2.925-10.606,0.005l-23.552,23.573c-2.928,2.93-2.925,7.679,0.005,10.607 C155.338,54.314,157.256,55.045,159.174,55.045z"></path> 
                  <path d="M135.006,48.311c0.001,0,0.001,0,0.002,0c4.141,0,7.499-3.357,7.5-7.498l0.008-33.311c0.001-4.142-3.356-7.501-7.498-7.502 c-0.001,0-0.001,0-0.001,0c-4.142,0-7.5,3.357-7.501,7.498l-0.008,33.311C127.507,44.951,130.864,48.31,135.006,48.311z"></path> </g> </g></svg>
          <h1 className="">No hay productos en el carrito</h1>
        </div></div>
      )}
    </div>
  );
}
