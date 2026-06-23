import React, { useState, useEffect } from 'react';
import { List } from 'lucide-react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

export default function LineTools() {
  const { t } = useTranslation();
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  useEffect(() => { document.title = `${t('lines.title')} — TextKit`; }, [t]);

  function getLines() {
    return input.split('\n');
  }

  function apply(fn) {
    const result = fn(getLines());
    setOutput(result.join('\n'));
  }

  function copy() {
    navigator.clipboard.writeText(output).then(() => toast.success(t('common.copy') + '!'));
  }

  const lineCount = output ? output.split('\n').filter(l => l.trim()).length : 0;

  const actions = [
    { label: t('lines.sortAZ'),  fn: lines => [...lines].sort((a, b) => a.localeCompare(b)) },
    { label: t('lines.sortZA'),  fn: lines => [...lines].sort((a, b) => b.localeCompare(a)) },
    { label: t('lines.sortLen'), fn: lines => [...lines].sort((a, b) => a.length - b.length) },
    { label: t('lines.dedupe'),  fn: lines => [...new Set(lines)] },
    { label: t('lines.reverse'), fn: lines => [...lines].reverse() },
    { label: t('lines.shuffle'), fn: lines => { const a = [...lines]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; } },
    { label: t('lines.number'),  fn: lines => lines.map((l, i) => `${i + 1}. ${l}`) },
    { label: t('lines.trim'),    fn: lines => lines.map(l => l.trim()) },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-600 to-amber-400 flex items-center justify-center">
          <List size={16} className="text-white" />
        </div>
        <h1 className="text-2xl font-bold text-white">{t('lines.title')}</h1>
      </div>
      <p className="text-gray-500 text-sm mb-6">{t('lines.desc')}</p>

      <div className="card p-4 mb-4 flex flex-wrap gap-2">
        {actions.map(({ label, fn }) => (
          <button key={label} onClick={() => apply(fn)} className="btn-secondary">
            {label}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="label">{t('common.input')}</label>
          <textarea
            className="textarea h-72"
            placeholder={t('lines.placeholder')}
            value={input}
            onChange={e => setInput(e.target.value)}
          />
        </div>
        <div>
          <div className="flex justify-between items-center mb-1.5">
            <label className="label mb-0">
              {t('common.output')}
              {lineCount > 0 && (
                <span className="ml-2 text-xs text-gray-600">{lineCount} {t('lines.lineCount')}</span>
              )}
            </label>
            {output && <button onClick={copy} className="copy-btn">{t('common.copy')}</button>}
          </div>
          <textarea
            className="textarea h-72"
            readOnly
            value={output}
            placeholder="—"
          />
        </div>
      </div>
    </div>
  );
}
