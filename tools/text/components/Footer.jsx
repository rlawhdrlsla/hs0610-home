import React from 'react';
import { Link } from 'react-router-dom';
import { Type } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();
  const tools = [
    { label: t('nav.wordCount'),   path: '/word-count' },
    { label: t('nav.caseConvert'), path: '/case' },
    { label: t('nav.lorem'),       path: '/lorem' },
    { label: t('nav.clean'),       path: '/clean' },
    { label: t('nav.lines'),       path: '/lines' },
    { label: t('nav.slug'),        path: '/slug' },
  ];
  return (
    <footer className="border-t border-dark-700 bg-dark-900 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mb-8">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center">
                <Type size={14} className="text-white" strokeWidth={2.5} />
              </div>
              <span className="font-bold text-white">TextKit</span>
            </Link>
            <p className="text-sm text-gray-500 leading-relaxed">{t('footer.tagline')}</p>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-3 text-sm">{t('footer.tools')}</h3>
            <ul className="space-y-2">
              {tools.map(l => (
                <li key={l.path}>
                  <Link to={l.path} className="text-sm text-gray-500 hover:text-violet-400 transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-3 text-sm">{t('footer.company')}</h3>
            <ul className="space-y-2">
              {[
                { label: t('footer.about'),   path: '/about' },
                { label: t('footer.privacy'), path: '/privacy' },
                { label: t('footer.terms'),   path: '/terms' },
              ].map(l => (
                <li key={l.path}>
                  <Link to={l.path} className="text-sm text-gray-500 hover:text-violet-400 transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-dark-700 pt-6 text-center">
          <p className="text-xs text-gray-600">&copy; {new Date().getFullYear()} TextKit. {t('footer.rights')}</p>
        </div>
      </div>
    </footer>
  );
}
