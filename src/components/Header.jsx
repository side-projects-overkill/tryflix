import React, { useContext, useState, useEffect } from 'react';
import { MdShoppingCart } from 'react-icons/md';
import { CartContext } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import './Header.scss';  // import SCSS

function Header() {
  const { cart, getTotalItems, getCartTotal } = useContext(CartContext);
  const navigate = useNavigate();
  const [cartBounce, setCartBounce] = useState(false);

  // Trigger bounce animation when cart changes
  useEffect(() => {
    if (cart.length > 0) {
      setCartBounce(true);
      const timer = setTimeout(() => setCartBounce(false), 600);
      return () => clearTimeout(timer);
    }
  }, [cart.length]);

  const handleCartClick = () => {
    navigate('/cart');
  };

  const cartItemCount = getTotalItems();
  const cartTotal = getCartTotal();

  return (
    <header className="header">
      <div className="header-left">
        <h1 className="logo" onClick={() => navigate('/')}>Tryflix</h1>
        <nav className="nav-links">
          <Link to="/">Home</Link>
          <Link to="#movies">Movies</Link>
          <Link to="#sports">Sports</Link>
          <Link to="#premium">Premium</Link>
        </nav>
      </div>
      <div className={`cart-container ${cartBounce ? 'bounce' : ''}`} onClick={handleCartClick}>
        <MdShoppingCart className="cart-icon" />
        {cartItemCount > 0 && (
          <>
            <span className="cart-count">{cartItemCount}</span>
            <div className="cart-total">₹{cartTotal}</div>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
