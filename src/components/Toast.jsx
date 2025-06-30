import React, { useState, useEffect } from 'react';
import { FaCheckCircle, FaTimesCircle, FaShoppingCart } from 'react-icons/fa';
import './Toast.css';

const Toast = ({ message, type = 'success', duration = 3000, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => onClose && onClose(), 300); // Wait for fade out animation
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <FaCheckCircle className="toast-icon success" />;
      case 'error':
        return <FaTimesCircle className="toast-icon error" />;
      case 'cart':
        return <FaShoppingCart className="toast-icon cart" />;
      default:
        return <FaCheckCircle className="toast-icon success" />;
    }
  };

  return (
    <div className={`toast toast-${type} ${isVisible ? 'toast-visible' : 'toast-hidden'}`}>
      {getIcon()}
      <span className="toast-message">{message}</span>
    </div>
  );
};

export default Toast; 