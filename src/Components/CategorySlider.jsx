import React from 'react';
//
import { useNavigate } from 'react-router-dom';
//
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { FaHeart, FaShoppingCart, FaStar } from 'react-icons/fa';

const ProductCard = ({ product }) => {
  const navigate = useNavigate(); 

  const handleDetailsClick = () => {
    navigate(`/product/${product.id}`); //  بتروح  للصفحة بتاعة تفاصيل المنتج
  };
 

  console.log('product in card:', product);

  return (
    <div className="w-full max-w-[240px]">
      <div className="card bg-base-100 shadow-xl h-full">
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
              <span>{product.rating.rate}</span>
            </div>
          </div>
          <div className="card-actions justify-end mt-4 gap-2">
            <button className="btn btn-sm btn-outline btn-primary">
              <FaShoppingCart />
            </button>
            <button className="btn btn-sm btn-outline btn-error">
              <FaHeart />
            </button>
            <button 
              className="btn btn-sm btn-outline btn-info"
              onClick={handleDetailsClick} 
            >
              Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


/////////////////////////////

const CategorySlider = ({ title, products }) => {
  return (
    <section className="mb-16">
      <h2 className="text-3xl font-bold text-center text-primary mb-6 border-b-2 border-primary pb-2 shadow-sm capitalize">
        {title}
      </h2>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <ProductCard product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default CategorySlider;
