import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Palette, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  useEffect(() => { document.title = '404 — ColorKit'; }, []);

  return (
    <div className="flex-1 flex items-center justify-center px-4 py-24">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-pink-500 mb-6">
          <Palette size={28} className="text-white" strokeWidth={2} />
        </div>
        <h1 className="text-8xl font-bold text-white mb-4">404</h1>
        <p className="text-xl text-gray-400 mb-2">Page not found</p>
        <p className="text-sm text-gray-600 mb-8">The page you're looking for doesn't exist.</p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-violet-600 hover:bg-violet-500 text-white font-semibold rounded-xl transition-colors"
        >
          <ArrowLeft size={16} /> Back to Home
        </Link>
      </div>
    </div>
  );
}
