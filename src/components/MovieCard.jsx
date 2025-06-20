import React, { useContext } from 'react';
import "./MovieCard.css";
import { useNavigate } from "react-router-dom";
import { CartContext } from '../context/CartContext';
import { FaEye, FaCartPlus, FaBolt } from 'react-icons/fa';

function MovieCard({ movies, type }) {
  const navigate = useNavigate();
  const { addToCart, isInCart } = useContext(CartContext);

  const viewMovie = (movie) => {
    navigate(`/${movie.imdbID}`);
  };
  const buyMovie = () => {
    navigate(`/checkout`);
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
                <button className="movie-button buy-now" onClick={()=> buyMovie()}>
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
