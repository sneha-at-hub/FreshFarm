import React, { useState } from 'react';
import Nav from '../Nav';
import ProductListPage from './ProductListPage';
import { products } from './products';
import Footer from '../Components/AppFooter/footer';

const UserLanding = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const handleSearchChange = (value) => {
    setSearchTerm(value);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const filteredProducts = products.filter(product => {
    const categoryMatch = product.category && product.category.toLowerCase() === selectedCategory.toLowerCase();
    return (
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === '' || categoryMatch)
    );
  });

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
   
      {filteredProducts.length > 0 ? (
        <ProductListPage
          products={filteredProducts}
          onPageChange={handlePageChange}
          isFirstPage={currentPage === 1}
        />
      ) : (
        <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '18px', color: '#888' }}>No products found</div>
      )}
      <Footer />
    </>
  );
};

export default UserLanding;
