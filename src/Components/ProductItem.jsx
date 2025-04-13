import React, { useEffect, useState } from 'react';
import productsData from '../sports_products.json';
import CategorySlider from './CategorySlider';

const SportsProduct = () => {
  const [productsByCategory, setProductsByCategory] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const grouped = {};
    productsData.products.forEach((product) => {
      const category = product.category.toLowerCase();
      if (!grouped[category]) {
        grouped[category] = [];
      }
      grouped[category].push(product);
    });
    setProductsByCategory(grouped);
    setLoading(false);
  }, []);

  return (
    <div className="container mx-auto px-4 py-10">
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      ) : (
        Object.entries(productsByCategory).map(([category, products]) => (
          <CategorySlider key={category} title={category} products={products} />
        ))
      )}
    </div>
  );
};

export default SportsProduct;
