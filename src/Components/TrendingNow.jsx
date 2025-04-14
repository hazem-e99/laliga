import React from 'react';
import productsData from '../sports_products.json';
import CategorySlider from './CategorySlider';
import { useTranslation } from 'react-i18next';
const TrendingNow = () => {
  const isTrending = productsData.products.filter(
    (product) => product.isTrending === true
  );
  const { t } = useTranslation(); 
  return <CategorySlider title= {t("trending_now")}products={isTrending} />;
};

export default TrendingNow;
