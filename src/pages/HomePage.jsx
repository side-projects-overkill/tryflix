import MovieCard from "../components/MovieCard";
import { useEffect, useState } from 'react';
import './HomePage.css'
import Header from '../components/Header'

function HomePage() {

  const [movies, setMovies] = useState([]);

  const fetchMovies = async () => {
    try {
      const response = await fetch('https://www.apirequest.in/movie/api'); // Example public API
      const data = await response.json();
      setMovies(data.slice(0, 5));
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
        <MovieCard movies={movies} type={"Popular"}/>
        <MovieCard movies={movies} type={"Top rated"}/>
      </div>
    </>
  );
}

export default HomePage;
