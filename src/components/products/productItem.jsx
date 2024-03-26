"use client";

import AddToCart from "./addToCart";

export default function productItem({ product }) {
  console.log(product);
  return (
    <div>
      <div className="w-[250px] h-[280px] flex flex-col justify-between">
        <div className="cursor-pointer flex flex-col items-start justify-center space-y-2 p-1 mb-4 ">
          <h2 className="text-[#304590] font-bold self-center">
            {product.ALBEDOtitulo}
          </h2>
          <p className="text-[12px] self-center">
            <strong>Precio:</strong> {product.ALBEDOprecio}€ + IVA
          </p>
          <img
            src={product.imagen}
            alt="Vercel Logo"
            className="self-center h-[100px]"
            priority
          />
          <p className="text-[12px] text-justify">
            {product.ALBEDOdescripcion}
          </p>
        </div>
        <AddToCart producto={product} />
      </div>
    </div>
  );
}
