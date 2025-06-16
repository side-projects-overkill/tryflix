import React, { useContext } from 'react';
import { MdShoppingCart } from 'react-icons/md';
import { CartContext } from '../context/CartContext';
import './Header.scss';  // import SCSS

function Header() {
  const { cart } = useContext(CartContext);

  return (
    <header className="header">
      <h1 className="logo">Movie Store</h1>
      <div className="cart-container">
        <MdShoppingCart className="cart-icon" />
        {cart.length > 0 && (
          <span className="cart-count">{cart.length}</span>
        )}
      </div>
    </header>
  );
}

export default Header;
