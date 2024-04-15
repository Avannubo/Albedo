"use client";
import Link from "next/link";

import AddToCart from "./addToCart";

export default function productItem({ product }) {
  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength - 3) + "...";
    } else {
      return text;
    }
  };

  return (
    <div className="h-auto flex flex-col justify-between cursor-pointer space-y-2">
      <h2 className="text-[#304590] font-bold text-center">
        {product.ALBEDOtitulo}
      </h2>
      <p className="text-md self-center">
        <strong>Precio:</strong> {product.ALBEDOprecio}€ + IVA
      </p>
      <img
        src={product.imagen}
        alt="Vercel Logo"
        className="self-center h-[150px] w-full object-cover rounded-lg"

      />
      <p className="text-sm text-center">
        {truncateText(product.ALBEDOdescripcion, 70)}
      </p>
    </div>
  );
}
