import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export default function About() {
  const { t } = useTranslation();
  useEffect(() => { document.title = `About — TextKit`; }, []);
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16">
      <h1 className="text-3xl font-bold text-white mb-4">{t('about.title')}</h1>
      <p className="text-gray-400 mb-8 leading-relaxed">{t('about.intro')}</p>
      <div className="space-y-6">
        {['fast', 'private', 'available'].map(key => (
          <div key={key} className="card p-5">
            <h3 className="font-semibold text-white mb-2">{t(`about.${key}`)}</h3>
            <p className="text-sm text-gray-500">{t(`about.${key}Desc`)}</p>
          </div>
        ))}
      </div>
      <p className="text-sm text-gray-500 mt-8">{t('about.contact')} <a href="mailto:rlawhdrl3702@gmail.com" className="text-violet-400 hover:underline">rlawhdrl3702@gmail.com</a></p>
    </div>
  );
}
