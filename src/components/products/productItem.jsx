"use client";
import Link from "next/link";

import AddToCart from "./addToCart";

export default function productItem({ product }) {
  return (
    <div className="w-[250px] mt-6 h-auto flex flex-col justify-between">
      <div className="cursor-pointer flex flex-col items-start justify-center space-y-2 p-1 mb-4 ">
        <h2 className="text-[#304590] font-bold self-center">
          {product.ALBEDOtitulo}
        </h2>
        <p className="text-md self-center">
          <strong>Precio:</strong> {product.ALBEDOprecio}€ + IVA
        </p>
        <img
          src={product.imagen}
          alt="Vercel Logo"
          className="self-center h-[150px] w-full object-contain"

        />
        <p className="text-md text-justify">
          {product.ALBEDOdescripcion}
        </p>
      </div>
    </div>
  );
}
