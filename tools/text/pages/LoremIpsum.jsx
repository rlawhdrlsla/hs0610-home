import React, { useState, useEffect } from 'react';
import { FileText } from 'lucide-react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

const WORDS = 'lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua enim ad minim veniam quis nostrud exercitation ullamco laboris nisi aliquip ex ea commodo consequat duis aute irure reprehenderit voluptate velit esse cillum eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt culpa qui officia deserunt mollit anim id est laborum'.split(' ');

function randomWords(n) {
  const out = [];
  for (let i = 0; i < n; i++) out.push(WORDS[Math.floor(Math.random() * WORDS.length)]);
  return out;
}

function generateSentence() {
  const len = 8 + Math.floor(Math.random() * 10);
  const words = randomWords(len);
  words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
  return words.join(' ') + '.';
}

function generateParagraph() {
  const count = 4 + Math.floor(Math.random() * 4);
  return Array.from({ length: count }, generateSentence).join(' ');
}

function generate(type, count, startLorem) {
  if (type === 'paragraphs') {
    const paras = Array.from({ length: count }, generateParagraph);
    if (startLorem) paras[0] = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ' + paras[0];
    return paras.join('\n\n');
  }
  if (type === 'sentences') {
    const sents = Array.from({ length: count }, generateSentence);
    if (startLorem) sents[0] = 'Lorem ipsum dolor sit amet.';
    return sents.join(' ');
  }
  const words = randomWords(count);
  if (startLorem) { words[0] = 'Lorem'; words[1] = 'ipsum'; }
  return words.join(' ');
}

export default function LoremIpsum() {
  const { t } = useTranslation();
  const [type, setType] = useState('paragraphs');
  const [count, setCount] = useState(3);
  const [startLorem, setStartLorem] = useState(true);
  const [output, setOutput] = useState('');

  useEffect(() => { document.title = `${t('lorem.title')} — TextKit`; }, [t]);
  useEffect(() => { setOutput(generate(type, count, startLorem)); }, []);

  function handleGenerate() {
    setOutput(generate(type, count, startLorem));
  }

  function copy() {
    navigator.clipboard.writeText(output).then(() => toast.success(t('common.copy') + '!'));
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-400 flex items-center justify-center">
          <FileText size={16} className="text-white" />
        </div>
        <h1 className="text-2xl font-bold text-white">{t('lorem.title')}</h1>
      </div>
      <p className="text-gray-500 text-sm mb-6">{t('lorem.desc')}</p>

      <div className="card p-5 mb-6 flex flex-wrap items-end gap-4">
        <div>
          <label className="label">{t('lorem.type')}</label>
          <select
            value={type}
            onChange={e => setType(e.target.value)}
            className="input w-40"
          >
            <option value="paragraphs">{t('lorem.paragraphs')}</option>
            <option value="sentences">{t('lorem.sentences')}</option>
            <option value="words">{t('lorem.words')}</option>
          </select>
        </div>
        <div>
          <label className="label">{t('lorem.count')}</label>
          <input
            type="number"
            min={1}
            max={50}
            value={count}
            onChange={e => setCount(Math.max(1, Math.min(50, parseInt(e.target.value) || 1)))}
            className="input w-24"
          />
        </div>
        <label className="flex items-center gap-2 cursor-pointer pb-1">
          <input
            type="checkbox"
            checked={startLorem}
            onChange={e => setStartLorem(e.target.checked)}
            className="w-4 h-4 accent-violet-500"
          />
          <span className="text-sm text-gray-300">{t('lorem.startWithLorem')}</span>
        </label>
        <button onClick={handleGenerate} className="btn-primary">
          {t('lorem.generate')}
        </button>
      </div>

      {output && (
        <div className="card p-5">
          <div className="flex justify-between items-center mb-3">
            <span className="label mb-0">{t('common.output')}</span>
            <button onClick={copy} className="copy-btn">{t('common.copy')}</button>
          </div>
          <div className="text-sm text-gray-300 leading-relaxed whitespace-pre-wrap">{output}</div>
        </div>
      )}
    </div>
  );
}
