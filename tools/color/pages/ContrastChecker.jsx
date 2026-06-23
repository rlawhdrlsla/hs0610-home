import React, { useState, useEffect } from 'react';
import { getContrastRatio, isValidHex } from '../utils/color.js';
import { CheckCircle, XCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function ContrastChecker() {
  const { t } = useTranslation();
  useEffect(() => { document.title = `${t('contrast.title')} — ColorKit`; }, [t]);
  const [fg, setFg] = useState('#ffffff');
  const [bg, setBg] = useState('#7c3aed');

  const fgValid = isValidHex(fg) ? fg : '#ffffff';
  const bgValid = isValidHex(bg) ? bg : '#7c3aed';
  const ratio = getContrastRatio(fgValid, bgValid);

  const Badge = ({ pass, label }) => (
    <div className={`flex items-center gap-2 p-3 rounded-xl ${pass ? 'bg-green-900/30 border border-green-800/50' : 'bg-red-900/30 border border-red-800/50'}`}>
      {pass ? <CheckCircle size={16} className="text-green-400 flex-shrink-0" /> : <XCircle size={16} className="text-red-400 flex-shrink-0" />}
      <div>
        <p className={`text-sm font-semibold ${pass ? 'text-green-400' : 'text-red-400'}`}>{pass ? t('contrast.pass') : t('contrast.fail')}</p>
        <p className="text-xs text-gray-500">{label}</p>
      </div>
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-2">{t('contrast.title')}</h1>
        <p className="text-gray-400 text-sm">{t('contrast.desc')}</p>
      </div>

      <div className="rounded-2xl p-8 mb-8 text-center border border-dark-600" style={{ background: bgValid }}>
        <p className="text-2xl font-bold mb-1" style={{ color: fgValid }}>Sample Text</p>
        <p className="text-sm" style={{ color: fgValid }}>The quick brown fox jumps over the lazy dog</p>
        <p className="text-xs mt-2 font-bold" style={{ color: fgValid }}>SMALL BOLD TEXT SAMPLE</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4 mb-8">
        {[
          { label: t('contrast.foreground'), value: fg, set: setFg, valid: fgValid },
          { label: t('contrast.background'), value: bg, set: setBg, valid: bgValid },
        ].map(col => (
          <div key={col.label} className="card p-5">
            <label className="label">{col.label}</label>
            <div className="flex gap-2">
              <input type="color" value={col.valid} onChange={e => col.set(e.target.value)}
                className="w-12 h-12 rounded-xl cursor-pointer bg-transparent border border-dark-600 p-1 flex-shrink-0" />
              <input className="input font-mono uppercase flex-1" value={col.value}
                onChange={e => col.set(e.target.value)} placeholder="#ffffff" maxLength={7} />
            </div>
          </div>
        ))}
      </div>

      <div className="card p-6 text-center mb-6">
        <p className="text-5xl font-bold text-white mb-1">{ratio.toFixed(2)}:1</p>
        <p className="text-gray-400 text-sm">{t('contrast.ratio')}</p>
        <div className="w-full bg-dark-700 rounded-full h-2 mt-4">
          <div className="bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 h-2 rounded-full transition-all"
            style={{ width: `${Math.min(100, (ratio / 21) * 100)}%` }} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Badge pass={ratio >= 4.5} label="AA — Normal text (≥4.5:1)" />
        <Badge pass={ratio >= 3} label="AA — Large text (≥3:1)" />
        <Badge pass={ratio >= 7} label="AAA — Normal text (≥7:1)" />
        <Badge pass={ratio >= 4.5} label="AAA — Large text (≥4.5:1)" />
      </div>

      <div className="mt-8 card p-5 text-sm text-gray-400 leading-relaxed">
        <h3 className="text-white font-semibold mb-2">{t('contrast.guide.title')}</h3>
        <p>{t('contrast.guide.aa')}</p>
        <p className="mt-2">{t('contrast.guide.aaa')}</p>
      </div>
    </div>
  );
}
