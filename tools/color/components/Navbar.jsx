import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Palette, Menu, X, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const LANGS = [
  { code: 'en', label: 'EN' },
  { code: 'ko', label: '한' },
  { code: 'ja', label: '日' },
  { code: 'zh', label: '中' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const location = useLocation();
  const { t, i18n } = useTranslation();

  const navTools = [
    { label: t('nav.hexRgb'), path: '/hex-rgb' },
    { label: t('nav.rgbHsl'), path: '/rgb-hsl' },
    { label: t('nav.palette'), path: '/palette' },
    { label: t('nav.contrast'), path: '/contrast' },
  ];

  const allTools = [
    { label: t('nav.hexRgb'), path: '/hex-rgb' },
    { label: t('nav.rgbHsl'), path: '/rgb-hsl' },
    { label: t('nav.palette'), path: '/palette' },
    { label: t('nav.imageColors'), path: '/image-colors' },
    { label: t('nav.contrast'), path: '/contrast' },
    { label: t('nav.gradient'), path: '/gradient' },
    { label: t('nav.mixer'), path: '/mixer' },
    { label: t('nav.namedColors'), path: '/named-colors' },
  ];

  const currentLang = LANGS.find(l => i18n.language?.startsWith(l.code)) || LANGS[0];

  return (
    <nav className="sticky top-0 z-50 bg-dark-900/90 backdrop-blur border-b border-dark-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center">
            <Palette size={14} className="text-white" strokeWidth={2.5} />
          </div>
          <span className="font-bold text-white">ColorKit</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {navTools.map(t => (
            <Link
              key={t.path}
              to={t.path}
              className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                location.pathname === t.path
                  ? 'bg-violet-600 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-dark-700'
              }`}
            >
              {t.label}
            </Link>
          ))}
          <Link to="/" className="px-3 py-1.5 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-dark-700 transition-colors">
            {t('nav.allTools')}
          </Link>
        </div>

        <div className="flex items-center gap-2">
          {/* Language switcher */}
          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-dark-700 transition-colors"
            >
              <Globe size={14} />
              <span>{currentLang.label}</span>
            </button>
            {langOpen && (
              <div className="absolute right-0 top-full mt-1 bg-dark-800 border border-dark-600 rounded-xl shadow-xl overflow-hidden z-50">
                {LANGS.map(lang => (
                  <button
                    key={lang.code}
                    onClick={() => { i18n.changeLanguage(lang.code); setLangOpen(false); }}
                    className={`block w-full text-left px-4 py-2 text-sm transition-colors ${
                      currentLang.code === lang.code
                        ? 'bg-violet-600 text-white'
                        : 'text-gray-300 hover:bg-dark-700'
                    }`}
                  >
                    {lang.label} &nbsp;
                    <span className="text-gray-500 text-xs">
                      {lang.code === 'en' ? 'English' : lang.code === 'ko' ? '한국어' : lang.code === 'ja' ? '日本語' : '中文'}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Mobile menu */}
          <button onClick={() => setOpen(!open)} className="md:hidden text-gray-400 hover:text-white">
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-dark-800 border-b border-dark-700 px-4 py-3 space-y-1">
          {allTools.map(tool => (
            <Link
              key={tool.path}
              to={tool.path}
              onClick={() => setOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm text-gray-300 hover:text-white hover:bg-dark-700 transition-colors"
            >
              {tool.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
