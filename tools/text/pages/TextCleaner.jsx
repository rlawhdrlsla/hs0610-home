import React, { useState, useEffect } from 'react';
import { Eraser } from 'lucide-react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

export default function TextCleaner() {
  const { t } = useTranslation();
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [opts, setOpts] = useState({
    trimLines: true,
    removeExtraSpaces: true,
    removeEmptyLines: false,
    removeNumbers: false,
    removeSpecial: false,
    removePunctuation: false,
    toSingleLine: false,
  });

  useEffect(() => { document.title = `${t('clean.title')} — TextKit`; }, [t]);

  function toggle(key) {
    setOpts(o => ({ ...o, [key]: !o[key] }));
  }

  function applyClean() {
    let text = input;
    if (opts.trimLines) text = text.split('\n').map(l => l.trim()).join('\n');
    if (opts.removeExtraSpaces) text = text.replace(/[ \t]+/g, ' ');
    if (opts.removeEmptyLines) text = text.split('\n').filter(l => l.trim()).join('\n');
    if (opts.removeNumbers) text = text.replace(/\d/g, '');
    if (opts.removeSpecial) text = text.replace(/[^a-zA-Z0-9가-힣ぁ-ん一-龯\s.,!?'"()-]/g, '');
    if (opts.removePunctuation) text = text.replace(/[.,!?;:'"()\-]/g, '');
    if (opts.toSingleLine) text = text.replace(/\s*\n\s*/g, ' ').replace(/\s+/g, ' ').trim();
    setOutput(text);
  }

  function copy() {
    navigator.clipboard.writeText(output).then(() => toast.success(t('common.copy') + '!'));
  }

  const options = [
    'trimLines', 'removeExtraSpaces', 'removeEmptyLines',
    'removeNumbers', 'removeSpecial', 'removePunctuation', 'toSingleLine',
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-rose-600 to-rose-400 flex items-center justify-center">
          <Eraser size={16} className="text-white" />
        </div>
        <h1 className="text-2xl font-bold text-white">{t('clean.title')}</h1>
      </div>
      <p className="text-gray-500 text-sm mb-6">{t('clean.desc')}</p>

      <div className="card p-4 mb-4 flex flex-wrap gap-3">
        {options.map(key => (
          <label key={key} className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={opts[key]}
              onChange={() => toggle(key)}
              className="w-4 h-4 accent-violet-500"
            />
            <span className="text-sm text-gray-300">{t(`clean.${key}`)}</span>
          </label>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="label">{t('common.input')}</label>
          <textarea
            className="textarea h-64"
            placeholder={t('clean.placeholder')}
            value={input}
            onChange={e => setInput(e.target.value)}
          />
        </div>
        <div>
          <div className="flex justify-between items-center mb-1.5">
            <label className="label mb-0">{t('common.output')}</label>
            {output && <button onClick={copy} className="copy-btn">{t('common.copy')}</button>}
          </div>
          <textarea
            className="textarea h-64"
            readOnly
            value={output}
            placeholder="—"
          />
        </div>
      </div>

      <button onClick={applyClean} className="btn-primary w-full sm:w-auto">
        {t('clean.apply')}
      </button>
    </div>
  );
}
