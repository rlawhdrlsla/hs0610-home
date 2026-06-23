import React, { useState, useEffect } from 'react';
import { Hash, Copy, RefreshCw } from 'lucide-react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

function generateUUID() {
  return crypto.randomUUID();
}

export default function UuidGenerator() {
  const { t } = useTranslation();
  useEffect(() => { document.title = `${t('uuid.title')} — DevKit`; }, [t]);
  const [uuids, setUuids] = useState([generateUUID()]);
  const [count, setCount] = useState(1);
  const [uppercase, setUppercase] = useState(false);

  function generate() {
    const n = Math.min(Math.max(parseInt(count) || 1, 1), 100);
    setUuids(Array.from({ length: n }, () => uppercase ? generateUUID().toUpperCase() : generateUUID()));
  }

  function copyAll() {
    navigator.clipboard.writeText(uuids.join('\n'));
    toast.success(t('common.copyAll') + '!');
  }

  function copyOne(uuid) {
    navigator.clipboard.writeText(uuid);
    toast.success(t('common.copy') + '!');
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center">
            <Hash size={16} className="text-white" strokeWidth={2} />
          </div>
          <h1 className="text-2xl font-bold text-white">{t('uuid.title')}</h1>
        </div>
        <p className="text-gray-400 text-sm">{t('uuid.desc')}</p>
      </div>

      <div className="card p-6 mb-4">
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <div className="flex items-center gap-2">
            <span className="label mb-0">{t('uuid.count')}:</span>
            <input type="number" min="1" max="100" value={count} onChange={e => setCount(e.target.value)} className="input w-20 py-2" />
          </div>
          <label className="flex items-center gap-2 cursor-pointer">
            <div
              onClick={() => setUppercase(!uppercase)}
              className={`w-10 h-5 rounded-full transition-colors relative cursor-pointer ${uppercase ? 'bg-cyan-600' : 'bg-dark-600'}`}
            >
              <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all ${uppercase ? 'left-5' : 'left-0.5'}`} />
            </div>
            <span className="text-sm text-gray-400">{t('uuid.uppercase')}</span>
          </label>
          <button onClick={generate} className="btn-primary py-2 px-4 flex items-center gap-1.5">
            <RefreshCw size={14} /> {t('common.generate')}
          </button>
          {uuids.length > 1 && (
            <button onClick={copyAll} className="btn-secondary flex items-center gap-1.5">
              <Copy size={14} /> {t('common.copyAll')}
            </button>
          )}
        </div>

        <div className="space-y-2">
          {uuids.map((uuid, i) => (
            <div key={i} className="flex items-center justify-between bg-dark-700 rounded-xl px-4 py-3 gap-3">
              <code className="text-cyan-300 text-sm font-mono flex-1 break-all">{uuid}</code>
              <button onClick={() => copyOne(uuid)} className="copy-btn flex-shrink-0 flex items-center gap-1">
                <Copy size={11} /> {t('common.copy')}
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="card p-5">
        <h2 className="text-sm font-semibold text-white mb-2">{t('uuid.about')}</h2>
        <p className="text-sm text-gray-500 leading-relaxed">{t('uuid.aboutBody')}</p>
      </div>
    </div>
  );
}
