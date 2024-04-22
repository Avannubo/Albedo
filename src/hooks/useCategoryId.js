import { useEffect, useState } from 'react';

export default function useCategoryId() {
  const [categoryId, setCategoryId] = useState(null);

  useEffect(() => {
    const getCategoryFromURL = () => {
      const currentUrl = window.location.href;
      const urlParts = currentUrl.split('/');
      const categoryIndex = urlParts.indexOf('products');

      if (categoryIndex !== -1) {
        const Ids = urlParts.slice(categoryIndex + 1);
        return Ids;
      } else {
        return null;  
      }
    };

    setCategoryId(getCategoryFromURL());

    const handleURLChange = () => {
      setCategoryId(getCategoryFromURL());
    };

    window.addEventListener('popstate', handleURLChange);
    window.addEventListener('pushState', handleURLChange);

    return () => {
      window.removeEventListener('popstate', handleURLChange);
      window.removeEventListener('pushState', handleURLChange);
    };
  }, []);

  return categoryId;
}
