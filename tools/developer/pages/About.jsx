import React from 'react';
import { Code2, Zap, Lock, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function About() {
  const { t } = useTranslation();

  const features = [
    { icon: Zap,  title: t('about.fast'),      desc: t('about.fastDesc') },
    { icon: Lock, title: t('about.private'),    desc: t('about.privateDesc') },
    { icon: Globe,title: t('about.available'),  desc: t('about.availableDesc') },
  ];

  const toolList = [
    t('nav.json'), t('nav.uuid'), t('nav.hash'), t('nav.base64'),
    t('nav.password'), t('nav.regex'), t('nav.cron'), t('nav.urlEncode'),
    t('nav.jwt'), t('nav.diff'), t('nav.markdown'),
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      <div className="mb-10 text-center">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-500 mb-4">
          <Code2 size={24} className="text-white" strokeWidth={2} />
        </div>
        <h1 className="text-3xl font-bold text-white mb-3">{t('about.title')}</h1>
        <p className="text-gray-400 leading-relaxed">{t('about.intro')}</p>
      </div>

      <div className="grid sm:grid-cols-3 gap-4 mb-12">
        {features.map(({ icon: Icon, title, desc }) => (
          <div key={title} className="card p-5">
            <Icon size={20} className="text-cyan-400 mb-3" strokeWidth={1.5} />
            <h3 className="font-semibold text-white mb-1.5 text-sm">{title}</h3>
            <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>

      <div className="card p-6">
        <h2 className="font-bold text-white mb-3">{t('about.toolsIncluded')}</h2>
        <ul className="grid grid-cols-2 gap-y-2 gap-x-4 text-sm text-gray-400">
          {toolList.map(tool => (
            <li key={tool} className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 flex-shrink-0" />
              {tool}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8 text-center">
        <p className="text-sm text-gray-500">
          {t('about.contact')}{' '}
          <a href="mailto:rlawhdrl3702@gmail.com" className="text-cyan-400 hover:underline">rlawhdrl3702@gmail.com</a>
        </p>
      </div>
    </div>
  );
}
