import React, { useState, useEffect } from 'react';
import { Link2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

function toSlug(text, separator, lowercase) {
  let s = text;
  // Normalize unicode (remove diacritics)
  s = s.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  // Replace Korean and other non-ASCII with empty (or keep as is if desired)
  s = s.replace(/[^\w\s-]/g, '');
  if (lowercase) s = s.toLowerCase();
  s = s.trim().replace(/[\s_-]+/g, separator).replace(new RegExp(`^${separator}|${separator}$`, 'g'), '');
  return s;
}

export default function SlugGenerator() {
  const { t } = useTranslation();
  const [input, setInput] = useState('');
  const [separator, setSeparator] = useState('-');
  const [lowercase, setLowercase] = useState(true);
  useEffect(() => { document.title = `${t('slug.title')} — TextKit`; }, [t]);

  const slug = input ? toSlug(input, separator, lowercase) : '';

  function copy() {
    navigator.clipboard.writeText(slug).then(() => toast.success(t('common.copy') + '!'));
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-600 to-cyan-400 flex items-center justify-center">
          <Link2 size={16} className="text-white" />
        </div>
        <h1 className="text-2xl font-bold text-white">{t('slug.title')}</h1>
      </div>
      <p className="text-gray-500 text-sm mb-6">{t('slug.desc')}</p>

      <div className="card p-5 space-y-4">
        <div>
          <label className="label">{t('common.input')}</label>
          <input
            type="text"
            className="input"
            placeholder={t('slug.placeholder')}
            value={input}
            onChange={e => setInput(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap gap-4">
          <div>
            <label className="label">{t('slug.separator')}</label>
            <select value={separator} onChange={e => setSeparator(e.target.value)} className="input w-44">
              <option value="-">{t('slug.hyphen')}</option>
              <option value="_">{t('slug.underscore')}</option>
            </select>
          </div>
          <label className="flex items-center gap-2 cursor-pointer pt-6">
            <input
              type="checkbox"
              checked={lowercase}
              onChange={e => setLowercase(e.target.checked)}
              className="w-4 h-4 accent-violet-500"
            />
            <span className="text-sm text-gray-300">{t('slug.lowercase')}</span>
          </label>
        </div>

        <div>
          <div className="flex justify-between items-center mb-1.5">
            <label className="label mb-0">{t('slug.result')}</label>
            {slug && <button onClick={copy} className="copy-btn">{t('common.copy')}</button>}
          </div>
          <div className="input font-mono text-violet-300 min-h-[48px] break-all">
            {slug || <span className="text-gray-600">—</span>}
          </div>
        </div>
      </div>
    </div>
  );
}
