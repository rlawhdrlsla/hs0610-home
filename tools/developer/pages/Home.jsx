import React from 'react';
import { Link } from 'react-router-dom';
import {
  Code2, ArrowRight, Hash, Key, Lock, Search, Clock, Link2, Shield, GitCompare, FileText, Binary
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

const tools = [
  { path: '/json',       icon: Code2,       color: 'from-cyan-600 to-cyan-400',     key: 'json' },
  { path: '/uuid',       icon: Hash,        color: 'from-blue-600 to-blue-400',     key: 'uuid' },
  { path: '/hash',       icon: Shield,      color: 'from-violet-600 to-violet-400', key: 'hash' },
  { path: '/base64',     icon: Binary,      color: 'from-emerald-600 to-emerald-400', key: 'base64' },
  { path: '/password',   icon: Lock,        color: 'from-rose-600 to-rose-400',     key: 'password' },
  { path: '/regex',      icon: Search,      color: 'from-amber-600 to-amber-400',   key: 'regex' },
  { path: '/cron',       icon: Clock,       color: 'from-pink-600 to-pink-400',     key: 'cron' },
  { path: '/url-encode', icon: Link2,       color: 'from-teal-600 to-teal-400',     key: 'urlEncode' },
  { path: '/jwt',        icon: Key,         color: 'from-orange-600 to-orange-400', key: 'jwt' },
  { path: '/diff',       icon: GitCompare,  color: 'from-indigo-600 to-indigo-400', key: 'diff' },
  { path: '/markdown',   icon: FileText,    color: 'from-lime-600 to-lime-400',     key: 'markdown' },
];

export default function Home() {
  const { t } = useTranslation();
  useEffect(() => { document.title = 'DevKit — Free Developer Tools'; }, []);

  return (
    <div>
      {/* Hero */}
      <section className="bg-dark-900 pt-16 pb-14 px-4 border-b border-dark-700">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-900/40 text-cyan-400 text-xs font-semibold mb-5 border border-cyan-800/50">
            <Code2 size={12} strokeWidth={2.5} />
            {t('home.badge')}
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight">
            {t('home.title1')}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
              {t('home.title2')}
            </span>
          </h1>
          <p className="text-lg text-gray-400 max-w-xl mx-auto">{t('home.subtitle')}</p>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {tools.map(({ path, icon: Icon, color, key }) => (
            <Link
              key={path}
              to={path}
              className="card p-5 hover:border-cyan-700 transition-all duration-200 group hover:-translate-y-1"
            >
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-4`}>
                <Icon size={18} className="text-white" strokeWidth={2} />
              </div>
              <h2 className="font-semibold text-white text-sm mb-1.5 group-hover:text-cyan-400 transition-colors">
                {t(`home.tools.${key}.label`)}
              </h2>
              <p className="text-xs text-gray-500 leading-relaxed mb-3">{t(`home.tools.${key}.desc`)}</p>
              <div className="flex items-center gap-1 text-xs text-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity font-medium">
                {t('home.openTool')} <ArrowRight size={11} />
              </div>
            </Link>
          ))}
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
