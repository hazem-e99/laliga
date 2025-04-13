import React from 'react';
import productsData from '../sports_products.json';
import CategorySlider from './CategorySlider';

const Shorts = ({ priceFilter, ratingFilter, searchTerm }) => {
  const allShorts = productsData.products.filter(
    (product) => product.category.toLowerCase() === 'shorts'
  );

  const filteredByPrice = priceFilter
    ? allShorts.filter((product) => {
        const price = product.price;
        if (priceFilter === '0-50') return price < 50;
        if (priceFilter === '50-100') return price >= 50 && price <= 100;
        if (priceFilter === '100-200') return price >= 100 && price <= 200;
        if (priceFilter === '200+') return price > 200;
        return true;
      })
    : allShorts;

  const filteredByRating = ratingFilter
    ? filteredByPrice.filter((product) => product.rating.rate >= ratingFilter)
    : filteredByPrice;

  const filteredBySearchTerm = searchTerm
    ? filteredByRating.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : filteredByRating;

  return (
    <div className="shorts-section">
      <CategorySlider title="Shorts" products={filteredBySearchTerm} />
      
      {filteredBySearchTerm.length === 0 && (
        <div className="no-products-message">
          No shorts found matching your filters.
        </div>
      )}
    </div>
  );
};

export default Shorts;
