import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '../Styles/swiperCustom.css';
import { CartContext } from '../Contexts/cartContext';
import { WishlistContext } from '../Contexts/wishlistContext';
import { FaHeart, FaShoppingCart, FaStar, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const ProductCard = ({ product }) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { addProductToCart } = useContext(CartContext);
  const { addToWishlist } = useContext(WishlistContext);

  const handleDetailsClick = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div className="w-full max-w-[220px]">
      <div className="card bg-base-100 shadow-xl h-full">
        <figure className="px-4 pt-4">
          <img src={product.image} alt={product.title} className="h-40 object-contain" />
        </figure>
        <div className="card-body">
          <h2 className="card-title text-base line-clamp-2">{product.title[i18n.language]}</h2>
          <p className="text-sm text-gray-500 line-clamp-2">{product.description[i18n.language]}</p>
          <div className="flex items-center justify-between mt-2">
            <span className="text-lg font-bold text-primary">${product.price.toFixed(2)}</span>
            <div className="flex items-center gap-1 text-yellow-500">
              <FaStar />
              <span>{product.rating.rate}</span>
            </div>
          </div>
          <div className="card-actions justify-end mt-4 gap-2">
            <button className="btn btn-sm btn-outline btn-primary" onClick={() => addProductToCart(product)}>
              <FaShoppingCart />
            </button>
            <button className="btn btn-sm btn-outline btn-error" onClick={() => addToWishlist(product)}>
              <FaHeart />
            </button>
            <button className="btn btn-sm btn-outline btn-info" onClick={handleDetailsClick}>
              {t('product.details')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const CategorySlider = ({ title, products }) => {
  return (
    <section className="mb-16 relative">
      <h2 className="text-3xl font-bold text-center text-info bg-black mb-6 border-b-2 border-primary pb-2 shadow-sm capitalize">
        {title}
      </h2>

      <div className="relative">
        <button className="custom-prev absolute top-1/2 -left-6 transform -translate-y-1/2 z-10 bg-primary text-white p-2 rounded-full shadow hover:bg-primary/80 transition">
          <FaChevronLeft />
        </button>

        <Swiper
          className="p-5 relative overflow-visible"
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
          navigation={{
            nextEl: '.custom-next',
            prevEl: '.custom-prev',
          }}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
        >
          {products.map((product) => (
            <SwiperSlide key={product.id}>
              <ProductCard product={product} />
            </SwiperSlide>
          ))}
        </Swiper>

        <button className="custom-next absolute top-1/2 -right-6 transform -translate-y-1/2 z-10 bg-primary text-white p-2 rounded-full shadow hover:bg-primary/80 transition">
          <FaChevronRight />
        </button>
      </div>
    </section>
  );
};

export default CategorySlider;
