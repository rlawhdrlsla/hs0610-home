import React, { useState, useMemo, useEffect } from 'react';
import { Search, Copy } from 'lucide-react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

const EXAMPLES = [
  { label: 'Email', pattern: '[a-zA-Z0-9._%+\\-]+@[a-zA-Z0-9.\\-]+\\.[a-zA-Z]{2,}', flags: 'g' },
  { label: 'URL', pattern: 'https?:\\/\\/[^\\s]+', flags: 'g' },
  { label: 'IPv4', pattern: '\\b(?:\\d{1,3}\\.){3}\\d{1,3}\\b', flags: 'g' },
  { label: 'Date (YYYY-MM-DD)', pattern: '\\d{4}-\\d{2}-\\d{2}', flags: 'g' },
  { label: 'Hex Color', pattern: '#[0-9a-fA-F]{3,6}\\b', flags: 'g' },
];

export default function RegexTester() {
  const { t } = useTranslation();
  useEffect(() => { document.title = `${t('regex.title')} — DevKit`; }, [t]);
  const [pattern, setPattern] = useState('');
  const [flags, setFlags] = useState('g');
  const [testStr, setTestStr] = useState('');

  const result = useMemo(() => {
    if (!pattern || !testStr) return { error: null, matches: [] };
    try {
      const matches = [...testStr.matchAll(new RegExp(pattern, flags.includes('g') ? flags : flags + 'g'))];
      return { error: null, matches };
    } catch (e) {
      return { error: e.message, matches: [] };
    }
  }, [pattern, flags, testStr]);

  const highlightedHtml = useMemo(() => {
    if (!pattern || !testStr || result.error) return escapeHtml(testStr);
    try {
      const rx = new RegExp(pattern, flags.includes('g') ? flags : flags + 'g');
      const matches = [...testStr.matchAll(rx)];
      if (!matches.length) return escapeHtml(testStr);
      let out = '';
      let last = 0;
      for (const m of matches) {
        out += escapeHtml(testStr.slice(last, m.index));
        out += `<mark class="bg-cyan-500/30 text-cyan-200 rounded px-0.5">${escapeHtml(m[0])}</mark>`;
        last = m.index + m[0].length;
      }
      out += escapeHtml(testStr.slice(last));
      return out;
    } catch {
      return escapeHtml(testStr);
    }
  }, [pattern, flags, testStr, result.error]);

  function toggleFlag(f) {
    setFlags(prev => prev.includes(f) ? prev.replace(f, '') : prev + f);
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-600 to-amber-400 flex items-center justify-center">
            <Search size={16} className="text-white" strokeWidth={2} />
          </div>
          <h1 className="text-2xl font-bold text-white">{t('regex.title')}</h1>
        </div>
        <p className="text-gray-400 text-sm">{t('regex.desc')}</p>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <span className="text-xs text-gray-500 self-center">{t('common.example')}:</span>
        {EXAMPLES.map(ex => (
          <button key={ex.label} onClick={() => { setPattern(ex.pattern); setFlags(ex.flags); }} className="copy-btn">{ex.label}</button>
        ))}
      </div>

      <div className="card p-5 mb-4">
        <div className="flex gap-2 mb-4">
          <div className="flex-1">
            <label className="label">{t('regex.pattern')}</label>
            <div className="flex items-center bg-dark-700 border border-dark-600 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-cyan-500">
              <span className="px-3 text-gray-500 text-sm">/</span>
              <input
                className="flex-1 py-3 bg-transparent text-white focus:outline-none font-mono text-sm placeholder-gray-600"
                placeholder="[a-z]+"
                value={pattern}
                onChange={e => setPattern(e.target.value)}
              />
              <span className="px-3 text-gray-500 text-sm">/{flags}</span>
            </div>
          </div>
          <div>
            <label className="label">{t('regex.flags')}</label>
            <div className="flex gap-1">
              {['g', 'i', 'm'].map(f => (
                <button
                  key={f}
                  onClick={() => toggleFlag(f)}
                  className={`w-10 h-[46px] rounded-xl text-sm font-mono border transition-colors ${
                    flags.includes(f) ? 'bg-cyan-600 border-cyan-600 text-white' : 'bg-dark-700 border-dark-600 text-gray-400 hover:text-white'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>

        {result.error && (
          <div className="mb-4 p-3 bg-red-900/20 border border-red-800/50 rounded-xl">
            <p className="text-red-400 text-sm font-mono">{result.error}</p>
          </div>
        )}

        <label className="label">{t('regex.testString')}</label>
        <textarea className="textarea h-36 mb-4" placeholder={t('regex.testPlaceholder')} value={testStr} onChange={e => setTestStr(e.target.value)} />

        {testStr && !result.error && (
          <>
            <label className="label">{t('regex.resultLabel')}</label>
            <div className="bg-dark-700 rounded-xl p-4 text-sm font-mono text-gray-300 whitespace-pre-wrap break-words min-h-12" dangerouslySetInnerHTML={{ __html: highlightedHtml }} />
          </>
        )}
      </div>

      {result.matches.length > 0 && (
        <div className="card p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold text-white">
              {result.matches.length > 1
                ? t('regex.matchesPlural', { count: result.matches.length })
                : t('regex.matches', { count: result.matches.length })}
            </span>
          </div>
          <div className="space-y-1.5 max-h-48 overflow-auto">
            {result.matches.map((m, i) => (
              <div key={i} className="flex items-center gap-3 bg-dark-700 rounded-lg px-3 py-2">
                <span className="text-xs text-gray-600 w-5 text-right">{i + 1}</span>
                <code className="text-cyan-300 text-sm flex-1">{m[0]}</code>
                <span className="text-xs text-gray-600">@{m.index}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
