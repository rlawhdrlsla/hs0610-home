import React, { useState, useEffect } from 'react';
import { Code2, Copy, Trash2, Minimize2, Maximize2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

export default function JsonFormatter() {
  const { t } = useTranslation();
  useEffect(() => { document.title = `${t('json.title')} — DevKit`; }, [t]);
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [indent, setIndent] = useState(2);

  function format() {
    if (!input.trim()) return;
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, indent));
      setError('');
    } catch (e) {
      setError(e.message);
      setOutput('');
    }
  }

  function minify() {
    if (!input.trim()) return;
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed));
      setError('');
    } catch (e) {
      setError(e.message);
      setOutput('');
    }
  }

  function copy() {
    if (!output) return;
    navigator.clipboard.writeText(output);
    toast.success(t('common.copy') + '!');
  }

  function clear() {
    setInput('');
    setOutput('');
    setError('');
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-600 to-cyan-400 flex items-center justify-center">
            <Code2 size={16} className="text-white" strokeWidth={2} />
          </div>
          <h1 className="text-2xl font-bold text-white">{t('json.title')}</h1>
        </div>
        <p className="text-gray-400 text-sm">{t('json.desc')}</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <div className="card p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-gray-300">{t('common.input')}</span>
            <button onClick={clear} className="copy-btn flex items-center gap-1.5">
              <Trash2 size={12} /> {t('common.clear')}
            </button>
          </div>
          <textarea
            className="textarea h-80"
            placeholder={t('json.inputPlaceholder')}
            value={input}
            onChange={e => setInput(e.target.value)}
          />
          <div className="flex items-center gap-2 mt-3 flex-wrap">
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500">{t('json.indent')}:</span>
              {[2, 4].map(n => (
                <button
                  key={n}
                  onClick={() => setIndent(n)}
                  className={`px-2.5 py-1 text-xs rounded-lg border transition-colors ${
                    indent === n ? 'bg-cyan-600 border-cyan-600 text-white' : 'border-dark-600 text-gray-400 hover:text-white'
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
            <button onClick={format} className="btn-primary py-2 px-4 flex items-center gap-1.5">
              <Maximize2 size={14} /> {t('common.format')}
            </button>
            <button onClick={minify} className="btn-secondary flex items-center gap-1.5">
              <Minimize2 size={14} /> {t('common.minify')}
            </button>
          </div>
        </div>

        <div className="card p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-gray-300">{t('common.output')}</span>
            <button onClick={copy} className="copy-btn flex items-center gap-1.5">
              <Copy size={12} /> {t('common.copy')}
            </button>
          </div>
          {error ? (
            <div className="h-80 flex items-start p-4 bg-red-900/20 border border-red-800/50 rounded-xl">
              <p className="text-red-400 text-sm font-mono">{error}</p>
            </div>
          ) : (
            <pre className="h-80 overflow-auto p-4 bg-dark-700 rounded-xl text-sm text-gray-300 font-mono whitespace-pre-wrap break-words">
              {output || <span className="text-gray-600">{t('json.outputPlaceholder')}</span>}
            </pre>
          )}
          {output && !error && (
            <div className="mt-3">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-900/30 text-green-400 text-xs border border-green-800/40">
                {t('json.validJson')}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
