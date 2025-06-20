import MovieCard from "../components/MovieCard";
import { useEffect, useState } from 'react';
import './HomePage.css'
import Header from '../components/Header'

// Use a reliable Unsplash cinematic image for the hero banner
const staticHero = {
  url: "https://images.unsplash.com/photo-1467987506553-8f3916508521?auto=format&fit=crop&w=1200&q=80",
  title: "Welcome to Tryflix",
  description: "Stream the best movies and shows in stunning quality. Enjoy blockbusters, classics, and exclusive content—all in one place!"
};

function HomePage() {
  const [movies, setMovies] = useState([]);

  const fetchMovies = async () => {
    try {
      const response = await fetch(import.meta.env.VITE_MOVIE_API); // Example public API
      const data = await response.json();
      setMovies(data.slice(0, 20));
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <>
     <Header/>
      <div className="homepage">
        <section className="hero-banner">
          <img src={staticHero.url} alt={staticHero.title} className="hero-img" />
          <div className="hero-overlay" />
          <div className="hero-content">
            <h2>{staticHero.title}</h2>
            <p>{staticHero.description}</p>
            <button className="hero-btn">Watch Now</button>
          </div>
        </section>
        <section id="movies">
          <MovieCard movies={movies} type={"Popular"}/>
        </section>
      </div>
    </>
  );
}

export default HomePage;
