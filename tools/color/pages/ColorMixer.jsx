import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { Copy } from 'lucide-react';
import { mixColors, isValidHex } from '../utils/color.js';
import { useTranslation } from 'react-i18next';

export default function ColorMixer() {
  const { t } = useTranslation();
  useEffect(() => { document.title = `${t('mixer.title')} — ColorKit`; }, [t]);
  const [c1, setC1] = useState('#7c3aed');
  const [c2, setC2] = useState('#ec4899');
  const [ratio, setRatio] = useState(50);

  const v1 = isValidHex(c1) ? c1 : '#7c3aed';
  const v2 = isValidHex(c2) ? c2 : '#ec4899';
  const copy = (text) => { navigator.clipboard.writeText(text); toast.success(t('common.copied')); };
  const steps = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-2">{t('mixer.title')}</h1>
        <p className="text-gray-400 text-sm">{t('mixer.desc')}</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        {[
          { label: t('mixer.colorA'), value: c1, set: setC1, valid: v1 },
          { label: t('mixer.colorB'), value: c2, set: setC2, valid: v2 },
        ].map(col => (
          <div key={col.label} className="card p-5">
            <label className="label">{col.label}</label>
            <div className="flex gap-2">
              <input type="color" value={col.valid} onChange={e => col.set(e.target.value)}
                className="w-12 h-12 rounded-xl cursor-pointer bg-transparent border border-dark-600 p-1" />
              <input className="input flex-1 font-mono uppercase" value={col.value}
                onChange={e => col.set(e.target.value)} maxLength={7} />
            </div>
            <div className="h-8 rounded-lg mt-3 border border-dark-600" style={{ background: col.valid }} />
          </div>
        ))}
      </div>

      <div className="card p-5 mb-6">
        <div className="flex items-center justify-between mb-3">
          <label className="label mb-0">{t('mixer.mixRatio')}</label>
          <span className="text-sm text-gray-400">{100 - ratio}% A + {ratio}% B</span>
        </div>
        <input type="range" min="0" max="100" value={ratio}
          onChange={e => setRatio(Number(e.target.value))} className="w-full accent-violet-500 mb-4" />
        {(() => {
          const mixed = mixColors(v1, v2, ratio / 100);
          return (
            <div className="flex gap-3 items-center">
              <div className="flex-1 h-16 rounded-xl border border-dark-600" style={{ background: mixed }} />
              <div className="flex-shrink-0">
                <p className="text-white font-mono font-semibold">{mixed?.toUpperCase()}</p>
                <button onClick={() => copy(mixed?.toUpperCase())} className="copy-btn mt-1 flex items-center gap-1">
                  <Copy size={11} /> {t('common.copy')}
                </button>
              </div>
            </div>
          );
        })()}
      </div>

      <div className="card p-5">
        <h2 className="font-semibold text-white mb-4">{t('mixer.allSteps')}</h2>
        <div className="grid grid-cols-11 gap-1.5">
          {steps.map(step => {
            const m = mixColors(v1, v2, step / 100);
            return (
              <div key={step} className="group cursor-pointer" onClick={() => copy(m?.toUpperCase())}>
                <div className="w-full aspect-square rounded-lg border border-dark-600 group-hover:scale-110 transition-transform" style={{ background: m }} />
                <span className="text-[9px] text-gray-600 block text-center mt-1">{step}%</span>
              </div>
            );
          })}
        </div>
        <p className="text-xs text-gray-600 mt-3 text-center">{t('mixer.clickToCopy')}</p>
      </div>
    </div>
  );
}
