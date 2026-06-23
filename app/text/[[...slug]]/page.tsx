'use client';

import { BrowserRouter } from 'react-router-dom';
import App from '@/tools/text/App';
import '@/tools/text/i18n/index.js';

export default function TextPage() {
  return (
    <BrowserRouter basename="/text">
      <App />
    </BrowserRouter>
  );
}
