import React, { createContext, useState } from 'react';
import { showToast } from '../components/ToastContainer';

// Create Context
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Initialize cart as empty array (no localStorage)
  const [cart, setCart] = useState([]);

  // Normalize movie ID safely
  const getMovieId = (movie) => String(movie?.imdbID || movie?.id || movie?.title || movie?.Title);

  const addToCart = (movie) => {
    const movieId = getMovieId(movie);
    const movieTitle = movie?.title || movie?.Title || 'Movie';
    
    setCart((prev) => {
      const exists = prev.some((item) => getMovieId(item) === movieId);
      if (exists) {
        showToast(`${movieTitle} is already in your cart!`, 'error', 2500);
        return prev;
      }
      
      showToast(`${movieTitle} added to cart!`, 'cart', 3000);
      return [...prev, movie];
    });
  };

  const removeFromCart = (movie) => {
    const movieId = getMovieId(movie);
    const movieTitle = movie?.title || movie?.Title || 'Movie';
    
    setCart((prev) => {
      const newCart = prev.filter((item) => getMovieId(item) !== movieId);
      showToast(`${movieTitle} removed from cart`, 'error', 2500);
      return newCart;
    });
  };

  const isInCart = (movie) => {
    const movieId = getMovieId(movie);
    return cart.some((item) => getMovieId(item) === movieId);
  };

  const clearCart = () => {
    if (cart.length > 0) {
      showToast('Cart cleared successfully!', 'success', 2500);
    }
    setCart([]);
  };

  const getTotalItems = () => {
    return cart.length;
  };

  const getCartTotal = () => {
    return cart.reduce((total, movie) => {
      const movieId = movie.imdbID || movie.id || '149';
      // Extract numeric part from ID and use as price
      const numericPrice = movieId.replace(/\D/g, '').slice(-3) || '149';
      return parseInt(numericPrice) || 149;
    }, 0);
  };

  return (
    <CartContext.Provider value={{ 
      cart, 
      addToCart, 
      removeFromCart, 
      isInCart, 
      clearCart, 
      getTotalItems,
      getCartTotal 
    }}>
      {children}
    </CartContext.Provider>
  );
};
