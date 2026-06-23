'use client';

import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@/tools/convert/context/ThemeContext';
import App from '@/tools/convert/App';
import '@/tools/convert/i18n/index.js';

export default function ConvertPage() {
  return (
    <BrowserRouter basename="/convert">
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  );
}
