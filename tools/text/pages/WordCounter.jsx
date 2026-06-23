import React, { useState, useEffect } from 'react';
import { Hash } from 'lucide-react';
import { useTranslation } from 'react-i18next';

function countStats(text) {
  const words = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
  const chars = text.length;
  const charsNoSpace = text.replace(/\s/g, '').length;
  const sentences = text.trim() === '' ? 0 : (text.match(/[.!?]+/g) || []).length;
  const paragraphs = text.trim() === '' ? 0 : text.trim().split(/\n\s*\n/).filter(p => p.trim()).length;
  const readTime = Math.max(1, Math.ceil(words / 200));
  return { words, chars, charsNoSpace, sentences, paragraphs, readTime };
}

export default function WordCounter() {
  const { t } = useTranslation();
  const [text, setText] = useState('');
  const stats = countStats(text);

  useEffect(() => { document.title = `${t('wordCount.title')} — TextKit`; }, [t]);

  const statCards = [
    { label: t('wordCount.words'),        value: stats.words },
    { label: t('wordCount.chars'),        value: stats.chars },
    { label: t('wordCount.charsNoSpace'), value: stats.charsNoSpace },
    { label: t('wordCount.sentences'),    value: stats.sentences },
    { label: t('wordCount.paragraphs'),   value: stats.paragraphs },
    { label: t('wordCount.readTime'),     value: `${stats.readTime} ${t('wordCount.minutes')}` },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 to-violet-400 flex items-center justify-center">
          <Hash size={16} className="text-white" />
        </div>
        <h1 className="text-2xl font-bold text-white">{t('wordCount.title')}</h1>
      </div>
      <p className="text-gray-500 text-sm mb-6">{t('wordCount.desc')}</p>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
        {statCards.map(({ label, value }) => (
          <div key={label} className="card p-4 text-center">
            <div className="text-3xl font-bold text-violet-400 mb-1">{value}</div>
            <div className="text-xs text-gray-500">{label}</div>
          </div>
        ))}
      </div>

      <textarea
        className="textarea h-72"
        placeholder={t('wordCount.placeholder')}
        value={text}
        onChange={e => setText(e.target.value)}
      />
    </div>
  );
}
