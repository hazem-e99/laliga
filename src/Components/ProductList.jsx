import React, { useEffect, useState, useContext } from 'react';
import { FaHeart, FaShoppingCart, FaStar } from 'react-icons/fa';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { CartContext } from '../Contexts/cartContext';
import { WishlistContext } from '../Contexts/wishlistContext';
import { Link } from 'react-router-dom'; // <-- إضافة هذا الاستيراد
import { useTranslation } from 'react-i18next';
// استيراد ملف JSON
import productsData from '../sports_products.json';  // تأكد من المسار الصحيح
const { t } = useTranslation();
const ProductCard = ({ product }) => {
  const { addProductToCart } = useContext(CartContext); 
  const { addToWishlist } = useContext(WishlistContext); 

  return (
    <div className="px-2 m-3">
      <div style={{
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)', 
          transition: 'box-shadow 0.3s ease',
        }} className="card bg-base-100 shadow-xl">
        <figure className="px-4 pt-4">
          <img src={product.image} alt={product.title} className="h-40 object-contain" />
        </figure>
        <div className="card-body">
          <h2 className="card-title text-base line-clamp-2">{product.title}</h2>
          <p className="text-sm text-gray-500 line-clamp-2">{product.description}</p>
          <div className="flex items-center justify-between mt-2">
            <span className="text-lg font-bold text-primary">${product.price.toFixed(2)}</span>
            <div className="flex items-center gap-1 text-yellow-500">
              <FaStar />
              <span>{product.rate}</span>
            </div>
          </div>
          <div className="card-actions justify-end mt-4 gap-2">
            <button
              className="btn btn-sm btn-outline btn-primary"
              onClick={() => addProductToCart(product)} >
              <FaShoppingCart />
            </button>
            <button className="btn btn-sm btn-outline btn-error"
              onClick={() => addToWishlist(product)} 
            >
              <FaHeart />
            </button>
            <Link 
              to={`/product/${product.id}`} 
              className="btn btn-sm btn-outline btn-info"
            >
               {t('product.details')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const SportsProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setProducts(productsData.products);  
    setLoading(false);
  }, []);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4, 
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="container mx-auto px-4 py-6 m-3">
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      ) : (
        <Slider {...sliderSettings} >
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </Slider>
      )}
    </div>
  );
};

export default SportsProducts;
