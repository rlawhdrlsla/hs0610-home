import React from 'react';
import { useTranslation } from 'react-i18next';

export default function Terms() {
  const { t } = useTranslation();

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      <h1 className="text-3xl font-bold text-white mb-2">{t('terms.title')}</h1>
      <p className="text-gray-500 text-sm mb-10">{t('terms.updated')}</p>

      <div className="space-y-8 text-gray-400 text-sm leading-relaxed">
        <section>
          <h2 className="text-lg font-semibold text-white mb-3">{t('terms.useTitle')}</h2>
          <p>{t('terms.useBody')}</p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-white mb-3">{t('terms.warrantyTitle')}</h2>
          <p>{t('terms.warrantyBody')}</p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-white mb-3">{t('terms.liabilityTitle')}</h2>
          <p>{t('terms.liabilityBody')}</p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-white mb-3">{t('terms.changesTitle')}</h2>
          <p>{t('terms.changesBody')}</p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-white mb-3">{t('terms.contactTitle')}</h2>
          <p>{t('terms.contactBody')}{' '}
            <a href="mailto:rlawhdrl3702@gmail.com" className="text-cyan-400 hover:underline">rlawhdrl3702@gmail.com</a>.
          </p>
        </section>
      </div>
    </div>
  );
}
