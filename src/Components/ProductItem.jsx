import React, { useEffect, useState } from 'react';
import { FaHeart, FaShoppingCart, FaStar } from 'react-icons/fa';

const ProductCard = ({ product }) => {
  return (
    <div className="p-4">
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
            <button className="btn btn-sm btn-outline btn-info">
              Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const SportsProduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch('https://fakestoreapi.com/products');
      const data = await res.json();
      setProducts(data.slice(0, 4)); // عرض 4 منتجات فقط
      setLoading(false);
    };
    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto px-4 py-10">
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SportsProduct;
