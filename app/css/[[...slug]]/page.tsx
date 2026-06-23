'use client';

import { BrowserRouter } from 'react-router-dom';
import { I18nProvider } from '@/tools/css/i18n/index';
import App from '@/tools/css/App';

export default function CssPage() {
  return (
    <BrowserRouter basename="/css">
      <I18nProvider>
        <App />
      </I18nProvider>
    </BrowserRouter>
  );
}
