import React, { useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { FaArrowLeft, FaCartPlus, FaBolt, FaStar, FaCalendar, FaClock, FaGlobe, FaTrophy, FaUser } from 'react-icons/fa';
import './MovieDetails.css';

function MovieDetails() {
  const { title } = useParams();
  const navigate = useNavigate();
  const { addToCart, isInCart } = useContext(CartContext);
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Get movie price (reusing logic from MovieCard)
  const getMoviePrice = (movie) => {
    const movieId = movie.imdbID || movie.id || '149';
    // Extract numeric part from ID and use as price
    const numericPrice = movieId.replace(/\D/g, '').slice(-3) || '149';
    return parseInt(numericPrice) || 149;
  };

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        const apiUrl = `https://www.apirequest.in/movie/api/title/${encodeURIComponent(title)}`;
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
          throw new Error('Movie not found');
        }
        
        const data = await response.json();
        setMovie(data[0]);
      } catch (error) {
        console.error('Error fetching movie details:', error);
        // Set fallback movie data for demonstration
        setMovie({
          title: title || "Sample Movie",
          year: "2024",
          rated: "PG-13",
          released: "01 Jan 2024",
          runtime: "120 min",
          genre: "Action, Drama, Thriller",
          director: "Christopher Nolan",
          writer: "Christopher Nolan, Jonathan Nolan",
          actors: "Leonardo DiCaprio, Marion Cotillard, Tom Hardy, Elliot Page",
          plot: "An epic tale of adventure, romance, and discovery that takes viewers on an unforgettable journey through time and space. This masterfully crafted film combines stunning visuals with compelling storytelling to create a cinematic experience like no other.",
          language: "English, French",
          Country: "USA, UK",
          Awards: "Won 4 Oscars. Another 152 wins & 217 nominations.",
          imdbRating: "8.8",
          Metascore: "74",
          Poster: "https://images.unsplash.com/photo-1489599505739-b31bfc56b79a?w=400&h=600&fit=crop",
          Images: [
            "https://images.unsplash.com/photo-1489599505739-b31bfc56b79a?w=800&h=450&fit=crop",
            "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=800&h=450&fit=crop",
            "https://images.unsplash.com/photo-1489599505739-b31bfc56b79a?w=800&h=450&fit=crop&crop=top",
            "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=800&h=450&fit=crop&crop=center"
          ]
        });
      } finally {
        setLoading(false);
      }
    };

    if (title) {
      fetchMovieDetails();
    }
  }, [title]);

  const handleBuyNow = () => {
    if (!movie) return;
    const moviePrice = getMoviePrice(movie);
    const orderData = {
      cartItems: [movie],
      quantities: { [movie.title]: 1 },
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

  const handleAddToCart = () => {
    console.log(movie)
    if (movie) {
      addToCart(movie);
    }
  };

  const handleBackToMovies = () => {
    navigate('/');
  };

  if (loading) {
    return (
      <div className="movie-details-loading">
        <div className="loading-spinner"></div>
        <p>Loading movie details...</p>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="movie-details-error">
        <h2>Movie not found</h2>
        <button onClick={handleBackToMovies} className="back-button">
          <FaArrowLeft /> Back to Movies
        </button>
      </div>
    );
  }

  return (
    <div className="movie-details-container">
      <button onClick={handleBackToMovies} className="back-button">
        <FaArrowLeft /> Back to Movies
      </button>
      
      <div className="movie-details-content">
        <div className="movie-poster-section">
          <img 
            src={movie.Images[0] || "https://images.unsplash.com/photo-1489599505739-b31bfc56b79a?w=400&h=600&fit=crop"} 
            alt={movie.title}
            className="movie-poster"
          />
          <div className="movie-actions">
            <button 
              className="action-button buy-now-btn"
              onClick={handleBuyNow}
            >
              <FaBolt /> Buy Now - ₹{getMoviePrice(movie)}
            </button>
            <button 
              className={`action-button add-cart-btn ${isInCart(movie) ? 'disabled' : ''}`}
              onClick={handleAddToCart}
              disabled={isInCart(movie)}
            >
              <FaCartPlus /> {isInCart(movie) ? 'In Cart' : 'Add to Cart'}
            </button>
          </div>
        </div>

        <div className="movie-info-section">
          <div className="movie-header">
            <h1 className="movie-title">{movie.title}</h1>
            <div className="movie-meta">
              <div className="meta-item">
                <FaCalendar className="meta-icon" />
                <span>{movie.year}</span>
              </div>
              <div className="meta-item">
                <span className="rated-badge">{movie.rated}</span>
              </div>
              <div className="meta-item">
                <FaClock className="meta-icon" />
                <span>{movie.runtime}</span>
              </div>
              <div className="meta-item">
                <FaStar className="meta-icon" />
                <span className="rating">{movie.imdbRating}/10</span>
              </div>
              {movie.Metascore && (
                <div className="meta-item">
                  <span className="metascore">Metascore: {movie.Metascore}</span>
                </div>
              )}
            </div>
            <div className="movie-release-info">
              <span><strong>Released:</strong> {movie.released}</span>
            </div>
          </div>

          <div className="movie-synopsis">
            <h2>Plot</h2>
            <p>{movie.plot}</p>
          </div>

          <div className="movie-details-grid">
            <div className="detail-section">
              <h3>Genre</h3>
              <div className="genre-tags">
                {movie.genre?.split(', ').map((genre, index) => (
                  <span key={index} className="genre-tag">{genre}</span>
                ))}
              </div>
            </div>

            <div className="detail-section">
              <h3>Director</h3>
              <p className="detail-text">{movie.director}</p>
            </div>

            <div className="detail-section">
              <h3>Writer</h3>
              <p className="detail-text">{movie.writer}</p>
            </div>

            <div className="detail-section">
              <h3>Cast</h3>
              <div className="actors-list">
                {movie.actors?.split(', ').map((actor, index) => (
                  <div key={index} className="actor-item">
                    <FaUser className="actor-icon" />
                    <span>{actor}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="detail-section">
              <h3>Language & Country</h3>
              <div className="location-info">
                <div className="location-item">
                  <FaGlobe className="location-icon" />
                  <span><strong>Language:</strong> {movie.language}</span>
                </div>
                <div className="location-item">
                  <FaGlobe className="location-icon" />
                  <span><strong>Country:</strong> {movie.Country}</span>
                </div>
              </div>
            </div>

            {movie.Awards && (
              <div className="detail-section awards-section">
                <h3>Awards & Recognition</h3>
                <div className="awards-info">
                  <FaTrophy className="trophy-icon" />
                  <p>{movie.Awards}</p>
                </div>
              </div>
            )}
          </div>

          {movie.Images && movie.Images.length > 0 && (
            <div className="image-gallery">
              <h2>Image Gallery</h2>
              <div className="gallery-main">
                <img 
                  src={movie.Images[selectedImageIndex]} 
                  alt={`${movie.Title} - Image ${selectedImageIndex + 1}`}
                  className="gallery-main-image"
                />
              </div>
              <div className="gallery-thumbnails">
                {movie.Images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`${movie.Title} - Thumbnail ${index + 1}`}
                    className={`gallery-thumbnail ${index === selectedImageIndex ? 'active' : ''}`}
                    onClick={() => setSelectedImageIndex(index)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;