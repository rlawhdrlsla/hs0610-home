import React, { useState, useCallback, useEffect } from 'react';
import { Lock, Copy, RefreshCw } from 'lucide-react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

const CHARS = {
  upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  lower: 'abcdefghijklmnopqrstuvwxyz',
  numbers: '0123456789',
  symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?',
};

function generatePassword(length, opts) {
  let pool = '';
  if (opts.upper) pool += CHARS.upper;
  if (opts.lower) pool += CHARS.lower;
  if (opts.numbers) pool += CHARS.numbers;
  if (opts.symbols) pool += CHARS.symbols;
  if (!pool) return '';
  const arr = new Uint32Array(length);
  crypto.getRandomValues(arr);
  return Array.from(arr, n => pool[n % pool.length]).join('');
}

export default function PasswordGenerator() {
  const { t } = useTranslation();
  useEffect(() => { document.title = `${t('password.title')} — DevKit`; }, [t]);
  const [length, setLength] = useState(16);
  const [opts, setOpts] = useState({ upper: true, lower: true, numbers: true, symbols: false });
  const [passwords, setPasswords] = useState(() => [generatePassword(16, { upper: true, lower: true, numbers: true, symbols: false })]);
  const [count, setCount] = useState(1);

  const generate = useCallback(() => {
    const n = Math.min(Math.max(parseInt(count) || 1, 1), 20);
    setPasswords(Array.from({ length: n }, () => generatePassword(length, opts)));
  }, [length, opts, count]);

  function toggle(key) {
    const next = { ...opts, [key]: !opts[key] };
    if (!Object.values(next).some(Boolean)) return;
    setOpts(next);
  }

  function copy(pwd) {
    navigator.clipboard.writeText(pwd);
    toast.success(t('common.copy') + '!');
  }

  const pw = passwords[0] || '';
  function strength(pwd) {
    if (!pwd) return { label: '', color: '', width: '0%' };
    let score = 0;
    if (pwd.length >= 8) score++;
    if (pwd.length >= 12) score++;
    if (pwd.length >= 16) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[a-z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;
    if (score <= 3) return { label: t('password.weak'), color: 'bg-red-500', width: '33%' };
    if (score <= 5) return { label: t('password.medium'), color: 'bg-amber-500', width: '66%' };
    return { label: t('password.strong'), color: 'bg-green-500', width: '100%' };
  }
  const str = strength(pw);

  const optLabels = {
    upper: t('password.uppercase'),
    lower: t('password.lowercase'),
    numbers: t('password.numbers'),
    symbols: t('password.symbols'),
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-rose-600 to-rose-400 flex items-center justify-center">
            <Lock size={16} className="text-white" strokeWidth={2} />
          </div>
          <h1 className="text-2xl font-bold text-white">{t('password.title')}</h1>
        </div>
        <p className="text-gray-400 text-sm">{t('password.desc')}</p>
      </div>

      <div className="card p-6 mb-4">
        <div className="mb-5">
          <div className="flex justify-between mb-2">
            <span className="label mb-0">{t('password.length')}</span>
            <span className="text-cyan-400 font-bold text-sm">{length}</span>
          </div>
          <input type="range" min="6" max="64" value={length} onChange={e => setLength(+e.target.value)} className="w-full accent-cyan-500" />
        </div>

        <div className="grid grid-cols-2 gap-2 mb-5">
          {Object.entries(optLabels).map(([key, label]) => (
            <button
              key={key}
              onClick={() => toggle(key)}
              className={`px-3 py-2 rounded-xl text-sm text-left transition-colors border ${
                opts[key] ? 'bg-cyan-900/40 border-cyan-700 text-cyan-300' : 'bg-dark-700 border-dark-600 text-gray-400'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 mb-5">
          <span className="text-sm text-gray-400">{t('password.count')}:</span>
          <input type="number" min="1" max="20" value={count} onChange={e => setCount(e.target.value)} className="input w-20 py-2" />
          <button onClick={generate} className="btn-primary py-2 px-4 flex items-center gap-1.5 ml-auto">
            <RefreshCw size={14} /> {t('common.generate')}
          </button>
        </div>

        {pw && (
          <div className="mb-2">
            <div className="flex justify-between text-xs mb-1">
              <span className="text-gray-500">{t('password.strength')}</span>
              <span className="text-gray-300">{str.label}</span>
            </div>
            <div className="h-1.5 bg-dark-600 rounded-full overflow-hidden">
              <div className={`h-full rounded-full transition-all ${str.color}`} style={{ width: str.width }} />
            </div>
          </div>
        )}
      </div>

      <div className="space-y-2">
        {passwords.map((pwd, i) => (
          <div key={i} className="flex items-center gap-3 bg-dark-800 border border-dark-600 rounded-xl px-4 py-3">
            <code className="flex-1 text-cyan-300 font-mono text-sm break-all">{pwd}</code>
            <button onClick={() => copy(pwd)} className="copy-btn flex items-center gap-1 flex-shrink-0">
              <Copy size={11} /> {t('common.copy')}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
