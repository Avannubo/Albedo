import { useEffect, useState } from 'react';

export default function useProductId() {
  const [categoryId, setCategoryId] = useState(null);

  useEffect(() => {
    // Function to extract category ID from the URL
    const getCategoryFromURL = () => {
      // Get the current URL
      const currentUrl = window.location.href;
      // Split the URL by '/'
      const urlParts = currentUrl.split('/');
      // Find the index of the 'categorias' segment in the URL
      const categoryIndex = urlParts.indexOf('productos');
      // If 'categorias' segment exists in the URL
      if (categoryIndex !== -1) {
        // Extract the category ID from the next segment in the URL
        const categoryId = urlParts[categoryIndex + 1];
        return categoryId;
      } else {
        // 'categorias' segment not found in the URL
        return null;
      }
    };

    // Set category ID on component mount
    setCategoryId(getCategoryFromURL());

    // Listen for URL changes and update category ID accordingly
    const handleURLChange = () => {
      setCategoryId(getCategoryFromURL());
    };

    window.addEventListener('popstate', handleURLChange);
    window.addEventListener('pushState', handleURLChange);

    // Clean up event listeners
    return () => {
      window.removeEventListener('popstate', handleURLChange);
      window.removeEventListener('pushState', handleURLChange);
    };
  }, []); // Only run once on component mount

  return categoryId;
}
