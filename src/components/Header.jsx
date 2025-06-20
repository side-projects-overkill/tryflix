import React, { useContext } from 'react';
import { MdShoppingCart } from 'react-icons/md';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import './Header.scss';  // import SCSS

function Header() {
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();

  const handleCartClick = () => {
    navigate('/cart');
  };

  return (
    <header className="header">
      <div className="header-left">
        <h1 className="logo">Tryflix</h1>
        <nav className="nav-links">
          <a href="/">Home</a>
          <a href="#movies">Movies</a>
          <a href="#sports">Sports</a>
          <a href="#premium">Premium</a>
        </nav>
      </div>
      <div className="cart-container" onClick={handleCartClick}>
        <MdShoppingCart className="cart-icon" />
        {cart.length > 0 && (
          <span className="cart-count">{cart.length}</span>
        )}
      </div>
    </header>
  );
}

export default Header;
