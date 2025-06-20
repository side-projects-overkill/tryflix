import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { FaTrash, FaCreditCard, FaShieldAlt, FaFastForward, FaHistory } from 'react-icons/fa';
import './CartPage.scss';

const CartPage = () => {
  const { cart, removeFromCart } = useContext(CartContext);
  const navigate = useNavigate();
  // Use movie ID as price (same logic as MovieCard)
  const getPriceByType = (movie) => {
    const movieId = movie.imdbID || movie.id || '149';
    // Extract numeric part from ID and use as price
    const numericPrice = movieId.replace(/\D/g, '').slice(-3) || '149';
    return parseInt(numericPrice) || 149;
  };

  const subtotal = cart.reduce((sum, movie) => sum + getPriceByType(movie), 0);
  const tax = Math.round(subtotal * 0.18); // 18% GST
  const discount = subtotal > 1000 ? Math.round(subtotal * 0.1) : 0;
  const total = subtotal + tax - discount;

  const handleCheckout = () => {
    if (cart.length === 0) return;
    navigate('/checkout', { 
      state: { 
        cartItems: cart,
        quantities: cart.reduce((acc, item) => {
          acc[item.imdbID || item.id] = 1;
          return acc;
        }, {}),
        pricing: { subtotal, tax, deliveryFee: 0, discount, total }
      }
    });
  };

  if (cart.length === 0) {
    return (
      <div className="cart-page">
        <Header />
        <div className="cart-container">
          <div className="empty-cart">
            <div className="empty-cart-icon">🛒</div>
            <h2>Your Cart is Empty</h2>
            <p>Looks like you haven't added any movies yet.</p>
            <button onClick={() => navigate('/')} className="continue-shopping-btn">
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <Header />
      <div className="cart-container">
        <div className="cart-header">
          <h1>Shopping Cart</h1>
          <span className="item-count">{cart.length} {cart.length === 1 ? 'item' : 'items'}</span>
        </div>

        <div className="cart-content">
          <div className="cart-items">
            {cart.map((movie) => {
              const movieId = movie.imdbID || movie.id;
              const price = getPriceByType(movie);
              
              return (
                <div key={movieId} className="cart-item">
                  <div className="item-image">
                    <img 
                      src={movie.Images && movie.Images[0] ? movie.Images[0] : (movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/150x225/333/fff?text=No+Image')} 
                      alt={movie.Title || movie.title}
                    />
                  </div>
                  
                  <div className="item-details">
                    <h3>{movie.Title || movie.title}</h3>
                    <p className="item-year">{movie.Year || movie.year}</p>
                    <p className="item-type">{movie.Type?.charAt(0).toUpperCase() + movie.Type?.slice(1) || 'Movie'}</p>
                    
                    <div className="item-actions">
                      <button 
                        onClick={() => removeFromCart(movie)}
                        className="remove-btn"
                      >
                        <FaTrash /> Remove
                      </button>
                    </div>
                  </div>
                  
                  <div className="item-pricing">
                    <div className="total-price">₹{price}</div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="cart-summary">
            <div className="summary-card">
              <h3>Order Summary</h3>
              
              <div className="summary-row">
                <span>Subtotal ({cart.length} items)</span>
                <span>₹{subtotal}</span>
              </div>
              
              {discount > 0 && (
                <div className="summary-row discount">
                  <span>Discount (10%)</span>
                  <span>-₹{discount}</span>
                </div>
              )}
              
              <div className="summary-row">
                <span>Tax (GST 18%)</span>
                <span>₹{tax}</span>
              </div>
              
              <div className="summary-divider"></div>
              
              <div className="summary-row total">
                <span>Total</span>
                <span>₹{total}</span>
              </div>
              
              <button onClick={handleCheckout} className="checkout-btn">
                <FaCreditCard /> Proceed to Checkout
              </button>
              
              <button onClick={() => navigate('/')} className="continue-shopping">
                Continue Shopping
              </button>
            </div>

            <div className="benefits-card">
              <h4>Why Choose Tryflix?</h4>
              <div className="benefit-item">
                <FaShieldAlt className="benefit-icon" />
                <span>Secure Payment</span>
              </div>
              <div className="benefit-item">
                <FaFastForward className="benefit-icon" />
                <span>Fast Streaming</span>
              </div>
              <div className="benefit-item">
                <FaHistory className="benefit-icon" />
                <span>Latest Content</span>
              </div>
            </div>

            <div className="promo-card">
              <h4>💎 Premium Benefits</h4>
              <ul>
                <li>4K Ultra HD Quality</li>
                <li>Ad-free Experience</li>
                <li>Download for Offline</li>
                <li>Multiple Device Access</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage; 