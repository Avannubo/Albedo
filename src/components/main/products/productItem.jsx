"use client";
import Link from "next/link";
import AddToCart from "./addToCart";
import DOMPurify from 'dompurify'; // Import DOMPurify for HTML sanitization
import Image from "next/image";

// Function to sanitize HTML
const sanitizeHTML = (html) => {
  if (!html) return ''; // Return empty string if html is null or undefined
  return DOMPurify.sanitize(html); // Sanitize html using DOMPurify
};

export default function ProductItem({ product }) {
  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      // Find the last space before maxLength to avoid cutting off words
      let truncated = text.substring(0, maxLength);
      if (text[maxLength] !== " ") {
        truncated = truncated.substring(0, truncated.lastIndexOf(" "));
      }
      return truncated + "...";
    }
    return text;
  };

  const titleWords = product.ALBEDOtitulo.split(" ");
  // Get the first two words
  const truncatedTitle = titleWords.slice(0, 2).join(" ");
  return (
    <div className="h-[260px] flex flex-col justify-evenly cursor-pointer space-y-2">
      <div className="flex flex-col justify-evenly ">
        <h2 className="text-[#304590] font-bold text-center max-h-[32px]">
          {truncatedTitle}
        </h2>
        <p className="text-md self-center">
          <strong>Precio:</strong> {product.ALBEDOprecio}€ + IVA
        </p>
      </div>

      <img
        src={product.imagens[0]}
        alt="Image"
        className="self-center h-[150px] sm:h-[200px]  md:h-[150px] w-full object-contain rounded-lg"
        width={500}
        height={550}
      />
      {/* <p className="text-sm text-center" dangerouslySetInnerHTML={{ __html: sanitizeHTML(product.ALBEDOdescripcion.substring(0, 55) + "...") }} /> */}
    </div>
  );
}
