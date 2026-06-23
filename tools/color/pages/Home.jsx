import React from 'react';
import { Link } from 'react-router-dom';
import { Palette, ArrowRight, Shuffle, Image, Eye, Layers, Droplets, Hash } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const toolIcons = [Hash, Layers, Palette, Image, Eye, Layers, Droplets, Shuffle];
const toolColors = [
  'from-violet-600 to-violet-400', 'from-blue-600 to-blue-400',
  'from-pink-600 to-pink-400', 'from-amber-600 to-amber-400',
  'from-green-600 to-green-400', 'from-cyan-600 to-cyan-400',
  'from-rose-600 to-rose-400', 'from-indigo-600 to-indigo-400',
];
const toolPaths = ['/hex-rgb', '/rgb-hsl', '/palette', '/image-colors', '/contrast', '/gradient', '/mixer', '/named-colors'];
const toolKeys = ['hexRgb', 'rgbHsl', 'palette', 'imageColors', 'contrast', 'gradient', 'mixer', 'namedColors'];

export default function Home() {
  const { t } = useTranslation();

  return (
    <div>
      {/* Hero */}
      <section className="bg-dark-900 pt-16 pb-14 px-4 border-b border-dark-700">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-900/40 text-violet-400 text-xs font-semibold mb-5 border border-violet-800/50">
            <Palette size={12} strokeWidth={2.5} />
            {t('home.badge')}
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight">
            {t('home.title1')}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-pink-400">
              {t('home.title2')}
            </span>
          </h1>
          <p className="text-lg text-gray-400 max-w-xl mx-auto">{t('home.subtitle')}</p>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {toolKeys.map((key, i) => {
            const Icon = toolIcons[i];
            return (
              <Link
                key={toolPaths[i]}
                to={toolPaths[i]}
                className="card p-5 hover:border-violet-700 transition-all duration-200 group hover:-translate-y-1"
              >
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${toolColors[i]} flex items-center justify-center mb-4`}>
                  <Icon size={18} className="text-white" strokeWidth={2} />
                </div>
                <h2 className="font-semibold text-white text-sm mb-1.5 group-hover:text-violet-400 transition-colors">
                  {t(`home.tools.${key}.label`)}
                </h2>
                <p className="text-xs text-gray-500 leading-relaxed mb-3">{t(`home.tools.${key}.desc`)}</p>
                <div className="flex items-center gap-1 text-xs text-violet-500 opacity-0 group-hover:opacity-100 transition-opacity font-medium">
                  {t('home.openTool')} <ArrowRight size={11} />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Features */}
      <section className="bg-dark-800/50 border-y border-dark-700 py-12 px-4">
        <div className="max-w-4xl mx-auto grid sm:grid-cols-3 gap-6 text-center">
          {['free', 'noLogin', 'privacy'].map(key => (
            <div key={key} className="p-6 card">
              <h3 className="font-semibold text-white mb-2">{t(`home.features.${key}.title`)}</h3>
              <p className="text-sm text-gray-500">{t(`home.features.${key}.desc`)}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
