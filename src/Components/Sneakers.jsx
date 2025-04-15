import React from 'react';
import productsData from '../sports_products.json';
import CategorySlider from './CategorySlider';
import { useTranslation } from 'react-i18next';

const Sneakers = ({ priceFilter, ratingFilter, searchTerm }) => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;

  // فلترة حسب الفئة
  const allSneakers = productsData.products.filter(
    (product) => product.category?.en?.toLowerCase() === 'sneakers'
  );

  // فلترة حسب السعر
  const filteredByPrice = priceFilter
    ? allSneakers.filter((product) => {
        const price = product.price;
        if (priceFilter === '0-50') return price < 50;
        if (priceFilter === '50-100') return price >= 50 && price <= 100;
        if (priceFilter === '100-200') return price >= 100 && price <= 200;
        if (priceFilter === '200+') return price > 200;
        return true;
      })
    : allSneakers;

  // فلترة حسب التقييم
  const filteredByRating = ratingFilter
    ? filteredByPrice.filter((product) => product.rating.rate >= ratingFilter)
    : filteredByPrice;

  // فلترة حسب البحث
  const filteredBySearchTerm = searchTerm
    ? filteredByRating.filter((product) => {
        const title = product.title?.[currentLang]?.toLowerCase() || '';
        return title.includes(searchTerm.toLowerCase());
      })
    : filteredByRating;

  return (
    <div className="sneakers-section">
      <CategorySlider title={t('sneakers')} products={filteredBySearchTerm} />

      {filteredBySearchTerm.length === 0 && (
        <div className="no-products-message">
          {t('no_sneakers_found')}
        </div>
      )}
    </div>
  );
};

export default Sneakers;
