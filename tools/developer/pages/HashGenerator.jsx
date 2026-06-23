import React, { useState, useEffect } from 'react';
import { Shield, Copy, RefreshCw } from 'lucide-react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

async function sha(algorithm, text) {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest(algorithm, data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export default function HashGenerator() {
  const { t } = useTranslation();
  useEffect(() => { document.title = `${t('hash.title')} — DevKit`; }, [t]);
  const [input, setInput] = useState('');
  const [hashes, setHashes] = useState({ sha256: '', sha512: '', sha1: '' });
  const [uppercase, setUppercase] = useState(false);

  async function generate() {
    if (!input) return;
    const [s256, s512, s1] = await Promise.all([
      sha('SHA-256', input),
      sha('SHA-512', input),
      sha('SHA-1', input),
    ]);
    setHashes({
      sha256: uppercase ? s256.toUpperCase() : s256,
      sha512: uppercase ? s512.toUpperCase() : s512,
      sha1:   uppercase ? s1.toUpperCase()   : s1,
    });
  }

  function copy(val) {
    navigator.clipboard.writeText(val);
    toast.success(t('common.copy') + '!');
  }

  const rows = [
    { label: 'SHA-1', key: 'sha1' },
    { label: 'SHA-256', key: 'sha256' },
    { label: 'SHA-512', key: 'sha512' },
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 to-violet-400 flex items-center justify-center">
            <Shield size={16} className="text-white" strokeWidth={2} />
          </div>
          <h1 className="text-2xl font-bold text-white">{t('hash.title')}</h1>
        </div>
        <p className="text-gray-400 text-sm">{t('hash.desc')}</p>
      </div>

      <div className="card p-6 mb-4">
        <label className="label">{t('hash.inputLabel')}</label>
        <textarea className="textarea h-32 mb-4" placeholder={t('hash.inputPlaceholder')} value={input} onChange={e => setInput(e.target.value)} />
        <div className="flex items-center gap-3 flex-wrap">
          <label className="flex items-center gap-2 cursor-pointer">
            <div
              onClick={() => setUppercase(!uppercase)}
              className={`w-10 h-5 rounded-full transition-colors relative cursor-pointer ${uppercase ? 'bg-cyan-600' : 'bg-dark-600'}`}
            >
              <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all ${uppercase ? 'left-5' : 'left-0.5'}`} />
            </div>
            <span className="text-sm text-gray-400">{t('hash.uppercase')}</span>
          </label>
          <button onClick={generate} className="btn-primary py-2 px-4 flex items-center gap-1.5">
            <RefreshCw size={14} /> {t('common.generate')}
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {rows.map(({ label, key }) => (
          <div key={key} className="card p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{label}</span>
              <button onClick={() => copy(hashes[key])} disabled={!hashes[key]} className="copy-btn flex items-center gap-1 disabled:opacity-30">
                <Copy size={11} /> {t('common.copy')}
              </button>
            </div>
            <code className="text-sm text-cyan-300 font-mono break-all leading-relaxed">
              {hashes[key] || <span className="text-gray-600">—</span>}
            </code>
          </div>
        ))}
      </div>
    </div>
  );
}
