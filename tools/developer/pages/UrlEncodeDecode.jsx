import React, { useState, useEffect } from 'react';
import { Link2, Copy, ArrowLeftRight } from 'lucide-react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

export default function UrlEncodeDecode() {
  const { t } = useTranslation();
  useEffect(() => { document.title = `${t('urlEncode.title')} — DevKit`; }, [t]);
  const [mode, setMode] = useState('encode');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [encodeType, setEncodeType] = useState('component');

  function process() {
    setError('');
    if (!input.trim()) return;
    try {
      if (mode === 'encode') {
        setOutput(encodeType === 'component' ? encodeURIComponent(input) : encodeURI(input));
      } else {
        setOutput(decodeURIComponent(input.replace(/\+/g, ' ')));
      }
    } catch (e) {
      setError('Invalid input: ' + e.message);
      setOutput('');
    }
  }

  function swap() {
    setInput(output);
    setOutput('');
    setError('');
    setMode(mode === 'encode' ? 'decode' : 'encode');
  }

  function copy() {
    if (!output) return;
    navigator.clipboard.writeText(output);
    toast.success(t('common.copy') + '!');
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-teal-600 to-teal-400 flex items-center justify-center">
            <Link2 size={16} className="text-white" strokeWidth={2} />
          </div>
          <h1 className="text-2xl font-bold text-white">{t('urlEncode.title')}</h1>
        </div>
        <p className="text-gray-400 text-sm">{t('urlEncode.desc')}</p>
      </div>

      <div className="card p-6">
        <div className="flex items-center gap-2 mb-5 flex-wrap">
          {['encode', 'decode'].map(m => (
            <button
              key={m}
              onClick={() => { setMode(m); setInput(''); setOutput(''); setError(''); }}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                mode === m ? 'bg-cyan-600 text-white' : 'bg-dark-700 text-gray-400 hover:text-white'
              }`}
            >
              {m === 'encode' ? t('common.encode') : t('common.decode')}
            </button>
          ))}
          {mode === 'encode' && (
            <div className="ml-auto flex gap-1">
              {[['component', 'encodeURIComponent'], ['full', 'encodeURI']].map(([val, label]) => (
                <button
                  key={val}
                  onClick={() => setEncodeType(val)}
                  className={`px-3 py-1.5 rounded-lg text-xs border transition-colors ${
                    encodeType === val ? 'bg-cyan-600 border-cyan-600 text-white' : 'border-dark-600 text-gray-400 hover:text-white'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          )}
          {output && (
            <button onClick={swap} className="btn-secondary flex items-center gap-1.5">
              <ArrowLeftRight size={13} /> {t('common.swap')}
            </button>
          )}
        </div>

        <textarea
          className="textarea h-32 mb-4"
          placeholder={mode === 'encode' ? t('urlEncode.encodePlaceholder') : t('urlEncode.decodePlaceholder')}
          value={input}
          onChange={e => setInput(e.target.value)}
        />

        <button onClick={process} className="btn-primary w-full mb-5">
          {mode === 'encode' ? t('common.encode') : t('common.decode')}
        </button>

        {error && (
          <div className="p-3 bg-red-900/20 border border-red-800/50 rounded-xl mb-4">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        {output && (
          <>
            <div className="flex items-center justify-between mb-2">
              <label className="label mb-0">{t('common.result')}</label>
              <button onClick={copy} className="copy-btn flex items-center gap-1"><Copy size={11} /> {t('common.copy')}</button>
            </div>
            <pre className="bg-dark-700 rounded-xl p-4 text-sm text-cyan-300 font-mono break-all whitespace-pre-wrap">{output}</pre>
          </>
        )}
      </div>
    </div>
  );
}
