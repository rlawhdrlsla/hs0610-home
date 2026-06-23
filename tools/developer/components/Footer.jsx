import React from 'react';
import { Link } from 'react-router-dom';
import { Code2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();

  const col1 = [
    { label: t('nav.json'),     path: '/json' },
    { label: t('nav.uuid'),     path: '/uuid' },
    { label: t('nav.hash'),     path: '/hash' },
    { label: t('nav.base64'),   path: '/base64' },
    { label: t('nav.password'), path: '/password' },
    { label: t('nav.regex'),    path: '/regex' },
  ];

  const col2 = [
    { label: t('nav.cron'),      path: '/cron' },
    { label: t('nav.urlEncode'), path: '/url-encode' },
    { label: t('nav.jwt'),       path: '/jwt' },
    { label: t('nav.diff'),      path: '/diff' },
    { label: t('nav.markdown'),  path: '/markdown' },
  ];

  return (
    <footer className="border-t border-dark-700 bg-dark-900 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
                <Code2 size={14} className="text-white" strokeWidth={2.5} />
              </div>
              <span className="font-bold text-white">DevKit</span>
            </Link>
            <p className="text-sm text-gray-500 leading-relaxed">{t('footer.tagline')}</p>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-3 text-sm">{t('footer.tools')}</h3>
            <ul className="space-y-2">
              {col1.map(l => (
                <li key={l.path}>
                  <Link to={l.path} className="text-sm text-gray-500 hover:text-cyan-400 transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-3 text-sm">{t('footer.moreTools')}</h3>
            <ul className="space-y-2">
              {col2.map(l => (
                <li key={l.path}>
                  <Link to={l.path} className="text-sm text-gray-500 hover:text-cyan-400 transition-colors">{l.label}</Link>
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
                  <Link to={l.path} className="text-sm text-gray-500 hover:text-cyan-400 transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-dark-700 pt-6 text-center">
          <p className="text-xs text-gray-600">&copy; {new Date().getFullYear()} DevKit. {t('footer.rights')}</p>
        </div>
      </div>
    </footer>
  );
}
