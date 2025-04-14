import React from 'react';
import productsData from '../sports_products.json';
import CategorySlider from './CategorySlider';
import { useTranslation } from 'react-i18next';
const Bestseller = () => {
  const bestSellerProducts = productsData.products.filter(
    (product) => product.isBestSeller === true
  );
  const { t } = useTranslation(); 
  return <CategorySlider title= {t("best_seller")} products={bestSellerProducts} />;
};

export default Bestseller;
