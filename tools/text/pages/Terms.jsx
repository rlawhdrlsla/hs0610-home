import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export default function Terms() {
  const { t } = useTranslation();
  useEffect(() => { document.title = `Terms of Service — TextKit`; }, []);
  const sections = ['use', 'warranty', 'liability', 'changes', 'contact'];
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16">
      <h1 className="text-3xl font-bold text-white mb-2">{t('terms.title')}</h1>
      <p className="text-sm text-gray-600 mb-8">{t('terms.updated')}</p>
      <div className="space-y-8">
        {sections.map(s => (
          <div key={s}>
            <h2 className="text-lg font-semibold text-white mb-2">{t(`terms.${s}Title`)}</h2>
            <p className="text-gray-400 text-sm leading-relaxed">{t(`terms.${s}Body`)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
