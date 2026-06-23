import React, { useEffect } from 'react';
import { Palette } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const EMAIL = 'rlawhdrl3702@gmail.com';

export default function About() {
  const { t } = useTranslation();
  useEffect(() => { document.title = `${t('about.title')} — ColorKit`; }, [t]);

  const tools = [
    'HEX ↔ RGB Converter', 'RGB ↔ HSL Converter', 'Palette Generator',
    'Image Color Extractor', 'Contrast Checker', 'Gradient Maker',
    'Color Mixer', 'CSS Named Colors',
  ];

  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center">
          <Palette size={18} className="text-white" />
        </div>
        <h1 className="text-2xl font-bold text-white">{t('about.title')}</h1>
      </div>

      <div className="space-y-6 text-gray-400 leading-relaxed">
        <p>{t('about.intro')}</p>

        <h2 className="text-lg font-semibold text-white">{t('about.offerTitle')}</h2>
        <ul className="space-y-2 list-disc list-inside">
          {tools.map(tool => <li key={tool}>{tool}</li>)}
        </ul>

        <h2 className="text-lg font-semibold text-white">{t('about.privacyTitle')}</h2>
        <p>{t('about.privacyBody')}</p>

        <h2 className="text-lg font-semibold text-white">{t('about.contactTitle')}</h2>
        <p>
          {t('about.contactBody')}{' '}
          <a href={`mailto:${EMAIL}`} className="text-violet-400 hover:text-violet-300">{EMAIL}</a>
        </p>
      </div>
    </div>
  );
}
