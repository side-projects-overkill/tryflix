import './App.css'
import HomePage from "./pages/HomePage"
import MovieDetails from "./pages/MovieDeatials";
import CartPage from "./pages/CartPage";
import CheckoutForm from "./components/CheckoutForm";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';

function App() {

  return (
    <>
    <CartProvider>
     <Router basename="/tryflix">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutForm />} />
        <Route path="/:id" element={<MovieDetails />} />
      </Routes>
     </Router>
     </CartProvider>
    </>
  )
}

export default App
