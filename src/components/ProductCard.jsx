import React from 'react';
import { ShoppingBag, ArrowUpRight } from '@phosphor-icons/react';
import './ProductCard.css';

const ProductCard = ({ product, onAddToCart }) => {
  return (
    <div className="product-card glass">
      <div className="card-image-container">
        <div className="card-glow" style={{ background: product.glowColor }}></div>
        <img src={product.image} alt={product.name} className="product-image" />
        <span className="price-tag">${product.price}</span>
      </div>
      
      <div className="card-content">
        <div className="card-header">
          <h3 className="product-name">{product.name}</h3>
          <p className="product-category">{product.category}</p>
        </div>
        
        <div className="card-actions">
          <button className="btn-icon add-cart" onClick={() => onAddToCart(product)}>
            <ShoppingBag size={20} />
          </button>
          <button className="btn-icon view-details">
            <ArrowUpRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
