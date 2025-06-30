import React, { useState, useEffect } from 'react';
import Toast from './Toast';

let toastId = 0;

const ToastContainer = () => {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    // Listen for toast events
    const handleToastEvent = (event) => {
      const { message, type, duration } = event.detail;
      showToast(message, type, duration);
    };

    window.addEventListener('showToast', handleToastEvent);
    return () => window.removeEventListener('showToast', handleToastEvent);
  }, []);

  const showToast = (message, type = 'success', duration = 3000) => {
    const id = toastId++;
    const newToast = { id, message, type, duration };
    
    setToasts(prev => [...prev, newToast]);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  return (
    <div className="toast-container">
      {toasts.map((toast, index) => (
        <div key={toast.id} style={{ marginBottom: index > 0 ? '10px' : '0' }}>
          <Toast
            message={toast.message}
            type={toast.type}
            duration={toast.duration}
            onClose={() => removeToast(toast.id)}
          />
        </div>
      ))}
    </div>
  );
};

// Helper function to show toast from anywhere in the app
export const showToast = (message, type = 'success', duration = 3000) => {
  const event = new CustomEvent('showToast', {
    detail: { message, type, duration }
  });
  window.dispatchEvent(event);
};

export default ToastContainer; 