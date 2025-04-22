import React from 'react';
import productsData from '../sports_products.json';
import CategorySlider from './CategorySlider';
import { useTranslation } from 'react-i18next';

const Accessories = ({ priceFilter, ratingFilter, searchTerm, categoryFilter }) => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;

  // ❌ لا تعرض الكاتيجوري دي لو الفلتر مش محددها
  if (categoryFilter && categoryFilter !== 'Accessories') {
    return null;
  }

  // فلترة منتجات الاكسسوارات
  const allAccessories = productsData.products.filter(
    (product) => product.category?.en?.toLowerCase() === 'accessories'
  );

  // فلترة حسب السعر
  const filteredByPrice = priceFilter
    ? allAccessories.filter((product) => {
        const price = product.price;
        if (priceFilter === '0-50') return price < 50;
        if (priceFilter === '50-100') return price >= 50 && price <= 100;
        if (priceFilter === '100-200') return price >= 100 && price <= 200;
        if (priceFilter === '200+') return price > 200;
        return true;
      })
    : allAccessories;

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
    <div className="accessories-section">
      <CategorySlider title={t("accessories")} products={filteredBySearchTerm} />

      {filteredBySearchTerm.length === 0 && (
        <div className="no-products-message">
          {t('noAccessoriesFound')}
        </div>
      )}
    </div>
  );
};

export default Accessories;
