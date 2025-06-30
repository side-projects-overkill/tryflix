import React from 'react';
import Header from './Header';
import ToastContainer from './ToastContainer';
import './Layout.css';

function Layout({ children }) {
  return (
    <div className="app-layout">
      <Header />
      <main className="main-content">
        {children}
      </main>
      <ToastContainer />
    </div>
  );
}

export default Layout; 