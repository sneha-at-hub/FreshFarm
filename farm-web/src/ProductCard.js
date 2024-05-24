import React from 'react';
import ProductCard from './ProductCard'; // Assuming you have a ProductCard component

const Landing = () => {
  // Dummy product data for demonstration
  const products = [
    {
      id: 1,
      name: 'Product 1',
      price: 19.99,
      imageUrl: 'https://via.placeholder.com/150',
    },
    {
      id: 2,
      name: 'Product 2',
      price: 29.99,
      imageUrl: 'https://via.placeholder.com/150',
    },
    {
      id: 3,
      name: 'Product 3',
      price: 39.99,
      imageUrl: 'https://via.placeholder.com/150',
    },
  ];

  return (
    <div>
      <h1>Welcome to our E-Commerce Store</h1>
      <div className="product-list">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Landing;
