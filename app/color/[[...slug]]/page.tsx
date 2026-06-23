'use client';

import { BrowserRouter } from 'react-router-dom';
import App from '@/tools/color/App';
import '@/tools/color/i18n/index.js';

export default function ColorPage() {
  return (
    <BrowserRouter basename="/color">
      <App />
    </BrowserRouter>
  );
}
