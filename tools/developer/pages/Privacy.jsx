import React from 'react';
import { useTranslation } from 'react-i18next';

export default function Privacy() {
  const { t } = useTranslation();

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      <h1 className="text-3xl font-bold text-white mb-2">{t('privacy.title')}</h1>
      <p className="text-gray-500 text-sm mb-10">{t('privacy.updated')}</p>

      <div className="space-y-8 text-gray-400 text-sm leading-relaxed">
        <section>
          <h2 className="text-lg font-semibold text-white mb-3">{t('privacy.noDataTitle')}</h2>
          <p>{t('privacy.noDataBody')}</p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-white mb-3">{t('privacy.analyticsTitle')}</h2>
          <p>{t('privacy.analyticsBody')}</p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-white mb-3">{t('privacy.adTitle')}</h2>
          <p>{t('privacy.adBody')}{' '}
            <a href="https://www.google.com/settings/ads" className="text-cyan-400 hover:underline" target="_blank" rel="noopener noreferrer">
              google.com/settings/ads
            </a>.
          </p>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-white mb-3">{t('privacy.contactTitle')}</h2>
          <p>{t('privacy.contactBody')}{' '}
            <a href="mailto:rlawhdrl3702@gmail.com" className="text-cyan-400 hover:underline">rlawhdrl3702@gmail.com</a>.
          </p>
        </section>
      </div>
    </div>
  );
}
