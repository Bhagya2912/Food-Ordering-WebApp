import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate('/product-detail', { state: product })}
      className="cursor-pointer bg-white rounded-lg shadow-md p-4 hover:shadow-lg"
    >
      <img src={product.image} alt={product.name} className="w-full h-40 object-cover rounded-md" />
      <h3 className="text-lg font-bold mt-2">{product.name}</h3>
      <p className="text-sm text-gray-600 mt-1">{product.description}</p>
      <div className="mt-2 text-orange-600 font-semibold">₹{product.price}</div>
        <div className="mt-2 text-orange-600 font-semibold">₹{product.sizes}</div>
    </div>
  );
};

export default ProductCard;
