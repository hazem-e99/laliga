import React from 'react';
import productsData from '../sports_products.json';
import CategorySlider from './CategorySlider';

const TrendingNow = () => {
  const isTrending = productsData.products.filter(
    (product) => product.isTrending === true
  );

  return <CategorySlider title="Trending now" products={isTrending} />;
};

export default TrendingNow;
