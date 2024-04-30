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
  function calculateSimilarity(str1, str2) {
    // Convert both strings to lowercase for case-insensitive comparison
    const lowerStr1 = str1.toLowerCase();
    const lowerStr2 = str2.toLowerCase();
    // Calculate the length of the longer string
    const maxLength = Math.max(lowerStr1.length, lowerStr2.length);
    // Calculate the Levenshtein distance (edit distance) between the two strings
    let distance = 0;
    for (let i = 0; i < maxLength; i++) {
      if (lowerStr1[i] !== lowerStr2[i]) {
        distance++;
      }
    }
    // Calculate similarity as a ratio of the distance to the maximum possible distance
    const similarity = 1 - distance / maxLength;
    // Return similarity as a value between 0 and 1
    return similarity;
  }

  const similarityThreshold = 0.5; // Set a threshold for similarity
  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength - 3) + "...";
    } else {
      return text;
    }
  };
  const titleWords = product.ALBEDOtitulo.split(" ");
  // Get the first two words
  const truncatedTitle = titleWords.slice(0, 2).join(" ");
  return (
    <div className="h-auto flex flex-col justify-between cursor-pointer space-y-2">
      <h2 className="text-[#304590] font-bold text-center max-h-[32px]">
        {truncatedTitle}
        {calculateSimilarity(product.ALBEDOtitulo, product.ALBEDOcodigo) < similarityThreshold && (
          <b className="font-semibold ml-1 whitespace-nowrap">( {product.ALBEDOcodigo} )</b>
        )}
      </h2>
      <p className="text-md self-center">
        <strong>Precio:</strong> {product.ALBEDOprecio}€ + IVA
      </p>
      <Image
        src={product.imagens[0]}
        alt="Vercel Logo"
        className="self-center h-[150px] w-full object-cover rounded-lg"
        width={200}
        height={150}
      />
      <p className="text-sm text-center" dangerouslySetInnerHTML={{ __html: sanitizeHTML(truncateText(product.ALBEDOdescripcion, 65)) }} />
    </div>
  );
}
