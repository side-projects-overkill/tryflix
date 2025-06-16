import React, { useContext } from 'react';
import "./MovieCard.css";
import { useNavigate } from "react-router-dom";
import { CartContext } from '../context/CartContext';

function MovieCard({ movies, type }) {
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  const viewMovie = (movie) => {
    navigate(`/${movie.imdbID}`);
  };
  const buyMovie = () => {
    navigate(`/checkout`);
  };
  return (
    <>
      <h1>{type}</h1>
      <div className="movie-grid">
        {movies?.map((movie) => (
          <div className="movie-card" key={movie.imdbID}>
            <img src={movie.Images[0]} alt={movie.title} />
            <h3>{movie.title}</h3>
            <button
              className="movie-button"
              onClick={() => viewMovie(movie)}
            >
              View
            </button>
            <button className="movie-button" onClick={()=> addToCart(movie)}>Add to Cart</button>
            <button className="movie-button buy-now" onClick={()=> buyMovie()}>Buy Now</button>
          </div>
        ))}
      </div>
    </>
  );
}

export default MovieCard;
