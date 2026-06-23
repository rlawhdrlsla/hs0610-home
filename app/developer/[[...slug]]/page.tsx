'use client';

import { BrowserRouter } from 'react-router-dom';
import App from '@/tools/developer/App';
import '@/tools/developer/i18n/index.js';

export default function DeveloperPage() {
  return (
    <BrowserRouter basename="/developer">
      <App />
    </BrowserRouter>
  );
}
