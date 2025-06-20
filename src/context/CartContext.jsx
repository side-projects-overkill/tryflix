import React, { createContext, useState, useEffect } from 'react';

// Create Context
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Normalize movie ID safely
  const getMovieId = (movie) => String(movie?.imdbID || movie?.id);

  const addToCart = (movie) => {
    const movieId = getMovieId(movie);
    setCart((prev) => {
      const exists = prev.some((item) => getMovieId(item) === movieId);
      if (exists) return prev;
      return [...prev, movie];
    });
  };

  const removeFromCart = (movie) => {
    const movieId = getMovieId(movie);
    setCart((prev) => prev.filter((item) => getMovieId(item) !== movieId));
  };

  const isInCart = (movie) => {
    const movieId = getMovieId(movie);
    return cart.some((item) => getMovieId(item) === movieId);
  };

  const clearCart = () => {
    setCart([]);
  };

  const getTotalItems = () => {
    return cart.length;
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, isInCart, clearCart, getTotalItems }}>
      {children}
    </CartContext.Provider>
  );
};
