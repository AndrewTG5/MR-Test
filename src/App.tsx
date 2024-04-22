import React, { useState } from 'react';
import Product from './Product';

type SelectedProduct = {
  id: number;
  title: string;
  description: string;
  price: number;
  imageURL: string;
  size: string;
  quantity: number;
};

const App: React.FC = () => {
  const [cart, setCart] = useState<SelectedProduct[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (product: SelectedProduct) => {
    const existingProduct = cart.find(item => item.id === product.id && item.size === product.size);
    if (existingProduct) {
      setCart(cart.map(item => item.id === product.id && item.size === product.size ? { ...item, quantity: item.quantity + 1 } : item));
    } else {
      setCart([...cart, { ...product, size: product.size, quantity: 1 }]);
    }
  };

  return (
    <div style={{minHeight: '100vh'}}>
       <nav style={{ display: 'flex', justifyContent: 'space-between', background: '#F6F6F7' }}>
        <div></div>
        <div 
          onMouseEnter={() => setIsCartOpen(true)}
          onMouseLeave={() => setIsCartOpen(false)}
          style={{ position: 'relative' }}
        >
          <button 
            style={{ 
              margin: 0,
              background: '#f8f8f8', 
              color: '888888', 
              border: 'none', 
              cursor: 'pointer',
              transition: 'background 0.2s ease'
            }}
            onMouseOver={(e) => e.currentTarget.style.background = '#ffffff'}
            onMouseOut={(e) => e.currentTarget.style.background = '#F6F6F7'}
          >
            Cart ({cart.length})
          </button>
          {isCartOpen && (
            <div style={{
              position: 'absolute',
              right: 0,
              background: '#ffffff',
              border: '1px solid #ccc',
              padding: '1em',
              width: '200px',
            }}>
              {cart.map((item, index) => (
                <div key={index} style={{display: 'flex'}}>
                  <div style={{flex: '40%'}}>
                    <img src={item.imageURL} alt={item.title} style={{ width: '100%' }} />
                  </div>
                  <div style={{flex: '60%'}}>
                    <h4>{item.title}</h4>
                    <p>{item.quantity}x <b>${item.price}</b></p>
                    <p>Size: {item.size}</p>
                    <hr />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </nav>
      <Product addToCart={addToCart} />
    </div>
  );
};

export default App;
