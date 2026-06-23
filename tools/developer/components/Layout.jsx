import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';
import AdBanner from './AdBanner.jsx';

export default function Layout() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div className="min-h-screen flex flex-col">
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 2500,
          style: {
            background: '#1a1a1a',
            color: '#fff',
            border: '1px solid #2e2e2e',
            borderRadius: '12px',
            fontSize: '14px',
          },
        }}
      />
      <Navbar />
      <main className="flex-1">
        {!isHome && (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-4">
            <AdBanner slot="top" />
          </div>
        )}
        <Outlet />
        {!isHome && (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 pb-4">
            <AdBanner slot="bottom" />
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
