import React, { useState, useMemo, useEffect } from 'react';
import { Key, Copy } from 'lucide-react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

const SAMPLE = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

function b64Decode(str) {
  const base64 = str.replace(/-/g, '+').replace(/_/g, '/');
  const pad = base64.length % 4 === 0 ? '' : '='.repeat(4 - base64.length % 4);
  return JSON.parse(atob(base64 + pad));
}

export default function JwtDecoder() {
  const { t } = useTranslation();
  const [token, setToken] = useState('');
  useEffect(() => { document.title = `${t('jwt.title')} — DevKit`; }, [t]);

  const result = useMemo(() => {
    const t2 = token.trim() || SAMPLE;
    const parts = t2.split('.');
    if (parts.length !== 3) return { error: t('jwt.errorParts') };
    try {
      return { header: b64Decode(parts[0]), payload: b64Decode(parts[1]), signature: parts[2] };
    } catch (e) {
      return { error: t('jwt.errorDecode') + ': ' + e.message };
    }
  }, [token, t]);

  function copy(obj) {
    navigator.clipboard.writeText(JSON.stringify(obj, null, 2));
    toast.success(t('common.copy') + '!');
  }

  const isExpired = result.payload?.exp ? result.payload.exp * 1000 < Date.now() : null;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-600 to-orange-400 flex items-center justify-center">
            <Key size={16} className="text-white" strokeWidth={2} />
          </div>
          <h1 className="text-2xl font-bold text-white">{t('jwt.title')}</h1>
        </div>
        <p className="text-gray-400 text-sm">{t('jwt.desc')}</p>
      </div>

      <div className="card p-5 mb-4">
        <label className="label">{t('jwt.inputLabel')}</label>
        <textarea className="textarea h-28 mb-2" placeholder={SAMPLE} value={token} onChange={e => setToken(e.target.value)} />
        <p className="text-xs text-gray-600">{t('jwt.inputHint')}</p>
      </div>

      {result.error ? (
        <div className="card p-4"><p className="text-red-400 text-sm">{result.error}</p></div>
      ) : (
        <div className="space-y-3">
          {isExpired !== null && (
            <div className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm border ${
              isExpired ? 'bg-red-900/20 border-red-800/40 text-red-400' : 'bg-green-900/20 border-green-800/40 text-green-400'
            }`}>
              {isExpired ? t('jwt.expired') : t('jwt.valid')}
              {result.payload?.exp && (
                <span className="ml-auto text-xs opacity-70">exp: {new Date(result.payload.exp * 1000).toLocaleString()}</span>
              )}
            </div>
          )}

          <div className="card p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">{t('jwt.header')}</span>
              <button onClick={() => copy(result.header)} className="copy-btn flex items-center gap-1"><Copy size={11} /> {t('common.copy')}</button>
            </div>
            <pre className="text-sm text-gray-300 font-mono">{JSON.stringify(result.header, null, 2)}</pre>
          </div>

          <div className="card p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">{t('jwt.payload')}</span>
              <button onClick={() => copy(result.payload)} className="copy-btn flex items-center gap-1"><Copy size={11} /> {t('common.copy')}</button>
            </div>
            <pre className="text-sm text-gray-300 font-mono">{JSON.stringify(result.payload, null, 2)}</pre>
          </div>

          <div className="card p-4">
            <div className="mb-2">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{t('jwt.signatureNote')}</span>
            </div>
            <code className="text-sm text-gray-500 font-mono break-all">{(token.trim() || SAMPLE).split('.')[2]}</code>
          </div>
        </div>
      )}
    </div>
  );
}
