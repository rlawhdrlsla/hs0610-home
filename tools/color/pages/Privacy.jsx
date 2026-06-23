import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const EMAIL = 'rlawhdrl3702@gmail.com';

export default function Privacy() {
  const { t } = useTranslation();
  useEffect(() => { document.title = `${t('privacy.title')} — ColorKit`; }, [t]);

  const sections = [
    { title: t('privacy.collectTitle'), body: t('privacy.collectBody') },
    { title: t('privacy.imageTitle'), body: t('privacy.imageBody') },
    { title: t('privacy.cookiesTitle'), body: t('privacy.cookiesBody') },
    { title: t('privacy.thirdTitle'), body: t('privacy.thirdBody') },
  ];

  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <h1 className="text-2xl font-bold text-white mb-2">{t('privacy.title')}</h1>
      <p className="text-sm text-gray-600 mb-8">{t('privacy.updated')}</p>
      <div className="space-y-6 text-gray-400 leading-relaxed text-sm">
        {sections.map(s => (
          <div key={s.title}>
            <h2 className="text-base font-semibold text-white mb-2">{s.title}</h2>
            <p>{s.body}</p>
          </div>
        ))}
        <div>
          <h2 className="text-base font-semibold text-white mb-2">{t('privacy.contactTitle')}</h2>
          <p>
            {t('privacy.contactBody')}{' '}
            <a href={`mailto:${EMAIL}`} className="text-violet-400 hover:text-violet-300">{EMAIL}</a>
          </p>
        </div>
      </div>
    </div>
  );
}
