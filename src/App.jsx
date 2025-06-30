import './App.css'
import HomePage from "./pages/HomePage"
import MovieDetails from "./pages/MovieDeatials";
import CartPage from "./pages/CartPage";
import CheckoutForm from "./components/CheckoutForm";
import Layout from "./components/Layout";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';

function App() {

  return (
    <>
    <CartProvider>
     <Router basename="/tryflix">
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutForm />} />
          <Route path="/movie/:title" element={<MovieDetails />} />
        </Routes>
      </Layout>
     </Router>
     </CartProvider>
    </>
  )
}

export default App
