"use client";
import React, { useState } from "react";
import AddToCart from "./addToCart";

export default function productItem() {
  const producto = {
    id: "dsfsdfds",
    nombre: "sdiohfisu",
    precio: "17€",
  };
  return (
    <div>
      <div>
        <div className="cursor-pointer w-50 flex flex-col items-start justify-center space-y-2 p-1 mb-4 ">
          <h2 className="text-[#304590] font-bold self-center">
            IndoorNavBasic
          </h2>
          <p className="text-[12px] self-center">
            <strong>Precio:</strong> 7.200,00€ +IVA{" "}
          </p>
          <img
            src="/images/home/imagen.small.png"
            alt="Vercel Logo"
            className="self-center"
            width={100}
            height={24}
            priority
          />
          <p className="text-[12px] text-justify">
            Pack para crear y mantener su sisterma de guía accesible en su museo
            o exposición. Con 20 balizas.
          </p>
        </div>
        <AddToCart producto={producto} />
      </div>
    </div>
  );
}
