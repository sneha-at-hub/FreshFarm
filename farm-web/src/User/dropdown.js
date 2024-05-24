import React, { useState } from 'react';
import './dropdown.css';

const Dropdown = ({ handleCategoryChange, selectedCategory }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="custom-dropdown">
      <div className="selected-option" onClick={toggleDropdown}>
        <span className="option-text">{selectedCategory ? selectedCategory : "All Categories"}</span>
        <span className={`dropdown-icon ${isOpen ? 'open' : ''}`}>&#9662;</span>
      </div>
      <div className={`options ${isOpen ? 'open' : ''}`}>
        <div className="option" onClick={() => handleCategoryChange("")}>All Categories</div>
        <div className="option" onClick={() => handleCategoryChange("Vegetables")}>Vegetables</div>
        <div className="option" onClick={() => handleCategoryChange("Fruits")}>Fruits</div>
        <div className="option" onClick={() => handleCategoryChange("Dairy Products")}>Dairy Products</div>
        {/* Add more options as needed */}
      </div>
    </div>
  );
};

export default Dropdown;
