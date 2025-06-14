import './App.css'
import HomePage from "./pages/HomePage"
import MovieDetails from "./pages/MovieDeatials";
import CheckoutForm from "./components/CheckoutForm";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/checkout" element={<CheckoutForm />} />
        <Route path="/:id" element={<MovieDetails />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
