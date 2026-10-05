import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ProductCard from './components/ProductCard';
import CartSidebar from './components/CartSidebar';

function App() {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch products from the backend API
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        if (!response.ok) throw new Error('Failed to fetch data');
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setCartOpen(true); // Automatically open cart
  };

  const handleUpdateQuantity = (id, quantity) => {
    if (quantity < 1) {
      handleRemoveItem(id);
      return;
    }
    setCartItems(prev => prev.map(item => item.id === id ? { ...item, quantity } : item));
  };

  const handleRemoveItem = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const handleCheckout = async () => {
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ cartItems })
      });
      const data = await response.json();
      if (response.ok) {
        alert(data.message + ' Order ID: ' + data.orderId);
        setCartItems([]);
        setCartOpen(false);
      } else {
        alert('Checkout failed: ' + data.error);
      }
    } catch (err) {
      alert('Error connecting to backend for checkout.');
    }
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="app-container">
      <Navbar cartCount={cartCount} onOpenCart={() => setCartOpen(true)} />
      
      <main>
        <HeroSection />
        
        <section className="catalog-section container" id="new">
          <div className="section-header">
            <h2>Latest Drops</h2>
            <p>Explore our newest collection of futuristic footwear.</p>
          </div>
          
          {loading ? (
            <div style={{ textAlign: 'center', padding: '5rem 0', color: 'var(--accent-color)' }}>
              <h3>Loading catalog...</h3>
            </div>
          ) : error ? (
            <div style={{ textAlign: 'center', padding: '5rem 0', color: '#ff4757' }}>
              <h3>Error: {error}</h3>
              <p>Is the backend running on port 5000?</p>
            </div>
          ) : (
            <div className="product-grid" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '30px',
              paddingTop: '2rem',
              paddingBottom: '5rem'
            }}>
              {products.map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onAddToCart={handleAddToCart} 
                />
              ))}
            </div>
          )}
        </section>
      </main>

      <CartSidebar 
        isOpen={cartOpen} 
        onClose={() => setCartOpen(false)} 
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckout}
      />
      
      <footer style={{
        textAlign: 'center',
        padding: '3rem',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        color: 'var(--text-secondary)'
      }}>
        <p>&copy; 2026 VELOCITY Footwear. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
