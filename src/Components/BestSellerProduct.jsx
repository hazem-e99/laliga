import React from 'react';
import productsData from '../sports_products.json';
import CategorySlider from './CategorySlider';

const Bestseller = () => {
  const bestSellerProducts = productsData.products.filter(
    (product) => product.isBestSeller === true
  );

  return <CategorySlider title="Best Seller" products={bestSellerProducts} />;
};

export default Bestseller;
