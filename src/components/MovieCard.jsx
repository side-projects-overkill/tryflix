import React, { useContext } from 'react';
import "./MovieCard.css";
import { useNavigate } from "react-router-dom";
import { CartContext } from '../context/CartContext';
import { FaEye, FaCartPlus, FaBolt } from 'react-icons/fa';

function MovieCard({ movies, type }) {
  const navigate = useNavigate();
  const { addToCart, isInCart } = useContext(CartContext);

  // Use movie ID as price
  const getMoviePrice = (movie) => {
    const movieId = movie.imdbID || movie.id || '149';
    // Extract numeric part from ID and use as price
    const numericPrice = movieId.replace(/\D/g, '').slice(-3) || '149';
    return parseInt(numericPrice) || 149;
  };

  const viewMovie = (movie) => {
    navigate(`/${movie.imdbID}`);
  };
  const buyMovie = (movie) => {
    const moviePrice = getMoviePrice(movie);
    const orderData = {
      cartItems: [movie],
      quantities: { [movie.imdbID || movie.id]: 1 },
      pricing: {
        subtotal: moviePrice,
        tax: Math.round(moviePrice * 0.18),
        deliveryFee: moviePrice > 500 ? 0 : 49,
        discount: moviePrice > 1000 ? Math.round(moviePrice * 0.1) : 0,
        total: moviePrice + Math.round(moviePrice * 0.18) + (moviePrice > 500 ? 0 : 49) - (moviePrice > 1000 ? Math.round(moviePrice * 0.1) : 0)
      }
    };
    navigate('/checkout', { state: orderData });
  };
  return (
    <>
      <h1 style={{marginLeft: '8px', fontSize: '1.6rem', color: '#1ed760', marginBottom: 0}}>{type}</h1>
      <div className="movie-grid">
        {movies?.map((movie) => (
          <div className="movie-card" key={movie.imdbID} tabIndex={0} aria-label={movie.title}>
            <img src={movie.Images[0]} alt={movie.title} />
            <div className="img-overlay" />
            {movie.imdbRating && (
              <span className="rating-badge">⭐ {movie.imdbRating}</span>
            )}
            <div className="price-badge">₹{getMoviePrice(movie)}</div>
            <h3>{movie.title}</h3>
            <div className="movie-buttons">
              <button
                className="movie-button view-btn"
                onClick={() => viewMovie(movie)}
              >
                <FaEye /> View
              </button>
              <div className="movie-button-row">
                <button
                  className="movie-button add-to-cart"
                  onClick={()=> addToCart(movie)}
                  disabled={isInCart(movie)}
                >
                  <FaCartPlus size={25} /> Add to Cart
                </button>
                <button className="movie-button buy-now" onClick={()=> buyMovie(movie)}>
                  <FaBolt /> Buy Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default MovieCard;
