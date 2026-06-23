import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const EMAIL = 'rlawhdrl3702@gmail.com';

export default function Terms() {
  const { t } = useTranslation();
  useEffect(() => { document.title = `${t('terms.title')} — ColorKit`; }, [t]);

  const sections = [
    { title: t('terms.acceptTitle'), body: t('terms.acceptBody') },
    { title: t('terms.useTitle'), body: t('terms.useBody') },
    { title: t('terms.disclaimerTitle'), body: t('terms.disclaimerBody') },
    { title: t('terms.liabilityTitle'), body: t('terms.liabilityBody') },
    { title: t('terms.changesTitle'), body: t('terms.changesBody') },
  ];

  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <h1 className="text-2xl font-bold text-white mb-2">{t('terms.title')}</h1>
      <p className="text-sm text-gray-600 mb-8">{t('terms.updated')}</p>
      <div className="space-y-6 text-gray-400 leading-relaxed text-sm">
        {sections.map(s => (
          <div key={s.title}>
            <h2 className="text-base font-semibold text-white mb-2">{s.title}</h2>
            <p>{s.body}</p>
          </div>
        ))}
        <div>
          <h2 className="text-base font-semibold text-white mb-2">{t('terms.contactTitle')}</h2>
          <p>
            {t('terms.contactBody')}{' '}
            <a href={`mailto:${EMAIL}`} className="text-violet-400 hover:text-violet-300">{EMAIL}</a>
          </p>
        </div>
      </div>
    </div>
  );
}
